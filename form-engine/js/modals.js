// 模态框内容生成器

// 创建新增/编辑数据源表单
function createDatasourceForm(isEdit = false, data = {}) {
    const formType = data.datasourceType || '数据库';
    const useConnectionUrl = data.useConnectionUrl === true;
    
    let html = `
        <form class="modal-form" id="datasource-form">
            <div class="form-item" style="margin-bottom: 16px;">
                <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 数据源类型：</label>
                <select name="datasourceType" id="datasource-type-select" style="width: 300px;">
                    <option value="数据库" ${formType === '数据库' ? 'selected' : ''}>数据库</option>
                    <option value="集成平台" ${formType === '集成平台' ? 'selected' : ''}>集成平台</option>
                </select>
            </div>
    `;
    
    if (formType === '数据库') {
        html += `
            <div class="form-item" style="margin-bottom: 16px;">
                <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 数据源名称：</label>
                <input type="text" name="datasourceName" value="${data.datasourceName || ''}" placeholder="请输入 0/30" maxlength="30" style="width: 300px;" />
            </div>
            <div class="form-item" style="margin-bottom: 16px;">
                <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 应用名称：<span class="note-number">7</span></label>
                <select name="appName" style="width: 300px;">
                    <option value="">请选择</option>
                    <option value="OA" ${data.appName === 'OA' ? 'selected' : ''}>OA</option>
                    <option value="PC门户" ${data.appName === 'PC门户' ? 'selected' : ''}>PC门户</option>
                    <option value="脚手架" ${data.appName === '脚手架' ? 'selected' : ''}>脚手架</option>
                </select>
            </div>
            <div class="form-item" style="margin-bottom: 16px;">
                <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 数据库名称：<span class="note-number">1</span></label>
                <input type="text" name="dbName" value="${data.dbName || ''}" placeholder="请输入 0/30" maxlength="30" style="width: 300px;" />
            </div>
            <div class="form-item" style="margin-bottom: 16px;">
                <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 数据库类型：</label>
                <select name="dbType" id="db-type-select" style="width: 300px;">
                    <option value="mysql" ${data.dbType === 'mysql' ? 'selected' : ''}>MySQL</option>
                    <option value="oracle" ${data.dbType === 'oracle' ? 'selected' : ''}>Oracle</option>
                    <option value="postgresql" ${data.dbType === 'postgresql' ? 'selected' : ''}>PostgreSQL</option>
                    <option value="sqlserver" ${data.dbType === 'sqlserver' ? 'selected' : ''}>SQL Server</option>
                </select>
            </div>
            <div class="form-item" style="margin-bottom: 16px;">
                <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 版本：</label>
                <select name="dbVersion" id="db-version-select" style="width: 300px;">
                    <option value="">请选择</option>
                    <option value="MySQL:8.x" ${data.dbVersion === 'MySQL:8.x' ? 'selected' : ''}>MySQL:8.x</option>
                    <option value="MySQL:5.7.x" ${data.dbVersion === 'MySQL:5.7.x' ? 'selected' : ''}>MySQL:5.7.x</option>
                </select>
            </div>
            <div class="form-item" style="margin-bottom: 16px;">
                <label style="display: inline-block; width: 120px;">连接url：<span class="note-number">3</span></label>
                <span style="margin-right: 8px;" title="连接URL说明">?</span>
                <label><input type="radio" name="useConnectionUrl" value="yes" ${useConnectionUrl ? 'checked' : ''} /> 是</label>
                <label style="margin-left: 16px;"><input type="radio" name="useConnectionUrl" value="no" ${!useConnectionUrl ? 'checked' : ''} /> 否</label>
            </div>
        `;
        
        if (useConnectionUrl) {
            html += `
                <div class="form-item" style="margin-bottom: 16px;">
                    <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 连接字符串：</label>
                    <input type="text" name="connectionString" value="${data.connectionString || ''}" placeholder="请输入" style="width: 400px;" />
                </div>
                <div class="form-item" style="margin-bottom: 16px;">
                    <label style="display: inline-block; width: 120px;">用户名：</label>
                    <input type="text" name="username" value="${data.username || ''}" placeholder="请输入" style="width: 300px;" />
                </div>
                <div class="form-item" style="margin-bottom: 16px;">
                    <label style="display: inline-block; width: 120px;">密钥：</label>
                    <input type="password" name="password" value="${data.password || ''}" placeholder="请输入" style="width: 300px;" />
                </div>
            `;
        } else {
            html += `
                <div class="form-item" style="margin-bottom: 16px;">
                    <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 服务器IP：</label>
                    <input type="text" name="serverIp" value="${data.serverIp || ''}" placeholder="请输入" style="width: 300px;" />
                </div>
                <div class="form-item" style="margin-bottom: 16px;">
                    <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 端口号：</label>
                    <input type="text" name="port" value="${data.port || ''}" placeholder="请输入" style="width: 300px;" />
                </div>
                <div class="form-item" style="margin-bottom: 16px;">
                    <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 用户名：</label>
                    <input type="text" name="username" value="${data.username || ''}" placeholder="请输入" style="width: 300px;" />
                </div>
                <div class="form-item" style="margin-bottom: 16px;">
                    <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 密钥：</label>
                    <input type="password" name="password" value="${data.password || ''}" placeholder="请输入" style="width: 300px;" />
                </div>
            `;
        }
        
        html += `
            <div class="form-item" style="margin-bottom: 16px;">
                <label style="display: inline-block; width: 120px;">连接池：<span class="note-number">4</span></label>
                <span style="margin-right: 8px;" title="连接池说明">?</span>
                <label><input type="radio" name="useConnectionPool" value="yes" ${data.useConnectionPool === true ? 'checked' : ''} /> 是</label>
                <label style="margin-left: 16px;"><input type="radio" name="useConnectionPool" value="no" ${data.useConnectionPool !== true ? 'checked' : ''} /> 否</label>
            </div>
            <div class="form-item" style="margin-bottom: 16px;">
                <label style="display: inline-block; width: 120px;">连接最大连接时间：</label>
                <input type="number" name="maxConnectionTime" value="${data.maxConnectionTime || '5000'}" style="width: 200px;" />
                <span style="margin-left: 8px;">ms</span>
            </div>
            <div class="form-item" style="margin-bottom: 16px;">
                <label style="display: inline-block; width: 120px;">连接池最大连接时间：</label>
                <input type="number" name="maxPoolConnectionTime" value="${data.maxPoolConnectionTime || '12000'}" style="width: 200px;" />
                <span style="margin-left: 8px;">ms</span>
            </div>
            <div class="form-item" style="margin-bottom: 16px;">
                <button type="button" class="btn btn-primary" style="margin-right: 8px;">连接测试<span class="note-number">9</span></button>
                <button type="button" class="btn">取消<span class="note-number">8</span></button>
            </div>
            <div class="form-item" style="margin-top: 16px; padding: 12px; background: #fafafa; border-radius: 4px;">
                <strong>注解说明：</strong>
                <ul style="margin-left: 20px; margin-top: 8px; font-size: 12px;">
                    <li><strong>1. 数据库名称：</strong>数据库字段名称：1、必填，支持录入英文、数字，开头必须为英文，最大字符为30；2、录入超过30则限制录入，下方提示：支持最大字符30；3、失焦判断：必须满足条件：字段名不能用中文,而且必须以英文字母开头，若未满足则提示：字段名不能用中文,而且必须以英文字母开头</li>
                    <li><strong>2. 保存：</strong>点击"保存"需判断：1、必填字段是否已填，若未填则在字段下方提示：（1）若为输入框则提示：请录入{字段名}（2）若为选择框则提示：请选择{字段名}；2、保存成功关闭弹框并提示：保存成功，刷新列表页</li>
                    <li><strong>3. ?：</strong>SqlServer: jdbc:sqlserver://地址:端口;DatabaseName=数据库名<br>Oracle: jdbc:oracle:thin:@地址:端口:数据库SID<br>Oracle12c: jdbc:oracle:thin:@地址:端口/数据库名<br>MySQL: jdbc:mysql://地址:端口/数据库名?useUnicode=true&characterEncoding=utf8<br>DB2: jdbc:db2://地址:端口/数据库名<br>Sybase: jdbc:sybase:Tds:地址:端口/数据库名?charset=cp936<br>Informix: jdbc:informix-sqli://地址:端口/数据库名:INFORMIXSERVER=myserver<br>Hana: jdbc:sap://地址:端口?reconnect=true<br>Postgresql: jdbc:postgresql://地址:端口号/DatabaseName</li>
                    <li><strong>4. ?：</strong>配置连接数据库时，是否使用连接池方案。是：使用数据库连接池方案；否：使用数据库直接连接方案</li>
                    <li><strong>6. 数据源类型：</strong>数据源类型的枚举值为：数据库、集成平台（新增表单时的数据源类型还需显示内部服务）</li>
                    <li><strong>7. 应用名称：</strong>取值：统一后台管理拉取应用名称</li>
                    <li><strong>8. 取消：</strong>点击"取消"关闭弹框</li>
                    <li><strong>9. 连接测试：</strong>点击"保存"需判断：1、必填字段是否已填，若未填则在字段下方提示：（1）若为输入框则提示：请录入{字段名}（2）若为选择框则提示：请选择{字段名}；2、保存成功关闭弹框并提示：保存成功，刷新列表页</li>
                    <li><strong>10. ?：</strong>点击提示：数据源名称不可重复</li>
                </ul>
            </div>
        `;
    } else {
        html += `
            <div class="form-item" style="margin-bottom: 16px;">
                <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 数据源名称：</label>
                <input type="text" name="datasourceName" value="${data.datasourceName || ''}" placeholder="请输入 0/30" maxlength="30" style="width: 300px;" />
            </div>
            <div class="form-item" style="margin-bottom: 16px;">
                <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 应用名称：<span class="note-number">7</span></label>
                <select name="appName" style="width: 300px;">
                    <option value="">请选择</option>
                    <option value="OA" ${data.appName === 'OA' ? 'selected' : ''}>OA</option>
                    <option value="PC门户" ${data.appName === 'PC门户' ? 'selected' : ''}>PC门户</option>
                    <option value="脚手架" ${data.appName === '脚手架' ? 'selected' : ''}>脚手架</option>
                </select>
            </div>
            <div class="form-item" style="margin-bottom: 16px;">
                <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> APPKey：</label>
                <input type="text" name="appKey" value="${data.appKey || ''}" placeholder="请输入" style="width: 300px;" />
            </div>
            <div class="form-item" style="margin-bottom: 16px;">
                <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> APPSecert：</label>
                <input type="text" name="appSecret" value="${data.appSecret || ''}" placeholder="请输入" style="width: 300px;" />
            </div>
            <div class="form-item" style="margin-bottom: 16px;">
                <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 应用描述：</label>
                <input type="text" name="appDescription" value="${data.appDescription || ''}" placeholder="请输入集成平台的应用名称 0/30" maxlength="30" style="width: 300px;" />
            </div>
            <div class="form-item" style="margin-top: 16px; padding: 12px; background: #fafafa; border-radius: 4px;">
                <strong>注解说明：</strong>
                <ul style="margin-left: 20px; margin-top: 8px; font-size: 12px;">
                    <li><strong>5. 保存：</strong>点击"保存"需判断：1、必填字段是否已填，若未填则在字段下方提示：（1）若为输入框则提示：请录入{字段名}（2）若为选择框则提示：请选择{字段名}；2、保存成功关闭弹框并提示：保存成功，刷新列表页</li>
                    <li><strong>6. 数据源类型：</strong>数据源类型的枚举值为：数据库、集成平台（新增表单时的数据源类型还需显示内部服务）</li>
                    <li><strong>7. 应用名称：</strong>取值：统一后台管理拉取应用名称</li>
                    <li><strong>8. 取消：</strong>点击"取消"关闭弹框</li>
                </ul>
            </div>
        `;
    }
    
    html += `
        </form>
    `;
    
    return html;
}

