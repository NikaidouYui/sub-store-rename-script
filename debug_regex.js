// 调试正则表达式
const testStrings = [
  'US_Test_Server_100MB',
  'HK_Test_Server_1.5GB', 
  'JP_Test_Server_500Mbps',
  'SG_Test_Server_2.3Gbps',
  'DE_Test_Server_150MB/s',
  'GB_Test_Server_1.2GB/s',
  'KR_Test_Server_50mb',
  'FR_Test_Server_3gb'
];

const regex = /(\d+(?:\.\d+)?)\s*(MB|GB|Mbps|Gbps|MB\/s|GB\/s|mb|gb|mbps|gbps)(?!\w)/i;

console.log('=== 正则表达式调试 ===\n');

testStrings.forEach(str => {
  const match = str.match(regex);
  console.log(`${str}:`);
  if (match) {
    console.log(`  匹配: ${match[0]}`);
    console.log(`  数字: ${match[1]}`);
    console.log(`  单位: ${match[2]}`);
  } else {
    console.log('  无匹配');
  }
  console.log('');
});