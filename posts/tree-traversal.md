# 二叉树遍历算法

## 三种遍历方式

### 前序遍历
根节点 -> 左子树 -> 右子树

### 中序遍历
左子树 -> 根节点 -> 右子树

### 后序遍历
左子树 -> 右子树 -> 根节点

## 代码示例

```python
def preorder(root):
    if not root:
        return
    print(root.val)
    preorder(root.left)
    preorder(root.right)
```

**掌握递归是关键！**
