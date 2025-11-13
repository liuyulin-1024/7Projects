// 详情页交互逻辑

document.addEventListener('DOMContentLoaded', function() {
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type') || 'todo';
    
    // 根据类型显示不同的内容
    initPageByType(type);
    
    // 初始化事件监听
    initEventListeners();
    
    // 更新时间
    updateTime();
    setInterval(updateTime, 60000);
});

// 根据类型初始化页面
function initPageByType(type) {
    const actionBar = document.getElementById('actionBar');
    const approvalSection = document.getElementById('approvalSection');
    const approvalViewSection = document.getElementById('approvalViewSection');
    
    if (type === 'todo') {
        // 待办状态：显示稍后办和审批操作
        if (actionBar) actionBar.classList.remove('hidden');
        if (approvalSection) approvalSection.classList.remove('hidden');
        if (approvalViewSection) approvalViewSection.classList.add('hidden');
    } else {
        // 已办/已发/办结状态：隐藏操作按钮，显示只读审批意见
        if (actionBar) actionBar.classList.add('hidden');
        if (approvalSection) approvalSection.classList.add('hidden');
        if (approvalViewSection) approvalViewSection.classList.remove('hidden');
    }
}

// 初始化事件监听
function initEventListeners() {
    // 稍后办按钮
    const laterBtn = document.querySelector('.later-btn');
    if (laterBtn) {
        laterBtn.addEventListener('click', function() {
            alert('已添加到稍后办理');
        });
    }
    
    // 同意按钮
    const agreeBtn = document.querySelector('.agree-btn');
    if (agreeBtn) {
        agreeBtn.addEventListener('click', function() {
            handleApproval('agree');
        });
    }
    
    // 拒绝按钮
    const rejectBtn = document.querySelector('.reject-btn');
    if (rejectBtn) {
        rejectBtn.addEventListener('click', function() {
            handleApproval('reject');
        });
    }
    
    // 下一条按钮
    const nextBtn = document.querySelector('.next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            alert('加载下一条');
            // 这里可以实现跳转到下一条的逻辑
        });
    }
    
    // 附件点击
    const attachments = document.querySelectorAll('.attachment-item');
    attachments.forEach(item => {
        item.addEventListener('click', function() {
            const fileName = this.querySelector('.file-name').textContent;
            alert('打开附件：' + fileName);
        });
    });
}

// 处理审批
function handleApproval(action) {
    const opinion = document.querySelector('.approval-input').value;
    const actionText = action === 'agree' ? '同意' : '拒绝';
    
    if (confirm(`确认${actionText}此审批？`)) {
        // 这里应该调用API提交审批
        console.log('审批操作：', action);
        console.log('审批意见：', opinion);
        
        alert(`${actionText}成功`);
        
        // 返回列表页
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

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

