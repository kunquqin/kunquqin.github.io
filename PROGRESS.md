# 当前进度

更新：2026-09-16

## 当前目标

- AI Native Builder 首屏轮播补齐得物，顺序嘟记豆→喵息→幻星→得物，配套封面、说明、岗位链接与青色背景光晕，其他岗位轮播不变。修改 `partial/builder-hero.ejs`、`css/builder-hero.css`。构建通过；1440/390px 浏览器第四项图片加载、圆点切换、末项回首项、无横向溢出验证通过，桌面/手机截图已检查。未提交或部署。

- AI Native Builder 首页移除整个“网页设计”组（iPhone、SU7），仅保留嘟记豆、喵息、幻星、得物四项；`scripts/portfolio-next.js` 同步四项循环，得物返回嘟记豆。只调整该岗位入口，其他岗位和原详情页保留。相关文件：`themes/portfolica/layout/index.ejs`、`scripts/portfolio-next.js`。构建、生成页面四项顺序/循环、其他岗位项目数量及差异检查通过；本轮未做浏览器视觉验证，未提交或部署。

- NEXT PROJECT 已按所属岗位首页的项目阅读顺序循环，最后一项回到第一项；名称与目标链接同步。新增 `scripts/portfolio-next.js` 与共用 `partial/project-next.ejs`，所有项目模板统一接入；缺少导航的项目补齐。视觉顺序：雷朋→九州→吃豆人→E宝→幻星→视觉探索→iPhone→雷朋。综合入口 SU7 虽带3D样式标记，仍按综合首页顺序导航。构建与差异检查通过；浏览器对照五个首页验证28个链接及标题、桌面/手机实际点击通过，底部截图已检查。本轮已提交 a866ccf 并推送 main；GitHub Pages 34831919622 部署成功，线上幻星→视觉探索、iPhone→雷朋的标题及岗位路径验证通过。本地预览4020。以下历史实现均已包含于上次发布，旧“未部署”记录不代表当前发布状态。

- 发布完成：提交 4d08e8e 已推送 main；GitHub Pages 运行 34830636865 completed/success。线上 /visual-designer/ 已验证新分组、职业文案、项目链接；九州详情标题与合成图哈希匹配，线上 CSS 已包含保留位移且不换行的修复。发布前构建、暂存差异、视觉岗位12页资源路径检查通过。地址 https://kunquqin.github.io/visual-designer/ 。

- 职业经历 hover 最终修复：保留位移，使用子元素 transform:translateX（桌面16px/手机10px），不再改变padding。背景高亮与强调线保留。构建通过；1440/1024/390px逐条验证平移量正确且文字宽高、行高不变，不重新换行。预览4018已重启；未提交或部署。

- 已按用户确认稿替换视觉岗位五段职业职责，突出视觉设计对象、职责和应用；公司/时间/岗位名称不变。修改 visual_designer.yml；brand_creative.yml 固定原 career 数据，避免继承导致其他岗位文案改变。构建与生成文字/岗位隔离检查通过；本轮纯文案未进行浏览器视觉检查，未提交或部署。

- 视觉岗位精选项目现为7项/4组：01品牌营销视觉（雷朋、九州），02运营IP设计（吃豆人、E宝），03 AIGC×视觉（幻星），04视觉探索×练习（视觉设计探索、iPhone 17 Pro官网视觉练习）。视觉岗位已移除SU7入口，练习组两张卡片统一普通项目尺寸。视觉岗位移除独立开发两项和得物入口；首屏轮播同步为雷朋、九州、幻星。其他岗位及项目详情保留。修改 index.ejs 与 partial/builder-hero.ejs。
- 构建通过；1440/390px 浏览器分组顺序、数量2/2/1/2、移除入口及无溢出通过，桌面运营IP区及练习组截图已检查；AI与品牌岗位仍保留原分组和得物入口。预览4018；未提交或部署。

- 首页九州项目缩略图标题改为“九州缥缈录×视觉设计”，详情页标题保持原配置。构建与生成页面文字检查通过；纯文字修改未做浏览器视觉检查。

- 主视觉海报副标题已参考《苍云古齿》书目简介重写，强调南淮相遇、少年情义与乱世命运，并结合前后景构图解读，保留演员角色顺序。来源记录于 docs/novoland/SOURCES.md。本轮仅文案，构建通过，未重复进行浏览器视觉验证。

