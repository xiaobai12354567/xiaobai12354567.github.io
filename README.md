# 个人博客使用说明

## 已创建的文件

- `index.html` - 网站主页
- `style.css` - 样式文件
- `script.js` - JavaScript 脚本
- `posts/first-post.md` - 示例博客文章

## 使用步骤

### 1. 添加你的头像
将你的头像图片命名为 `avatar.jpg`，放在根目录下。

### 2. 修改个人信息
编辑 `index.html` 文件，修改：
- "你的名字" 改为你的真实姓名
- "一句简短的个人介绍" 改为你的个人简介

### 3. 发布新博客
1. 在 `posts/` 文件夹中创建新的 `.md` 文件
2. 编辑 `script.js`，在 `blogs` 数组中添加新文章信息：
   ```javascript
   { title: "文章标题", file: "posts/文件名.md", date: "2026-03-24" }
   ```

### 4. 部署到 GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/xiaobai12354567/lali.github.io.git
git push -u origin main
```

然后在 GitHub 仓库设置中启用 GitHub Pages，选择 main 分支。

几分钟后访问：https://你的用户名.github.io

## 注意事项
- 仓库名必须是 `你的用户名.github.io`
- 所有文件都在根目录
- Markdown 文件放在 `posts/` 文件夹
