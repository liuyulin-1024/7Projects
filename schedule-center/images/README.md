# 图片资源说明

本目录用于存放日程中心项目所需的图片资源。

## 所需图片列表

### 通用图标
1. **logo.png** - 系统Logo
   - 尺寸：建议 120x40px
   - 格式：PNG（透明背景）
   - 用途：顶部导航栏

2. **avatar.png** - 用户头像默认图
   - 尺寸：36x36px
   - 格式：PNG或JPG
   - 用途：用户信息显示

### 图标资源（可使用emoji或图标字体替代）
当前页面使用emoji作为图标，如需使用图片图标，可替换以下内容：

- 📅 日历图标
- ✓ 待办图标
- 📢 通知图标
- 👤 用户图标
- 🔍 搜索图标
- ⏰ 时间图标
- 📍 地点图标
- 👥 人数图标

## 图片获取建议

### 1. 从原型网站提取
由于原型网站的图片可能受版权保护，建议使用以下替代方案：

### 2. 使用开源图标库
- **Material Icons** - https://fonts.google.com/icons
- **Font Awesome** - https://fontawesome.com/
- **Feather Icons** - https://feathericons.com/
- **Heroicons** - https://heroicons.com/

### 3. 使用占位图服务
- **Lorem Picsum** - https://picsum.photos/
- **Placeholder.com** - https://placeholder.com/
- **UI Avatars** - https://ui-avatars.com/

### 4. 自行设计
使用Figma、Sketch或其他设计工具创建符合品牌风格的图标和图片。

## 当前实现方案

目前页面使用以下方案，无需额外图片即可正常显示：

1. **Emoji图标** - 直接在HTML中使用emoji字符
2. **CSS绘制** - 使用CSS绘制简单图标（如圆点、箭头等）
3. **渐变背景** - 使用CSS渐变替代图片背景

## 如何添加图片

1. 将图片文件放入此目录
2. 在HTML中更新图片路径：
   ```html
   <img src="images/logo.png" alt="Logo">
   ```

3. 确保图片格式正确，建议：
   - Logo: PNG格式（透明背景）
   - 头像: JPG或PNG格式
   - 图标: SVG格式（矢量图，清晰度最佳）

## 图片优化建议

- 使用压缩工具减小文件大小（如TinyPNG）
- Logo和图标优先使用SVG格式
- 照片使用WebP格式（现代浏览器支持）
- 设置合适的图片尺寸，避免过大
- 为图片添加alt属性提高可访问性

## 示例图片规格

```
logo.png
├── 宽度: 120px
├── 高度: 40px
├── 格式: PNG
└── 背景: 透明

avatar.png
├── 宽度: 36px
├── 高度: 36px
├── 格式: PNG/JPG
└── 形状: 圆形或方形（CSS处理为圆形）
```

## 注意事项

⚠️ 请确保使用的图片：
- 拥有合法使用权限
- 不侵犯版权
- 符合项目品牌规范
- 文件大小合理（单张不超过200KB）

## 当前状态

✅ 页面已使用emoji和CSS完成基础展示
⏳ 可根据实际需求替换为正式图片资源
📝 建议使用矢量图标获得最佳显示效果

