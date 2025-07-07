// 测试不同输出格式的效果

const fs = require('fs');
const path = require('path');

// 读取 rename.js 文件内容
const renameScript = fs.readFileSync(path.join(__dirname, 'rename.js'), 'utf8');

// 测试数据
const testProxies = [
  { name: 'vn|8993|puddincat07@Telegram', type: 'vless' },
  { name: 'cf|bd42|puddincat07@Telegram', type: 'vless' },
  { name: 'de|bf05|puddincat07@Telegram', type: 'vless' },
  { name: 'gb|c053|puddincat07@Telegram', type: 'ssr' },
  { name: 'us|8f35|puddincat07@Telegram', type: 'vless' },
  { name: 'jp|c74a|puddincat07@Telegram', type: 'vless' },
  { name: 'sg|bcab|puddincat07@Telegram', type: 'trojan' }
];

// 测试不同的输出格式
const testConfigs = [
  { name: '中文 + 国旗', args: { flag: true, out: 'cn' } },
  { name: '英文缩写 + 国旗', args: { flag: true, out: 'en' } },
  { name: '英文全称 + 国旗', args: { flag: true, out: 'quan' } },
  { name: '仅中文', args: { out: 'cn' } },
  { name: '仅英文缩写', args: { out: 'en' } },
  { name: '添加前缀', args: { flag: true, out: 'cn', name: '机场' } }
];

console.log('=== 测试不同输出格式 ===\n');

testConfigs.forEach(config => {
  console.log(`--- ${config.name} ---`);
  
  try {
    // 重新设置全局变量
    global.$arguments = config.args;
    
    // 重新执行脚本以应用新参数
    eval(renameScript);
    
    // 创建测试数据副本
    const testData = testProxies.map(p => ({ ...p }));
    
    const result = operator(testData);
    
    result.forEach((proxy, index) => {
      if (proxy.name) {
        console.log(`  ${testProxies[index].name.split('|')[0]} -> ${proxy.name}`);
      }
    });
    
  } catch (error) {
    console.error(`  错误: ${error.message}`);
  }
  
  console.log('');
});