const SUB_MAIN = "kuromis"; 
const SUB_LOW  = "lxy"; 

const GEN = "http://www.google.com/generate_204";

// 各 select 组复用的成员表
const NODE = ["🚀 节点选择", "🇸🇬 新加坡", "🇭🇰 香港", "🇨🇳 台湾", "🇯🇵 日本", "🇺🇲 美国", "🌏 其他地区", "🍼 低倍率节点", "DIRECT"];
const SVC  = ["🚀 节点选择", "DIRECT", "🇺🇲 美国", "🇭🇰 香港", "🇨🇳 台湾", "🇸🇬 新加坡", "🇯🇵 日本", "🌏 其他地区", "🍼 低倍率节点"];

function main(config) {
  const proxies = Array.isArray(config.proxies) ? config.proxies : [];
  const sub = (p) => p._subName || p._subDisplayName || "";

  // 按订阅来源拆分(等价于原来的 use: Provider1 / Provider2)
  const p1  = proxies.filter((p) => sub(p) === SUB_MAIN).map((p) => p.name);
  const p2  = proxies.filter((p) => sub(p) === SUB_LOW).map((p) => p.name);
  const all = proxies.map((p) => p.name);

  const pick = (pool, re) => pool.filter((n) => re.test(n));
  const safe = (arr) => (arr.length ? arr : ["DIRECT"]); // 防止空组导致内核报错

  const hk    = pick(p1, /(香港|HK|hk|Hong Kong)/);
  const jp    = pick(p1, /(日本|JP|jp|Japan)/);
  const us    = pick(p1, /(美国|美國|US|us|United States)/);
  const tw    = pick(p1, /(台湾|台灣|臺灣|TW|tw|Taiwan)/);
  const sg    = pick(p1, /(新加坡|SG|sg|狮城|Singapore)/);
  const nf    = pick(p1, /(NF|奈飞|解锁|Netflix|NETFLIX|Media)/);
  const other = pick(p1, /^(?!.*(?:香港|HK|hk|Hong Kong|新加坡|SG|sg|狮城|Singapore|日本|JP|jp|Japan|美国|美國|US|us|United States|台湾|台灣|臺灣|TW|tw|Taiwan|Traffic|Expire))/);
  const low   = pick(p2, /^(?!.*(?:Traffic|Expire|剩余|到期|流量))/);
  const info  = pick(all, /(Traffic|Expire|剩余|到期|流量)/);

  config["proxy-groups"] = [
    { name: "📋 订阅信息", type: "select", proxies: safe(info) },
    {
      name: "🚀 节点选择",
      type: "select",
      proxies: ["🇸🇬 新加坡", "🇭🇰 香港", "🇨🇳 台湾", "🇯🇵 日本", "🇺🇲 美国", "🌏 其他地区", "🍼 低倍率节点", "DIRECT"],
    },

    { name: "🇭🇰 香港",  type: "url-test", proxies: safe(hk), url: GEN, interval: 120 },
    { name: "🇯🇵 日本",  type: "url-test", proxies: safe(jp), url: GEN, interval: 120 },
    { name: "🇺🇲 美国",  type: "url-test", proxies: safe(us), url: GEN, interval: 120 },
    { name: "🇨🇳 台湾",  type: "url-test", proxies: safe(tw), url: GEN, interval: 120 },
    { name: "🇸🇬 新加坡", type: "url-test", proxies: safe(sg), url: GEN, interval: 120 },
    { name: "🌏 其他地区", type: "select", proxies: safe(other) },
    { name: "🎥 奈飞节点", type: "select", proxies: safe(nf) },
    { name: "🍼 低倍率节点", type: "url-test", proxies: safe(low), url: GEN, interval: 120 },

    { name: "✈️ 电报消息", type: "select", proxies: NODE },
    { name: "🤖 OpenAi", type: "select", proxies: NODE },
    { name: "🤖 Claude", type: "select", proxies: NODE },
    { name: "🤖 Gemini", type: "select", proxies: NODE },

    {
      name: "📹 油管视频",
      type: "select",
      proxies: ["🍼 低倍率节点", "🚀 节点选择", "🇸🇬 新加坡", "🇭🇰 香港", "🇨🇳 台湾", "🇯🇵 日本", "🇺🇲 美国", "🌏 其他地区", "DIRECT"],
    },
    {
      name: "🎥 奈飞视频",
      type: "select",
      proxies: ["🎥 奈飞节点", "🚀 节点选择", "🇸🇬 新加坡", "🇭🇰 香港", "🇨🇳 台湾", "🇯🇵 日本", "🇺🇲 美国", "🌏 其他地区", "🍼 低倍率节点", "DIRECT"],
    },
    { name: "📺 哔哩哔哩", type: "select", proxies: ["🎯 全球直连", "🇨🇳 台湾", "🇭🇰 香港"] },
    {
      name: "🌏 国内媒体",
      type: "select",
      proxies: ["DIRECT", "🚀 节点选择", "🇭🇰 香港", "🇨🇳 台湾", "🇸🇬 新加坡", "🇯🇵 日本", "🌏 其他地区", "🍼 低倍率节点"],
    },
    { name: "🌏 国外常规", type: "select", proxies: NODE },

    { name: "📢 谷歌服务", type: "select", proxies: SVC },
    { name: "Ⓜ 微软服务", type: "select", proxies: SVC },
    { name: "🍎 苹果服务", type: "select", proxies: SVC },
    { name: "🎮 游戏平台", type: "select", proxies: SVC },

    { name: "📀 其他视频及下载", type: "select", proxies: ["🍼 低倍率节点", "🚀 节点选择", "DIRECT"] },
    { name: "🎯 全球直连", type: "select", proxies: ["DIRECT"] },
    { name: "🛑 自定义拦截", type: "select", proxies: ["REJECT"] },
    { name: "✅ 自定义连接", type: "select", proxies: ["🚀 节点选择", "🍼 低倍率节点", "REJECT", "DIRECT"] },
    { name: "🐟 漏网之鱼", type: "select", proxies: ["🍼 低倍率节点", "🚀 节点选择", "DIRECT"] },
  ];

  // ---- 规则集(原样)----
  const rp = (url, path) => ({ type: "http", behavior: "classical", format: "text", url, path, interval: 86400 });
  config["rule-providers"] = {
    "自定义拦截": rp("https://raw.githubusercontent.com/kevinmatr/Sub/master/block.list", "./ruleset/自定义拦截.yaml"),
    "自定义连接": rp("https://raw.githubusercontent.com/kevinmatr/Sub/master/connect.list", "./ruleset/自定义连接.yaml"),
    "全球直连": rp("https://raw.githubusercontent.com/mphin/proxy_tools/main/rules/LocalAreaNetwork.list", "./ruleset/全球直连.yaml"),
    "全球直连_1": rp("https://raw.githubusercontent.com/kevinmatr/Sub/master/direct.list", "./ruleset/全球直连_1.yaml"),
    "其他视频及下载": rp("https://raw.githubusercontent.com/kevinmatr/Sub/master/low-multiplied.list", "./ruleset/其他视频及下载.yaml"),
    "油管视频": rp("https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/YouTube.list", "./ruleset/油管视频.yaml"),
    "谷歌服务": rp("https://raw.githubusercontent.com/mphin/proxy_tools/main/rules/Google.list", "./ruleset/谷歌服务.yaml"),
    "奈飞视频": rp("https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Netflix.list", "./ruleset/奈飞视频.yaml"),
    "国外常规": rp("https://raw.githubusercontent.com/mphin/proxy_tools/main/rules/ProxyMedia.list", "./ruleset/国外常规.yaml"),
    "微软服务": rp("https://raw.githubusercontent.com/mphin/proxy_tools/main/rules/Microsoft.list", "./ruleset/微软服务.yaml"),
    "苹果服务": rp("https://raw.githubusercontent.com/mphin/proxy_tools/main/rules/Apple.list", "./ruleset/苹果服务.yaml"),
    "国内媒体": rp("https://raw.githubusercontent.com/mphin/proxy_tools/main/rules/ChinaMedia.list", "./ruleset/国内媒体.yaml"),
    "哔哩哔哩": rp("https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/BilibiliHMT.list", "./ruleset/哔哩哔哩.yaml"),
    "哔哩哔哩_1": rp("https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/Bilibili.list", "./ruleset/哔哩哔哩_1.yaml"),
    "电报消息": rp("https://raw.githubusercontent.com/mphin/proxy_tools/main/rules/Telegram.list", "./ruleset/电报消息.yaml"),
    "AI_openai": rp("https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/OpenAI/OpenAI.list", "./ruleset/OpenAi.yaml"),
    "AI_claude": rp("https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Claude/Claude.list", "./ruleset/Claude.yaml"),
    "AI_gemini": rp("https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Gemini/Gemini.list", "./ruleset/Gemini.yaml"),
    "国外常规_1": rp("https://raw.githubusercontent.com/mphin/proxy_tools/main/rules/ProxyGFWlist.list", "./ruleset/国外常规_1.yaml"),
    "全球直连_2": rp("https://raw.githubusercontent.com/kevinmatr/Sub/master/globe-direct.list", "./ruleset/全球直连_2.yaml"),
    "全球直连_游戏下载": rp("https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Game/GameDownloadCN/GameDownloadCN.list", "./ruleset/全球直连_游戏下载.yaml"),
    "全球直连_steam": rp("https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/SteamCN/SteamCN.list", "./ruleset/全球直连_steam.yaml"),
    "代理_游戏下载": rp("https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Game/GameDownload/GameDownload.list", "./ruleset/代理_游戏下载.yaml"),
    "游戏平台_steam": rp("https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Steam/Steam.list", "./ruleset/游戏平台_steam.yaml"),
    "游戏平台_epic": rp("https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Epic/Epic.list", "./ruleset/游戏平台_epic.yaml"),
    "游戏平台_playstation": rp("https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/PlayStation/PlayStation.list", "./ruleset/游戏平台_playstation.yaml"),
    "游戏平台_nintendo": rp("https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Nintendo/Nintendo.list", "./ruleset/游戏平台_nintendo.yaml"),
    "游戏平台_xbox": rp("https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Xbox/Xbox.list", "./ruleset/游戏平台_xbox.yaml"),
    "游戏平台_origin": rp("https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/refs/heads/master/rule/Clash/Origin/Origin.list", "./ruleset/游戏平台_origin.yaml"),
  };

  // ---- 规则(原样)----
  config["rules"] = [
    "RULE-SET,自定义拦截,🛑 自定义拦截",
    "RULE-SET,自定义连接,✅ 自定义连接",
    "RULE-SET,全球直连,🎯 全球直连",
    "RULE-SET,全球直连_1,🎯 全球直连",
    "RULE-SET,其他视频及下载,📀 其他视频及下载",
    "RULE-SET,代理_游戏下载,📀 其他视频及下载",
    "RULE-SET,游戏平台_steam,🎮 游戏平台",
    "RULE-SET,游戏平台_epic,🎮 游戏平台",
    "RULE-SET,游戏平台_playstation,🎮 游戏平台",
    "RULE-SET,游戏平台_nintendo,🎮 游戏平台",
    "RULE-SET,游戏平台_xbox,🎮 游戏平台",
    "RULE-SET,游戏平台_origin,🎮 游戏平台",
    "RULE-SET,油管视频,📹 油管视频",
    "RULE-SET,谷歌服务,📢 谷歌服务",
    "RULE-SET,奈飞视频,🎥 奈飞视频",
    "RULE-SET,国外常规,🌏 国外常规",
    "RULE-SET,微软服务,Ⓜ 微软服务",
    "RULE-SET,苹果服务,🍎 苹果服务",
    "RULE-SET,国内媒体,🌏 国内媒体",
    "RULE-SET,哔哩哔哩,📺 哔哩哔哩",
    "RULE-SET,哔哩哔哩_1,📺 哔哩哔哩",
    "RULE-SET,电报消息,✈️ 电报消息",
    "RULE-SET,AI_openai,🤖 OpenAi",
    "RULE-SET,AI_claude,🤖 Claude",
    "RULE-SET,AI_gemini,🤖 Gemini",
    "RULE-SET,国外常规_1,🌏 国外常规",
    "RULE-SET,全球直连_2,🎯 全球直连",
    "RULE-SET,全球直连_游戏下载,🎯 全球直连",
    "RULE-SET,全球直连_steam,🎯 全球直连",
    "GEOIP,CN,🎯 全球直连",
    "MATCH,🐟 漏网之鱼",
  ];

  // ---- 基础设置(客户端可能覆盖,保留以求一致)----
  config["mixed-port"] = 7890;
  config["socks-port"] = 7891;
  config["allow-lan"] = true;
  config["mode"] = "rule";
  config["log-level"] = "info";
  config["external-controller"] = ":9090";

  delete config["proxy-providers"]; // 节点已由 Sub-Store 注入,不再需要
  return config;
}
