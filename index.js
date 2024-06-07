// Copied from previous project - enable me to store more than one thing in a bucket
// Class to make and run methods on LinkedLists
class LinkedList {
  constructor(head = null) {
    this.head = head;
  }
  append(value) {
    if (!this.head) {
      this.head = new Node(value);
      return this;
    } else {
      this.getTail().nextNode = new Node(value);
      return this;
    }
  }

  prepend(value) {
    if (!this.head) {
      this.head = new Node(value);
      return this;
    } else {
      const currentHead = this.head;
      this.head = new Node(value, currentHead);
      return this;
    }
  }

  size() {
    let noOfNodes = 0;
    let currentNode = this.head;
    while (currentNode !== null) {
      noOfNodes++;
      currentNode = currentNode.nextNode;
    }
    return noOfNodes;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    let currentNode = this.head;
    while (currentNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }

  at(index) {
    let nodeCount = this.head;
    for (let i = 0; i < index; i++) {
      nodeCount = nodeCount.nextNode;
    }
    if (nodeCount === null) {
      return null;
    } else {
      return nodeCount;
    }
  }

  pop() {
    let currentNode = this.head;
    if (!this.head.nextNode) {
      this.head = null;
      return;
    }
    while (currentNode.nextNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }
    currentNode.nextNode = null;
  }

  contains(value) {
    let currentNode = this.head;
    while (currentNode !== null) {
      if (value === currentNode.value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  find(value) {
    let currentNode = this.head;
    let nodeCount = 0;
    while (currentNode !== null) {
      if (value === currentNode.value) {
        return nodeCount;
      } else {
        nodeCount++;
        currentNode = currentNode.nextNode;
      }
    }
    return null;
  }

  toString() {
    let currentNode = this.head;
    if (currentNode === null) {
      return null;
    }
    let output = `( ${currentNode.value} )`;
    while (currentNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
      output = `${output} -> ( ${currentNode.value} )`;
    }
    output = `${output} -> null`;
    return output;
  }
}

// Also copied from the last lesson
// Class to make Nodes
class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

// Factory function to make the Hashmap
function hashMap() {
  return {
    array: [],
    bucketSize: 16,
    loadFactor: 0.75,

    set(key, value) {},
  };
}

function hash(key, array) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
    hashCode = hashCode % array.bucketSize;
  }
  return hashCode;
}

let newArr = hashMap();
console.log();
