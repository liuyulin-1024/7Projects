// 页面导航功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.sidebar a, .breadcrumb span');
    const pages = document.querySelectorAll('.page-content');
    const pageCounter = document.querySelector('.page-counter');

    // 自动展开当前页面的所有父级菜单
    function expandActiveParents(element) {
        let parent = element.parentElement;
        while (parent) {
            if (parent.classList.contains('has-children')) {
                parent.classList.add('active');
            }
            parent = parent.parentElement;
        }
    }

    // 页面切换函数
    function switchPage(targetId) {
        // 移除所有active类
        pages.forEach(page => page.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        // 激活目标页面
        const targetPage = document.querySelector(targetId);
        if (targetPage) {
            targetPage.classList.add('active');
            
            // 激活对应的导航项
            const activeLink = document.querySelector(`a[href="${targetId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                // 自动展开父级菜单
                expandActiveParents(activeLink);
            }

            // 更新页面计数器
            const pageIndex = Array.from(pages).indexOf(targetPage) + 1;
            pageCounter.textContent = `(${pageIndex} of ${pages.length})`;

            // 滚动到顶部
            document.querySelector('.main-content').scrollTop = 0;
        }
    }

    // 导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                switchPage(targetId);
                
                // 更新URL hash
                window.location.hash = targetId;
            }
        });
    });

    // 键盘导航 (↑↓ 键)
    document.addEventListener('keydown', function(e) {
        const currentPage = document.querySelector('.page-content.active');
        const currentIndex = Array.from(pages).indexOf(currentPage);

        if (e.key === 'ArrowDown' && currentIndex < pages.length - 1) {
            // 下一页
            e.preventDefault();
            switchPage(`#page-${String(currentIndex + 2).padStart(2, '0')}`);
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            // 上一页
            e.preventDefault();
            switchPage(`#page-${String(currentIndex).padStart(2, '0')}`);
        }
    });

    // 文件夹展开/折叠（包括可点击的父节点）
    const navFolders = document.querySelectorAll('.nav-folder');
    const hasChildrenLinks = document.querySelectorAll('.has-children > a');
    
    // 文件夹点击
    navFolders.forEach(folder => {
        folder.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.classList.toggle('active');
        });
    });
    
    // 有子菜单的链接点击（既跳转又展开）
    hasChildrenLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const parent = this.parentElement;
            parent.classList.toggle('active');
        });
    });
    
    // 折叠所有按钮
    const collapseAllBtn = document.querySelector('.collapse-all-btn');
    if (collapseAllBtn) {
        collapseAllBtn.addEventListener('click', function() {
            const hasChildrenItems = document.querySelectorAll('.has-children');
            hasChildrenItems.forEach(item => {
                item.classList.remove('active');
            });
        });
    }

    // 侧边栏折叠按钮 (移动端)
    const collapseBtn = document.querySelector('.collapse-btn');
    const sidebar = document.querySelector('.sidebar');
    if (collapseBtn && sidebar) {
        collapseBtn.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }

    // 加载时检查URL hash
    if (window.location.hash) {
        switchPage(window.location.hash);
    } else {
        // 默认显示第一个页面
        pages[0].classList.add('active');
        const firstLink = document.querySelector('.sidebar a');
        if (firstLink) {
            firstLink.classList.add('active');
        }
    }

    // 注释标记提示
    const noteMarkers = document.querySelectorAll('.note-marker');
    noteMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            const noteNum = this.getAttribute('data-note');
            const noteSection = document.querySelector(`.note-section .note-num:contains('${noteNum}')`);
            if (noteSection) {
                noteSection.parentElement.style.background = '#fff7e6';
            }
        });

        marker.addEventListener('mouseleave', function() {
            const noteSections = document.querySelectorAll('.note-section');
            noteSections.forEach(section => {
                section.style.background = '#fff';
            });
        });
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