- 九州项目最新状态：用户PS合成图仅用于顶部主图与首页入口缩略图，1920×1080 WebP（533KB）；第1章节恢复原版6张带文字主创海报，桌面3列/手机单列。“九州的造境者”说明围绕六位主创分工与场景意象展开。第2节为“主视觉海报”，说明含宋祖儿/羽然、刘昊然/吕归尘（阿苏勒）、陈若轩/姬野的左右顺序与叙事，删除图下重复标题。
- 大图脚本支持独立 data-caption，移除图注仍可正常打开切换；其他项目保留原图注逻辑。构建通过，1440/390px 图片、7张打开/切换/Esc、导航、入口返回、无溢出通过，桌面章节及手机顶部截图已检查。预览4018；未提交、推送或部署。
- 原始海报与独立去字PNG均保留于 `assets-source/13_九州缥缈录/`；用户已自行PS合成，不再使用早期生成式六联画。

- 2026-09-14：视觉岗位新增“九州缥缈录×主创视觉”，入口 `/visual-designer/projects/novoland/`。指定目录7张 PNG 原件保留，网页英文命名 creator-01–06、ensemble-poster、cover，原尺寸 WebP quality92，7图总计17.45MB→2.61MB。封面由1/2/6等比并排；六张黑金主创海报桌面三列、平板两列、手机单列，第7张红色群像独立补充展示。文案依据用户背景与画面，不补写创作流程或业绩。
- 文件：`themes/portfolica/layout/novoland.ejs`、`themes/portfolica/source/css/novoland.css`、`source/projects/novoland/index.md`、`source/images/novoland/`；映射记录 `docs/novoland/SOURCES.md`。复用既有吸顶、hover与大图切换，金色强调、图注居中。构建通过；1440/390px 两章落点、7张大图打开/循环切换/Esc关闭、入口返回、图片完整与无横向溢出通过；桌面海报及手机首屏截图已检查。其他岗位无新增入口。最新预览4018；未提交、推送或部署。

- 2026-09-14：新增视觉岗位“E宝设计”，入口 `/visual-designer/projects/epo/`。仅提取 PPT 第12–18页7张单帧 PNG，原图 `assets-source/12_E宝设计/`，WebP `source/images/epo/`，来源记录 `docs/epo/SOURCES.md`。按背景、形象设计、产品应用、品牌视觉延展组织；原稿 Demo 保留概念标注，不补写投放或业绩。
- E宝模板 `themes/portfolica/layout/epo.ejs`，复用吃豆人样式/放大交互与章节脚本；6张正文图支持前后切换与 Esc 关闭，图注居中。构建通过，1440/390px 图片加载、无溢出、3节跳转、大图循环切换、首页进入与返回验证通过，首屏/手机延展截图已检查。其他岗位无新增入口。最新预览4017；未提交、推送或部署。

- 吃豆人海报区优化：说明取消 760px 限宽，宽屏单行、窄屏自然换行；三张海报标题居中，加入轻微缩放/提亮 hover 与大图弹窗，支持前后切换、方向键、Esc/背景/关闭按钮、焦点返回及 Lenis 滚动暂停恢复。仅该项目三张海报启用。新增 `themes/portfolica/source/js/eleme-pacman.js`。构建通过；1440/390px 实测说明 1/3 行、标题居中、无溢出，三图逐一打开、切换及 Esc 关闭通过，桌面海报与手机大图截图已检查。

- 2026-09-14：视觉岗位新增“饿了么×吃货卡吃豆人”，入口 `/visual-designer/projects/eleme-pacman/`，首页复用统一卡片。仅参考 PPT 第 5–11 页；采用指定文件夹全部 10 张原图转 WebP，按背景、形象探索、绑定与应用、海报传播、视觉延展组织。三张海报桌面三列/手机单列，图文统一边距，复用已修复的吸顶章节逻辑。
- 文件：`themes/portfolica/layout/eleme-pacman.ejs`、`themes/portfolica/source/css/eleme-pacman.css`、`source/projects/eleme-pacman/index.md`、`source/images/eleme-pacman/`；来源说明 `docs/eleme-pacman/SOURCES.md`。未提取其他项目素材。
- 动画待补：该 PPT 对应页与素材均是单帧 PNG/JPEG，没有可恢复的 GIF/视频；当前绑定区展示静态图，需原始 GIF 或保留动画的 PPT。未虚构成效数据。
- 构建通过；Chromium 1440/390px 两端 8 次章节点击落点误差小于 1px，高亮正常，无横向溢出；10 张图片加载完整，首页入口与返回正确。首屏/海报区截图视觉检查通过（测试屏蔽外部 CDN，原生滚动模式）。最新本地预览 4016；未提交、推送或部署。

