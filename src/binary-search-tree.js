const createNode = (data, leftChild, rightChild) => {
    return {data, left: leftChild, right: rightChild}
}

const tree = (array) => {
    const sortedArr = sortAndRemoveDuplicates(array)
    let root = buildTree(sortedArr, 0, sortedArr.length-1)

    function insert(value) {
        function insertInLeaf(node) {
            if (value > node.data) {
                if (node.right) {
                    insertInLeaf(node.right)
                }
                else node.right = createNode(value, null, null)
            }
            if (value < node.data) {
                if (node.left) {
                    insertInLeaf(node.left)
                }
                else node.left = createNode(value, null, null)
            }
        }
        insertInLeaf(root)
    }

    function deleteItem(value) {
        let nodeToDelete
        let parentNode
        function getNodeAndParent(node) {
            if (!node) return
            if (value > node.data) {
                if (!node.right) return
                if (node.right.data === value) {
                    nodeToDelete = node.right
                    parentNode = node
                }
                else if (node.right) {
                    getNodeAndParent(node.right)
                }
            }
            if (value < node.data) {
                if (!node.left) return
                if (node.left.data === value) {
                    nodeToDelete = node.left
                    parentNode = node
                }
                else if (node.left) {
                    getNodeAndParent(node.left)
                }
            }
            if (value === node.data) {
                nodeToDelete = node
            }
        }
        getNodeAndParent(root)
        if (!nodeToDelete) return
        if (!nodeToDelete.right && !nodeToDelete.left) {
            if (parentNode.data > value) {
                parentNode.left = null
            }
            else parentNode.right = null
        }
        else if (nodeToDelete.right && nodeToDelete.left) {
            function findNextBiggest(node) {
                function findSmallest(node) {
                    if (!node.left.left) {
                        return {node: node.left, parent: node}
                    }
                        else {findSmallest(node.left)}
                }
                if (!node.right.left) {
                    return {node: node.right, parent: node}
                }
                else return findSmallest(node.right)
            }
            const nextBiggest = findNextBiggest(nodeToDelete).node
            const nextBiggestParent = findNextBiggest(nodeToDelete).parent
            nextBiggest.left = nodeToDelete.left
            
            nextBiggest.data > nextBiggestParent.data ?
            nextBiggestParent.right = nextBiggest.right :
            nextBiggestParent.left = nextBiggest.right
            if (nextBiggest.right != nodeToDelete.right) {
                nextBiggest.right = nodeToDelete.right
            }
            if (!parentNode) {
                this.root = nextBiggest
            }
            else if (parentNode.data > value) {
                parentNode.left = nextBiggest
            }
            else parentNode.right = nextBiggest
        }
        else if (nodeToDelete.right) {
            if (parentNode.data > value) {
                parentNode.left = nodeToDelete.right
            }
            else parentNode.right = nodeToDelete.right
        }
        else if (nodeToDelete.left) {
            if (parentNode.data > value) {
                parentNode.left = nodeToDelete.left
            }
            else parentNode.right = nodeToDelete.left
        }
    }

    function find(value) {
        function checkValueInNode(node) {
            if (!node) return null
            if (value === node.data) {
                return node
            }
            else return value > node.data ? checkValueInNode(node.right) : checkValueInNode(node.left)
        }
        return checkValueInNode(this.root)
    }

    function levelOrder(callback) {
        const queue = []
        const result = []

        function recursiveLevelOrder(node) {
            if (node.left) {
                queue.push(node.left)
            }
            if (node.right) {
                queue.push(node.right)
            }
            if (callback) {
                result.push(callback(node.data))
            }
            else {
                result.push(node.data)
            }
            if (queue.length > 0) {
                recursiveLevelOrder(queue.shift())
            }   
        }
        recursiveLevelOrder(root)
        return result
    }

    function inOrder(callback) {
        const result = []
        function recursiveInOrder(node) {
            if (node == null) {return}
            recursiveInOrder(node.left)
            if (callback) {
                result.push(callback(node.data))
            }
            else {
                result.push(node.data)
            }
            recursiveInOrder(node.right)
            }
        recursiveInOrder(root)
        return result
    }

    function preOrder(callback) {
        const result = []
        function recursivePreOrder(node) {
            if (node == null) {return}
            if (callback) {
                result.push(callback(node.data))
            }
            else {
                result.push(node.data)
            }
            recursivePreOrder(node.left)
            recursivePreOrder(node.right)
            }
        recursivePreOrder(root)
        return result
    }

    function postOrder(callback) {
        const result = []
        function recursivePostOrder(node) {
            if (node == null) {return}
            
            recursivePostOrder(node.left)
            recursivePostOrder(node.right)
            if (callback) {
                result.push(callback(node.data))
            }
            else {
                result.push(node.data)
            }
            }
        recursivePostOrder(root)
        return result
    }

    function height(node) {
            if (!node) return -1
            if (!node.left && !node.right) {
                return 0
            }
            let depthLeft = 0
            let depthRight = 0
            if (node.left) {
                depthLeft = height(node.left)
            }
            if (node.right) {
                depthRight = height(node.right)
            }
            
            if (depthLeft > depthRight) {
                return depthLeft +1
            }
            else return depthRight +1
    }

    function depth(node) {
        let depth = 0
        
        function recursiveDepth(currentNode) {
            
            if (node == currentNode) {
                return
            }
            depth++
            if (node.data < currentNode.data) {
                recursiveDepth(currentNode.left)
            }
            else recursiveDepth(currentNode.right)
        }
        recursiveDepth(this.root)
        return depth
    }

    function isBalanced() {
        function checkIfBalanced(node) {
            if (node === null) {
                return true
            }
            if (Math.abs(height(node.right) - height(node.left)) <= 1) {
                return (checkIfBalanced(node.right) && checkIfBalanced(node.left))
            }
            else return false
        }
        return checkIfBalanced(this.root)
    }

    function reBalance() {
        const array = this.preOrder()
        this.root = tree(array).root
    }

    return {
        root,
        insert,
        deleteItem,
        find,
        levelOrder,
        inOrder,
        preOrder,
        postOrder,
        height,
        depth,
        isBalanced,
        reBalance
    }
}

function buildTree(array, start, end) {
    
    
    if (start > end) {
        return null
    }
    
    const mid = Math.floor((end + start) / 2)
    const node = createNode(array[mid], buildTree(array, start, mid-1), buildTree(array, mid+1, end))
    return node
}

function sortAndRemoveDuplicates(arr) {
    arr.sort((a,b) => a - b)

    let result = []
    for (let i = 0 ; i < arr.length ; i++) {
        if (arr[i] !== arr[i+1]) {
            result.push(arr[i])
        }
    }

    return result
}



const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

 
