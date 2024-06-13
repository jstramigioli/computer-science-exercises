const linkedList = () => {
    return {
        root: node(),

        append(value) {
            const newNode = this.tail().nextNode = node()
            newNode.value = value
        },

        prepend(value) {
            const newNode = node()
            newNode.value = value
            newNode.nextNode = this.head()
            this.root.nextNode = newNode
        },
    
        size() {
            let size = 0
            function checkIfIsLast(node) {
                if (node.nextNode === null) {
                    return true
                }
                else checkIfIsLast(node.nextNode)
                size += 1
            }
            checkIfIsLast(this.root)
            return size
        },
    
        head() {
            return this.root.nextNode()
        },
    
        tail() {
            function checkIfIsLast(node) {
                if (node.nextNode === null) {
                    return node
                }
                else return checkIfIsLast(node.nextNode)
            }
            return checkIfIsLast(this.root)
                
        },
    
        at(index) {
            let node = this.root.nextNode
            for (let i = 0 ; i < index ; i++) {
                node = node.nextNode
            }
            return node
        },
    
        pop() {
            if (this.root.nextNode === null) {
                return null
            }
            function removeIfLast(node) {
                if (node.nextNode.nextNode === null) {
                    node.nextNode = null
                }
                else removeIfLast(node.nextNode)
            }
            removeIfLast(this.root)
        },
    
        contains(value) {

            function checkIfContains(node) {
                if (node.value === value) {
                    return true
                }
                else if (node.nextNode === null) {
                    return false
                }
                else return checkIfContains(node.nextNode)
            }
            return checkIfContains(this.root)
        },
    
        find(value) {
            let index = 0
            function findInNode(node) {
                if (value === node.value) {
                    return index
                }
                index++
                if (node.nextNode === null) {return null}
                return findInNode(node.nextNode)
            }
            return findInNode(this.root.nextNode)
        },
    
        toString() {
            let string = ''
            function nodeToString(node) {
                string += `( ${node.value} )`
                string += ' -> '
                if (node.nextNode != null) {
                    nodeToString(node.nextNode)
                }
                else string += '( null )'
                return string
            }
            return nodeToString(this.root.nextNode)
        },

        insertAt(value, index) {
            const newNode = node()
            newNode.value = value
            const followingNode = this.at(index)
            const prevNode = index > 0 ? this.at(index - 1) : this.root;
            prevNode.nextNode = newNode
            newNode.nextNode = followingNode
        },

        removeAt(index) {
            const prevNode = index > 0 ? this.at(index - 1) : this.root;
            const followingNode = this.at(index+1)
            prevNode.nextNode = followingNode
        }
    }
}

const node = () => {
    return {
        value: null,
        nextNode: null
    }
}

export {linkedList}