- 新增“视觉设计探索”，副标题“掌上异想 · 手机元素系列”，仅加入视觉岗位，与雷朋卡片并排。入口 `/visual-designer/projects/visual-explorations/`。使用 `assets-source/09_视觉设计_其他/手机元素设计01–06.jpg`，原比例转 WebP，保留源图；01 封面、02/03 双图、04 大图、05/06 双图，手机单列。
- 文件：`source/projects/visual-explorations/index.md`、`themes/portfolica/layout/visual-explorations.ejs`、`themes/portfolica/source/css/visual-explorations.css`、`source/images/visual-explorations/`。复用雷朋黑底、返回链接及已验证的吸顶脚本。说明仅依据图像，不补写未经提供的客户、年份、生产过程或业绩。
- 视觉探索排版已统一：封面、章节标题、双图/大图共用左右边距；图片说明取消二次缩进，编号/标题/正文统一纵排；统一 8px 倍数间距、桌面 24px 栏距、手机 20px 页边距。仅修改专属样式。1440/390px 浏览器测量标题/图片/说明左边缘一致，无溢出且章节跳转正常；截图视觉检查通过。
- 构建通过；1440/390px 章节跳转、高亮、无溢出检查通过，双图与手机单列截图已视觉检查；六图数量、岗位隔离、首页进入与返回通过。旧 4014 服务缓存路由，最新预览 4015。未提交、推送或部署。

- 2026-09-14：视觉岗位新增“雷朋×天猫双十一主视觉”，位于“品牌营销视觉”首位分组，原分组编号顺延。入口 `/visual-designer/projects/rayban-tmall/`。使用 `assets-source/10_雷朋天猫双十一主视觉/` 的 01–04 图，原比例 2560×1440 转 WebP，原文件保留。
- 首图左下角加入用户提供的 2019 项目背景；手机端移到图下，避免遮挡。依次展示创意制作、视觉细节、广告应用，返回保持视觉岗位。
- 雷朋详情页优化：最顶部主标题、年份及副标题整组居中，左侧新增“返回作品集”直达所属视觉岗位首页；章节标题与说明保持左对齐，页面及顶部/底部为纯黑；移除图片点击与提示；背景说明去掉半透底并区分标题/正文灰度。章节栏复用得物样式与全局导航高度，吸顶及随滚动高亮由 `js/rayban-tmall.js` 处理。已修复章节跳转：统一调用现有 Lenis 实例，按导航实测高度计算落点；末节补足可滚动高度，避免手机端广告应用无法对齐。构建通过；Playwright 真实 Chromium 在 1440px/390px、原生滚动/真实 Lenis 两种模式共 16 次点击往返验证通过，吸顶与落点偏差均小于 1px，章节高亮正确。
- 首页分组标题改为“品牌营销视觉”；封面换用用户提供的 `雷朋cover.jpg`，压缩为 `source/images/rayban-tmall/cover.webp`，卡片复用普通项目样式。构建通过；1440px 浏览器实测 611×470，与得物、幻星、嘟记豆等卡片一致，封面已视觉检查。
- 本轮顶部调整构建通过；Chromium 验证 1440px/390px 标题居中且无横向溢出，点击返回实际进入 `/visual-designer/`，其余内容与滚动逻辑未改。
- 文件：`source/projects/rayban-tmall/index.md`、`themes/portfolica/layout/rayban-tmall.ejs`、`themes/portfolica/source/css/rayban-tmall.css`、`source/images/rayban-tmall/`，并调整共用首页、head 和路由。
- 构建及图片顺序、背景、素材、入口返回与岗位隔离检查通过。桌面/手机章节交互已浏览器验证；手机吸顶截图已检查。预览端口 4014；未提交、推送或部署。

- 2026-09-13：按用户要求移除伴饭项目与视觉岗位“品牌视觉与包装设计”分组；清除专属模板、样式、素材、文档、路由和生成页面，原三个分组编号恢复 01–03。构建和残留/编号检查通过；未做本轮视觉验证，未提交或部署。

- 2026-09-12：`/3d/` 首页完整复用视觉设计师页面（轮播、经历、技能及联系区），保留 3D 设计标题与岗位身份；岗位标签显示逻辑与视觉岗位一致。
- 3D 简历数据独立复制至 `source/_data/three_d.yml`，后续在此优化，不联动视觉岗位；模板按岗位选择数据。`scripts/portfolio-context.js` 新增六个 `/3d/projects/{slug}/` 专属项目，保持项目导航归属。
- 3D 首页下方精选项目仅保留幻星、得物，分组改为“三维设计与数字资产”，说明聚焦造型、材质、视觉表现与生产规范；隐藏 AI 独立开发和网页设计分组。首屏轮播保持原样。
- 本轮构建与生成 HTML 检查通过：3D 项目区仅有两项，其他岗位分组完整。未做浏览器视觉验证；未提交、推送或部署。

