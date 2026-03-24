// 博客文章列表配置
const blogs = [
    { title: "我的第一篇博客", file: "posts/first-post.md", date: "2026-03-24" },
    // 在这里添加更多博客文章
];

// 简单的 Markdown 转 HTML
function parseMarkdown(md) {
    return md
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/\n/gim, '<br>');
}

// 加载博客列表
function loadBlogList() {
    const blogList = document.getElementById('blog-list');
    blogs.forEach(blog => {
        const item = document.createElement('div');
        item.className = 'blog-item';
        item.innerHTML = `
            <h2>${blog.title}</h2>
            <p class="date">${blog.date}</p>
        `;
        item.onclick = () => loadBlog(blog.file);
        blogList.appendChild(item);
    });
}

// 加载单篇博客
async function loadBlog(file) {
    try {
        const response = await fetch(file);
        const text = await response.text();
        const content = document.querySelector('.content');
        content.innerHTML = `
            <button onclick="loadBlogList(); location.reload()">← 返回</button>
            <div class="blog-content">${parseMarkdown(text)}</div>
        `;
    } catch (error) {
        alert('加载博客失败');
    }
}

// 页面加载时显示博客列表
loadBlogList();
