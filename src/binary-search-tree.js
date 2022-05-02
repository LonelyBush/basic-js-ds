const { NotImplementedError } = require('../extensions/index.js');

 const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor(){
    this.rootTree = null;
  }

  root() {
    return this.rootTree
  }

  add(data) {
    this.rootTree = addLeaf(this.rootTree, data);

    function addLeaf(node, data){
      if(!node){     // если такого узла не существует то добавляется новый узел с новыми данными
        return new Node(data)
      }
      if (node.data === data){ // если такой узел с такими же данными уже существует то ничего не добавляется, а возвращается текущий узел
        return node
      }
      
      if (data < node.data){ // если значение меньше чем в текущем узле то:
        node.left = addLeaf(node.left, data); // левый потомок будет иметь то значение которое вернёт функция т.е либо новый узел, либо самого себя, а рекурсивный вызов повторно будет повторяться пока не выполниться одно из предыдущих условий
      } else {
        node.right = addLeaf(node.right, data); // аналогично верхней функции но при условии значения data строго больше чем то, что рассматривается в узле
      }
      return node;
    }
  }

  has(data ) {
  return searchLeaf(this.rootTree, data);

  function searchLeaf(node, data){
    if(!node){ // eсли такого элемента нет то возвращаем false
      return false;
    }
    if (node.data === data){ //если такой узел есть то возвращае true
      return true;
    }
    return data< node.data ? searchLeaf(node.left, data) : searchLeaf(node.right, data) 
    // если искомое значение меньше чем значение узла то будем искать в левом узле пока не наткнемся на true или false
    // или если искомое значение больше чем значение узла то будем искать в правом узле. 
  
  }
  }

  find(data) {
return findData(this.rootTree, data)

function findData(node, data){
  if(!node){
    return null;
  }
  if (data === node.data){
    return node;
  }
  return data< node.data ? findData(node.left, data) : findData(node.right, data) 
}

  }

  remove(data) {
    this.rootTree = removeLeaf(this.rootTree, data)

    function removeLeaf(node, data){
      if(!node){
        return null;
      }

      if(data< node.data){
        node.left = removeLeaf(node.left, data)
        return node;
      } if (node.data< data){
        node.right = removeLeaf(node.right, data)
      return node;
      } 
      else {
        // если нет двух веток возвращаем нуль
        if(!node.left && !node.right){
          return null;
        }
        // если нет левой ветки то значит есть правый потомок, кладем в него все что есть в правом потомке. Тем самым смещая ветку
        if(!node.left){
          node = node.right;
          return node;
        }
        //тоже самое только для правой ветки. 
        if(!node.right){
          node = node.left;
          return node;
        }

        // есть оба под дерева. Поэтому ищем минимальное среди правого элемента.
        let minFromRght = node.right;
        // 
        while(minFromRght.left){
          minFromRght = minFromRght.left;
        }
        node.data = minFromRght.data;
        node.right = removeLeaf(node.right, minFromRght.data)

        return node;



      }
    }

  }

  min() {
    if(!this.rootTree){
      return; // проверка на наличие элементов
    }
    let node = this.rootTree;
    while (node.left){
      node = node.left;
    }
    return node.data
  }

  max() {
    if(!this.rootTree){
      return; // проверка на наличие элементов
    }
    let node = this.rootTree
    while(node.right){
      node = node.right;
    }
    return node.data
  }
}

module.exports = {
  BinarySearchTree
};