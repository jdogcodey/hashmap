// Copied from previous project - enable me to store more than one thing in a bucket
// Class to make and run methods on LinkedLists
class LinkedList {
  constructor(head = null) {
    this.head = head;
  }
  append(key, value) {
    if (!this.head) {
      this.head = new Node(key, value);
      return this;
    } else {
      this.getTail().nextNode = new Node(key, value);
      return this;
    }
  }

  prepend(key, value) {
    if (!this.head) {
      this.head = new Node(key, value);
      return this;
    } else {
      const currentHead = this.head;
      this.head = new Node(key, value, currentHead);
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

  containsVal(value) {
    let currentNode = this.head;
    while (currentNode !== null) {
      if (value === currentNode.value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  containsKey(key) {
    let currentNode = this.head;
    while (currentNode !== null) {
      if (key === currentNode.key) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  findVal(value) {
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

  findKey(key) {
    let currentNode = this.head;
    let nodeCount = 0;
    while (currentNode !== null) {
      if (key === currentNode.key) {
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
  constructor(key = null, value = null, nextNode = null) {
    this.key = key;
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
  };
}

// Function to create a hash from a value
function hash(key, array = newArr) {
  let hashCode = 0;
  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
    hashCode = hashCode % array.bucketSize;
  }
  return hashCode;
}

//Function to assign a value to a key and add to the hashmap
function set(key, value, array = newArr) {
  const hashedKey = hash(key);
  // If trying to add to bucket outside the range then throwing an error
  if (hashedKey < 0 || hashedKey >= newArr.bucketSize) {
    throw new Error("Trying to access index out of bound");
  }
  // If that bucket is already empty - create a Linked list and add the key/value pair
  else if (!array[hashedKey]) {
    const linkedList = new LinkedList();
    linkedList.append(key, value);
    array[hashedKey] = linkedList;
  } else {
    // If the bucket has something in it - search the array for that key
    // If key is there - rewrite the value
    if (array[hashedKey].containsKey(key)) {
      const keyDirections = array[hashedKey].findKey(key);
      const keyLocation = array[hashedKey].at(keyDirections);
      keyLocation.value = value;
    }
    // If key isn't there then write it
    else {
      array[hashedKey].append(key, value);
    }
  }
}

function get(key, array = newArr) {
  const hashedKey = hash(key);
  if (array[hashedKey].containsKey(key)) {
    const keyDirections = array[hashedKey].findKey(key);
    const keyLocation = array[hashedKey].at(keyDirections);
    return keyLocation.value;
  }
  return null;
}

let newArr = hashMap();
set("test", "testValue");
set("test", "newValue");
set("words", "hmm");
set("carla", "carla");
console.log(newArr["9"]);
console.log(get("carla"));
