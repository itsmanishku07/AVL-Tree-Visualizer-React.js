class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    return y;
  }

  insert(value) {
    this.root = this._insertNode(this.root, value);
  }

  _insertNode(node, value) {
    if (!node) return new Node(value);

    if (value < node.value) node.left = this._insertNode(node.left, value);
    else if (value > node.value) node.right = this._insertNode(node.right, value);
    else return node;

    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    const balance = this.getBalance(node);

    if (balance > 1 && value < node.left.value) return this.rightRotate(node);
    if (balance < -1 && value > node.right.value) return this.leftRotate(node);
    if (balance > 1 && value > node.left.value) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }
    if (balance < -1 && value < node.right.value) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  delete(value) {
    this.root = this._deleteNode(this.root, value);
  }

  _deleteNode(root, value) {
    if (!root) return root;

    if (value < root.value) root.left = this._deleteNode(root.left, value);
    else if (value > root.value) root.right = this._deleteNode(root.right, value);
    else {
      if (!root.left || !root.right) root = root.left || root.right;
      else {
        const temp = this.getMinValueNode(root.right);
        root.value = temp.value;
        root.right = this._deleteNode(root.right, temp.value);
      }
    }

    if (!root) return root;

    root.height = 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));

    const balance = this.getBalance(root);

    if (balance > 1 && this.getBalance(root.left) >= 0) return this.rightRotate(root);
    if (balance > 1 && this.getBalance(root.left) < 0) {
      root.left = this.leftRotate(root.left);
      return this.rightRotate(root);
    }
    if (balance < -1 && this.getBalance(root.right) <= 0) return this.leftRotate(root);
    if (balance < -1 && this.getBalance(root.right) > 0) {
      root.right = this.rightRotate(root.right);
      return this.leftRotate(root);
    }

    return root;
  }

  find(value) {
    return this._findNode(this.root, value);
  }

  _findNode(node, value) {
    if (!node) return null;
    if (node.value === value) return node;
    if (value < node.value) return this._findNode(node.left, value);
    return this._findNode(node.right, value);
  }

  traverse(type) {
    const result = [];
    if (type === 'Inorder') this._inOrder(this.root, result);
    else if (type === 'Preorder') this._preOrder(this.root, result);
    else if (type === 'Postorder') this._postOrder(this.root, result);
    return result;
  }

  _inOrder(node, result) {
    if (node) {
      this._inOrder(node.left, result);
      result.push(node.value);
      this._inOrder(node.right, result);
    }
  }

  _preOrder(node, result) {
    if (node) {
      result.push(node.value);
      this._preOrder(node.left, result);
      this._preOrder(node.right, result);
    }
  }

  _postOrder(node, result) {
    if (node) {
      this._postOrder(node.left, result);
      this._postOrder(node.right, result);
      result.push(node.value);
    }
  }

  getMinValueNode(node) {
    while (node && node.left) node = node.left;
    return node;
  }
}

export default AVLTree;
