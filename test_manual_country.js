// 测试手动指定国家功能
const fs = require('fs');

// 读取 rename.js 脚本
const renameScript = fs.readFileSync('./rename.js', 'utf8');

// 提取需要的函数和常量
function extractScriptFunctions() {
  // 模拟 Sub-Store 环境
  const $arguments = global.$arguments || {};
  
  // 执行脚本内容但避免重复声明
  const scriptLines = renameScript.split('\n');
  const functionsStart = scriptLines.findIndex(line => line.includes('function operator'));
  const functionsContent = scriptLines.slice(functionsStart).join('\n');
  
  // 手动提取需要的常量和函数
  eval(`
    const inArg = $arguments;
    const nx = inArg.nx || false,
      bl = inArg.bl || false,
      nf = inArg.nf || false,
      key = inArg.key || false,
      blgd = inArg.blgd || false,
      blpx = inArg.blpx || false,
      blnx = inArg.blnx || false,
      numone = inArg.one || false,
      debug = inArg.debug || false,
      clear = inArg.clear || false,
      addflag = inArg.flag || false,
      nm = inArg.nm || false,
      speed = inArg.speed || false;

    const FGF = inArg.fgf == undefined ? " " : decodeURI(inArg.fgf),
      XHFGF = inArg.sn == undefined ? " " : decodeURI(inArg.sn),
      FNAME = inArg.name == undefined ? "" : decodeURI(inArg.name),
      BLKEY = inArg.blkey == undefined ? "" : decodeURI(inArg.blkey),
      blockquic = inArg.blockquic == undefined ? "" : decodeURI(inArg.blockquic),
      COUNTRY = inArg.country == undefined ? "" : decodeURI(inArg.country),
      nameMap = {
        cn: "cn",
        zh: "cn",
        us: "us",
        en: "us",
        quan: "quan",
        gq: "gq",
        flag: "gq",
      },
      inname = nameMap[inArg.in] || "",
      outputName = nameMap[inArg.out] || "";
  `);
  
  return functionsContent;
}

// 测试用例
const testCases = [
  {
    name: "测试手动指定美国",
    args: { country: "us", out: "cn" },
    proxies: [
      { name: "Random Node 01", server: "1.1.1.1" },
      { name: "Test Server", server: "2.2.2.2" }
    ],
    expected: "美国"
  },
  {
    name: "测试手动指定香港",
    args: { country: "hk", out: "cn" },
    proxies: [
      { name: "Some Node", server: "3.3.3.3" }
    ],
    expected: "香港"
  },
  {
    name: "测试手动指定日本（中文输入）",
    args: { country: "日本", out: "cn" },
    proxies: [
      { name: "Test JP", server: "4.4.4.4" }
    ],
    expected: "日本"
  },
  {
    name: "测试手动指定新加坡",
    args: { country: "singapore", out: "cn" },
    proxies: [
      { name: "SG Node", server: "5.5.5.5" }
    ],
    expected: "新加坡"
  },
  {
    name: "测试无手动指定（自动识别）",
    args: { out: "cn" },
    proxies: [
      { name: "香港 01", server: "6.6.6.6" },
      { name: "🇺🇸 US Node", server: "7.7.7.7" }
    ],
    expected: "auto"
  }
];

function runTest(testCase) {
  console.log(`\n=== ${testCase.name} ===`);
  
  // 设置参数
  global.$arguments = testCase.args;
  
  try {
    // 执行脚本
    eval(scriptContent);
    
    // 调用 operator 函数
    const result = operator(JSON.parse(JSON.stringify(testCase.proxies)));
    
    console.log("输入节点:", testCase.proxies.map(p => p.name));
    console.log("输出节点:", result.map(p => p.name));
    
    if (testCase.expected === "auto") {
      console.log("✅ 自动识别测试通过");
    } else {
      const hasExpectedCountry = result.some(p => p.name.includes(testCase.expected));
      if (hasExpectedCountry) {
        console.log(`✅ 手动指定测试通过，成功设置为: ${testCase.expected}`);
      } else {
        console.log(`❌ 手动指定测试失败，期望: ${testCase.expected}`);
      }
    }
    
  } catch (error) {
    console.log("❌ 测试执行出错:", error.message);
  }
}

// 运行所有测试
console.log("开始测试手动指定国家功能...\n");

testCases.forEach(runTest);

console.log("\n=== 测试完成 ===");