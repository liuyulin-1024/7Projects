// PC端待办中心通用JavaScript

// 全局函数

// 跳转到详情页
// 注释：点击【处理】或【工单号】跳转到表单详情
function goToDetail(orderId, type) {
    window.location.href = `detail.html?id=${orderId}&type=${type}`;
}

// 创建新任务
function createNewTask() {
    alert('打开新建任务页面');
    // 实际应用中这里应该打开任务创建弹窗或跳转到创建页面
}

// 创建OA工作流程
// 注释：快捷新建OA入口（目前暂时只支持OA）
function createOAWorkflow() {
    alert('打开OA工作流程创建页面');
    // 实际应用中这里应该跳转到OA创建页面
}

// 发送留言
function sendMessage() {
    const input = document.querySelector('.message-input');
    const message = input.value.trim();
    
    if (!message) {
        alert('请输入留言内容');
        return;
    }
    
    alert(`留言已发送：${message}`);
    input.value = '';
    // 实际应用中这里应该调用API发送留言
}

// 切换标签
function switchTab(type) {
    console.log('切换到：', type);
}

// 全选/取消全选
function toggleSelectAll(checkbox) {
    const checkboxes = document.querySelectorAll('.row-checkbox');
    checkboxes.forEach(cb => {
        cb.checked = checkbox.checked;
    });
}

// 批量处理
// 注释：批量处理功能仅支持批量处理OA工作流程
function batchProcess() {
    const selected = document.querySelectorAll('.row-checkbox:checked');
    if (selected.length === 0) {
        alert('请先选择要处理的工单');
        return;
    }
    
    alert(`已选择 ${selected.length} 个工单进行批量处理（仅支持OA工作流程）`);
    // 实际应用中这里应该调用API进行批量处理
}

// 显示筛选
function showFilter(field) {
    alert(`打开 ${field} 字段的筛选面板`);
    // 实际应用中这里应该显示筛选弹窗
}

// 显示搜索
// 注释：发起人通过搜索快速检索
function showSearch(field) {
    alert(`打开 ${field} 字段的搜索框`);
    // 实际应用中这里应该显示搜索框
}

// 排序表格
function sortTable(field) {
    console.log('排序字段：', field);
    // 实际应用中这里应该实现排序逻辑
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('PC端待办中心已加载');
    
    // 初始化侧边栏菜单点击事件
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            console.log('点击菜单：', this.querySelector('.menu-text').textContent);
        });
    });
});

