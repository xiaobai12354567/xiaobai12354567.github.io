// 博客文章列表配置
const blogs = [
    
    { title: "我的第一篇博客", file: "posts/first-post.md", date: "2026-03-21", category: "mysql" }
];

let currentCategory = 'all';

// 简单的 Markdown 转 HTML
function parseMarkdown(md) {
    return md
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/```[\s\S]*?```/gim, match => `<pre><code>${match.slice(3, -3)}</code></pre>`)
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        .replace(/\n\n/gim, '</p><p>')
        .replace(/\n/gim, '<br>');
}

// 获取分类中文名
function getCategoryName(cat) {
    const names = { mysql: 'MySQL', algorithm: '算法', java: 'Java' };
    return names[cat] || cat;
}

// 加载博客列表
function loadBlogList(category = 'all') {
    currentCategory = category;
    const blogList = document.getElementById('blog-list');
    const content = document.querySelector('.content');

    content.innerHTML = '<h1>博客文章</h1><div id="blog-list"></div>';
    const newBlogList = document.getElementById('blog-list');

    const filtered = category === 'all' ? blogs : blogs.filter(b => b.category === category);

    filtered.forEach(blog => {
        const item = document.createElement('div');
        item.className = 'blog-item';
        item.innerHTML = `
            <span class="category-tag">${getCategoryName(blog.category)}</span>
            <h2>${blog.title}</h2>
            <p class="date">${blog.date}</p>
            ${blog.excerpt ? `<p class="excerpt">${blog.excerpt}</p>` : ''}
        `;
        item.onclick = () => loadBlog(blog.file, blog.title);
        newBlogList.appendChild(item);
    });
}

// 加载单篇博客
async function loadBlog(file, title) {
    try {
        const response = await fetch(file);
        const text = await response.text();
        const content = document.querySelector('.content');
        content.innerHTML = `
            <button class="back-btn" onclick="loadBlogList('${currentCategory}')">← 返回</button>
            <div class="blog-content"><p>${parseMarkdown(text)}</p></div>
        `;
    } catch (error) {
        alert('加载博客失败，请确保文件存在');
    }
}

// 显示关于我页面
function showAbout() {
    const content = document.querySelector('.content');
    content.innerHTML = `
        <h1>关于我</h1>
        <div class="blog-content">
            <p>你好！我是 Larry，欢迎来到我的个人博客。</p>
            <p>这里分享我在 MySQL、算法和 Java 方面的学习笔记和心得。</p>
        </div>
    `;
    updateActiveNav('about');
}

// 更新导航激活状态
function updateActiveNav(category) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.category === category) {
            link.classList.add('active');
        }
    });
}

// 导航点击事件
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            if (category === 'about') {
                showAbout();
            } else {
                loadBlogList(category);
                updateActiveNav(category);
            }
        });
    });
    loadBlogList('all');
});