// 创建新增/编辑模型表单
function createModelForm(isEdit = false, data = {}) {
    if (!isEdit) {
        // 新增模型 - 第一步
        return `
            <form class="modal-form" id="model-form">
                <div class="form-item" style="margin-bottom: 16px;">
                    <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 模型名称：<span class="note-number">1</span></label>
                    <input type="text" name="modelName" placeholder="请输入 0/20" maxlength="20" style="width: 300px;" />
                </div>
                <div class="form-item" style="margin-bottom: 16px;">
                    <label style="display: inline-block; width: 120px;">从已有模型复制：<span class="note-number">7</span></label>
                    <input type="text" name="copyFromModel" placeholder="请选择" style="width: 300px;" />
                </div>
                <div class="form-item" style="margin-top: 16px; padding: 12px; background: #fafafa; border-radius: 4px;">
                    <strong>注解说明：</strong>
                    <ul style="margin-left: 20px; margin-top: 8px; font-size: 12px;">
                        <li><strong>1. 模型名称：</strong>必填，前端支持录入最大字符为20，模型名称不可重复</li>
                        <li><strong>7. 从已有模型复制：</strong>可选，选择已有模型后，复制该模型的所有字段信息</li>
                        <li><strong>8. 保存：</strong>点击"保存"需判断：1、必填字段是否已填，若未填则在字段下方提示：请录入{字段名}；2、保存成功关闭弹框并提示：保存成功，刷新列表页</li>
                        <li><strong>9. 保存并录入详细设置：</strong>点击"保存并录入详细设置"需判断：1、必填字段是否已填，若未填则在字段下方提示：请录入{字段名}；2、保存成功后关闭当前弹框，浮层显示：编辑模型的弹框，详见编辑模型的弹框说明</li>
                    </ul>
                </div>
            </form>
        `;
    } else {
        // 编辑模型 - 包含三个标签页：基本信息、字段列表、字段分组
        return `
            <form class="modal-form" id="model-form">
                <div style="border-bottom: 1px solid #d9d9d9; margin-bottom: 16px;">
                    <button type="button" class="tab-btn active" data-tab="basic" style="padding: 8px 16px; border: none; background: none; cursor: pointer; border-bottom: 2px solid #1890ff;">基本信息</button>
                    <button type="button" class="tab-btn" data-tab="fields" style="padding: 8px 16px; border: none; background: none; cursor: pointer;">字段列表</button>
                    <button type="button" class="tab-btn" data-tab="groups" style="padding: 8px 16px; border: none; background: none; cursor: pointer;">字段分组</button>
                </div>
                
                <div id="tab-basic" class="tab-content" style="display: block;">
                    <div class="form-item" style="margin-bottom: 16px;">
                        <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 模型名称：<span class="note-number">1</span></label>
                        <input type="text" name="modelName" value="${data.modelName || ''}" placeholder="请输入 0/20" maxlength="20" style="width: 300px;" />
                    </div>
                    <div class="form-item" style="margin-bottom: 16px;">
                        <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 数据源：<span class="note-number">2</span></label>
                        <select name="datasource" style="width: 300px;">
                            <option value="">请选择</option>
                            <option value="xinOA" ${data.datasource === 'xinOA' ? 'selected' : ''}>xinOA</option>
                            <option value="hrdata" ${data.datasource === 'hrdata' ? 'selected' : ''}>hrdata</option>
                        </select>
                    </div>
                    <div class="form-item" style="margin-bottom: 16px;">
                        <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 应用名称：<span class="note-number">3</span></label>
                        <select name="appName" style="width: 300px;">
                            <option value="">请选择</option>
                            <option value="OA" ${data.appName === 'OA' ? 'selected' : ''}>OA</option>
                            <option value="PC门户" ${data.appName === 'PC门户' ? 'selected' : ''}>PC门户</option>
                            <option value="脚手架" ${data.appName === '脚手架' ? 'selected' : ''}>脚手架</option>
                        </select>
                    </div>
                    <div class="form-item" style="margin-bottom: 16px;">
                        <label style="display: inline-block; width: 120px;"><span style="color: red;">*</span> 数据库表名：<span class="note-number">4</span></label>
                        <input type="text" name="tableName" value="${data.tableName || ''}" placeholder="请输入" style="width: 300px;" />
                    </div>
                </div>
                
                <div id="tab-fields" class="tab-content" style="display: none;">
                    <div class="search-form" style="margin-bottom: 16px;">
                        <div class="form-item">
                            <label>数据库字段名称：<span class="note-number">12</span></label>
                            <input type="text" name="dbFieldName" placeholder="请输入数据库字段名称" />
                        </div>
                        <div class="form-item">
                            <label>字段显示名：<span class="note-number">13</span></label>
                            <input type="text" name="fieldDisplayName" placeholder="请输入字段显示名" />
                        </div>
                        <div class="form-item">
                            <label>主/明细字段：<span class="note-number">14</span></label>
                            <select name="fieldType">
                                <option value="">请选择</option>
                                <option value="主字段">主字段</option>
                                <option value="明细字段">明细字段</option>
                            </select>
                        </div>
                        <div class="form-item">
                            <button type="button" class="btn btn-primary btn-search">搜索<span class="note-number">15</span></button>
                            <button type="button" class="btn btn-reset">重置<span class="note-number">16</span></button>
                        </div>
                    </div>
                    <div class="toolbar" style="margin-bottom: 16px;">
                        <div class="toolbar-left">
                            <button type="button" class="btn btn-primary btn-batch-add-fields">批量添加字段<span class="note-number">17</span></button>
                            <button type="button" class="btn btn-primary btn-import-template">导入字段模版<span class="note-number">42</span></button>
                            <button type="button" class="btn btn-danger btn-batch-delete-fields" disabled>批量删除<span class="note-number">20</span></button>
                            <button type="button" class="btn btn-primary btn-batch-transfer-group" disabled>批量转移分组<span class="note-number">21</span></button>
                            <button type="button" class="btn btn-primary btn-batch-edit" disabled>批量编辑<span class="note-number">22</span></button>
                            <button type="button" class="btn btn-primary btn-batch-import-template" disabled>批量导入字段模版<span class="note-number">23</span></button>
                            <button type="button" class="btn btn-primary btn-batch-export-template" disabled>批量导出字段模版<span class="note-number">24</span></button>
                        </div>
                    </div>
                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th style="width: 50px;"><input type="checkbox" /></th>
                                    <th>数据库字段名称<span class="note-number">25</span></th>
                                    <th>字段显示名<span class="note-number">26</span></th>
                                    <th>数据库字段类型<span class="note-number">27</span></th>
                                    <th>字段长度<span class="note-number">28</span></th>
                                    <th>小数点位数<span class="note-number">29</span></th>
                                    <th>所属分组<span class="note-number">30</span></th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="checkbox" /></td>
                                    <td>ID</td>
                                    <td>模型ID</td>
                                    <td>文本</td>
                                    <td>64</td>
                                    <td>-</td>
                                    <td>基本信息</td>
                                    <td><a href="#" class="action-link btn-edit-field">编辑<span class="note-number">19</span></a> <a href="#" class="action-link btn-delete-field">删除<span class="note-number">18</span></a></td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" /></td>
                                    <td>tbr</td>
                                    <td>创建人</td>
                                    <td>文本</td>
                                    <td>64</td>
                                    <td>-</td>
                                    <td>基本信息</td>
                                    <td><a href="#" class="action-link btn-edit-field">编辑<span class="note-number">19</span></a> <a href="#" class="action-link btn-delete-field">删除<span class="note-number">18</span></a></td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" /></td>
                                    <td>cjsj</td>
                                    <td>创建时间</td>
                                    <td>日期时间</td>
                                    <td>32</td>
                                    <td>-</td>
                                    <td>基本信息</td>
                                    <td><a href="#" class="action-link btn-edit-field">编辑<span class="note-number">19</span></a> <a href="#" class="action-link btn-delete-field">删除<span class="note-number">18</span></a></td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" /></td>
                                    <td>gxsj</td>
                                    <td>更新时间</td>
                                    <td>日期时间</td>
                                    <td>32</td>
                                    <td>-</td>
                                    <td>基本信息</td>
                                    <td><a href="#" class="action-link btn-edit-field">编辑<span class="note-number">19</span></a> <a href="#" class="action-link btn-delete-field">删除<span class="note-number">18</span></a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div id="tab-groups" class="tab-content" style="display: none;">
                    <div style="margin-bottom: 16px;">
                        <label>字段分组<span class="note-number">43</span></label>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <button type="button" class="btn btn-primary btn-new-group">新建分组<span class="note-number">31</span></button>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label>未分组</label>
                        <button type="button" class="btn" style="margin-left: 8px;">+<span class="note-number">45</span></button>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label>基础</label>
                        <button type="button" class="btn" style="margin-left: 8px;">编辑分组<span class="note-number">44</span></button>
                    </div>
                    <div style="margin-bottom: 16px;">
                        <label>基本信息</label>
                    </div>
                    <div class="form-item" style="margin-top: 16px; padding: 12px; background: #fafafa; border-radius: 4px;">
                        <strong>注解说明：</strong>
                        <ul style="margin-left: 20px; margin-top: 8px; font-size: 12px;">
                            <li><strong>31. 新建分组：</strong>点击"新建分组"浮层显示：新建分组的弹框，详见新建分组的弹框说明</li>
                            <li><strong>43. 字段分组：</strong>字段按主表和明细表分tab显示</li>
                            <li><strong>44. 编辑分组：</strong>点击"编辑分组"浮层显示：编辑分组的弹框，详见编辑分组的弹框说明</li>
                            <li><strong>45. +：</strong>点击"+"浮层显示：新建分组的弹框，详见新建分组的弹框说明</li>
                            <li><strong>46. 编辑字段：</strong>点击"编辑字段"浮层显示：编辑字段的弹框，详见编辑字段的弹框说明</li>
                            <li><strong>47. 请选择分组：</strong>点击"请选择分组"下拉框显示：未分组、基础、基本信息等分组选项</li>
                            <li><strong>48. 分组名称：</strong>必填，前端支持录入最大字符为10</li>
                            <li><strong>49. 取消：</strong>点击"取消"关闭弹框</li>
                            <li><strong>50. 保存：</strong>点击"保存"需判断：1、必填字段是否已填，若未填则在字段下方提示：请录入{字段名}；2、保存成功关闭弹框并提示：保存成功，刷新列表页</li>
                        </ul>
                    </div>
                </div>
                
                <div class="form-item" style="margin-top: 16px; padding: 12px; background: #fafafa; border-radius: 4px;">
                    <strong>注解说明（通用）：</strong>
                    <ul style="margin-left: 20px; margin-top: 8px; font-size: 12px;">
                        <li><strong>1. 模型名称：</strong>必填，前端支持录入最大字符为20，模型名称不可重复</li>
                        <li><strong>2. 数据源：</strong>必填，枚举值为数据源管理维护的数据源</li>
                        <li><strong>3. 应用名称：</strong>必填，枚举值为统一后台管理拉取的应用名称</li>
                        <li><strong>4. 数据库表名：</strong>必填，前端支持录入最大字符为30，数据库表名不可重复</li>
                        <li><strong>12. 数据库字段名称：</strong>筛选项：支持模糊搜索数据库字段</li>
                        <li><strong>13. 字段显示名：</strong>筛选项：支持模糊搜索字段显示名</li>
                        <li><strong>14. 主/明细字段：</strong>筛选项：枚举值为主字段、明细字段</li>
                        <li><strong>15. 搜索：</strong>点击"搜索"下方列表根据上方查询项联动显示筛选后数据</li>
                        <li><strong>16. 重置：</strong>点击"重置"查询项恢复初始状态，下方列表内容根据初始化查询项刷新显示</li>
                        <li><strong>17. 批量添加字段：</strong>点击"批量添加字段"浮层显示：批量添加字段的弹框，详见批量添加字段的弹框说明</li>
                        <li><strong>18. 删除：</strong>点击"删除"浮层显示：删除字段的弹框，详见删除字段的弹框说明</li>
                        <li><strong>19. 编辑：</strong>点击"编辑"浮层显示：编辑字段的弹框，详见编辑字段的弹框说明</li>
                        <li><strong>20. 批量删除：</strong>点击"批量删除"浮层显示：批量删除字段的弹框，详见批量删除字段的弹框说明</li>
                        <li><strong>21. 批量转移分组：</strong>点击"批量转移分组"浮层显示：批量转移分组的弹框，详见批量转移分组的弹框说明</li>
                        <li><strong>22. 批量编辑：</strong>点击"批量编辑"浮层显示：批量编辑字段的弹框，详见批量编辑字段的弹框说明</li>
                        <li><strong>23. 批量导入字段模版：</strong>点击"批量导入字段模版"浮层显示：选择字段模版的弹框，详见选择字段模版的弹框说明</li>
                        <li><strong>24. 批量导出字段模版：</strong>点击"批量导出字段模版"导出数据表的格式为JSON，具体信息详见开发设计文档</li>
                        <li><strong>25. 数据库字段名称：</strong>数据库字段名称：新增/编辑时录入的信息</li>
                        <li><strong>26. 字段显示名：</strong>字段显示名：新增/编辑时录入的信息</li>
                        <li><strong>27. 数据库字段类型：</strong>数据库字段类型：：新增/编辑时选择的信息</li>
                        <li><strong>28. 字段长度：</strong>字段长度：：新增/编辑时录入的信息</li>
                        <li><strong>29. 小数点位数：</strong>小数点位数：新增/编辑时选择的信息</li>
                        <li><strong>30. 所属分组：</strong>所属分组：新增/编辑时选择的信息</li>
                        <li><strong>31. 新建分组：</strong>点击"新建分组"浮层显示：新建分组的弹框，详见新建分组的弹框说明</li>
                        <li><strong>32-41. 保存/取消：</strong>各弹框的保存和取消按钮</li>
                        <li><strong>42. 导入字段模版：</strong>点击"导入字段模版"浮层显示：选择字段模版的弹框，详见选择字段模版的弹框说明</li>
                        <li><strong>43. 字段分组：</strong>字段按主表和明细表分tab显示</li>
                        <li><strong>44. 编辑分组：</strong>点击"编辑分组"浮层显示：编辑分组的弹框，详见编辑分组的弹框说明</li>
                        <li><strong>45. +：</strong>点击"+"浮层显示：新建分组的弹框，详见新建分组的弹框说明</li>
                        <li><strong>46. 编辑字段：</strong>点击"编辑字段"浮层显示：编辑字段的弹框，详见编辑字段的弹框说明</li>
                        <li><strong>47. 请选择分组：</strong>点击"请选择分组"下拉框显示：未分组、基础、基本信息等分组选项</li>
                        <li><strong>48. 分组名称：</strong>必填，前端支持录入最大字符为10</li>
                        <li><strong>49. 取消：</strong>点击"取消"关闭弹框</li>
                        <li><strong>50. 保存：</strong>点击"保存"需判断：1、必填字段是否已填，若未填则在字段下方提示：请录入{字段名}；2、保存成功关闭弹框并提示：保存成功，刷新列表页</li>
                    </ul>
                </div>
                
                <div class="form-item" style="margin-top: 16px; padding: 12px; background: #fafafa; border-radius: 4px;">
                    <strong>注解说明（通用）：</strong>
                    <ul style="margin-left: 20px; margin-top: 8px; font-size: 12px;">
                        <li><strong>1. 模型名称：</strong>必填，前端支持录入最大字符为20，模型名称不可重复</li>
                        <li><strong>2. 数据源：</strong>必填，枚举值为数据源管理维护的数据源</li>
                        <li><strong>3. 应用名称：</strong>必填，枚举值为统一后台管理拉取的应用名称</li>
                        <li><strong>4. 数据库表名：</strong>必填，前端支持录入最大字符为30，数据库表名不可重复</li>
                        <li><strong>12. 数据库字段名称：</strong>筛选项：支持模糊搜索数据库字段</li>
                        <li><strong>13. 字段显示名：</strong>筛选项：支持模糊搜索字段显示名</li>
                        <li><strong>14. 主/明细字段：</strong>筛选项：枚举值为主字段、明细字段</li>
                        <li><strong>15. 搜索：</strong>点击"搜索"下方列表根据上方查询项联动显示筛选后数据</li>
                        <li><strong>16. 重置：</strong>点击"重置"查询项恢复初始状态，下方列表内容根据初始化查询项刷新显示</li>
                        <li><strong>17. 批量添加字段：</strong>点击"批量添加字段"浮层显示：批量添加字段的弹框，详见批量添加字段的弹框说明</li>
                        <li><strong>18. 删除：</strong>点击"删除"浮层显示：删除字段的弹框，详见删除字段的弹框说明</li>
                        <li><strong>19. 编辑：</strong>点击"编辑"浮层显示：编辑字段的弹框，详见编辑字段的弹框说明</li>
                        <li><strong>20. 批量删除：</strong>点击"批量删除"浮层显示：批量删除字段的弹框，详见批量删除字段的弹框说明</li>
                        <li><strong>21. 批量转移分组：</strong>点击"批量转移分组"浮层显示：批量转移分组的弹框，详见批量转移分组的弹框说明</li>
                        <li><strong>22. 批量编辑：</strong>点击"批量编辑"浮层显示：批量编辑字段的弹框，详见批量编辑字段的弹框说明</li>
                        <li><strong>23. 批量导入字段模版：</strong>点击"批量导入字段模版"浮层显示：选择字段模版的弹框，详见选择字段模版的弹框说明</li>
                        <li><strong>24. 批量导出字段模版：</strong>点击"批量导出字段模版"导出数据表的格式为JSON，具体信息详见开发设计文档</li>
                        <li><strong>25. 数据库字段名称：</strong>数据库字段名称：新增/编辑时录入的信息</li>
                        <li><strong>26. 字段显示名：</strong>字段显示名：新增/编辑时录入的信息</li>
                        <li><strong>27. 数据库字段类型：</strong>数据库字段类型：：新增/编辑时选择的信息</li>
                        <li><strong>28. 字段长度：</strong>字段长度：：新增/编辑时录入的信息</li>
                        <li><strong>29. 小数点位数：</strong>小数点位数：新增/编辑时选择的信息</li>
                        <li><strong>30. 所属分组：</strong>所属分组：新增/编辑时选择的信息</li>
                        <li><strong>31. 新建分组：</strong>点击"新建分组"浮层显示：新建分组的弹框，详见新建分组的弹框说明</li>
                        <li><strong>32. 保存：</strong>点击"保存"需判断：1、必填字段是否已填，若未填则在字段下方提示：请录入{字段名}；2、保存成功关闭弹框并提示：保存成功，刷新列表页</li>
                        <li><strong>33. 取消：</strong>点击"取消"关闭弹框</li>
                        <li><strong>34. 保存：</strong>点击"保存"需判断：1、必填字段是否已填，若未填则在字段下方提示：请录入{字段名}；2、保存成功关闭弹框并提示：保存成功，刷新列表页</li>
                        <li><strong>35. 取消：</strong>点击"取消"关闭弹框</li>
                        <li><strong>36. 保存：</strong>点击"保存"需判断：1、必填字段是否已填，若未填则在字段下方提示：请录入{字段名}；2、保存成功关闭弹框并提示：保存成功，刷新列表页</li>
                        <li><strong>37. 取消：</strong>点击"取消"关闭弹框</li>
                        <li><strong>38. 保存：</strong>点击"保存"需判断：1、必填字段是否已填，若未填则在字段下方提示：请录入{字段名}；2、保存成功关闭弹框并提示：保存成功，刷新列表页</li>
                        <li><strong>39. 取消：</strong>点击"取消"关闭弹框</li>
                        <li><strong>40. 保存：</strong>点击"保存"需判断：1、必填字段是否已填，若未填则在字段下方提示：请录入{字段名}；2、保存成功关闭弹框并提示：保存成功，刷新列表页</li>
                        <li><strong>41. 取消：</strong>点击"取消"关闭弹框</li>
                        <li><strong>42. 导入字段模版：</strong>点击"导入字段模版"浮层显示：选择字段模版的弹框，详见选择字段模版的弹框说明</li>
                        <li><strong>43. 字段分组：</strong>字段按主表和明细表分tab显示</li>
                        <li><strong>44. 编辑分组：</strong>点击"编辑分组"浮层显示：编辑分组的弹框，详见编辑分组的弹框说明</li>
                        <li><strong>45. +：</strong>点击"+"浮层显示：新建分组的弹框，详见新建分组的弹框说明</li>
                        <li><strong>46. 编辑字段：</strong>点击"编辑字段"浮层显示：编辑字段的弹框，详见编辑字段的弹框说明</li>
                        <li><strong>47. 请选择分组：</strong>点击"请选择分组"下拉框显示：未分组、基础、基本信息等分组选项</li>
                        <li><strong>48. 分组名称：</strong>必填，前端支持录入最大字符为10</li>
                        <li><strong>49. 取消：</strong>点击"取消"关闭弹框</li>
                        <li><strong>50. 保存：</strong>点击"保存"需判断：1、必填字段是否已填，若未填则在字段下方提示：请录入{字段名}；2、保存成功关闭弹框并提示：保存成功，刷新列表页</li>
                    </ul>
                </div>
            </form>
        `;
    }
}

