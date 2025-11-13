// 移动端待办中心交互逻辑

document.addEventListener('DOMContentLoaded', function() {
    // 初始化
    initTypeTabs();
    initNavTabs();
    updateTime();
    
    // 每分钟更新一次时间
    setInterval(updateTime, 60000);
});

// 更新状态栏时间
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeElement = document.querySelector('.status-bar .time');
    if (timeElement) {
        timeElement.textContent = `${hours}:${minutes}`;
    }
}

// 初始化类型标签切换
function initTypeTabs() {
    const typeTabs = document.querySelectorAll('.type-tab');
    const listContents = document.querySelectorAll('.list-content');
    
    typeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            
            // 更新标签状态
            typeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 切换列表内容
            listContents.forEach(content => {
                if (content.getAttribute('data-type') === type) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });
}

// 初始化导航标签切换
function initNavTabs() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 这里可以添加切换不同页面的逻辑
            const tabText = this.textContent.trim();
            console.log('切换到：', tabText);
        });
    });
}

// 处理列表项点击
function handleItemClick(id, type) {
    window.location.href = `detail.html?id=${id}&type=${type}`;
}

// 阻止按钮事件冒泡
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('action-btn')) {
        e.stopPropagation();
    }
});

