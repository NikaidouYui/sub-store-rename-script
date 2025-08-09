// 测试 Cloudflare 代理组功能
console.log("测试 Cloudflare 代理组功能...\n");

// 模拟配置数据
const mockConfig = {
    proxies: [
        { name: "[xw] Cloudflare 01", server: "1.1.1.1" },
        { name: "[wewe] Cloudflare 02", server: "1.0.0.1" },
        { name: "☁️ CF Node 01", server: "8.8.8.8" },
        { name: "香港 01", server: "2.2.2.2" },
        { name: "美国 01", server: "3.3.3.3" },
        { name: "日本 01", server: "4.4.4.4" }
    ]
};

// 从 convert.js 提取相关函数和常量
const countryRegex = {
    "香港": "(?i)香港|港|HK|hk|Hong Kong|HongKong|hongkong",
    "美国": "(?i)美国|美|US|United States",
    "日本": "(?i)日本|川日|东京|大阪|泉日|埼玉|沪日|深日|JP|Japan",
    "Cloudflare": "(?i)Cloudflare|CF|☁️",
};

function parseCountries(config) {
    const proxies = config.proxies || [];
    const ispRegex = /家宽|家庭|家庭宽带|商宽|商业宽带|星链|Starlink|落地/i;

    const countryCounts = Object.create(null);

    const compiledRegex = {};
    for (const [country, pattern] of Object.entries(countryRegex)) {
        compiledRegex[country] = new RegExp(
            pattern.replace(/^\(\?i\)/, ''),
            'i'
        );
    }

    for (const proxy of proxies) {
        const name = proxy.name || '';

        if (ispRegex.test(name)) continue;

        for (const [country, regex] of Object.entries(compiledRegex)) {
            if (regex.test(name)) {
                countryCounts[country] = (countryCounts[country] || 0) + 1;
                break;
            }
        }
    }

    const result = [];
    for (const [country, count] of Object.entries(countryCounts)) {
        result.push({ country, count });
    }

    return result;
}

// 测试解析结果
const countryInfo = parseCountries(mockConfig);
console.log("解析的国家/地区信息:");
countryInfo.forEach(({ country, count }) => {
    console.log(`  ${country}: ${count} 个节点`);
});

// 检查是否识别到 Cloudflare 节点
const hasCF = countryInfo.some(({ country }) => country === "Cloudflare");
console.log(`\n是否识别到 Cloudflare 节点: ${hasCF ? "✅ 是" : "❌ 否"}`);

if (hasCF) {
    const cfInfo = countryInfo.find(({ country }) => country === "Cloudflare");
    console.log(`Cloudflare 节点数量: ${cfInfo.count}`);
    
    // 测试正则匹配
    console.log("\n正则匹配测试:");
    const cfRegex = new RegExp(countryRegex["Cloudflare"].replace(/^\(\?i\)/, ''), 'i');
    mockConfig.proxies.forEach(proxy => {
        if (cfRegex.test(proxy.name)) {
            console.log(`  ✅ 匹配: ${proxy.name}`);
        }
    });
    
    console.log("\n预期生成的代理组:");
    console.log("  - 名称: Cloudflare节点");
    console.log("  - 图标: https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Cloudflare.png");
    console.log("  - 过滤器: (?i)Cloudflare|CF|☁️");
    console.log("  - 静态资源组将优先使用 Cloudflare节点");
}

console.log("\n✨ Cloudflare 代理组功能测试完成！");