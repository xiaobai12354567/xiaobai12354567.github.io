// 全局变量
let postsData = [];       // 存储从 posts.json 加载的文章列表
let currentCategory = 'all';

// 获取分类的中文显示名
function getCategoryName(cat) {
    const map = {
        'mysql': '🐬 MySQL',
        'algorithm': '🧠 算法',
        'java': '☕ Java',
        'other': '📄 其他'
    };
    return map[cat] || cat;
}

// 加载文章索引 posts.json
async function loadPostsIndex() {
    try {
        const response = await fetch('posts.json');
        if (!response.ok) throw new Error('无法加载文章列表');
        postsData = await response.json();
    } catch (err) {
        console.error(err);
        postsData = [];
        // 如果加载失败，显示提示
        document.querySelector('.content').innerHTML = `
            <h1>博客文章</h1>
            <div class="blog-content" style="text-align:center; padding:3rem;">
                <p>⚠️ 文章列表加载失败，请检查 posts.json 文件是否存在且格式正确。</p>
            </div>
        `;
    }
}

// 渲染博客列表
function renderBlogList(category) {
    currentCategory = category;
    const contentDiv = document.querySelector('.content');
    const filtered = category === 'all' 
        ? postsData 
        : postsData.filter(post => post.category === category);

    if (filtered.length === 0) {
        contentDiv.innerHTML = `
            <h1>博客文章</h1>
            <div class="blog-content" style="text-align:center; padding:2rem;">
                <p>✨ 暂无文章，敬请期待～</p>
            </div>
        `;
        return;
    }

    let html = `<h1>${category === 'all' ? '全部文章' : getCategoryName(category)}</h1>`;
    filtered.forEach(post => {
        html += `
            <div class="blog-item" data-file="${post.file}" data-title="${post.title}">
                <span class="category-tag">${getCategoryName(post.category)}</span>
                <h2>${post.title}</h2>
                <p class="date">${post.date}</p>
                ${post.excerpt ? `<p class="excerpt">${post.excerpt}</p>` : ''}
            </div>
        `;
    });
    contentDiv.innerHTML = html;

    // 给所有卡片绑定点击事件
    document.querySelectorAll('.blog-item').forEach(item => {
        item.addEventListener('click', () => {
            const file = item.dataset.file;
            const title = item.dataset.title;
            loadAndRenderPost(file, title);
        });
    });
}

// 加载并渲染单篇文章
async function loadAndRenderPost(file, title) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`无法加载 ${file}`);
        const markdown = await response.text();
        // 使用 marked 解析 markdown，并开启代码高亮
        marked.setOptions({
            highlight: function(code, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    return hljs.highlight(code, { language: lang }).value;
                }
                return hljs.highlightAuto(code).value;
            }
        });
        const htmlContent = marked.parse(markdown);
        
        const contentDiv = document.querySelector('.content');
        contentDiv.innerHTML = `
            <button class="back-btn" id="backBtn">← 返回列表</button>
            <div class="blog-content">${htmlContent}</div>
        `;
        // 重新高亮代码块
        document.querySelectorAll('pre code').forEach(block => {
            hljs.highlightElement(block);
        });
        // 返回按钮事件
        document.getElementById('backBtn').addEventListener('click', () => {
            renderBlogList(currentCategory);
        });
        // 更新页面标题（可选）
        document.title = `${title} - Larry's Blog`;
    } catch (err) {
        console.error(err);
        const contentDiv = document.querySelector('.content');
        contentDiv.innerHTML = `
            <button class="back-btn" id="backBtn">← 返回列表</button>
            <div class="blog-content" style="text-align:center; padding:2rem;">
                <p>❌ 文章加载失败，请确保文件路径正确且文件存在。</p>
            </div>
        `;
        document.getElementById('backBtn').addEventListener('click', () => {
            renderBlogList(currentCategory);
        });
    }
}

// 显示“关于我”页面
function showAbout() {
    const contentDiv = document.querySelector('.content');
    contentDiv.innerHTML = `
        <h1>关于我</h1>
        <div class="blog-content">
            <p>👋 你好！我是 Larry，一名热爱编程的学生。</p>
            <p>📖 这个博客用来记录我在 MySQL、算法、Java 等方面的学习笔记和心得。</p>
            <p>💡 希望通过分享，能与更多技术爱好者交流进步。</p>
            <p>📧 联系我：18538615660@163.com</p>
            <hr style="margin: 2rem 0;">
            <p style="color: #64748b;">✨ 博客由纯前端驱动，文章使用 Markdown 编写。</p>
        </div>
    `;
}

// 初始化导航栏事件
function initNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            // 更新激活状态
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            if (category === 'about') {
                showAbout();
            } else {
                renderBlogList(category);
            }
        });
    });
}

// 页面启动
async function init() {
    await loadPostsIndex();      // 加载文章索引
    initNav();                   // 绑定导航事件
    renderBlogList('all');       // 默认显示全部文章
}

init();