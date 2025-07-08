// 测试速度解析功能
const fs = require('fs');

// 模拟 Sub-Store 环境
global.$arguments = { speed: true, flag: true, out: 'cn' };

// 读取并执行 rename.js
const renameScript = fs.readFileSync('./rename.js', 'utf8');
eval(renameScript);

// 测试数据 - 从 proxies.yaml 中提取的节点名称
const testProxies = [
  { name: 'KR_Seoul_Amazon.com, Inc._OpenAI_Claude_3.4MB', type: 'ss' },
  { name: 'NL_Amsterdam_DigitalOcean, LLC_OpenAI_Claude_8.2MB', type: 'ss' },
  { name: 'DE_Frankfurt am Main_DigitalOcean, LLC_OpenAI_Claude_7.1MB', type: 'ss' },
  { name: 'CH_Zurich_GTHost_OpenAI_Claude_3.7MB', type: 'ss' },
  { name: 'US_Los Angeles_Akamai Technologies, Inc._OpenAI_Claude_9.5MB', type: 'ss' },
  { name: 'GB_London_Krystal Hosting Ltd_OpenAI_Claude_8.5MB', type: 'ssr' },
  { name: 'HK_Kwong Yuen_PCCW IMS Limited_OpenAI_Claude_3.0MB', type: 'vmess' }
];

// 测试不同的参数组合
const testConfigs = [
  { name: '启用速度解析 + 国旗', args: { speed: true, flag: true, out: 'cn' } },
  { name: '启用速度解析 + 无国旗', args: { speed: true, out: 'cn' } },
  { name: '禁用速度解析', args: { flag: true, out: 'cn' } },
  { name: '速度解析 + 英文输出', args: { speed: true, flag: true, out: 'en' } }
];

console.log('=== 速度解析功能测试 ===\n');

testConfigs.forEach(config => {
  console.log(`\n--- ${config.name} ---`);
  
  // 设置全局参数
  global.$arguments = config.args;
  
  // 重新执行脚本以应用新参数
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
});

console.log('\n=== 测试完成 ===');