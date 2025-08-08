/*
作者: imsyy
主页：https://www.imsyy.top/
GitHub：https://github.com/imsyy/home
版权所有，请勿删除
*/



//弹窗样式
iziToast.settings({
  timeout: 10000,
  progressBar: false,
  close: false,
  closeOnEscape: true,
  position: "topCenter",
  transitionIn: "bounceInDown",
  transitionOut: "flipOutX",
  displayMode: "replace",
  layout: "1",
  backgroundColor: "#00000040",
  titleColor: "#efefef",
  messageColor: "#efefef",
  icon: "Fontawesome",
  iconColor: "#efefef",
});

/* 鼠标样式 */
const body = document.querySelector("body");
const element = document.getElementById("g-pointer-1");
const element2 = document.getElementById("g-pointer-2");
const halfAlementWidth = element.offsetWidth / 2;
const halfAlementWidth2 = element2.offsetWidth / 2;

function setPosition(x, y) {
  element2.style.transform = `translate(${x - halfAlementWidth2 + 1}px, ${
    y - halfAlementWidth2 + 1
  }px)`;
}

body.addEventListener("mousemove", (e) => {
  window.requestAnimationFrame(function () {
    setPosition(e.clientX, e.clientY);
  });
});

//加载完成后执行
window.addEventListener(
  "load",
  function () {
    //载入动画
    $("#loading-box").attr("class", "loaded");
    $("#bg").css(
      "cssText",
      "transform: scale(1);filter: blur(0px);transition: ease 1.5s;"
    );
    $(".cover").css("cssText", "opacity: 1;transition: ease 1.5s;");
    $("#section").css(
      "cssText",
      "transform: scale(1) !important;opacity: 1 !important;filter: blur(0px) !important"
    );

    //用户歡迎
    setTimeout(function () {
      iziToast.show({
        timeout: 2500,
        icon: false,
        title: hello,
        message: "歡迎來到我的網頁",
      });
    }, 800);

    //延迟加载音乐播放器
    let element = document.createElement("script");
    element.src = "./js/music.js";
    document.body.appendChild(element);

    //中文字体缓加载-此处写入字体源文件 （暂时弃用）
    //先行加载简体中文子集，后续补全字集
    //由于压缩过后的中文字体仍旧过大，可转移至对象存储或 CDN 加载
    // const font = new FontFace(
    //     "MiSans",
    //     "url(" + "./font/MiSans-Regular.woff2" + ")"
    // );
    // document.fonts.add(font);

    //移动端去除鼠标样式
    if (Boolean(window.navigator.userAgent.match(/AppWebKit.*Mobile.*/))) {
      $("#g-pointer-2").css("display", "none");
    }
  },
  false
);

setTimeout(function () {
  $("#loading-text").html("字體及文件家仔可能需要一定時間呦");
}, 3000);

// 新春灯笼 （ 需要时可取消注释 ）
// new_element=document.createElement("link");
// new_element.setAttribute("rel","stylesheet");
// new_element.setAttribute("type","text/css");
// new_element.setAttribute("href","./css/lantern.css");
// document.body.appendChild(new_element);

// new_element=document.createElement("script");
// new_element.setAttribute("type","text/javascript");
// new_element.setAttribute("src","./js/lantern.js");
// document.body.appendChild(new_element);

// 簡體到繁體的轉換函數（示例）
function simplifyToTraditional(text) {
  const conversionMap = {
    "当": "當",
    "你": "你",
    "手": "手",
    "里": "裡",
    "有": "有",
    "锤": "錘",
    "子": "子",
    "那么": "那麼",
    "敌人": "敵人",
    "就是": "就是",
    "钉子": "釘子",
    "守望先锋": "守望先鋒"
    // 添加更多的簡繁對應
  };
  return text.replace(/[\u4e00-\u9fa5]/g, (char) => conversionMap[char] || char);
}



//獲取一言（中國有一個叫做"一言"的網站，網站主要提供一句話服務。）
let times = 0;

// 初始化OpenCC轉換器
let openccConverter = null;
try {
  openccConverter = OpenCC.Converter({ from: 'cn', to: 'tw' }); // 簡體到繁體
} catch (error) {
  console.error("OpenCC初始化失敗:", error);
}

