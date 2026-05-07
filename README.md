# 写给 Giulia · 母亲节网页

一个纯前端静态网页，送给妈妈的母亲节礼物。无需安装任何依赖，直接用浏览器打开即可运行。

---

## 如何运行

用浏览器（推荐 Chrome / Safari）打开项目根目录下的 `index.html` 即可。

> **注意：** 由于浏览器安全策略，本地直接打开时背景音乐可能受限。建议用 VS Code 的 Live Server 插件，或任意本地 HTTP 服务器运行：
> ```bash
> # 如果安装了 Python
> python3 -m http.server 8080
> # 然后访问 http://localhost:8080
> ```

---

## 目录结构

```
母亲节/
├── index.html                  # 主页面
├── css/
│   └── main.css                # 全部样式
├── js/
│   └── main.js                 # 全部交互逻辑
└── assets/
    ├── music/
    │   └── bgm.mp3             # 背景音乐（需自行放入）
    └── images/
        ├── characters/         # 角色插画（14个文件）
        ├── garden/             # 花草照片（9个文件）
        ├── stories/            # 故事场景图（2-3个文件）
        └── japan/              # 旅行照片（按场景分文件夹）
            ├── osaka/
            ├── nara/
            ├── kiyomizu/
            ├── arashiyama/
            ├── fushimi/
            ├── kamakura/
            └── ginza/
```

---

## 素材准备指南

### 背景音乐

将音乐文件命名为 `bgm.mp3`，放入 `assets/music/` 文件夹。

---

### 旅行照片

每个场景 4 张照片，按如下规则命名后放入对应文件夹：

| 文件夹 | 对应场景 | 文件命名 |
|--------|----------|----------|
| `japan/osaka/` | 大阪·心斋桥 | `01.jpg` `02.jpg` `03.jpg` `04.jpg` |
| `japan/nara/` | 奈良·小鹿公园 | `01.jpg` `02.jpg` `03.jpg` `04.jpg` |
| `japan/kiyomizu/` | 京都·清水寺 | `01.jpg` `02.jpg` `03.jpg` `04.jpg` |
| `japan/arashiyama/` | 京都·嵯峨野 | `01.jpg` `02.jpg` `03.jpg` `04.jpg` |
| `japan/fushimi/` | 京都·稻荷大社 | `01.jpg` `02.jpg` `03.jpg` `04.jpg` |
| `japan/kamakura/` | 镰仓·片濑海岸 | `01.jpg` `02.jpg` `03.jpg` `04.jpg` |
| `japan/ginza/` | 东京·银座 | `01.jpg` `02.jpg` `03.jpg` `04.jpg` |

---

### 导览角色插画

只需要 **1 个文件**，放入 `assets/images/characters/`：

| 文件名 | 说明 |
|--------|------|
| `guide.png` | 导览角色立绘，PNG 透明背景，建议高度 200px 以上 |

角色会自动浮动在地图右下角，点击地点时气泡切换为对应导览词。

---

### 花草照片

9 张照片，命名为 `flower1.jpg` 至 `flower9.jpg`，放入 `assets/images/garden/`。

---

### 故事场景图

2-3 张图片，命名为 `story1.jpg`、`story2.jpg`、`story3.jpg`，放入 `assets/images/stories/`。

---

## 内容修改指南

### 修改旅行地点的文字（日期 & 一句话）

打开 `js/main.js`，找到顶部的 `LOCATIONS` 数组，修改每个地点的 `date` 和 `caption` 字段：

```js
{
  name: '大阪·心斋桥',
  date: '2024.08.xx',       // ← 改成实际日期，如 '2024.08.12'
  caption: '霓虹灯下……',    // ← 改成你想说的那句话
  ...
}
```

### 修改故事模块的文字

打开 `index.html`，找到 `id="comic-panels"` 的区域，修改每个 `.story-body` 段落的内容。

### 修改模块四的文字

打开 `index.html`，找到 `id="letter-content"` 的区域直接修改。

---

## 网页结构说明

| 模块 | 内容 |
|------|------|
| 入场动画 | 樱花花瓣飘落 → 「Giulia」名字渐现 → 自动进入主页面 |
| 模块一 | 手绘日本地图，7个地点依次点亮；点击地点弹出场景，可左右滑动4张照片，角色从两侧走入 |
| 模块二 | 珏女士的小花园，9张花草照片，点击花朵触发开放动效 |
| 模块三 | 漫画分格版式，展示2-3个温柔的家庭故事 |
| 模块四 | 写给她的话，含两层文字：感谢 + 自由时刻寄语 |
