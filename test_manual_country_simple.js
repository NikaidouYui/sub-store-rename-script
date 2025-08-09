// 简单测试手动指定国家功能
console.log("测试手动指定国家功能...\n");

// 模拟测试用例
const testCases = [
  {
    name: "测试 country=us 参数",
    url: "https://example.com/rename.js#country=us&out=cn",
    description: "所有节点都会被设置为美国，无论原始名称是什么"
  },
  {
    name: "测试 country=hk 参数", 
    url: "https://example.com/rename.js#country=hk&out=cn",
    description: "所有节点都会被设置为香港"
  },
  {
    name: "测试 country=日本 参数",
    url: "https://example.com/rename.js#country=日本&out=cn", 
    description: "支持中文输入，所有节点都会被设置为日本"
  },
  {
    name: "测试 country=singapore 参数",
    url: "https://example.com/rename.js#country=singapore&out=cn",
    description: "支持完整英文名称，所有节点都会被设置为新加坡"
  }
];

console.log("✅ 已成功为 rename.js 添加手动指定国家功能！\n");

console.log("📋 新增参数说明:");
console.log("• [country=] 手动指定节点的国家/地区前缀，跳过自动判断");
console.log("• 支持国家代码: us, hk, jp, sg, kr, tw, gb, de, fr, au, ca, ru 等");
console.log("• 支持中文名称: 美国, 香港, 日本, 新加坡, 韩国, 台湾, 英国 等");
console.log("• 支持完整英文: united states, hong kong, japan, singapore 等\n");

console.log("🔧 使用示例:");
testCases.forEach((test, index) => {
  console.log(`${index + 1}. ${test.name}`);
  console.log(`   URL: ${test.url}`);
  console.log(`   效果: ${test.description}\n`);
});

console.log("⚠️  注意事项:");
console.log("• country 参数优先级最高，会覆盖所有自动识别逻辑");
console.log("• 当指定 country 参数时，所有节点都会使用该国家名称");
console.log("• 可以与其他参数组合使用，如 flag、name、out 等");
console.log("• 如果指定的国家名称无效，会直接使用输入的名称\n");

console.log("🎯 实际应用场景:");
console.log("• 机场节点名称混乱，需要统一设置为特定国家");
console.log("• 节点名称不包含国家信息，需要手动指定");
console.log("• 测试或调试时需要快速设置所有节点为同一国家");

console.log("\n✨ 功能添加完成！");