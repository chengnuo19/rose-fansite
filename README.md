# Rosé Fan Gallery

一个基于 React + Tailwind CSS + Express + SQLite 的 Rosé 粉丝互动网站，包含图片墙、点赞评论、粉丝投稿、管理员审核和一系列更有趣的粉丝站玩法。

## 功能

- 首页展示 Rosé 图片墙
- 每张图片显示粉丝热度、点赞数、评论数
- 支持点赞、发表评论、评论表情反应
- 支持粉丝上传图片，管理员审核后展示到首页
- 支持翻书/拍立得两种相册模式、全屏浏览、随机看图
- 支持主题切换、BGM 播放器、拍立得留言生成器、Rosé 时间轴和粉丝小测试
- 评论、点赞、投稿数据保存到 SQLite
- 管理员页面支持删评和审核投稿

## 项目结构

```text
rose-fansite/
├─ client/
│  ├─ public/media/
│  └─ src/
├─ server/
│  ├─ src/
│  └─ .env.example
├─ package.json
└─ README.md
```

## 本地运行

### 1. 安装依赖

如果你在 PowerShell 里遇到 `npm` 执行限制，请使用 `npm.cmd`：

```powershell
cd E:\codex\rose-fansite
npm.cmd install
```

### 2. 启动开发环境

```powershell
npm.cmd run dev
```

默认会启动：

- 前端：[http://localhost:5173](http://localhost:5173)
- 后端：[http://localhost:4000](http://localhost:4000)

### 3. 管理员页面

地址：

```text
http://localhost:5173/admin
```

默认管理员密钥见 [server/.env.example](/E:/codex/rose-fansite/server/.env.example)，示例值为 `rose-admin-2026`。

## 环境变量

服务端支持以下环境变量：

- `PORT`：后端端口
- `ADMIN_KEY`：管理员密钥
- `DATA_DIR`：持久化数据目录
- `DB_PATH`：可选，SQLite 文件路径
- `UPLOADS_DIR`：可选，上传图片目录

本地开发示例：

```env
PORT=4000
ADMIN_KEY=rose-admin-2026
DATA_DIR=./data
```

## 生产部署思路

这个项目不是纯静态站，因为它包含：

- Node.js 后端
- SQLite 数据库
- 粉丝上传图片
- 管理员审核能力

所以推荐部署到支持长期运行和持久化存储的平台，例如：

- Render
- Railway

### 推荐部署到 Render

#### 1. 推送代码到 GitHub

先把整个 `rose-fansite` 仓库推到 GitHub。

#### 2. 在 Render 创建 Web Service

Render 官方文档：
- [Web Services](https://render.com/docs/web-services)
- [Persistent Disks](https://render.com/docs/disks)

建议配置：

- Build Command

```bash
npm install
npm run build
```

- Start Command

```bash
npm run start
```

#### 3. 添加环境变量

至少配置：

```env
ADMIN_KEY=你自己的管理员密钥
DATA_DIR=/data
```

如果平台要求，也会自动注入 `PORT`。

#### 4. 挂载持久化磁盘

把 Render Persistent Disk 挂到：

```text
/data
```

这样会保存：

- SQLite 数据库文件
- 粉丝上传图片

#### 5. 访问公开网址

部署完成后，Render 会给你一个所有人都能访问的公开链接。

### 推荐部署到 Railway

Railway 也可以，核心思路一样：

- 创建服务
- 设置 `ADMIN_KEY`
- 设置 `DATA_DIR=/data`
- 挂载 Volume 到 `/data`

Railway 文档：
- [Railway Volumes](https://docs.railway.com/guides/volumes)

## 可测试方式

### 本地测试

1. 打开首页，确认图片墙、相册切换、BGM 播放器和主题切换正常
2. 点赞任意图片后刷新页面，确认点赞数仍保留
3. 提交评论后刷新页面，确认评论仍在
4. 尝试对评论点击表情反应，确认界面更新正常
5. 提交一张粉丝投稿，在 `/admin` 页面审核通过后回首页确认图片出现
6. 打开 `/about` 查看 Rosé 最近动态页
7. 打开 `/contact` 查看邮箱和粉丝站链接是否正常

### 生产环境测试

部署完成后重点检查：

1. 打开公开域名，确认首页加载正常
2. 提交评论后刷新页面，确认 SQLite 数据仍存在
3. 上传粉丝图片后，确认文件在服务重启后仍保留
4. 管理员后台可以正常审核投稿和删除评论

## 一句话理解上线关键点

如果你希望“所有人都能打开，而且评论和上传不会丢”，最重要的是：

- 后端要部署到可长期运行的平台
- SQLite 和上传目录要放在持久化磁盘里

这个项目现在已经改成支持 `DATA_DIR` / `UPLOADS_DIR` 的部署结构了，可以直接往这条路线走。