// 增強的簡體到繁體轉換函數
function simplifyToTraditional(text) {
  // 首先嘗試使用OpenCC
  if (openccConverter) {
    try {
      return openccConverter(text);
    } catch (error) {
      console.error("OpenCC轉換失敗，使用增強備用方案:", error);
    }
  }
  
  // 增強的備用轉換映射 - 包含更多常用簡繁對應
  const conversionMap = {
    // 常用字
    "当": "當", "说": "說", "为": "為", "国": "國", "过": "過",
    "时": "時", "实": "實", "现": "現", "个": "個", "来": "來",
    "对": "對", "会": "會", "学": "學", "开": "開", "关": "關",
    "门": "門", "问": "問", "间": "間", "发": "發", "经": "經",
    "长": "長", "万": "萬", "与": "與", "义": "義", "无": "無",
    "总": "總", "线": "線", "结": "結", "给": "給", "级": "級",
    "统": "統", "计": "計", "论": "論", "设": "設", "证": "證",
    
    // 更多常用字
    "爱": "愛", "碍": "礙", "罢": "罷", "摆": "擺", "办": "辦",
    "帮": "幫", "宝": "寶", "报": "報", "备": "備", "笔": "筆",
    "毕": "畢", "边": "邊", "变": "變", "标": "標", "表": "錶",
    "别": "別", "宾": "賓", "饼": "餅", "并": "並", "拨": "撥",
    "补": "補", "才": "纔", "财": "財", "采": "採", "参": "參",
    "残": "殘", "蚕": "蠶", "仓": "倉", "层": "層", "产": "產",
    "厂": "廠", "场": "場", "车": "車", "尘": "塵", "陈": "陳",
    "称": "稱", "成": "成", "诚": "誠", "迟": "遲", "齿": "齒",
    "冲": "衝", "虫": "蟲", "丑": "醜", "出": "齣", "处": "處",
    "触": "觸", "辞": "辭", "从": "從", "丛": "叢", "担": "擔",
    "胆": "膽", "导": "導", "灯": "燈", "邓": "鄧", "敌": "敵",
    "递": "遞", "点": "點", "电": "電", "垫": "墊", "东": "東",
    "冬": "鼕", "动": "動", "斗": "鬥", "独": "獨", "断": "斷",
    "对": "對", "队": "隊", "吨": "噸", "夺": "奪", "堕": "墮",
    "儿": "兒", "尔": "爾", "发": "發", "范": "範", "饭": "飯",
    "访": "訪", "纺": "紡", "飞": "飛", "费": "費", "纷": "紛",
    "坟": "墳", "奋": "奮", "愤": "憤", "丰": "豐", "风": "風",
    "凤": "鳳", "肤": "膚", "妇": "婦", "复": "復", "该": "該",
    "干": "幹", "赶": "趕", "个": "個", "巩": "鞏", "沟": "溝",
    "构": "構", "购": "購", "谷": "穀", "顾": "顧", "刮": "颳",
    "关": "關", "观": "觀", "柜": "櫃", "汉": "漢", "号": "號",
    "合": "閤", "轰": "轟", "后": "後", "胡": "鬍", "壶": "壺",
    "沪": "滬", "护": "護", "划": "劃", "怀": "懷", "坏": "壞",
    "欢": "歡", "环": "環", "还": "還", "回": "迴", "伙": "夥",
    "获": "獲", "击": "擊", "积": "積", "鸡": "鷄", "极": "極",
    "际": "際", "继": "繼", "家": "傢", "夹": "夾", "艰": "艱",
    "坚": "堅", "歼": "殲", "茧": "繭", "舰": "艦", "姜": "薑",
    "浆": "漿", "桨": "槳", "奖": "奬", "讲": "講", "酱": "醬",
    "胶": "膠", "阶": "階", "节": "節", "洁": "潔", "借": "藉",
    "仅": "僅", "惊": "驚", "竞": "競", "旧": "舊", "剧": "劇",
    "据": "據", "惧": "懼", "卷": "捲", "觉": "覺", "开": "開",
    "克": "剋", "垦": "墾", "恳": "懇", "夸": "誇", "块": "塊",
    "亏": "虧", "困": "睏", "扩": "擴", "腊": "臘", "蜡": "蠟",
    "来": "來", "兰": "蘭", "拦": "攔", "栏": "欄", "烂": "爛",
    "劳": "勞", "乐": "樂", "垒": "壘", "类": "類", "里": "裏",
    "礼": "禮", "丽": "麗", "厉": "厲", "励": "勵", "离": "離",
    "历": "歷", "隶": "隸", "俩": "倆", "联": "聯", "炼": "煉",
    "练": "練", "粮": "糧", "凉": "涼", "梁": "樑", "辆": "輛",
    "了": "瞭", "临": "臨", "邻": "鄰", "灵": "靈", "龄": "齡",
    "岭": "嶺", "刘": "劉", "龙": "龍", "楼": "樓", "录": "錄",
    "陆": "陸", "虏": "虜", "卤": "鹵", "乱": "亂", "罗": "羅",
    "屡": "屢", "虑": "慮", "妈": "媽", "马": "馬", "买": "買",
    "卖": "賣", "迈": "邁", "蛮": "蠻", "满": "滿", "猫": "貓",
    "么": "麽", "没": "沒", "门": "門", "蒙": "矇", "梦": "夢",
    "弥": "彌", "面": "麵", "庙": "廟", "灭": "滅", "蔑": "衊",
    "亩": "畝", "难": "難", "鸟": "鳥", "聂": "聶", "宁": "寧",
    "农": "農", "盘": "盤", "辟": "闢", "苹": "蘋", "凭": "憑",
    "扑": "撲", "仆": "僕", "朴": "樸", "齐": "齊", "岂": "豈",
    "气": "氣", "迁": "遷", "签": "簽", "乔": "喬", "亲": "親",
    "穷": "窮", "区": "區", "趋": "趨", "权": "權", "劝": "勸",
    "却": "卻", "让": "讓", "扰": "擾", "热": "熱", "认": "認",
    "荣": "榮", "洒": "灑", "伞": "傘", "丧": "喪", "扫": "掃",
    "涩": "澀", "杀": "殺", "晒": "曬", "伤": "傷", "舍": "捨",
    "摄": "攝", "沈": "瀋", "声": "聲", "胜": "勝", "湿": "濕",
    "实": "實", "适": "適", "势": "勢", "兽": "獸", "书": "書",
    "术": "術", "树": "樹", "帅": "帥", "双": "雙", "松": "鬆",
    "苏": "蘇", "虽": "雖", "随": "隨", "台": "臺", "态": "態",
    "坛": "壇", "叹": "嘆", "誊": "謄", "体": "體", "条": "條",
    "铁": "鐵", "听": "聽", "厅": "廳", "头": "頭", "图": "圖",
    "涂": "塗", "团": "團", "椭": "橢", "万": "萬", "弯": "彎",
    "网": "網", "为": "為", "卫": "衛", "稳": "穩", "务": "務",
    "雾": "霧", "牺": "犧", "习": "習", "系": "係", "戏": "戲",
    "虾": "蝦", "吓": "嚇", "纤": "纖", "献": "獻", "乡": "鄉",
    "详": "詳", "响": "響", "向": "嚮", "协": "協", "写": "寫",
    "泻": "瀉", "谢": "謝", "衅": "釁", "兴": "興", "须": "須",
    "悬": "懸", "选": "選", "旋": "鏇", "学": "學", "寻": "尋",
    "训": "訓", "讯": "訊", "压": "壓", "亚": "亞", "严": "嚴",
    "验": "驗", "样": "樣", "阳": "陽", "尧": "堯", "药": "藥",
    "爷": "爺", "叶": "葉", "医": "醫", "亿": "億", "忆": "憶",
    "应": "應", "痈": "癰", "拥": "擁", "佣": "傭", "踊": "踴",
    "忧": "憂", "优": "優", "邮": "郵", "余": "餘", "与": "與",
    "誉": "譽", "屿": "嶼", "语": "語", "狱": "獄", "预": "預",
    "驭": "馭", "园": "園", "员": "員", "圆": "圓", "缘": "緣",
    "远": "遠", "愿": "願", "跃": "躍", "运": "運", "酝": "醖",
    "杂": "雜", "灾": "災", "载": "載", "脏": "髒", "凿": "鑿",
    "枣": "棗", "择": "擇", "泽": "澤", "贼": "賊", "赠": "贈",
    "轧": "軋", "闸": "閘", "债": "債", "战": "戰", "站": "站",
    "张": "張", "涨": "漲", "着": "著", "折": "摺", "这": "這",
    "征": "徵", "挣": "掙", "症": "癥", "郑": "鄭", "证": "證",
    "织": "織", "职": "職", "执": "執", "只": "隻", "纸": "紙",
    "志": "誌", "制": "製", "终": "終", "钟": "鐘", "肿": "腫",
    "种": "種", "众": "眾", "昼": "晝", "朱": "硃", "烛": "燭",
    "筑": "築", "庄": "莊", "壮": "壯", "状": "狀", "准": "準",
    "浊": "濁", "总": "總", "纵": "縱", "钻": "鑽", "组": "組",
    "钻": "鑽", "罪": "罪"
  };

  // 使用映射進行轉換
  let result = text;
  for (let simplified in conversionMap) {
    let traditional = conversionMap[simplified];
    result = result.replace(new RegExp(simplified, 'g'), traditional);
  }
  
  return result;
}

