// 详情页JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    const type = urlParams.get('type');
    
    console.log('工单ID：', orderId, '类型：', type);
    
    // 根据类型显示不同内容
    initPageByType(type);
    
    // 初始化工单列表项点击事件
    initOrderListClick();
});

// 根据类型初始化页面
function initPageByType(type) {
    const approvalSection = document.getElementById('approvalSection');
    
    if (type !== 'todo') {
        // 非待办状态：隐藏审批操作，显示只读内容
        if (approvalSection) {
            approvalSection.style.display = 'none';
        }
    }
}

// 初始化工单列表项点击
function initOrderListClick() {
    const orderItems = document.querySelectorAll('.order-item');
    orderItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有active状态
            orderItems.forEach(i => i.classList.remove('active'));
            // 添加active到当前项
            this.classList.add('active');
            
            // 加载对应工单的详情
            const orderId = this.getAttribute('data-id');
            loadOrderDetail(orderId);
        });
    });
}

// 加载工单详情
// 注释：从列表中哪个工单点击进去，在表单详情页则定位到哪个工单
function loadOrderDetail(orderId) {
    console.log('加载工单详情：', orderId);
    // 实际应用中这里应该调用API加载工单详情
}

// 标记为稍后办
/**
 * 注释：稍后办功能
 * - 对于当下无法做出审批决定的，可以点击【稍后办】
 * - 该工单的紧急程度自动标记为"稍后办"，且该工单自动置顶作为最高优先级
 * - 若有多个稍后办，则按标记稍后办的时间降序排序
 * - 若该工单本身就是紧急状态，两个状态均需展示
 */
function markAsLater() {
    if (confirm('确认标记为稍后办？\n\n该工单将自动置顶，作为最高优先级处理。')) {
        alert('已标记为稍后办');
        // 实际应用中这里应该调用API标记稍后办
        // 然后刷新页面或更新UI
    }
}

// 处理审批
/**
 * 注释：审批完成后的自动跳转
 * - 该工单完成审批后（同意或拒绝），自动跳转到下一条工单
 * - 上一条工单消失、自动归入已办列表
 */
function handleApproval(action) {
    const opinion = document.querySelector('.approval-textarea').value;
    const actionText = action === 'approve' ? '同意' : '拒绝';
    
    if (confirm(`确认${actionText}此审批？`)) {
        console.log('审批操作：', action);
        console.log('审批意见：', opinion);
        
        alert(`${actionText}成功！\n\n即将跳转到下一条工单...`);
        
        // 实际应用中这里应该：
        // 1. 调用API提交审批
        // 2. 获取下一条工单ID
        // 3. 自动跳转到下一条工单
        // 4. 如果没有下一条，则返回列表
        
        setTimeout(() => {
            // 模拟跳转到下一条工单
            alert('没有更多待办工单了，返回列表');
            window.location.href = 'list-todo.html';
        }, 1500);
    }
}

