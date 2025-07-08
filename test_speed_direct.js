// 直接测试速度解析功能
const fs = require('fs');

// 测试不同速度格式的节点名称
const testProxies = [
  { name: 'US_Test_Server_100MB', type: 'ss' },
  { name: 'HK_Test_Server_1.5GB', type: 'ss' },
  { name: 'JP_Test_Server_500Mbps', type: 'ss' },
  { name: 'SG_Test_Server_2.3Gbps', type: 'ss' },
  { name: 'DE_Test_Server_150MB/s', type: 'ss' },
  { name: 'GB_Test_Server_1.2GB/s', type: 'ss' },
  { name: 'KR_Test_Server_50mb', type: 'ss' },
  { name: 'FR_Test_Server_3gb', type: 'ss' },
  { name: 'CA_Test_Server_NoSpeed', type: 'ss' }
];

console.log('=== 直接速度解析测试 ===\n');

// 测试正则表达式
const speedRegex = /(\d+(?:\.\d+)?)\s*(MB\/s|GB\/s|MB|GB|Mbps|Gbps|mb\/s|gb\/s|mb|gb|mbps|gbps)(?!\w)/i;

testProxies.forEach((proxy, index) => {
  const match = proxy.name.match(speedRegex);
  console.log(`${index + 1}. ${proxy.name}`);
  if (match) {
    console.log(`   速度信息: ${match[0]}`);
  } else {
    console.log('   无速度信息');
  }
});

console.log('\n--- 使用 rename.js 脚本测试 ---\n');

// 模拟 Sub-Store 环境
global.$arguments = { speed: true, out: 'cn' };

// 读取并执行 rename.js
const renameScript = fs.readFileSync('./rename.js', 'utf8');
eval(renameScript);

// 创建测试数据的副本
const testData = JSON.parse(JSON.stringify(testProxies));

// 执行重命名
const result = operator(testData);

// 输出结果
result.forEach((proxy, index) => {
  if (proxy.name) {
    console.log(`${index + 1}. ${testProxies[index].name}`);
    console.log(`   -> ${proxy.name}`);
  }
});

console.log('\n=== 测试完成 ===');