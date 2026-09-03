# Project 01 / iPhone 17 Pro Max 产品视觉化基准

## 项目定位

以真实 iPhone 17 Pro Max 为对象的高端产品视觉化案例。页面对外使用成熟的项目标题和专业职责描述，不使用“练习作品”作为视觉主叙事，也不虚构 Apple 委托或官方合作关系。

## 不可变产品事实

- 机型：iPhone 17 Pro Max（2025）
- 尺寸：78.0 × 163.4 × 8.75 mm
- 屏幕：6.9 英寸，圆角全面屏，Dynamic Island
- 结构：7000 系航空级铝合金一体式机身
- 正面：Ceramic Shield 2
- 背面：Ceramic Shield
- 后摄：三枚 48MP Fusion 摄像头
- 背部特征：横向延展的相机平台、三镜头、闪光灯、LiDAR 与麦克风结构
- 官方颜色：Deep Blue / Cosmic Orange / Silver
- 本案例主色：Deep Blue

## 艺术方向

- 关键词：Precision / Monolithic / Controlled Reflection / Quiet Luxury
- 背景：黑色至深海军蓝的无缝影棚环境
- 主光：左后上方大面积柔光，勾勒铝合金边缘
- 辅光：低强度冷蓝轮廓光，用于区分机身与背景
- 镜头：70–100mm 产品摄影视感，控制透视，不使用超广角畸变
- 表面：细腻拉丝铝、低粗糙度镜头玻璃、克制的背部玻璃反射
- 构图：横向 16:9，主体占画面约 62%，保留网页标题安全区
- 后期：高动态范围但不过曝，深色区域仍保留材质层次

## 基准图目标

生成一张无文字、无宣传标语、无水印的 Deep Blue iPhone 17 Pro Max 三分之二背面 Hero Shot。基准图只负责锁定：

1. 机身长宽比例
2. 相机平台与三镜头结构
3. 深蓝色铝合金和背板材质
4. 镜头、按钮和边缘结构
5. 后续整套作品的灯光方向

基准图通过前，不生成微距、材质、过程和氛围镜头。

## 基准图验收

- [ ] 与官方参考相比，产品轮廓和长宽比例可信
- [ ] 相机平台、三镜头、闪光灯和 LiDAR 位置合理
- [ ] 没有增加或丢失镜头、按钮和结构线
- [ ] 深蓝铝合金、背板玻璃与镜头玻璃材质可区分
- [ ] 机身边缘无融化、扭曲、重复结构或错误倒角
- [ ] 无乱码、错误文字和水印
- [ ] 光影适合继续扩展为完整案例
- [ ] 用户确认：`Project 01 Visual Baseline OK`

## 官方依据

- Apple Newsroom: https://www.apple.com/newsroom/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/
- Apple Technical Specifications: https://www.apple.com/iphone-17-pro/specs/

## 基准图生成记录

- 模式：内置 ImageGen，`product-mockup` / `precise-object-edit`
- 文件：`assets-source/07_3D产品渲染_iPhone17ProMax/generated/iphone17promax-hero-baseline-v1.png`
- 参考：三张 Apple Newsroom 官方产品图
- 第一轮问题：可见右侧边缘出现过多控制件
- 第二轮修正：改为左侧边缘视角，减少错误控制件，保留深蓝材质、相机平台、留白和棚拍光线
- 当前用途：视觉方向与页面 Hero 基准；用户确认前不继续生成后续镜头

最终提示词摘要：真实 2025 iPhone 17 Pro Max、官方 Deep Blue、横向相机平台和三镜头结构、三分之二背面视角、70–100mm 产品摄影透视、黑至深海军蓝背景、左后上方柔光、冷蓝轮廓光、左侧保留网页文字安全区；禁止额外镜头、重复按钮、错误相机岛、变形边缘、塑料材质、文字和水印。
