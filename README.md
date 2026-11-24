# colorai-card

Colorai（木纹刀 / 岉雨）的个人站。纯静态（HTML + CSS + JS），无依赖、无外部字体，国内访问不受影响。

## 本地预览

双击 `启动本地网站.bat`，会在 http://127.0.0.1:8765 开一个本地服务器并打开浏览器，关掉那个黑色窗口就停止。

也可以直接双击 `index.html`，但浏览器不允许本地文件之间互相读取，换页时音乐会断一下再从原位置接着放（有时需要点一下页面）。用 `.bat` 打开就和线上一样不断。

详细的修改方法见 `修改指南.md`。

## 页面

| 文件 | 内容 |
|---|---|
| `index.html` | 首页：P3R 式标题画面、最近的随记和近况、去各个页面的入口、友链 |
| `posts/index.html` | 随记列表，按年份分组，可按标签筛选（`?tag=旅行`） |
| `posts/*.html` | 每篇随记一个文件 |
| `about.html` | 档案：经历、作品、喜欢的东西、旅途、摘句、联系方式 |
| `gallery.html` | 相册 |
| `friends.html` | 友链 |
| `log.html` | 更新日志 |

## 写一篇新随记

1. 复制 `posts/` 里任意一篇，改文件名（比如 `posts/new-post.html`），改 `<title>`、`data-post`、标题、日期、标签和正文。
2. 在 `script.js` 顶部的 `POSTS` 里加一行，`id` 和文件名一致。越新的放越前面。首页、随记列表、标签和文章底部的上一篇 / 下一篇都读这里。

现有的八篇是根据站上已有的信息整理的草稿，语气和细节请按自己的想法改写。

## 修改内容

- 友链：`script.js` 里的 `FRIENDS`（名称、地址、一句话简介、头像上的字、颜色）。首页和友链页都读这一处。
- 邮箱：`script.js` 顶部的 `EMAIL`。
- 点歌窗口：`script.js` 里的 `TRACKS`。
- 档案页的摘句：`QUOTES`；五维雷达图：`STATS`；地球上的城市：`CITIES`，`HOME` 是连线起点。
- 作品：`about.html` 里隐藏的 `<div class="works" hidden>`，每张 `.work` 卡片自动生成列表和预览，`<template class="w-detail">` 是弹窗内容。
- 相册：`gallery.html` 里的 `button.polaroid`，`data-src` 是大图，`data-cap` 是弹窗标题。照片放在 `assets/photos/`，没有别人的正脸，也没有动漫截图。
- 首页背景：`assets/bg/` 里是 P3 20 周年的像素画，按时间切换：6–16 点 `roof-day`，16–19 点 `roof-dusk`，其余时间 `lounge-night`。点首页的日历可以手动换。友链页的横幅是 `shrine`。
- 人物：`assets/chars/` 里是原创角色（主角和黑猫），做成 P3R 立牌那种两色平涂加浅色描边的样子。替换时用同名的透明背景 WebP。
- 配色：每个区块用 `data-theme` 选一套配色，`p3d` `p3l` `p4` `p5` `p5d`，定义在 `style.css` 顶部；像素过场的颜色在 `script.js` 的 `THEMES`。

## 操作

- 左键点空白处：下一页（首页和档案页按区块翻）。
- 右键点空白处：返回。先回到上一个区块，到顶了就回上一个页面。
- Shift + 右键：浏览器原本的右键菜单。在链接、图片、代码和选中的文字上右键也是原菜单。
- 键盘：PageDown / 空格 / ↓ 前进，PageUp / ↑ 后退。

## 版权

Persona 系列、首页和友链页的像素画、点歌窗口里的音乐，版权都归 ATLUS 和原作者所有。本站是非商业的个人站。

## 部署

- GitHub Pages：推到仓库后，在 Settings → Pages 选择 `main` 分支根目录。
- Cloudflare Pages / Vercel / Netlify：选择该仓库，构建命令留空，输出目录为根目录。
