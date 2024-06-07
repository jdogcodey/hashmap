// Factory function to make the Hashmap

function hashMap() {
  return {
    array: [],
    bucketSize: 16,
    loadFactor: 0.75,
    hash(key) {
      let hashCode = 0;

      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
      }

      return hashCode;
    },
  };
}
