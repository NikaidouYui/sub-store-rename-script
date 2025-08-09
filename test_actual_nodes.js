// 测试实际节点名称的匹配情况
console.log("测试实际 p.yaml 中的节点名称匹配...\n");

// 实际的节点名称
const actualNodes = [
    "[mygo] Cloudflare 01",
    "[mygo] Cloudflare 02", 
    "[mygo] Cloudflare 03"
];

// 当前的正则表达式
const currentRegex = /Cloudflare|CF|☁️/i;

// 测试匹配
console.log("当前正则表达式测试:");
actualNodes.forEach(name => {
    const matches = currentRegex.test(name);
    console.log(`  ${name}: ${matches ? "✅ 匹配" : "❌ 不匹配"}`);
});

// 问题分析
console.log("\n问题分析:");
console.log("当前正则: (?i)Cloudflare|CF|☁️");
console.log("实际节点: [mygo] Cloudflare 01");
console.log("应该能匹配 'Cloudflare' 部分");

// 测试修正后的正则
const fixedRegex = /Cloudflare|CF|☁️/i;
console.log("\n修正后的正则表达式测试:");
actualNodes.forEach(name => {
    const matches = fixedRegex.test(name);
    console.log(`  ${name}: ${matches ? "✅ 匹配" : "❌ 不匹配"}`);
});

// 模拟 convert.js 的解析过程
console.log("\n模拟解析过程:");
const mockConfig = {
    proxies: actualNodes.map((name, i) => ({ name, server: `1.1.1.${i+1}` }))
};

const countryRegex = {
    "Cloudflare": "(?i)Cloudflare|CF|☁️"
};

function parseCountries(config) {
    const proxies = config.proxies || [];
    const countryCounts = Object.create(null);
    
    const compiledRegex = {};
    for (const [country, pattern] of Object.entries(countryRegex)) {
        // 移除 (?i) 前缀并添加 i 标志
        compiledRegex[country] = new RegExp(
            pattern.replace(/^\(\?i\)/, ''),
            'i'
        );
    }
    
    for (const proxy of proxies) {
        const name = proxy.name || '';
        
        for (const [country, regex] of Object.entries(compiledRegex)) {
            if (regex.test(name)) {
                countryCounts[country] = (countryCounts[country] || 0) + 1;
                console.log(`  匹配: ${name} -> ${country}`);
                break;
            }
        }
    }
    
    return Object.entries(countryCounts).map(([country, count]) => ({ country, count }));
}

const result = parseCountries(mockConfig);
console.log("\n解析结果:", result);

if (result.length > 0 && result[0].count >= 3) {
    console.log("✅ 应该会生成 Cloudflare节点 代理组");
} else {
    console.log("❌ 不会生成 Cloudflare节点 代理组");
    console.log(`节点数量: ${result[0]?.count || 0}, 需要 >= 3`);
}