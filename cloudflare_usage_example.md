# Cloudflare 节点支持使用指南

## 概述

现在已经为 `rename.js` 和 `convert.js` 添加了完整的 Cloudflare 节点支持，可以自动识别和管理 Cloudflare 相关的节点。

## rename.js 中的 Cloudflare 支持

### 手动指定功能

使用 `country=cf` 参数可以将所有节点强制设置为 Cloudflare：

```
https://example.com/rename.js#country=cf&out=cn
```

**支持的输入格式：**
- `cf` - 国家代码
- `cloudflare` - 完整名称
- `Cloudflare` - 中文名称（直接输入）

**示例效果：**
```
输入节点: Random Node 01, Test Server 02
输出节点: Cloudflare 01, Cloudflare 02
```

### 自动识别功能

脚本会自动识别包含以下关键词的节点：
- `Cloudflare`
- `CF`
- `☁️` (云朵图标)

**示例：**
```
输入: [mygo] Cloudflare 01 → 输出: Cloudflare 01
输入: ☁️ CF Node → 输出: Cloudflare 01  
输入: CF-HK-01 → 输出: Cloudflare 01
```

## convert.js 中的 Cloudflare 支持

### 自动代理组生成

当检测到 3 个或以上的 Cloudflare 节点时，会自动创建 "Cloudflare节点" 代理组：

**代理组配置：**
- 名称: `Cloudflare节点`
- 图标: Cloudflare 官方图标
- 类型: `url-test` 或 `load-balance`（根据配置）
- 过滤器: `(?i)Cloudflare|CF|☁️`

### 静态资源优化

当存在 Cloudflare 节点时，"静态资源" 代理组会优先使用 Cloudflare 节点：

```json
{
  "name": "静态资源",
  "proxies": ["Cloudflare节点", "节点选择", "手动切换", "全球直连"]
}
```

## 完整使用流程

### 1. 使用 rename.js 统一节点名称

```
https://example.com/rename.js#country=cf&flag&out=cn
```

这会将所有节点重命名为：`☁️ Cloudflare 01`, `☁️ Cloudflare 02` 等

### 2. 使用 convert.js 生成配置

convert.js 会自动：
- 识别 Cloudflare 节点
- 创建 "Cloudflare节点" 代理组
- 优化静态资源路由

### 3. 最终效果

生成的配置中会包含：
- ✅ Cloudflare节点 代理组（包含所有 CF 节点）
- ✅ 静态资源优先使用 Cloudflare
- ✅ 自动负载均衡或故障转移

## 支持的节点名称格式

以下格式的节点都会被正确识别：

```
✅ [mygo] Cloudflare 01
✅ ☁️ CF Node 01  
✅ Cloudflare-HK-01
✅ CF 香港 01
✅ 🌐 Cloudflare Premium
✅ CF-Premium-SG
```

## 注意事项

1. **节点数量要求**: convert.js 只为节点数 ≥ 3 的地区创建代理组
2. **优先级**: 手动指定 (`country=cf`) 优先级最高，会覆盖自动识别
3. **兼容性**: 完全向后兼容，不影响现有功能
4. **图标支持**: 自动使用 Cloudflare 官方图标和云朵 emoji

## 技术细节

### 正则表达式
```javascript
"Cloudflare": "(?i)Cloudflare|CF|☁️"
```

### 数组索引对齐
- FG[189] = ☁️
- EN[189] = CF  
- ZH[189] = Cloudflare
- QC[189] = Cloudflare

所有数组已完成索引对齐，确保功能正常。