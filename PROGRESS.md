# 当前进度

更新：2026-09-08

## 当前目标

AI Native Builder 岗位入口改为不带参数的 `/ai-native-builder/`，预览脚本不再向导航、项目和返回链接传播参数。构建、三个入口及六个项目的链接断言、预览开关脚本执行检查通过；未做浏览器视觉验证。用户已要求部署，正在发布本次链接修正。

## 当前实现

- AI Native Builder 职业经历已按 `简历_ai产品设计师.png` 更新：产品开发（标题更名已随 e374560 发布并线上验证）、得物 C 端体验设计、哔哩哔哩资深美术设计、字节跳动资深创意设计、阿里/饿了么资深视觉设计，以及广告公司与自由设计经历；职责压缩为结果型简述。已提交并推送 eb143a4，GitHub Actions 34206153337 completed/success；线上页面检查通过。
- 所有使用共用顶部导航的页面左侧标识统一为 Kevin，移除小字描述；构建通过，未做本轮视觉验证，已部署。
- 根 `/` 与 `/index.html` 输出无内容、无脚本的空白页；原综合首页由 index_generator 生成到 `/alljobs/`。这只是隐藏入口，非访问权限控制。
- 综合岗位标签、共用导航及原项目的根地址返回链接改为 `/alljobs/`；岗位切换进入 AI 时使用干净地址，默认隐藏标签；手动 `?preview=1` 仅控制当前页面标签显示，不再改写链接。综合版/全部版本启动脚本同步更新。
- 面试官入口 `/ai-native-builder/` 默认隐藏岗位标签；自用 `?preview=1` 显示标签。旧 `/ai-product/` 自动跳转。
- 六个项目复用原模板生成 `/ai-native-builder/projects/{slug}/`，导航、返回作品集、下个项目均保持岗位路径；刷新与分享不依赖浏览器存储。其他公开方向仍可直接访问。
- 首屏仅嘟记豆、喵息、幻星，5.5 秒同步轮播；大尺寸 16:9 彩色图片、外侧箭头、底部圆点；左侧大描边项目标签、主副标题与查看项目/更多作品；全宽淡网格和随项目变化的渐变。
- 岗位资料卡使用 619×619、约 25 KB 的 portrait-real.webp；原 PNG 归档 assets-source/portraits。身份 Ai Native Builder，经历数字、学校专业、能力标签居中。
- 经历顶部为 2025—2026 产品开发；下方新增六项核心能力与三类专业技能，支持与经历协调的悬停反馈。
- 项目顺序：AI独立开发（嘟记豆、喵息）、AI流程提效（幻星、得物）、网页设计（iPhone 17 Pro、小米SU7）。移除重复介绍和分隔线。
- 联系区电话/邮箱左侧高亮、独立复制按钮、已复制反馈，保留拨号与邮件链接。
- HMI 方向、SU7 智能座舱概念项目、Tesla 驾驶可视化项目及其专用文件已移除；独立 SU7 产品体验项目保留。
- 本次发布同时包含已完成的 SU7、iPhone、喵息、嘟记豆、得物、幻星页面与素材优化；以当前源文件为准。

## 相关文件

- `themes/portfolica/layout/index.ejs`、`partial/builder-hero.ejs`、`partial/builder-capabilities.ejs`。
- `themes/portfolica/source/css/builder-hero.css`、`style.css`、`js/builder-hero.js`、`main.js`。
- `scripts/portfolio-context.js`、`source/ai-native-builder/index.md`、`source/ai-product/index.md`、`js/portfolio-preview.js`及共用导航模板。

## 验证与发布

- 本轮构建通过；静态断言验证空白根页、完整首页标签、综合项目返回、AI 默认隐藏标签及六个岗位项目返回路径。未做本轮浏览器视觉验证。已提交并推送 536a086；GitHub Actions 34195078017 completed/success，线上根地址空白、alljobs 标签、AI 默认隐藏标签、Kevin 标识及嘟记豆返回路径检查通过。
- 干净构建通过；七个岗位页面静态链接/素材检查通过，HMI 输出无残留。
- 已浏览器验证岗位入口、往返路径、预览开关、刷新、旧地址跳转、轮播、联系复制；多次桌面视觉检查通过。近期小幅排版调整未逐项重做手机视觉验证。
- 已提交并推送 9e3d298（Launch AI Native Builder portfolio and refresh project showcases）。GitHub Actions 34193960324 completed/success，GitHub Pages 部署成功。线上 /ai-native-builder/ 验证新文案、默认隐藏岗位标签和专属项目链接，嘟记豆项目返回 /ai-native-builder/#projects 检查通过。
- 本地旧 4000 预览未加载新增 generator；4001 为已重启新版预览。
- `docs/` 未提交参考资料与 `assets-source/` 原始素材留在本地，不纳入本次发布。
