# 表单引擎管理系统 - 静态页面原型

## 项目简介

这是一个1:1复现的表单引擎管理系统静态原型，基于 Axure 原型设计（http://www.axshare.site/QQKAWM）。

## 项目结构

```
form-engine/
├── index.html              # 主入口文件
├── index-standalone.html   # 独立版本（可选）
├── css/
│   ├── style.css          # 主样式文件
│   ├── common.css         # 通用样式
│   └── layout.css         # 布局样式
├── js/
│   ├── app.js             # 主应用脚本
│   └── main.js            # 辅助脚本
├── pages/                 # 各个页面HTML文件
│   ├── revision-record.html           # 修订记录
│   ├── field-template.html            # 字段模版库
│   ├── datasource-manage.html         # 数据源管理
│   ├── datasource-edit.html           # 新增/编辑数据源
│   ├── model-manage.html              # 建模管理
│   ├── model-edit.html                # 新增/编辑模型
│   ├── form-manage.html               # 表单管理
│   ├── form-editor.html               # 表单编辑器
│   ├── form-style.html                # 表单样式管理
│   ├── function-library.html          # 函数库
│   ├── component-library.html         # 组件库
│   └── component-edit.html            # 新增/编辑组件
├── screenshots/           # 原型截图（共7张）
│   ├── 01-修订记录.png
│   ├── 02-字段模版库.png
│   ├── 03-数据源管理.png
│   ├── 04-新增编辑数据源.png
│   ├── 05-建模管理.png
│   ├── 06-新增编辑模型.png
│   └── 07-表单管理.png
├── pages-info.md          # 页面信息汇总文档
├── 启动服务器.sh          # Linux/Mac启动脚本
└── 启动服务器.bat         # Windows启动脚本
```

## 功能模块

### 1. 修订记录
- 展示系统版本修订历史
- 包含版本号、内容、属性、修订时间、修订人

### 2. 字段模版库
- 管理数据库字段模版
- 支持搜索、过滤、同步功能
- 字段包括：数据库字段名称、字段显示名、数据库字段类型、字段长度、小数点位数

### 3. 数据源管理
- 管理数据库和集成平台数据源
- 支持新增、编辑、删除、批量删除
- 数据源类型：数据库（MySQL、Oracle、PostgreSQL等）、集成平台

### 4. 建模管理
- 管理实体模型
- 支持设置字段属性、导出、本地导入
- 查看关联的显示表单

### 5. 表单管理
- 管理表单及其版本
- 支持发布、停用、编辑、删除操作
- 版本状态：待发布、已发布、已停用

### 6. 表单编辑器
- 可视化表单设计工具
- 支持组件拖拽、属性配置
- 支持公式配置、数据联动、隐藏条件、必填条件

### 7. 表单样式管理
- 管理表单显示样式
- 自定义表单外观

### 8. 函数库
- 管理系统函数
- 供表单公式使用

### 9. 组件库
- 管理表单组件
- 支持自定义组件

## 启动方式

### 方法1：使用启动脚本（推荐）

**Windows:**
```bash
双击运行 启动服务器.bat
```

**Linux/Mac:**
```bash
chmod +x 启动服务器.sh
./启动服务器.sh
```

### 方法2：使用Python HTTP服务器

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### 方法3：使用Node.js http-server

```bash
# 安装 http-server
npm install -g http-server

# 启动服务器
http-server -p 8000
```

### 方法4：直接打开

在支持本地文件的浏览器中直接打开 `index.html` 文件。

## 访问地址

启动服务器后，在浏览器中访问：
```
http://localhost:8000
```

## 主要特性

### 页面导航
- 左侧导航栏展示所有功能模块
- 顶部面包屑显示当前位置
- 点击导航项切换页面

### 数据表格
- 支持搜索和筛选
- 支持分页显示
- 支持批量操作（删除）
- 支持行内操作（编辑、删除等）

### 表单交互
- 表单验证
- 模态框弹窗
- 下拉选择
- 日期选择
- 多选/单选

### 按钮操作
- 新增：打开新增表单
- 编辑：打开编辑表单
- 删除：确认后删除数据
- 批量删除：选中多条数据后删除
- 搜索：根据条件筛选数据
- 重置：清空搜索条件

## 技术栈

- **HTML5**: 页面结构
- **CSS3**: 样式和布局
- **JavaScript**: 交互逻辑
- **原生开发**: 无框架依赖，纯原生实现

## 设计规范

### 颜色
- 主色：#1890ff（蓝色）
- 成功：#52c41a（绿色）
- 警告：#faad14（橙色）
- 错误：#f5222d（红色）

### 字体
- 主字体：-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- 字号：14px（正文）、12px（辅助）、16px（标题）

### 间距
- 基础间距：8px
- 常用间距：16px、24px
- 页面边距：24px

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 原型参考

原始 Axure 原型链接：http://www.axshare.site/QQKAWM

## 页面信息汇总

详细的页面信息、Notes注释和交互说明，请查看 `pages-info.md` 文件。

## 开发说明

### 添加新页面

1. 在 `pages/` 目录创建新的 HTML 文件
2. 在 `index.html` 的导航菜单中添加链接
3. 在 `js/app.js` 的 `getPageFileName` 函数中添加映射
4. 在 `js/app.js` 的 `initPageFeatures` 函数中添加初始化逻辑

### 自定义样式

在 `css/style.css` 中修改 CSS 变量即可快速调整主题：

```css
:root {
    --primary-color: #1890ff;
    --success-color: #52c41a;
    --warning-color: #faad14;
    --error-color: #f5222d;
}
```

## 注意事项

1. 本项目为静态原型，不包含后端API
2. 所有数据操作仅为前端演示
3. 实际使用需要对接后端接口
4. 建议使用现代浏览器访问以获得最佳体验

## 更新日志

### v2.0 (2025-10-23)
- 增加显示模版管理
- 增加数据源管理
- 增加表单样式管理
- 优化建模管理
- 字段模版管理：从主数据同步，不新增和编辑
- 表单管理：版本管理的交互优化

### v1.0 (2025-10-16)
- 初始版本发布
- 全模块功能实现

## 联系方式

如有问题或建议，请联系开发团队。

---

**制作日期**: 2025年11月14日  
**制作人**: 张露芸


