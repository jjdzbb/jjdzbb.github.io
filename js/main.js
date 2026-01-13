/* =========================================
   1. 数据定义区域 (Data Definition)
   ========================================= */

// 日记数据
const diaryData = [
    {
        title: "Starting a New Chapter",
        date: "January 15, 2025",
        content: "Today marks the beginning of a new semester at McMaster. Excited to dive deeper into computer science and explore new technologies..."
    },
    {
        title: "Reflections on Embedded Systems",
        date: "December 20, 2024",
        content: "Working on the intelligent weighing system project taught me so much about real-time systems and hardware-software integration..."
    },
    {
        title: "Building Accessible Web Applications",
        date: "November 10, 2024",
        content: "The Parkinson's detection game project opened my eyes to the importance of accessibility in web development. Every user deserves a great experience..."
    },
    {
        title: "Summer Internship Learnings",
        date: "August 30, 2024",
        content: "Just finished my internship at Sichuan Zhongce Zhibo. Teaching students and developing firmware simultaneously was challenging but incredibly rewarding..."
    },
    {
        title: "The Power of Automation",
        date: "August 15, 2023",
        content: "During my time at CITIC Bank, I learned how a few well-written Python scripts can save hours of manual work. Automation is truly powerful..."
    }
];

/* =========================================
   2. 组件渲染函数 (Render Functions)
   ========================================= */

// --- 渲染导航栏 ---
// --- 渲染导航栏 (包含深色模式逻辑) ---
function renderNavbar() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (!navbarPlaceholder) return;

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    const navLinks = [
        { name: 'Home', href: 'index.html' },
        { name: 'Guestbook', href: 'guestbook.html' },
        { name: 'Diary', href: 'diary.html' }
    ];

    const linksHtml = navLinks.map(link => {
        const isActive = currentPath === link.href || (currentPath === '' && link.href === 'index.html');
        // 注意：这里增加了 dark:text-gray-300 dark:hover:text-white
        const activeClass = isActive ? 'active text-black dark:text-white' : 'text-gray-700 dark:text-gray-300';
        
        return `<a href="${link.href}" class="nav-link ${activeClass} hover:text-black dark:hover:text-white font-medium transition-colors">${link.name}</a>`;
    }).join('');

    // 注入 HTML (增加了深色模式切换按钮)
    navbarPlaceholder.innerHTML = `
        <nav class="navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-black/10 dark:border-white/10 backdrop-blur-md bg-white/70 dark:bg-gray-900/80">
            <div class="max-w-6xl mx-auto px-4 md:px-8">
                <div class="flex items-center justify-between h-16">
                    <a href="index.html" class="text-xl font-bold text-gray-900 dark:text-white transition-colors">Yaoyun Zhang</a>
                    <div class="flex items-center gap-6 md:gap-8">
                        ${linksHtml}
                        
                        <button id="theme-toggle" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none">
                            <i class="fas fa-sun text-yellow-400 hidden dark:block text-lg"></i>
                            <i class="fas fa-moon text-gray-600 block dark:hidden text-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    `;

    // --- 绑定滚动逻辑 ---
    const navbar = navbarPlaceholder.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
            // 滚动时背景变实一点
            navbar.classList.remove('bg-white/70', 'dark:bg-gray-900/80');
            navbar.classList.add('bg-white/90', 'dark:bg-gray-900/90');
        } else {
            navbar.classList.remove('shadow-sm', 'bg-white/90', 'dark:bg-gray-900/90');
            navbar.classList.add('bg-white/70', 'dark:bg-gray-900/80');
        }
    });

    // --- 绑定深色模式切换逻辑 ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // 1. 初始化检查：看 LocalStorage 或 系统偏好
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    // 2. 点击事件
    themeToggleBtn.addEventListener('click', () => {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.theme = 'light'; // 记住选择
        } else {
            htmlElement.classList.add('dark');
            localStorage.theme = 'dark'; // 记住选择
        }
    });
}

// --- 渲染日记 ---
function renderDiary() {
    const container = document.getElementById('diary-container');
    if (!container) return; // 如果当前页面没有日记容器，直接退出

    container.innerHTML = '';
    diaryData.forEach(item => {
        const html = `
            <div class="diary-item relative pb-12 pl-8 border-l-2 border-gray-200 last:border-0 last:pb-0">
                 <div class="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-black border-4 border-white shadow-[0_0_0_2px_#e5e7eb]"></div>
                
                <div class="diary-card bg-white/90 backdrop-blur-md border border-gray-100 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h2 class="text-2xl font-bold text-gray-900">${item.title}</h2>
                        <span class="text-sm text-gray-500 font-medium mt-2 md:mt-0">${item.date}</span>
                    </div>
                    <p class="text-gray-600 leading-relaxed">
                        ${item.content}
                    </p>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

/* =========================================
   3. 初始化执行 (Initialization)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. 尝试渲染导航栏 (所有页面都会执行)
    renderNavbar();
    
    // 2. 尝试渲染日记 (只有 diary.html 会执行)
    renderDiary();
});