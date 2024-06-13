import { linkedList } from "./linked-list.js";

const hashMap = () => {
    let size = 16
    const loadFactor = 0.8
    let hashMapArray = []

    function stringToHashCode(string) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < string.length; i++) {
          hashCode = (primeNumber * hashCode + string.charCodeAt(i)) % size;
        }
      
        return hashCode;
      }

    function set(key, value) {
      if (this.length() >= this.size * loadFactor) {
        this.size *= 2
        this.reasignEntries()
      }
        const hashCode = stringToHashCode(key)
        let bucket = hashMapArray[hashCode]
        const node = {key, value}

        if (!bucket) {
          bucket = linkedList()
        }

        for (let i = 0 ; i < bucket.size() ; i++) {
          if (bucket.at(i).value.key === key) {
            bucket.at(i).value.value = value
            return
          }
        }
        
        bucket.append(node)
        hashMapArray[hashCode] = bucket
    }

    function reasignEntries() {
      const newMap = []
      for (let i = 0 ; i < this.length() ; i++) {
        const key = this.keys()[i]
        const value = this.values()[i]
        const hashCode = stringToHashCode(key)
        let bucket = newMap[hashCode]
        const node = {key, value}

        if (!bucket) {
          bucket = linkedList()
        }

        for (let i = 0 ; i < bucket.size() ; i++) {
          if (bucket.at(i).value.key === key) {
            bucket.at(i).value.value = value
            return
          }
        }
        
        bucket.append(node)
        newMap[hashCode] = bucket
      }
      hashMapArray = newMap
    }

    function get(key) {
      const hashCode = stringToHashCode(key)
      const bucket = hashMapArray[hashCode]
      if (!bucket) {return null}
      
      for (let i = 0 ; i < bucket.size() ; i++) {
        if (bucket.at(i).value.key === key) {
          return bucket.at(i).value.value
        }
      }
      return null
    }

    function has(key) {
      const hashCode = stringToHashCode(key)
      const bucket = hashMapArray[hashCode]
      if (!bucket) {return false}

      for (let i = 0 ; i < bucket.size() ; i++) {
        if (bucket.at(i).value.key === key) {
          return true
        }
      }
      return false
    }

    function remove(key) {
      if ((this.length() -1) / 2 <= this.size * loadFactor) {
        this.size /= 2
        this.reasignEntries()
      }
      const hashCode = stringToHashCode(key)
      const bucket = hashMapArray[hashCode]
      if (!bucket) {return false}

      for (let i = 0 ; i < bucket.size() ; i++) {
        if (bucket.at(i).value.key === key) {
          bucket.removeAt(i)
          hashMapArray[hashCode] = bucket
          return true
        }
      }
      return false
    }

    function length() {
      let length = 0
      for (let i = 0 ; i < size ; i++) {
        if (hashMapArray[i]) {
          length += hashMapArray[i].size()
        }
      }
      return length
    }

    function clear() {
      this.size = 16
      hashMapArray = []
    }

    function keys() {
      const keys = []
      for (let i = 0 ; i < size ; i++) {
        if (hashMapArray[i]) {
          for (let j = 0 ; j < hashMapArray[i].size() ; j++) {
            keys.push(hashMapArray[i].at(j).value.key)
          }
        }
      }
      return keys
    }

    function values() {
      const values = []
      for (let i = 0 ; i < size ; i++) {
        if (hashMapArray[i]) {
          for (let j = 0 ; j < hashMapArray[i].size() ; j++) {
            values.push(hashMapArray[i].at(j).value.value)
          }
        }
      }
      return values
    }

    function entries() {
      const entries = []
      for (let i = 0 ; i < size ; i++) {
        if (hashMapArray[i]) {
          for (let j = 0 ; j < hashMapArray[i].size() ; j++) {
            const key = hashMapArray[i].at(j).value.key
            const value = hashMapArray[i].at(j).value.value
            entries.push([key, value])
          }
        }
      }
      return entries
    }

    return {
      size,
      set,
      reasignEntries,
      get,
      has,
      remove,
      length,
      clear,
      keys,
      values,
      entries
    }
}
