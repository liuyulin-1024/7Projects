// 表单引擎管理系统 - 主应用脚本

(function() {
    'use strict';
    
    // 应用状态
    const state = {
        currentPage: 'revision-history',
        pages: {}
    };
    
    // 初始化应用
    function init() {
        setupNavigation();
        loadPage('revision-history');
    }
    
    // 设置导航
    function setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-item a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageName = this.getAttribute('data-page');
                
                // 更新导航状态
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // 加载页面
                loadPage(pageName);
            });
        });
    }
    
    // 加载页面
    function loadPage(pageName) {
        const pageContent = document.getElementById('page-content');
        const currentPageElem = document.getElementById('current-page');
        
        // 更新面包屑
        const pageNames = {
            'revision-history': '修订记录',
            'field-template': '字段模版库',
            'datasource': '数据源管理',
            'modeling': '建模管理',
            'form-management': '表单管理',
            'form-style': '表单样式管理',
            'function-library': '函数库',
            'component-library': '组件库'
        };
        
        currentPageElem.textContent = pageNames[pageName] || pageName;
        
        // 加载页面内容
        fetch(`pages/${getPageFileName(pageName)}`)
            .then(response => response.text())
            .then(html => {
                pageContent.innerHTML = html;
                state.currentPage = pageName;
                
                // 初始化页面特定功能
                initPageFeatures(pageName);
            })
            .catch(error => {
                console.error('加载页面失败:', error);
                pageContent.innerHTML = '<div class="empty-state"><div class="empty-state-icon">⚠️</div><p>页面加载失败</p></div>';
            });
    }
    
    // 获取页面文件名
    function getPageFileName(pageName) {
        const fileMap = {
            'revision-history': 'revision-record.html',
            'field-template': 'field-template.html',
            'datasource': 'datasource-manage.html',
            'modeling': 'model-manage.html',
            'form-management': 'form-manage.html',
            'form-style': 'form-style.html',
            'function-library': 'function-library.html',
            'component-library': 'component-library.html'
        };
        
        return fileMap[pageName] || `${pageName}.html`;
    }
    
    // 初始化页面特定功能
    function initPageFeatures(pageName) {
        switch(pageName) {
            case 'field-template':
                initFieldTemplate();
                break;
            case 'datasource':
                initDataSource();
                break;
            case 'modeling':
                initModeling();
                break;
            case 'form-management':
                initFormManagement();
                break;
            default:
                break;
        }
        
        // 通用功能初始化
        initCommonFeatures();
    }
    
    // 初始化通用功能
    function initCommonFeatures() {
        // 搜索按钮
        const searchBtns = document.querySelectorAll('.btn-search');
        searchBtns.forEach(btn => {
            btn.addEventListener('click', handleSearch);
        });
        
        // 重置按钮
        const resetBtns = document.querySelectorAll('.btn-reset');
        resetBtns.forEach(btn => {
            btn.addEventListener('click', handleReset);
        });
        
        // 新增按钮
        const addBtns = document.querySelectorAll('.btn-add');
        addBtns.forEach(btn => {
            btn.addEventListener('click', handleAdd);
        });
        
        // 删除按钮
        const deleteBtns = document.querySelectorAll('.btn-delete');
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', handleDelete);
        });
        
        // 批量删除按钮
        const batchDeleteBtns = document.querySelectorAll('.btn-batch-delete');
        batchDeleteBtns.forEach(btn => {
            btn.addEventListener('click', handleBatchDelete);
        });
        
        // 编辑按钮
        const editBtns = document.querySelectorAll('.btn-edit');
        editBtns.forEach(btn => {
            btn.addEventListener('click', handleEdit);
        });
        
        // 复选框
        const checkboxes = document.querySelectorAll('.data-table tbody input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', updateBatchButtons);
        });
        
        // 全选复选框
        const selectAll = document.querySelector('.data-table thead input[type="checkbox"]');
        if (selectAll) {
            selectAll.addEventListener('change', function() {
                const checkboxes = document.querySelectorAll('.data-table tbody input[type="checkbox"]:not(:disabled)');
                checkboxes.forEach(cb => {
                    cb.checked = this.checked;
                });
                updateBatchButtons();
            });
        }
    }
    
    // 字段模版库初始化
    function initFieldTemplate() {
        // 同步按钮
        const syncBtn = document.querySelector('.btn-sync');
        if (syncBtn) {
            syncBtn.addEventListener('click', function() {
                alert('正在从主数据服务同步数据...');
            });
        }
    }
    
    // 数据源管理初始化
    function initDataSource() {
        // 数据源类型筛选
        const typeSelect = document.querySelector('select[name="dbType"]');
        if (typeSelect) {
            typeSelect.addEventListener('change', function() {
                console.log('数据库类型筛选:', this.value);
            });
        }
    }
    
    // 建模管理初始化
    function initModeling() {
        // 导出按钮
        const exportBtns = document.querySelectorAll('.btn-export');
        exportBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const modelName = this.getAttribute('data-model');
                alert(`正在导出模型: ${modelName}`);
            });
        });
        
        // 设置字段属性按钮
        const setPropBtns = document.querySelectorAll('.btn-set-props');
        setPropBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const modelName = this.getAttribute('data-model');
                showModal('设置字段属性', createFieldPropsForm(modelName), '800px');
            });
        });
        
        // 查看表单按钮
        const viewFormBtns = document.querySelectorAll('.btn-view-forms');
        viewFormBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const modelName = this.getAttribute('data-model');
                showModal('显示表单', createViewFormsContent(modelName), '900px');
            });
        });
        
        // 本地导入按钮
        const importLocalBtns = document.querySelectorAll('.btn-import-local');
        importLocalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                showModal('选择模型', createSelectModelContent(), '800px');
            });
        });
    }
    
    // 表单管理初始化
    function initFormManagement() {
        // 版本操作按钮
        const publishBtns = document.querySelectorAll('.btn-publish');
        publishBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const formId = this.getAttribute('data-form');
                const version = this.getAttribute('data-version');
                if (confirm(`确定发布表单 ${formId} 的版本 ${version} 吗？`)) {
                    alert('发布成功！');
                }
            });
        });
    }
    
    // 搜索处理
    function handleSearch(e) {
        e.preventDefault();
        const form = e.target.closest('form') || e.target.closest('.search-form');
        const formData = new FormData(form);
        
        console.log('搜索条件:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        alert('搜索功能演示 - 实际应用中会调用API获取数据');
    }
    
    // 重置处理
    function handleReset(e) {
        e.preventDefault();
        const form = e.target.closest('form') || e.target.closest('.search-form');
        if (form) {
            form.reset();
        }
    }
    
    // 新增处理
    function handleAdd(e) {
        e.preventDefault();
        const type = this.getAttribute('data-type') || '记录';
        
        if (type === '数据源') {
            showModal('新增数据源', createDatasourceForm(false));
        } else if (type === '模型') {
            showModal('新增模型', createModelForm(false));
        } else {
            showModal(`新增${type}`, createAddForm(type));
        }
    }
    
    // 编辑处理
    function handleEdit(e) {
        e.preventDefault();
        const id = this.getAttribute('data-id');
        const name = this.getAttribute('data-name');
        const page = state.currentPage;
        
        if (page === 'datasource') {
            // 模拟数据
            const data = {
                datasourceName: name,
                datasourceType: '数据库',
                dbName: 'test_db',
                dbType: 'mysql'
            };
            showModal('编辑数据源', createDatasourceForm(true, data));
        } else if (page === 'modeling') {
            const data = {
                modelName: name,
                tableName: `formtable_main_${id}`
            };
            showModal('编辑模型', createModelForm(true, data));
        }
    }
    
    // 删除处理
    function handleDelete(e) {
        e.preventDefault();
        const id = this.getAttribute('data-id');
        const name = this.getAttribute('data-name');
        
        if (confirm(`确定删除 ${name || id} 吗？`)) {
            alert('删除成功！');
        }
    }
    
    // 批量删除处理
    function handleBatchDelete(e) {
        e.preventDefault();
        const selected = document.querySelectorAll('.data-table tbody input[type="checkbox"]:checked');
        
        if (selected.length === 0) {
            alert('请选择要删除的项');
            return;
        }
        
        if (confirm(`确定删除选中的 ${selected.length} 项吗？`)) {
            alert('批量删除成功！');
            selected.forEach(cb => cb.checked = false);
            updateBatchButtons();
        }
    }
    
    // 更新批量操作按钮状态
    function updateBatchButtons() {
        const selected = document.querySelectorAll('.data-table tbody input[type="checkbox"]:checked');
        const batchBtns = document.querySelectorAll('.btn-batch-delete');
        
        batchBtns.forEach(btn => {
            btn.disabled = selected.length === 0;
        });
    }
    
    // 显示模态框
    function showModal(title, content, width = '600px') {
        const modalHtml = `
            <div class="modal-overlay" id="modal">
                <div class="modal" style="width: ${width}; max-width: 90vw;">
                    <div class="modal-header">
                        <div class="modal-title">${title}</div>
                        <span class="modal-close" onclick="closeModal()">×</span>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    <div class="modal-footer">
                        <button class="btn" onclick="closeModal()">取消</button>
                        <button class="btn btn-primary" onclick="handleModalSubmit()">保存</button>
                    </div>
                </div>
            </div>
        `;

        const container = document.getElementById('modal-container');
        container.innerHTML = modalHtml;

        // 如果是数据源表单，添加类型切换监听
        const typeSelect = document.getElementById('datasource-type-select');
        if (typeSelect) {
            typeSelect.addEventListener('change', function() {
                const form = document.getElementById('datasource-form');
                if (form) {
                    const newContent = createDatasourceForm(false, { datasourceType: this.value });
                    const modalBody = document.querySelector('.modal-body');
                    modalBody.innerHTML = newContent;
                }
            });
        }
        
        // 如果是模型表单，添加标签页切换监听
        const tabBtns = container.querySelectorAll('.tab-btn');
        if (tabBtns.length > 0) {
            tabBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const tabName = this.getAttribute('data-tab');
                    tabBtns.forEach(b => b.classList.remove('active'));
                    tabBtns.forEach(b => b.style.borderBottom = 'none');
                    const tabContents = container.querySelectorAll('.tab-content');
                    tabContents.forEach(c => c.style.display = 'none');
                    this.classList.add('active');
                    this.style.borderBottom = '2px solid #1890ff';
                    const targetTab = container.querySelector('#tab-' + tabName);
                    if (targetTab) {
                        targetTab.style.display = 'block';
                    }
                });
            });
        }
    }
    
    // 关闭模态框
    window.closeModal = function() {
        const container = document.getElementById('modal-container');
        container.innerHTML = '';
    };
    
    // 模态框提交
    window.handleModalSubmit = function() {
        alert('保存成功！');
        window.closeModal();
    };
    
    // 创建新增表单
    function createAddForm(type) {
        return `
            <form class="modal-form">
                <div class="form-item" style="margin-bottom: 16px;">
                    <label style="display: inline-block; width: 120px;">名称：</label>
                    <input type="text" name="name" placeholder="请输入名称" style="flex: 1; width: calc(100% - 130px);" />
                </div>
                <div class="form-item" style="margin-bottom: 16px;">
                    <label style="display: inline-block; width: 120px;">描述：</label>
                    <textarea name="description" placeholder="请输入描述" rows="4" style="flex: 1; width: calc(100% - 130px); padding: 4px 11px; border: 1px solid #d9d9d9; border-radius: 2px;"></textarea>
                </div>
            </form>
        `;
    }
    
    // 创建字段属性表单（使用modals.js中的函数）
    function createFieldPropsForm(modelName) {
        if (typeof window.createFieldPropsForm === 'function') {
            return window.createFieldPropsForm(modelName);
        }
        return `
            <div>
                <p style="margin-bottom: 16px;">模型：${modelName}</p>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>字段名称</th>
                            <th>显示</th>
                            <th>可编辑</th>
                            <th>必填</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>字段1</td>
                            <td><input type="checkbox" checked /></td>
                            <td><input type="checkbox" checked /></td>
                            <td><input type="checkbox" /></td>
                        </tr>
                        <tr>
                            <td>字段2</td>
                            <td><input type="checkbox" checked /></td>
                            <td><input type="checkbox" /></td>
                            <td><input type="checkbox" checked /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // 创建数据源表单（使用modals.js中的函数）
    function createDatasourceForm(isEdit, data) {
        if (typeof window.createDatasourceForm === 'function') {
            return window.createDatasourceForm(isEdit, data);
        }
        return createAddForm('数据源');
    }
    
    // 创建模型表单（使用modals.js中的函数）
    function createModelForm(isEdit, data) {
        if (typeof window.createModelForm === 'function') {
            return window.createModelForm(isEdit, data);
        }
        return createAddForm('模型');
    }
    
    // 创建查看表单内容
    function createViewFormsContent(modelName) {
        return `
            <div>
                <p style="margin-bottom: 16px;">表单名称：${modelName}</p>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>表单名称</th>
                            <th>版本号</th>
                            <th>状态</th>
                            <th>最后更新时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>创建显示模版</td>
                            <td>1.0</td>
                            <td><span class="badge badge-success">已发布</span></td>
                            <td>2025-10-21 10:13</td>
                        </tr>
                        <tr>
                            <td>归档显示模版</td>
                            <td>2.0</td>
                            <td><span class="badge badge-warning">待发布</span></td>
                            <td>2025-10-20 10:13</td>
                        </tr>
                        <tr>
                            <td>归档显示模版</td>
                            <td>1.0</td>
                            <td><span class="badge badge-success">已发布</span></td>
                            <td>2025-10-10 10:13</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // 创建选择模型内容（本地导入）
    function createSelectModelContent() {
        return `
            <div>
                <div class="search-form" style="margin-bottom: 16px;">
                    <div class="form-item">
                        <label>模型名称：</label>
                        <input type="text" name="modelName" placeholder="请输入模型名称" />
                    </div>
                    <div class="form-item">
                        <label>应用名称：</label>
                        <input type="text" name="appName" placeholder="请选择应用" />
                    </div>
                    <div class="form-item">
                        <button type="button" class="btn btn-primary btn-search">搜索</button>
                        <button type="button" class="btn btn-reset">重置</button>
                    </div>
                </div>
                <table class="data-table">
                    <thead>
                        <tr>
                            <th style="width: 50px;">
                                <input type="radio" name="selectedModel" />
                            </th>
                            <th>模型名称</th>
                            <th>应用名称</th>
                            <th>数据源</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="radio" name="selectedModel" value="1" /></td>
                            <td>问题反馈表</td>
                            <td>统一门户</td>
                            <td>xinOA</td>
                        </tr>
                        <tr>
                            <td><input type="radio" name="selectedModel" value="2" /></td>
                            <td>项目立项申请表</td>
                            <td>OA系统</td>
                            <td>hrdata</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();

