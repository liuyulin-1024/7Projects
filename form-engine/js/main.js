// 主要JavaScript逻辑

// 页面内容映射
const pageMap = {
    'revision-record': 'pages/revision-record.html',
    'field-template': 'pages/field-template.html',
    'datasource-manage': 'pages/datasource-manage.html',
    'datasource-edit': 'pages/datasource-edit.html',
    'model-manage': 'pages/model-manage.html',
    'model-edit': 'pages/model-edit.html',
    'form-manage': 'pages/form-manage.html',
    'form-editor': 'pages/form-editor.html',
    'form-editor-component-adjust': 'pages/form-editor-component-adjust.html',
    'form-editor-formula': 'pages/form-editor-formula.html',
    'form-editor-linkage': 'pages/form-editor-linkage.html',
    'form-editor-hidden': 'pages/form-editor-hidden.html',
    'form-editor-required': 'pages/form-editor-required.html',
    'form-style': 'pages/form-style.html',
    'function-library': 'pages/function-library.html',
    'component-library': 'pages/component-library.html',
    'component-edit': 'pages/component-edit.html'
};

// 当前页面
let currentPage = 'revision-record';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航
    initNavigation();
    
    // 加载默认页面
    loadPage('revision-record');
    
    // 绑定事件
    bindEvents();
});

// 初始化导航
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-item a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const page = this.getAttribute('data-page');
            if (page && pageMap[page]) {
                // 移除所有活动状态
                navLinks.forEach(l => l.classList.remove('active'));
                // 添加当前活动状态
                this.classList.add('active');
                // 加载页面
                loadPage(page);
            }
        });
    });
}

// 加载页面
function loadPage(pageName) {
    const contentArea = document.getElementById('contentArea');
    const pageUrl = pageMap[pageName];
    
    if (!pageUrl) {
        contentArea.innerHTML = '<div class="page-loading"><p>页面不存在</p></div>';
        return;
    }
    
    // 显示加载状态
    contentArea.innerHTML = '<div class="page-loading"><p>加载中...</p></div>';
    
    // 使用fetch加载页面内容
    fetch(pageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('页面加载失败');
            }
            return response.text();
        })
        .then(html => {
            contentArea.innerHTML = html;
            currentPage = pageName;
            // 绑定页面内的事件
            bindPageEvents();
        })
        .catch(error => {
            contentArea.innerHTML = `<div class="page-loading"><p>页面加载失败: ${error.message}</p></div>`;
        });
}

// 绑定页面事件
function bindPageEvents() {
    // 绑定所有带data-action的按钮
    const actionButtons = document.querySelectorAll('[data-action]');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('data-action');
            handleAction(action);
        });
    });
    
    // 绑定表格全选
    const selectAllCheckboxes = document.querySelectorAll('.select-all');
    selectAllCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const table = this.closest('table');
            const checkboxes = table.querySelectorAll('tbody input[type="checkbox"]');
            checkboxes.forEach(cb => {
                cb.checked = this.checked;
            });
            updateBatchButtons();
        });
    });
    
    // 绑定表格行复选框
    const rowCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    rowCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateBatchButtons);
    });
    
    // 绑定标签页切换
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
    
    // 绑定模态框关闭
    const modalCloses = document.querySelectorAll('.modal-close, [data-dismiss="modal"]');
    modalCloses.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
}

// 处理操作
function handleAction(action) {
    switch(action) {
        case 'add-datasource':
            showModal('addDatasourceModal');
            alert('打开新增数据源弹窗');
            break;
        case 'add-form':
            showModal('addFormModal');
            alert('打开新增表单弹窗');
            break;
        case 'edit-form':
            loadPage('form-editor');
            break;
        case 'add-function':
            showModal('functionModal');
            break;
        case 'view-function':
            showModal('functionModal');
            break;
        case 'add-component':
            alert('打开新增组件页面');
            break;
        default:
            console.log('未处理的操作:', action);
    }
}

// 更新批量操作按钮状态
function updateBatchButtons() {
    const checkedBoxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
    const batchButtons = document.querySelectorAll('[data-action*="batch"]');
    
    batchButtons.forEach(button => {
        button.disabled = checkedBoxes.length === 0;
    });
}

// 显示模态框
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

// 关闭模态框
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// 切换标签页
function switchTab(tabName) {
    // 移除所有活动状态
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // 添加新的活动状态
    const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(tabName);
    
    if (activeButton) activeButton.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
}

// 绑定全局事件
function bindEvents() {
    // 点击模态框背景关闭
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// 工具函数：显示提示信息
function showToast(message, type = 'info') {
    // 简单的提示实现
    alert(message);
}

// 工具函数：确认对话框
function confirmAction(message) {
    return confirm(message);
}

