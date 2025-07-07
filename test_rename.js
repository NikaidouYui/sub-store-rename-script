// 测试脚本：验证 rename.js 是否能正确识别 proxies.yaml 中的节点格式

// 模拟 Sub-Store 环境
const $arguments = { flag: true, out: 'cn' }; // 添加国旗，输出中文

// 引入 rename.js 的核心逻辑
const fs = require('fs');
const path = require('path');

// 读取 rename.js 文件内容并执行
const renameScript = fs.readFileSync(path.join(__dirname, 'rename.js'), 'utf8');

// 提取 operator 函数和相关变量
eval(renameScript);

// 模拟测试数据 - 从 proxies.yaml 中提取的节点名称
const testProxies = [
  { name: 'vn|8993|puddincat07@Telegram', type: 'vless' },
  { name: 'cf|bd42|puddincat07@Telegram', type: 'vless' },
  { name: 'de|bf05|puddincat07@Telegram', type: 'vless' },
  { name: 'gb|c053|puddincat07@Telegram', type: 'ssr' },
  { name: 'us|8f35|puddincat07@Telegram', type: 'vless' },
  { name: 'es|7112|puddincat07@Telegram', type: 'trojan' },
  { name: 'ru|4545|puddincat07@Telegram', type: 'vless' },
  { name: 'jp|c74a|puddincat07@Telegram', type: 'vless' },
  { name: 'kz|de61|puddincat07@Telegram', type: 'vless' },
  { name: 'ee|b291|puddincat07@Telegram', type: 'vless' },
  { name: 'sg|bcab|puddincat07@Telegram', type: 'trojan' }
];

console.log('=== 测试 rename.js 对 proxies.yaml 节点的识别能力 ===\n');

console.log('原始节点名称 -> 重命名后的节点名称');
console.log('----------------------------------------');

try {
  const result = operator(testProxies);
  
  result.forEach((proxy, index) => {
    const original = testProxies[index].name;
    const renamed = proxy.name;
    console.log(`${original} -> ${renamed}`);
  });
  
  console.log('\n=== 测试结果统计 ===');
  console.log(`总节点数: ${testProxies.length}`);
  console.log(`成功重命名: ${result.filter(p => p.name !== null).length}`);
  console.log(`识别失败: ${result.filter(p => p.name === null).length}`);
  
} catch (error) {
  console.error('测试过程中出现错误:', error.message);
  console.error('错误堆栈:', error.stack);
}