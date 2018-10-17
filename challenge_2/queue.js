class Queue {
  constructor() {
    this.top = 0;
    this.bottom = 0;
    this.storage = {};
  }

  enqueue(value) {
    this.storage[this.bottom] = value;
    this.bottom++;
  }

  dequeue() {
    if (this.size() > 0) {
      let item = this.storage[this.top];
      delete this.storage[this.top];
      this.top++;
      return item;
    }
    return undefined;
  }

  size() {
    return this.bottom - this.top;
  }
}

module.exports = Queue;