// 獲取一言並轉換為繁體
function getHitokoto() {
  fetch("https://v1.hitokoto.cn?max_length=24")
    .then((response) => response.json())
    .then((data) => {
      if (data && data.hitokoto) {
        // 使用OpenCC或備用方案進行簡繁轉換
        const traditionalHitokoto = simplifyToTraditional(data.hitokoto);
        $("#hitokoto_text").html(traditionalHitokoto);
        $("#from_text").html(data.from || "未知");
      } else {
        console.error("未獲取到有效的 hitokoto");
        $("#hitokoto_text").html("暫時無法獲取一言");
        $("#from_text").html("系統");
      }
    })
    .catch((error) => {
      console.error("獲取 hitokoto 時出錯:", error);
      $("#hitokoto_text").html("網絡連接失敗");
      $("#from_text").html("系統");
    });
}

// 點擊一言區域更新
$("#hitokoto").click(function () {
  if (times == 0) {
    times = 1;
    let index = setInterval(function () {
      times--;
      if (times == 0) {
        clearInterval(index);
      }
    }, 1000);
    
    getHitokoto();
  } else {
    iziToast.show({
      timeout: 1000,
      icon: "fa-solid fa-circle-exclamation",
      message: "點擊太快了哦",
    });
  }
});

// 頁面加載完成後自動獲取一言
window.addEventListener('load', function() {
  setTimeout(getHitokoto, 2000); // 延遲2秒加載，避免與其他資源衝突
});



