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
$("#hitokoto").click(function () {
  if (times == 0) {
    times = 1;
    let index = setInterval(function () {
      times--;
      if (times == 0) {
        clearInterval(index);
      }
    }, 1000);

    // 引入 OpenCC
    const converter = OpenCC.Converter({ from: 's2t', to: 't2s' }); // s2t: 簡體到繁體

    fetch("https://v1.hitokoto.cn?max_length=24")
      .then((response) => response.json())
      .then((data) => {
        // 確保 data.hitokoto 存在
        if (data && data.hitokoto) {
          const traditionalHitokoto = converter.convert(data.hitokoto); // 轉換為繁體中文
          $("#hitokoto_text").html(traditionalHitokoto);
          $("#from_text").html(data.from);
        } else {
          console.error("未獲取到有效的 hitokoto");
        }
      })
      .catch((error) => {
        console.error("獲取 hitokoto 時出錯:", error);
      });
  } else {
    iziToast.show({
      timeout: 1000,
      icon: "fa-solid fa-circle-exclamation",
      message: "點擊太快了哦",
    });
  }
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
