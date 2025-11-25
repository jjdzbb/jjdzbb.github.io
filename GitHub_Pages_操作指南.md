# GitHub Pages 部署操作指南

## 📋 准备工作
- 确保你已经有一个 GitHub 账号（如果没有，请先到 https://github.com 注册）
- 确保你已经登录到 GitHub

---

## 🚀 第一步：创建仓库

### 1.1 进入创建仓库页面
1. 打开浏览器，访问 https://github.com
2. 登录你的账号
3. 点击右上角的 **"+"** 号（加号图标）
4. 在下拉菜单中选择 **"New repository"**（新建仓库）

### 1.2 填写仓库信息
在创建仓库页面，按照以下步骤操作：

1. **Repository name（仓库名称）**：
   - ⚠️ **非常重要**：必须输入 `jjdzbb.github.io`
   - 这个名称必须和你的 GitHub 用户名完全一致，后面加上 `.github.io`
   - 这是 GitHub Pages 的特殊命名规则，只有这样命名才能自动启用 Pages 功能

2. **Description（描述）**：
   - 可选，可以填写 "My personal website" 或留空

3. **Visibility（可见性）**：
   - 选择 **Public（公开）**（GitHub Pages 免费版只支持公开仓库）

4. **其他选项**：
   - ❌ **不要勾选** "Add a README file"（我们稍后会手动上传文件）
   - ❌ **不要勾选** "Add .gitignore"
   - ❌ **不要勾选** "Choose a license"

5. 点击页面底部的绿色按钮 **"Create repository"**（创建仓库）

---

## 📤 第二步：上传 index.html 文件

### 方法一：通过网页界面上传（最简单，适合新手）

#### 2.1 进入仓库页面
创建仓库后，你会自动跳转到新仓库的页面，页面会显示类似这样的提示：
```
Quick setup — if you've done this kind of thing before
```

#### 2.2 上传文件
1. 在仓库页面，找到并点击 **"uploading an existing file"**（上传现有文件）链接
   - 或者直接点击页面上的 **"Add file"** 按钮，然后选择 **"Upload files"**

2. 在文件上传区域：
   - 点击 **"choose your files"**（选择文件）或直接拖拽文件
   - 选择你本地电脑上的 `index.html` 文件
   - 文件会显示在上传列表中

3. 填写提交信息（在页面底部）：
   - **Commit message（提交信息）**：输入 `Initial commit: Add index.html`
   - 可以勾选 **"Commit directly to the main branch"**（直接提交到主分支）

4. 点击绿色的 **"Commit changes"**（提交更改）按钮

5. 等待几秒钟，页面会自动刷新，你会看到 `index.html` 文件已经出现在仓库文件列表中

---

### 方法二：使用 Git 命令行（可选，适合有 Git 经验的用户）

如果你熟悉 Git，也可以使用命令行：

```bash
# 1. 在本地项目目录中初始化 Git
git init

# 2. 添加远程仓库（将 YOUR_USERNAME 替换为你的用户名）
git remote add origin https://github.com/jjdzbb/jjdzbb.github.io.git

# 3. 添加文件
git add index.html

# 4. 提交
git commit -m "Initial commit: Add index.html"

# 5. 推送到 GitHub
git branch -M main
git push -u origin main
```

---

## ⚙️ 第三步：启用 GitHub Pages

### 3.1 进入设置页面
1. 在仓库页面，点击顶部的 **"Settings"**（设置）标签页
2. 在左侧菜单栏中，找到并点击 **"Pages"**（页面）选项

### 3.2 配置 Pages
1. 在 **"Source"**（源）部分：
   - 点击下拉菜单，选择 **"Deploy from a branch"**（从分支部署）
   - 在 **"Branch"**（分支）下拉菜单中选择 **"main"**（或 "master"，取决于你的默认分支）
   - 在 **"Folder"**（文件夹）下拉菜单中选择 **"/ (root)"**（根目录）
   
2. 点击 **"Save"**（保存）按钮

3. 等待几秒钟，页面会刷新并显示：
   ```
   Your site is live at https://jjdzbb.github.io/
   ```

---

## 🌐 第四步：访问你的网站

### 4.1 等待部署完成
- GitHub Pages 通常需要 **1-5 分钟** 来部署你的网站
- 在 Settings > Pages 页面，你会看到绿色的提示，表示部署成功

### 4.2 访问网站
1. 在 Settings > Pages 页面，你会看到你的网站地址：
   ```
   https://jjdzbb.github.io/
   ```
2. 点击这个链接，或者直接在浏览器地址栏输入这个地址
3. 你应该能看到页面上显示：**"Hello, this is my Resume"**

---

## ✅ 验证清单

完成以上步骤后，请确认：

- [ ] 仓库名称是 `jjdzbb.github.io`（完全匹配）
- [ ] `index.html` 文件已成功上传到仓库
- [ ] 在 Settings > Pages 中已启用 Pages 功能
- [ ] 网站地址显示为 `https://jjdzbb.github.io/`
- [ ] 访问网站能看到 "Hello, this is my Resume" 文字

---

## 🔧 常见问题

### Q1: 网站显示 404 错误
**解决方案**：
- 确认仓库名称完全正确：`jjdzbb.github.io`（不能有大小写错误）
- 等待 5-10 分钟，有时部署需要更长时间
- 检查 Settings > Pages 是否已正确配置

### Q2: 找不到 "Pages" 选项
**解决方案**：
- 确认你是在仓库的 Settings 页面
- 向下滚动左侧菜单，Pages 选项在菜单的底部区域

### Q3: 上传文件后看不到
**解决方案**：
- 刷新页面（按 F5 或 Ctrl+R）
- 确认文件确实上传成功（检查文件列表）

### Q4: 网站内容没有更新
**解决方案**：
- GitHub Pages 更新通常需要 1-5 分钟
- 尝试强制刷新浏览器（Ctrl+F5 或 Ctrl+Shift+R）
- 检查文件内容是否正确提交

---

## 🎉 完成！

如果一切顺利，你的网站现在应该可以访问了！

**你的网站地址**：https://jjdzbb.github.io/

以后每次更新网站内容，只需要：
1. 在 GitHub 仓库中编辑或上传新文件
2. 等待几分钟让 GitHub Pages 自动更新
3. 刷新浏览器查看更新后的内容

祝你使用愉快！🚀