已完成“品牌与创意设计师”岗位与 Meshy 自主品牌传播项目第二版。本轮按反馈重做为视觉规范图板型案例。本地最新预览 4004；尚未提交、推送或部署。

- 第二版补齐标识安全区/最小尺寸、中英字体层级与本地化、12 栏栅格开关、8px 间距、按钮尺寸、颜色比例/对比示例、材质视觉族群、双语海报和四画幅适配；压缩说明文字。所有数值明确为本提案规则。
- 新增 form-family.webp 与原 PNG，生成来源/提示词记于 docs/meshy/DESIGN_NOTES.md。维持自主概念项目声明，无虚构商业结果。
- 第二版构建通过；桌面字体/栅格/间距/双语海报及 390px 手机字体/海报视觉检查通过，检查时无横向溢出或已加载图片损坏。栅格显示切换通过；修正手机动效样式优先级。本轮未重新完整测试 12 秒动效全部分支。

- 新岗位入口 /brand-creative/，复制视觉岗位经历、技能和六个作品，首位新增 Meshy 项目 /brand-creative/projects/meshy/。
- 主题“想象，有了形状 / Ideas take shape”：原创 AI 概念主视觉与材质探索、三种创意方向、视觉规则、两款社交海报、落地页提案和 12 秒网页动效。
- 明确为非官方委托，不冒充 Meshy 实际生成结果；无真实投放数据。真实产品生成/导出流程与用户理解测试待后续验证。
- 构建通过；三个岗位共 22 页路径、素材、岗位隔离和干净链接检查通过。桌面首屏/海报/封面、390px 手机案例首屏与岗位首页已视觉检查，无横向溢出；综合页进入新岗位、项目进入与返回通过。
- 动效浏览器播放通过；脚本开始/完成/停止/重播/减少动态效果分支检查通过。素材已压缩为 128 KB 与 113 KB WebP。

## 当前实现

- 所有岗位入口共用 `partial/role-switcher.ejs`；新增“品牌与创意设计师”标签。独立岗位默认隐藏，手动 `?preview=1` 显示且不传播参数。

- 视觉设计师岗位已加入综合/3D 首页及岗位预览切换；默认隐藏岗位标签，手动 `?preview=1` 显示且不传播参数。职业内容单独存于 `source/_data/visual_designer.yml`，复用现有模板和样式；AI 岗位职业内容保持原样。

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

- 品牌岗位：`source/brand-creative/index.md`、`source/_data/brand_creative.yml`。
- Meshy 案例：`source/projects/meshy/index.md`、`themes/portfolica/layout/meshy.ejs`、`source/css/meshy-case.css`、`source/js/meshy-case.js`（后两者位于主题目录）。
- 图片：`source/images/meshy/`；生成提示词、来源与设计说明：`docs/meshy/DESIGN_NOTES.md`。

- 新岗位：`source/visual-designer/index.md`、`source/_data/visual_designer.yml`；共用路由：`scripts/portfolio-context.js`。

- `themes/portfolica/layout/index.ejs`、`partial/builder-hero.ejs`、`partial/builder-capabilities.ejs`。
- `themes/portfolica/source/css/builder-hero.css`、`style.css`、`js/builder-hero.js`、`main.js`。
- `scripts/portfolio-context.js`、`source/ai-native-builder/index.md`、`source/ai-product/index.md`、`js/portfolio-preview.js`及共用导航模板。

## 验证与发布

- 本轮构建通过；静态断言验证空白根页、完整首页标签、综合项目返回、AI 默认隐藏标签及六个岗位项目返回路径。未做本轮浏览器视觉验证。已提交并推送 536a086；GitHub Actions 34195078017 completed/success，线上根地址空白、alljobs 标签、AI 默认隐藏标签、Kevin 标识及嘟记豆返回路径检查通过。
- 干净构建通过；七个岗位页面静态链接/素材检查通过，HMI 输出无残留。
- 已浏览器验证岗位入口、往返路径、预览开关、刷新、旧地址跳转、轮播、联系复制；多次桌面视觉检查通过。近期小幅排版调整未逐项重做手机视觉验证。
- 已提交并推送 9e3d298（Launch AI Native Builder portfolio and refresh project showcases）。GitHub Actions 34193960324 completed/success，GitHub Pages 部署成功。线上 /ai-native-builder/ 验证新文案、默认隐藏岗位标签和专属项目链接，嘟记豆项目返回 /ai-native-builder/#projects 检查通过。
- 最新 Hexo 预览运行于 4004，包含 Meshy 第二版；4003 及更早服务可能缓存旧模板。
- `docs/` 未提交参考资料与 `assets-source/` 原始素材留在本地，不纳入本次发布。
