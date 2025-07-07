# Sub-Store 节点重命名脚本

这是一个用于 Sub-Store 的节点重命名脚本，可以自动识别和转换代理节点名称格式，支持多种输入输出格式和自定义规则。

## 功能特性

### 🌍 多格式支持
- **输入识别**: 自动判断节点名类型（中文/国旗/英文全称/英文简写）
- **输出格式**: 支持中文、英文缩写、国旗、英文全称输出
- **智能匹配**: 优先级自动判断 zh(中文) → flag(国旗) → quan(英文全称) → en(英文简写)

### 🔧 自定义参数

#### 主要参数
- `in=` - 指定输入格式识别方式
  - `zh` 或 `cn`: 识别中文
  - `en` 或 `us`: 识别英文缩写
  - `flag` 或 `gq`: 识别国旗
  - `quan`: 识别英文全称
- `out=` - 指定输出格式
  - `cn` 或 `zh`: 输出中文
  - `us` 或 `en`: 输出英文缩写
  - `gq` 或 `flag`: 输出国旗
  - `quan`: 输出英文全称
- `nm` - 保留没有匹配到的节点

#### 分隔符参数
- `fgf=` - 节点名前缀或国旗分隔符（默认空格）
- `sn=` - 国家与序号之间的分隔符（默认空格）

#### 序号参数
- `one` - 清理只有一个节点的地区的01序号
- `flag` - 给节点前面加国旗

#### 前缀参数
- `name=` - 节点添加机场名称前缀
- `nf` - 把 name= 的前缀值放在最前面

#### 保留参数
- `blkey=` - 保留节点名的自定义字段（用+号添加多个关键词）
  - 支持替换功能：`GPT>新名字` 将GPT替换为新名字
  - 示例：`blkey=iplc+GPT>新名字+NF`
- `blgd` - 保留家宽、IPLC、ˣ² 等标识
- `bl` - 正则匹配保留倍率标识 [0.1x, x0.2, 6x, 3倍]
- `nx` - 保留1倍率与不显示倍率的节点
- `blnx` - 只保留高倍率节点
- `clear` - 清理乱名
- `blpx` - 对保留标识后的名称分组排序

#### 其他参数
- `blockquic=on/off` - 控制QUIC阻止设置
- `noCache` - 禁用缓存

## 使用方法

### 基本用法
在 Sub-Store 脚本操作中添加以下URL：
```
https://raw.githubusercontent.com/jackcsq/sub-store-rename-script/main/rename.js
```

### 带参数使用
参数必须以 `#` 开头，多个参数使用 `&` 连接：
```
https://raw.githubusercontent.com/jackcsq/sub-store-rename-script/main/rename.js#flag&out=en&name=机场名
```

### 使用示例

#### 1. 添加国旗并输出英文
```
#flag&out=en
```

#### 2. 保留特定关键词并替换
```
#blkey=GPT>ChatGPT+IPLC+游戏
```

#### 3. 添加机场前缀并清理序号
```
#name=我的机场&one&flag
```

#### 4. 只保留高倍率节点
```
#blnx&bl&blpx
```

## 支持的地区

脚本内置了完整的国家/地区映射数据库，包括：
- 🇭🇰 香港 / Hong Kong / HK
- 🇹🇼 台湾 / Taiwan / TW
- 🇯🇵 日本 / Japan / JP
- 🇰🇷 韩国 / Korea / KR
- 🇸🇬 新加坡 / Singapore / SG
- 🇺🇸 美国 / United States / US
- 🇬🇧 英国 / United Kingdom / GB
- ☁️ Cloudflare / CF
- 🇻🇳 越南 / Vietnam / VN
- 🇩🇪 德国 / Germany / DE
- 🇪🇸 西班牙 / Spain / ES
- 🇷🇺 俄罗斯 / Russia / RU
- 🇰🇿 哈萨克斯坦 / Kazakhstan / KZ
- 🇪🇪 爱沙尼亚 / Estonia / EE
- 等200+个国家和地区

## 特殊格式支持

### 管道分隔格式
脚本现在支持识别以下格式的节点名称：
```
国家代码|ID|其他信息
```

**支持的格式示例：**
- `vn|8993|puddincat07@Telegram` → `🇻🇳 越南 01`
- `cf|bd42|puddincat07@Telegram` → `☁️ Cloudflare 01`
- `de|bf05|puddincat07@Telegram` → `🇩🇪 德国 01`
- `gb|c053|puddincat07@Telegram` → `🇬🇧 英国 01`
- `us|8f35|puddincat07@Telegram` → `🇺🇸 美国 01`
- `jp|c74a|puddincat07@Telegram` → `🇯🇵 日本 01`
- `sg|bcab|puddincat07@Telegram` → `🇸🇬 新加坡 01`

**输出格式示例：**
- 中文 + 国旗：`#flag&out=cn` → `🇻🇳 越南 01`
- 英文缩写 + 国旗：`#flag&out=en` → `🇻🇳 VN 01`
- 英文全称 + 国旗：`#flag&out=quan` → `🇻🇳 Vietnam 01`
- 添加前缀：`#flag&out=cn&name=机场` → `🇻🇳 机场 越南 01`

## 安全性

✅ **完全本地处理** - 脚本在本地运行，不会上传任何数据
✅ **无网络通信** - 不包含任何网络请求代码
✅ **隐私保护** - 不会泄露机场信息或节点数据
✅ **开源透明** - 代码完全开源，可自行审查

## 技术实现

### 核心函数
- `operator(pro)` - 主处理函数，负责节点名称转换
- `jxh(e)` - 为重复节点名添加序号
- `oneP(e)` - 清理单节点地区的01序号
- `fampx(pro)` - 按特殊规则排序节点

### 数据结构
- 国旗emoji数组 (FG)
- 英文缩写数组 (EN)
- 中文名称数组 (ZH) 
- 英文全称数组 (QC)
- 特殊正则表达式匹配

## 更新日志

- **2025-01-07**: 新增管道分隔格式支持，可识别 `国家代码|ID|其他信息` 格式的节点名称
- **2024-04-05**: 最新版本，支持完整的参数配置和地区映射

## 许可证

本项目采用开源许可证，可自由使用和修改。

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个脚本。

---

**注意**: 使用前请确保 Sub-Store 版本支持脚本操作功能。