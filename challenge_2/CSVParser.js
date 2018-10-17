var Queue = require('./queue.js');

class CSVParser {
  constructor() {
    this.queue = new Queue();
    this.currShape = undefined;
  }
    
  getShape(obj) {
    var result = Object.keys(obj);
    
    var idx = result.indexOf('children');
    if (idx !== -1) {
      result.splice(idx, 1);
    }
    return result;
  }
    
  // Check if an object has the same keys as its parent
  checkKeys(shape, obj) {
    for (var i = 0; i < shape.length; i++) {
      if (obj[shape[i]] === undefined) {
        return false;
      }
    }

    return true;
  }

  readJSON(obj, shape, depth = 0) {
    var csv = '';
    
    // First, get the keys for the object which shall be the header.
    if (!shape) {
      shape = this.getShape(obj);
      csv = shape.join() + '\n';
    }

    // Iterate through each object starting from json, each time you do so, form a CSV line
    if (this.checkKeys(shape, obj)) {
      // Concat csv, ignore children
      var temp = [];
      for (var key of shape) {
        temp.push(obj[key]);
      }
      csv += temp.join() + '\n';

      for (var child of obj.children || []) {
        csv += this.readJSON(child, shape, depth + 1); 
      }
    } else {
      // add this children to queue, process later
      this.queue.enqueue(obj);
    }
    
    // Process all objects in the queue. If adjacent objects have same shape, don't add new header
    if (depth === 0) {
      while (this.queue.size()) {
        var tempObj = this.queue.dequeue();
        if (!this.currShape || !this.checkKeys(this.currShape, tempObj)) {
          this.currShape = this.getShape(tempObj);
          csv += this.currShape.join() + '\n';
        }
        
        csv += this.readJSON(tempObj, this.currShape);
      }
      this.currShape = undefined;
    }

    return csv;
  }
}

module.exports = CSVParser;