// 獲取天氣
// 請前往 https://www.mxnzp.com/doc/list 申請 app_id 和 app_secret
const mainKey = "c577e8a40049cf51879ff72c9dc1ae8e"; // 高德開發者 Key
const getWeather = () => {
  fetch(`https://restapi.amap.com/v3/ip?key=${mainKey}`)
    .then((response) => response.json())
    .then((res) => {
      const adcode = res.adcode;
      $("#city_text").html(res.city);
      fetch(
        `https://restapi.amap.com/v3/weather/weatherInfo?key=${mainKey}&city=${adcode}`
      )
        .then((response) => response.json())
        .then((res) => {
          if (res.status) {
            $("#wea_text").html(res.lives[0].weather);
            $("#tem_text").html(res.lives[0].temperature + "°C&nbsp;");
            $("#win_text").html(res.lives[0].winddirection + "風");
            $("#win_speed").html(res.lives[0].windpower + "級");
          } else {
            console.error("天氣資訊獲取失敗");
            iziToast.show({
              timeout: 2000,
              icon: "fa-solid fa-cloud-sun",
              message: "天氣資訊獲取失敗",
            });
          }
        });
    })
    .catch((err) => {
      console.error("天氣資訊獲取失敗：" + err);
      iziToast.show({
        timeout: 2000,
        icon: "fa-solid fa-cloud-sun",
        message: "天氣資訊獲取失敗",
      });
    });
};

getWeather();

let wea = 0;
$("#upWeather").click(function () {
  if (wea == 0) {
    wea = 1;
    let index = setInterval(function () {
      wea--;
      if (wea == 0) {
        clearInterval(index);
      }
    }, 60000);
    getWeather();
    iziToast.show({
      timeout: 2000,
      icon: "fa-solid fa-cloud-sun",
      message: "實時天氣已更新",
    });
  } else {
    iziToast.show({
      timeout: 1000,
      icon: "fa-solid fa-circle-exclamation",
      message: "請稍後再更新歐",
    });
  }
});

