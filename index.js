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

  removeAt(index) {
    if (this.at(index) === null) {
      return false;
    } else if (this.at(index).nextNode === null) {
      this.pop();
      return true;
    } else if (index === 0) {
      this.head = this.at(index + 1);
    } else {
      const currentNextNode = this.at(index).nextNode;
      this.at(index - 1).nextNode = currentNextNode;
      return true;
    }
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
function hashMap(bucketSize, loadFactor) {
  return {
    bucketSize: bucketSize,
    loadFactor: loadFactor,
  };
}

// Function to create a hash from a value
function hash(key, bucketSize) {
  let hashCode = 0;
  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
    hashCode = hashCode % bucketSize;
  }
  return hashCode;
}

//Function to assign a value to a key and add to the hashmap
function set(key, value, array) {
  // When adding a new key value pair - first check whether load factor has been reached - if reached then double hash table and rehash everything
  if (length(array) >= array.bucketSize * array.loadFactor) {
    let newBucketSize = array.bucketSize * 2;
    grow(array, newBucketSize);
    set(key, value, array);
  } else {
    const hashedKey = hash(key, array.bucketSize);
    // If trying to add to bucket outside the range then throwing an error
    if (hashedKey < 0 || hashedKey >= array.bucketSize) {
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
}

function grow(array, newBucketSize) {
  const keyArray = keys(array);
  const valueArray = [];
  for (let i = 0; i < keyArray.length; i++) {
    valueArray[i] = get(keyArray[i], array, array.bucketSize);
  }
  clear(array);
  array.bucketSize = newBucketSize;
  for (let i = 0; i < keyArray.length; i++) {
    set(keyArray[i], valueArray[i], array);
  }
}

// Find the value pair of a key
function get(key, array, bucketSize) {
  const hashedKey = hash(key, bucketSize);
  // If the key exists then find its value - otherwise return null
  if (has(key, array, bucketSize)) {
    const keyDirections = array[hashedKey].findKey(key, array);
    const keyLocation = array[hashedKey].at(keyDirections);
    return keyLocation.value;
  } else return null;
}

// Tests if the key exists within the hash table
function has(key, array, bucketSize) {
  const hashedKey = hash(key, bucketSize);
  if (array[hashedKey]) {
    if (array[hashedKey].containsKey(key)) {
      return true;
    } else return false;
  } else return false;
}

// Removes the key-value pair from the table
function remove(key, array, bucketSize) {
  const hashedKey = hash(key, bucketSize);
  if (has(key, array, array.bucketSize)) {
    const keyPosition = array[hashedKey].findKey(key, array);
    array[hashedKey].removeAt(keyPosition);
    return true;
  } else return false;
}

// Returns the number of keys in the hash table
function length(array) {
  let counter = 0;
  for (let i = 0; i < array.bucketSize; i++) {
    if (array[i] && array[i].head !== null) {
      counter += array[`${i}`].size();
    }
  }
  return counter;
}

// Empties all LinkedLists without removing the array or bucketsize
function clear(array) {
  for (let i = 0; i < array.bucketSize; i++) {
    delete array[i];
  }
}

// Returns an array of all the keys in the Hash Table
function keys(array) {
  let output = [];
  // Loop through the array and search each bucket then add to an array
  for (let i = 0; i < array.bucketSize; i++) {
    if (array[i] && array[i].head !== null) {
      let elements = recursiveSearch(array[i].head, `key`);
      output.push(...elements);
    }
  }
  return output;
}

// Returns an array of all the values in the hash table
function values(array) {
  let output = [];
  // Loop through the array and search each bucket then add to an array
  for (let i = 0; i < array.bucketSize; i++) {
    if (array[i] && array[i].head !== null) {
      let elements = recursiveSearch(array[i].head, `value`);
      output.push(...elements);
    }
  }
  return output;
}

function recursiveSearch(array, item) {
  let arr = [];
  // If this isn't the tail of the Linkedlist then add this item(key/value) and rerun function on the next node
  if (array.nextNode !== null) {
    arr = [array[item], ...recursiveSearch(array.nextNode, item)];
    return arr;
    // If this is the tail of the LinkedLIst then just return the item
  } else arr = [array[item]];
  return arr;
}

// Function to return array of key/value pairs in format [['key', 'value'], ['key', 'value']]
function entries(array) {
  let output = [];
  // Loop through the array and search each bucket then add to an array
  for (let i = 0; i < array.bucketSize; i++) {
    if (array[i] && array[i].head !== null) {
      let elements = recursiveCombine(array[i].head);
      output.push(...elements);
    }
  }
  return output;
}

// Another recursive function that returns key/value pairs as []
function recursiveCombine(array) {
  let arr = [];
  // If this isn't the tail of the Linkedlist then add this item(key/value) and rerun function on the next node
  if (array.nextNode !== null) {
    arr = [[array.key, array.value], ...recursiveCombine(array.nextNode)];
    return arr;
    // If this is the tail of the LinkedLIst then just return the keyvalue pair
  } else arr = [array.key, array.value];
  return arr;
}

// Create the hash map with a bucket size of 4 and a load factor of 0.75
const hashTable = hashMap(4, 0.75);

// Adding values to cause rehashing a couple of times
set("one", "valueone", hashTable);
set("two", "valuetwo", hashTable);
set("three", "valuethree", hashTable);
set("four", "valuefour", hashTable);
set("five", "valuefive", hashTable);
set("six", "valuesix", hashTable);
set("seven", "valueseven", hashTable);
set("eight", "valueeight", hashTable);

// console.log(length(hashTable)); // Should output 8 as there are 8 items
// console.log(hashTable); // Should output all items with their value and a bucketSize of 16

// Testing if the get function works
// console.log(get("one", hashTable, hashTable.bucketSize));
// console.log(get("three", hashTable, hashTable.bucketSize));
// console.log(get("seven", hashTable, hashTable.bucketSize));

// Testing if the has function works
// console.log(has("one", hashTable, hashTable.bucketSize));
// console.log(has("three", hashTable, hashTable.bucketSize));
// console.log(has("nope", hashTable, hashTable.bucketSize));

// Testing the remove function
// console.log(remove("one", hashTable, hashTable.bucketSize));
// console.log(has("one", hashTable, hashTable.bucketSize));
// console.log(remove("nope", hashTable, hashTable.bucketSize));
// console.log(remove("eight", hashTable, hashTable.bucketSize));
// console.log(has("eight", hashTable, hashTable.bucketSize));
