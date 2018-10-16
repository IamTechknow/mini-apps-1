class CSVParser {
  constructor() {

  }

  // Check if an object has the same keys as its parent
  checkKeys(leftKeys, rightKeys) {
    if (leftKeys.length !== rightKeys.length) {
      return false;
    }

    for (var i = 0; i < leftKeys.length; i++) {
      if (leftKeys[i] !== rightKeys[i]) {
        return false;
      }
    }

    return true;
  }

  readJSON(obj, shape) {
    var csv = '';
    // First, get the keys for the object which shall be the header.
    if (!shape) {
      shape = Object.keys(obj);
      shape.pop(); // remove 'children' key
      csv = shape.join() + '\n';
    }

    // Iterate through each object starting from json, each time you do so, form a CSV line
    // if (checkKeys(shape, Object.keys(obj))) {
        
    // Concat csv, ignore children
    var temp = [];
    for (var key of shape) {
      temp.push(obj[key]);
    }
    csv += temp.join() + '\n';

    for (var child of obj.children || []) {
      csv += this.readJSON(child, shape); 
    }

    return csv;
  }
}

module.exports = CSVParser;