//獲取時間
let t = null;
t = setTimeout(time, 1000);

function time() {
  clearTimeout(t);
  dt = new Date();
  let y = dt.getYear() + 1900;
  let mm = dt.getMonth() + 1;
  let d = dt.getDate();
  let weekday = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  let day = dt.getDay();
  let h = dt.getHours();
  let m = dt.getMinutes();
  let s = dt.getSeconds();
  if (h < 10) {
    h = "0" + h;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }
  $("#time").html(
    y +
      "&nbsp;年&nbsp;" +
      mm +
      "&nbsp;月&nbsp;" +
      d +
      "&nbsp;日&nbsp;" +
      "<span class='weekday'>" +
      weekday[day] +
      "</span><br>" +
      "<span class='time-text'>" +
      h +
      ":" +
      m +
      ":" +
      s +
      "</span>"
  );
  t = setTimeout(time, 1000);
}

//鏈接提示文字
$("#social")
  .mouseover(function () {
    $("#social").css({
      background: "rgb(0 0 0 / 25%)",
      "border-radius": "6px",
      "backdrop-filter": "blur(5px)",
    });
    $("#link-text").css({
      display: "block",
    });
  })
  .mouseout(function () {
    $("#social").css({
      background: "none",
      "border-radius": "6px",
      "backdrop-filter": "none",
    });
    $("#link-text").css({
      display: "none",
    });
  });

$("#instagram")
  .mouseover(function () {
    $("#link-text").html("尼瑟瑟！！");
  })
  .mouseout(function () {
    $("#link-text").html("通過這裡聯絡我");
  });
$("#tiktok")
  .mouseover(function () {
    $("#link-text").html("來關注我呦");
  })
  .mouseout(function () {
    $("#link-text").html("有時在這開直播");
  });
$("#steam")
  .mouseover(function () {
    $("#link-text").html("來找我玩遊戲");
  })
  .mouseout(function () {
    $("#link-text").html("加好友請加備註");
  });
$("#dragon")
  .mouseover(function () {
    $("#link-text").html("PlayOne");
  })
  .mouseout(function () {
    $("#link-text").html("要找我下單呦！");
  });
$("#nicee")
  .mouseover(function () {
    $("#link-text").html("Nicee");
  })
  .mouseout(function () {
    $("#link-text").html("要找我下單呦！");
  });
//自動變灰
let myDate = new Date();
let mon = myDate.getMonth() + 1;
let date = myDate.getDate();
let days = ["2.28", "10.10", "10.25", "1.1"];
for (let day of days) {
  let d = day.split(".");
  if (mon == d[0] && date == d[1]) {
    document.write(
      "<style>html{-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);_filter:none}</style>"
    );
    $("#change").html("Silence&nbsp;in&nbsp;silence");
    $("#change1").html("今天是臺灣的國家紀念日，網頁已切換為黑白模式");
    window.addEventListener(
      "load",
      function () {
        setTimeout(function () {
          iziToast.show({
            timeout: 14000,
            icon: "fa-solid fa-clock",
            message: "今天是臺灣的國家紀念日",
          });
        }, 3800);
      },
      false
    );
  }
}

//更多頁面切換
let shoemore = false;
$("#switchmore").on("click", function () {
  shoemore = !shoemore;
  if (shoemore && $(document).width() >= 990) {
    $("#container").attr("class", "container mores");
    $("#change").html("Oops&nbsp;!");
    $("#change1").html("哎呀，這都被發現了（ 再點及一次即可關閉 ）");
  } else {
    $("#container").attr("class", "container");
    $("#change").html("Welcome&nbsp;to&nbsp;mine&nbsp;website&nbsp;!!");
    $("#change1").html("默默關注你的呆呆　　｜　　IG: daidai_0618");
  }
});

//更多頁面關閉按鈕
$("#close").on("click", function () {
  $("#switchmore").click();
});

//移动端菜单栏切换
let switchmenu = false;
$("#switchmenu").on("click", function () {
  switchmenu = !switchmenu;
  if (switchmenu) {
    $("#row").attr("class", "row menus");
    $("#menu").html("<i class='fa-solid fa-xmark'></i>");
  } else {
    $("#row").attr("class", "row");
    $("#menu").html("<i class='fa-solid fa-bars'></i>");
  }
});