// 创建设置字段属性表单
function createFieldPropsForm(modelName) {
    return `
        <div>
            <p style="margin-bottom: 16px;">模型：${modelName}</p>
            <div style="margin-bottom: 16px;">
                <label>每行显示字段数量：</label>
                <select name="fieldsPerRow" style="width: 100px;">
                    <option value="2" selected>2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
                <span style="margin-left: 8px;">?</span>
            </div>
            <div style="margin-bottom: 16px;">
                <label>主表</label>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>数据库字段名称</th>
                        <th>字段显示名</th>
                        <th>显示</th>
                        <th>可编辑</th>
                        <th>必填</th>
                        <th>独占一行</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>dev_start_time</td>
                        <td>开始开发时间</td>
                        <td><input type="checkbox" checked /></td>
                        <td><input type="checkbox" checked /></td>
                        <td><input type="checkbox" /></td>
                        <td><input type="checkbox" /></td>
                    </tr>
                    <tr>
                        <td>qfrq</td>
                        <td>签发日期</td>
                        <td><input type="checkbox" checked /></td>
                        <td><input type="checkbox" /></td>
                        <td><input type="checkbox" /></td>
                        <td><input type="checkbox" /></td>
                    </tr>
                    <tr>
                        <td>test_start_time</td>
                        <td>测试开始时间</td>
                        <td><input type="checkbox" checked /></td>
                        <td><input type="checkbox" /></td>
                        <td><input type="checkbox" /></td>
                        <td><input type="checkbox" /></td>
                    </tr>
                    <tr>
                        <td>update_by</td>
                        <td>更新人</td>
                        <td><input type="checkbox" checked /></td>
                        <td><input type="checkbox" /></td>
                        <td><input type="checkbox" /></td>
                        <td><input type="checkbox" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// 将函数暴露到全局作用域
window.createDatasourceForm = createDatasourceForm;
window.createModelForm = createModelForm;
window.createFieldPropsForm = createFieldPropsForm;

