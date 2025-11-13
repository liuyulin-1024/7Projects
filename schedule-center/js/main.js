// 主JavaScript文件
document.addEventListener('DOMContentLoaded', function() {
    // 初始化日历
    const calendar = new Calendar('calendar');
    
    // 标签切换功能
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有活动状态
            tabs.forEach(t => t.classList.remove('active'));
            // 添加当前活动状态
            this.classList.add('active');
            
            // 这里可以根据不同标签加载不同数据
            const tabName = this.textContent;
            console.log('切换到标签：', tabName);
        });
    });
    
    // 待办事项点击
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('点击待办事项');
            // 这里可以跳转到详情页或显示详情
        });
    });
    
    // 模态框关闭
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            const modal = document.getElementById('createScheduleModal');
            if (modal) {
                modal.classList.remove('show');
            }
        });
    }
    
    // 点击模态框外部关闭
    const modal = document.getElementById('createScheduleModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    }
    
    // 添加右键菜单样式
    const style = document.createElement('style');
    style.textContent = `
        .context-menu {
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            padding: 8px 0;
            z-index: 1000;
            min-width: 150px;
        }
        
        .context-menu-item {
            padding: 12px 20px;
            cursor: pointer;
            transition: background 0.2s;
        }
        
        .context-menu-item:hover {
            background: #f5f5f5;
        }
        
        .context-menu-item span {
            font-size: 14px;
            color: #333;
        }
    `;
    document.head.appendChild(style);
});

// 平滑滚动
function smoothScroll(element, target, duration) {
    const start = element.scrollTop;
    const change = target - start;
    const startTime = performance.now();
    
    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        element.scrollTop = start + change * easeInOutQuad(progress);
        
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }
    
    requestAnimationFrame(animateScroll);
}

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// 工具函数：格式化日期
function formatDate(date, format = 'YYYY-MM-DD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

