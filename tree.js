class Node {
  constructor(value, parentNode) {
    this.value = value;
    this.children = [];
    this.parent = parentNode;
  }
}

class Tree {
  constructor(value) {
    this.root = new Node(value, null);
  }
  add(value, parentNodeValue) {
    let parentNode = null;
    if(this.root.value === parentNodeValue) {
      parentNode = this.root;
    }
    else {
      parentNode = this.find_dfs(parentNodeValue, this.root);
      //parentNode = this.find_bfs(parentNodeValue, this.root.children)
    }

    if (parentNode === null) {
      throw Error("Invalid Parent Node!!");
    }
    let node = new Node(value, parentNode);
    parentNode.children.push(node);
  }
  find_dfs(value, currentNode) {
    let len = currentNode.children.length;
    if (len > 0) {
      for (let i = 0; i < len; i++) {
        if (currentNode.children[i].value === value)
          return currentNode.children[i];

        else {
          let node = this.find_dfs(value, currentNode.children[i]);
          if (node) {
            return node;
          }
        }
      }
    }
  }
  find_bfs(value, nodeList) {
    let len = nodeList.length;
    let tempList = [];

    for (let i = 0; i < len; i++) {
      if (nodeList[i].value === value) {
        return nodeList[i];
      } else {
        let childrenCount = nodeList[i].children.length;
        for (let j = 0; j < childrenCount; j++) {
          tempList.push(nodeList[i].children[j]);
        }
      }
    }

    if (tempList.length)
      return this.find_bfs(value, tempList);
  }
  delete(value) {
    let node = this.find_dfs(value, this.root);
    if (node) {
      let children = node.parent.children;
      let temp = [];
      for (let i = 0; i < children.length; i++) {
        if (children[i].value !== value) {
          temp.push(children[i])
        }
      }
      node.parent.children = temp;
    } else {
      throw Error("Cannot find node");
    }
  }

}

let desktopTree = new Tree("My Computer");
desktopTree.add("A Drive", "My Computer");
desktopTree.add("B Drive", "My Computer");
desktopTree.add("C Drive", "My Computer");
desktopTree.add("D Drive", "My Computer");
desktopTree.add("Users", "A Drive");
desktopTree.add("Program Files", "A Drive");
desktopTree.add("System", "A Drive");
desktopTree.add("Recovery Disk", "B Drive");
desktopTree.add("Movies", "C Drive");
desktopTree.add("English", "Movies");
desktopTree.add("Hindi", "Movies");
desktopTree.add("Tamil", "Movies");
desktopTree.delete("C Drive");
console.log(desktopTree);