//更多弹窗页面
$("#openmore").on("click", function () {
  $("#box").css("display", "block");
  $("#row").css("display", "none");
  $("#more").css("cssText", "display:none !important");
});
$("#closemore").on("click", function () {
  $("#box").css("display", "none");
  $("#row").css("display", "flex");
  $("#more").css("display", "flex");
});

//监听网页宽度
window.addEventListener("load", function () {
  window.addEventListener("resize", function () {
    //关闭移动端样式
    if (window.innerWidth >= 600) {
      $("#row").attr("class", "row");
      $("#menu").html("<i class='fa-solid fa-bars'></i>");
      //移除移动端切换功能区
      $("#rightone").attr("class", "row rightone");
    }

    if (window.innerWidth <= 990) {
      //移动端隐藏更多页面
      $("#container").attr("class", "container");
      $("#change").html("Welcome&nbsp;to&nbsp;mine&nbsp;website&nbsp;!!");
      $("#change1").html("默默關注你的呆呆　　｜　　IG: daidai_0618");

      //移动端隐藏弹窗页面
      $("#box").css("display", "none");
      $("#row").css("display", "flex");
      $("#more").css("display", "flex");
    }
  });
});

//移动端切换功能区
let changemore = false;
$("#changemore").on("click", function () {
  changemore = !changemore;
  if (changemore) {
    $("#rightone").attr("class", "row menus mobile");
  } else {
    $("#rightone").attr("class", "row menus");
  }
});

//更多页面显示关闭按钮
$("#more").hover(
  function () {
    $("#close").css("display", "block");
  },
  function () {
    $("#close").css("display", "none");
  }
);

//禁止一切進入console的方法
// 設置時間限制（毫秒）
const timeLimit = 3000; // 3秒
let lastTriggered = 0; // 上次觸發的時間

// 禁止右鍵菜單和開發者工具
function preventActions(event) {
  const currentTime = new Date().getTime(); // 當前時間

  // 檢查是否已經過了時間限制
  if (currentTime - lastTriggered > timeLimit) {
    showWarning();
    lastTriggered = currentTime; // 更新上次觸發的時間
  }

  // 禁止右鍵菜單
  if (event.type === "contextmenu") {
    return false; // 阻止右鍵菜單
  }

  // 禁止 F12 鍵
  if (event.key === "F12") {
    event.preventDefault();
    return false;
  }

  // 禁止 Ctrl+Shift+I 鍵
  if (event.ctrlKey && event.shiftKey && event.key === "I") {
    event.preventDefault();
    return false;
  }

  // 禁止 Ctrl+U 鍵（查看源代碼）
  if (event.ctrlKey && event.key === "U") {
    event.preventDefault();
    return false;
  }
}

// 顯示警告訊息的函數
function showWarning() {
  iziToast.show({
    timeout: 2000,
    icon: "fa-solid fa-circle-exclamation",
    message: "嘻嘻～不可以壞壞呦！！",
  });
}

// 監聽事件
document.oncontextmenu = preventActions; // 禁止右鍵菜單
document.onkeydown = preventActions; // 禁止開發者工具


//控制台输出
//console.clear();
let styleTitle1 = `
font-size: 20px;
font-weight: 600;
color: rgb(244,167,89);
`;
let styleTitle2 = `
font-size:12px;
color: rgb(244,167,89);
`;
let styleContent = `
color: rgb(30,152,255);
`;
let title1 = "無名の主页";
let title2 = `
 _____ __  __  _______     ____     __
|_   _|  \\/  |/ ____\\ \\   / /\\ \\   / /
  | | | \\  / | (___  \\ \\_/ /  \\ \\_/ / 
  | | | |\\/| |\\___ \\  \\   /    \\   /  
 _| |_| |  | |____) |  | |      | |   
|_____|_|  |_|_____/   |_|      |_|                                                     
`;
let content = `
版 本 号：3.4
更新日期：2022-07-24

主页:  https://www.imsyy.top
Github:  https://github.com/imsyy/home
`;
console.log(
  `%c${title1} %c${title2}
%c${content}`,
  styleTitle1,
  styleTitle2,
  styleContent
);
