var CHANNEL_ACCESS_TOKEN = 'Your Token'; //你的bot token
var d = new Date();
// var SpreadSheet = SpreadsheetApp.openById('Your SpreadSheet ID'); //用以紀錄訊息 (測試用)
// var Sheet = SpreadSheet.getSheetByName("紀錄收到的訊息");
// var LastRow = Sheet.getLastRow();
var userMessage, msg, replyToken, url = 'https://api.line.me/v2/bot/message/reply';
var help =  { 
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "現在天氣",
          "text": "天氣"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "確診人數",
          "text": "確診"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "近期地震",
          "text": "地震"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "股票",
          "text": "股票"
        }
      },
    {
        "type": "action",
        "action": {
          "type": "message",
          "label": "匯率",
          "text": "匯率"
        }
      },
    {
        "type": "action",
        "action": {
          "type": "message",
          "label": "新聞",
          "text": "新聞"
        }
      }]
    }

//廣播訊息(傳訊息至所有用戶)
function broadcast() {
    var url = 'https://api.line.me/v2/bot/message/broadcast';
    UrlFetchApp.fetch(url, {
        'headers': {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
        },
        'method': 'post',
        'payload': JSON.stringify({
          'notificationDisabled':true,
            'messages': [{
                type:'text',
                text:'這是廣播測試訊息，請忽略。'
            }]
        }),
    });  
}

//取得使用者名稱
function getUsername(userId) {
  var url1 = 'https://api.line.me/v2/bot/profile/'+userId;
  var response = UrlFetchApp.fetch(url1, {
    'headers': {
      'authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
    }
  });
  return JSON.parse(response).displayName;
}

//取得群組名稱
function getGroupname(groupId) {
  var url = 'https://api.line.me/v2/bot/group/'+groupId+'/summary';
  var response = UrlFetchApp.fetch(url, {
    'headers': {
      'authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
    }
  });
  return JSON.parse(response).groupName;
}

//取得群組人數
function getnumgroup(groupId) {
  var url = 'https://api.line.me/v2/bot/group/'+groupId+'/members/count';
  var response = UrlFetchApp.fetch(url, {
    'headers': {
      'authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
    }
  });
  return JSON.parse(response).count;
}

//機器人離開群組
function leavegroup(groupId) {
  var url = 'https://api.line.me/v2/bot/group/'+groupId+'/leave';
  var response = UrlFetchApp.fetch(url, {
    "method": "post",
    'headers': {
      'authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
    }
  });
}

//主程式
function doPost(e) {
  
  msg = JSON.parse(e.postData.contents);
  console.log(msg);
  
  // 取出 replyToken 和發送的訊息文字
  replyToken = msg.events[0].replyToken;
  userMessage = msg.events[0].message.text;
  var userId = JSON.parse(e.postData.contents).events[0].source.userId;
  var type1 = JSON.parse(e.postData.contents).events[0].source.type;
  type1=JSON.stringify(type1);
//   if(type1=='"group"')
//   {
//     var groupId = JSON.parse(e.postData.contents).events[0].source.groupId;
//     var groupname = getGroupname(groupId);
//     var num = getnumgroup(groupId);
//     Sheet.getRange(LastRow+1, 3).setValue(groupId);
//     Sheet.getRange(LastRow+1, 4).setValue(groupname+" ("+num+"人)");
//   }
  var urg = JSON.parse(e.postData.contents).events[0].source.userId;
  var username = getUsername(userId);
  var useridx = userId;
  var type = JSON.parse(e.postData.contents).events[0].source.type;
//   Sheet.getRange(LastRow+1, 1).setValue(d);  
//   Sheet.getRange(LastRow+1, 2).setValue(type);
//   Sheet.getRange(LastRow+1, 5).setValue(useridx);
//   Sheet.getRange(LastRow+1, 6).setValue(username);
//   Sheet.getRange(LastRow+1, 7).setValue(userMessage);
//   Sheet.getRange(LastRow+1, 8).setValue(e.postData.contents);
//   Sheet.getRange(LastRow+1, 9).setValue('<-接收 || 回復->');

  if (typeof replyToken === 'undefined') {
    return;
  }
  
  if(userMessage=="天氣")
  {
    var payload = {
    'replyToken': replyToken,
    'messages' : [{
  "type": "text", 
  "text": "選擇或輸入你的所在地天氣",
  "quickReply": { 
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "台北的天氣",
          "text": "台北的天氣"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "台中的天氣",
          "text": "台中的天氣"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "高雄的天氣",
          "text": "高雄的天氣"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "自行輸入",
          "text": "輸入範例:(地名)的天氣"
        }}]}}]}
      send(payload);
  }
  else if(userMessage=="吉米掰掰"||userMessage=="吉米拜拜"&&type1=='"group"')
    {
      if(useridx=='U5f4141aa1e7a436586e67a0d4622b20c')
      {
        var payload = {
    'replyToken': replyToken,
    'messages' : [{
        'type': 'text',
        'text': '死屁孩，我不要',
      }],
      }
        send(payload);
      }
      else
      {
        var payload = {
    'replyToken': replyToken,
    'messages' : [{
        'type': 'text',
        'text': '掰掰Q',
      }],
      }
      send(payload);
      leavegroup(groupId);
      Sheet.getRange(LastRow+1, 11).setValue("離開群組");
      }
      
    }
  else if(userMessage=="確診")
    {
    // 資料取自https://covid-19.nchc.org.tw/api 每日早上9點更新
      var COVID19_data = UrlFetchApp.fetch("https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=3001&limited=TWN");
      var data = JSON.parse(COVID19_data);
      var date = data[0].a04;//日期
      var total_cases = data[0].a05;//總確診人數
      var new_cases = data[0].a06;//新增確診
      var total_deaths = data[0].a08;//總死亡數
      var new_deaths = data[0].a09;//新增死亡數
      var payload = {
    'replyToken': replyToken,
    'messages' : [{
        "type": "flex",
      "altText": "地震",
      "contents": {
  "type": "carousel",
  "contents": [
    {
      "type": "bubble",
      "size": "kilo",
      "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": date,
            "color": "#ffffff",
            "align": "start",
            "size": "md",
            "gravity": "center",
            "weight": "regular",
            "style": "italic"
          },
          {
            "type": "text",
            "text": "新增"+new_cases+"例, "+new_deaths+"死",
            "color": "#ffffff",
            "align": "start",
            "size": "3xl",
            "gravity": "center",
            "margin": "none",
            "wrap": false,
            "weight": "bold",
            "style": "normal",
            "position": "relative",
            "maxLines": 1
          }
        ],
        "backgroundColor": "#BD1400",
        "paddingTop": "19px",
        "paddingAll": "12px",
        "paddingBottom": "16px"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "累積確診"+total_cases+"例 / "+total_deaths+"死亡",
                "color": "#8C8C8C",
                "size": "sm",
                "wrap": true
              }
            ],
            "flex": 1
          }
        ],
        "spacing": "md",
        "paddingAll": "12px"
      },
      "action": {
        "type": "uri",
        "label": "action",
        "uri": "https://sites.google.com/cdc.gov.tw/2019ncov/taiwan?authuser=0"
      },
      "styles": {
        "header": {
          "separator": true
        },
        "footer": {
          "separator": false
        }
      }
    }
  ]
}
      },
                 {
        'type': 'text',
        'text': "資料擷自衛生福利部疾病管制署(每日更新)",
      "quickReply": help
      }],
      }
      send(payload);
    }
  else if(userMessage=="地震")
    {
    // 資料取自衛生局 近期地震
      var c_data = UrlFetchApp.fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/E-A0015-001?authorization=CWB-9B5A873E-E32C-4E9F-BF45-A9D8AD371D36&format=JSON&stationName=string")
      var data = JSON.parse(c_data);
      var payload = {
    'replyToken': replyToken,
    "messages": [
    {
      "type": "flex",
      "altText": "地震",
      "contents": {
  "type": "bubble",
  "size": "giga",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "image",
        "url": data.records.earthquake[0].reportImageURI,
        "size": "full",
        "aspectMode": "cover",
        "aspectRatio": "1:1",
        "gravity": "top",
        "action": {
          "type": "uri",
          "label": "action",
          "uri": data.records.earthquake[0].reportImageURI
        }
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": data.records.earthquake[0].reportContent,
                "size": "xl",
                "color": "#ffffff",
                "weight": "bold",
                "wrap": true,
                "decoration": "underline",
                "action": {
                  "type": "uri",
                  "label": "action",
                  "uri": data.records.earthquake[0].web
                }
              }
            ]
          },
          {
            "type": "box",
            "layout": "baseline",
            "contents": [
              {
                "type": "text",
                "text": data.records.earthquake[0].earthquakeInfo.epiCenter.location,
                "color": "#ebebeb",
                "size": "sm",
                "flex": 0,
                "wrap": true
              }
            ],
            "spacing": "lg"
          }
        ],
        "position": "absolute",
        "offsetBottom": "0px",
        "offsetStart": "0px",
        "offsetEnd": "0px",
        "backgroundColor": "#7D4B4Acc",
        "paddingAll": "20px",
        "paddingTop": "18px"
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "規模"+data.records.earthquake[0].earthquakeInfo.magnitude.magnitudeValue,
            "color": "#ffffff",
            "align": "center",
            "size": "xs",
            "offsetTop": "3px"
          }
        ],
        "position": "absolute",
        "cornerRadius": "20px",
        "offsetTop": "18px",
        "backgroundColor": "#ff334b",
        "offsetStart": "18px",
        "height": "25px",
        "width": "53px"
      }
    ],
    "paddingAll": "0px"
  }
},
 
    },{
        'type': 'text',
        'text': data.records.earthquake[0].reportRemark,
      "quickReply": help
      }
  ]
      }
      send(payload);
    }
  else if(userMessage=="hi")
    {
      var payload = {
    'replyToken': replyToken,
    'messages' : [{
        'type': 'text',
        'text': 'hi!',
      }],
      }
      send(payload);
    }
  else if(userMessage=="help"||userMessage=="help "||userMessage=="Help")
    {
      var payload = {
    'replyToken': replyToken,
    'messages' :[{
  "type": "text", 
  "text": "選擇以下功能",
  "quickReply": help}],
      }
      send(payload);
    }
//匯率功能尚不完全 斟酌使用
//   else if (userMessage=="匯率")
//     {
//       var payload = {
//     'replyToken': replyToken,
//     'messages' :[{
//   "type": "text", 
//   "text": "請選擇外幣",
//   "quickReply": { 
//     "items": [
//       {
//         "type": "action",
//         "action": {
//           "type": "message",
//           "label": "美元",
//           "text": "TWD_USD"
//         }
//       },
//       {
//         "type": "action",
//         "action": {
//           "type": "message",
//           "label": "港幣",
//           "text": "TWD_HKD"
//         }
//       },
//       {
//         "type": "action",
//         "action": {
//           "type": "message",
//           "label": "英鎊",
//           "text": "TWD_GBP"
//         }
//       },
//       {
//         "type": "action",
//         "action": {
//           "type": "message",
//           "label": "日圓",
//           "text": "TWD_JPY"
//         }},
//     {
//         "type": "action",
//         "action": {
//           "type": "message",
//           "label": "人民幣",
//           "text": "TWD_CNY"
//         }}]}}],
//       }
//       send(payload);
//     }
  else if(userMessage.substring(0,4)=="TWD_")
  {
    var currency = userMessage.substr(4,3)
    var c_data = UrlFetchApp.fetch("https://finnhub.io/api/v1/forex/rates?base=TWD&token=c3cn5s2ad3iefuuj0iq0")
    var data = JSON.parse(c_data);
    if(currency=="USD")
    {
      var result=JSON.stringify(data.quote.USD);
      var payload = {
    'replyToken': replyToken,
    'messages' : [{
        'type': 'text',
        'text': "1 台幣可兌換 "+result.substr(0,9)+" 美元",
        "quickReply": help
      }],
      }}
    else if(currency=="HKD")
    {
      var result=JSON.stringify(data.quote.HKD);
      var payload = {
    'replyToken': replyToken,
    'messages' : [{
        'type': 'text',
        'text': "1 台幣可兌換 "+result.substr(0,9)+" 港幣",
      "quickReply": help
      }],
      }}
    else if(currency=="GBP")
    {
      var result=JSON.stringify(data.quote.GBP);
      var payload = {
    'replyToken': replyToken,
    'messages' : [{
        'type': 'text',
        'text': "1 台幣可兌換 "+result.substr(0,9)+" 英鎊",
      "quickReply": help
      }],
      }}
    else if(currency=="JPY")
    {
      var result=JSON.stringify(data.quote.JPY);
      var payload = {
    'replyToken': replyToken,
    'messages' : [{
        'type': 'text',
        'text': "1 台幣可兌換 "+result.substr(0,9)+" 日圓",
      "quickReply": help
      }],
      }}
    else if(currency=="CNY")
    {
      var result=JSON.stringify(data.quote.CNY);
      var payload = {
    'replyToken': replyToken,
    'messages' : [{
        'type': 'text',
        'text': "1 台幣可兌換 "+result.substr(0,9)+" 人民幣",
      "quickReply": help
      }],
      }}
      send(payload);
  }
  else if (userMessage=="股票")
  {
    var payload = {
    'replyToken': replyToken,
    'messages' :[{
  "type": "text", 
  "text": "選擇欲了解的股票或輸入股票代碼",
  "quickReply": { 
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "台積電",
          "text": "股票2330"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "萬海",
          "text": "股票2615"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "長榮",
          "text": "股票2603"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "自行輸入代碼",
          "text": "輸入範例:股票XXXX"
        }}]}}],
      }
      send(payload);
  }
  else if (userMessage.substr(0,2)=="股票")
  {
    var stock = userMessage.substr(2,4);
    // 資料取自https://www.twse.com.tw/
    var stockdata = UrlFetchApp.fetch("https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=open_datadownload=json&stockNo="+stock);
    var data = JSON.parse(stockdata);
    if(data.stat=="很抱歉，沒有符合條件的資料!")
    {
      var payload = {
    'replyToken': replyToken,
    'messages' : [{
        'type': 'text',
        'text': data.stat,
      "quickReply":{ 
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "台積電",
          "text": "股票2330"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "萬海",
          "text": "股票2615"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "長榮",
          "text": "股票2603"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "自行輸入代碼",
          "text": "輸入範例:股票XXXX"
        }}]}
      }],
      }
    }
    else
    {
    var l = data.data.length;
    var date = data.data[l-1][0]; //日期
    var title = data.title.substr(13,10); //標題
    var trade_num1 = data.data[l-1][1]; //成交股數
    var trade_money = data.data[l-1][2]; //成交金額
    var start_price = data.data[l-1][3]; //開盤價
    var high_price = data.data[l-1][4]; //最高價
    var low_price = data.data[l-1][5]; //最低價
    var end_price = data.data[l-1][6]; //收盤價
    var gap_price = data.data[l-1][7]; //漲跌價差
    var trade_num = data.data[l-1][8]; //成交筆數
    var payload = {
    'replyToken': replyToken,
    'messages' : [{
      "type": "flex",
      "altText": "股票",
      "quickReply": help,
      "contents": {
  "type": "bubble",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": stock,
        "weight": "bold",
        "color": "#1DB446",
        "size": "xs"
      },
      {
        "type": "text",
        "text": title,
        "weight": "bold",
        "size": "xxl",
        "margin": "sm"
      },
      {
        "type": "text",
        "text": date,
        "size": "xs",
        "color": "#aaaaaa",
        "wrap": true
      },
      {
        "type": "separator",
        "margin": "xxl"
      },
      {
        "type": "box",
        "layout": "vertical",
        "margin": "xxl",
        "spacing": "sm",
        "contents": [
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "成交股數",
                "size": "sm",
                "color": "#555555",
                "flex": 0
              },
              {
                "type": "text",
                "text": trade_num1,
                "size": "sm",
                "color": "#111111",
                "align": "end"
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "成交金額",
                "size": "sm",
                "color": "#555555",
                "flex": 0
              },
              {
                "type": "text",
                "text": trade_money,
                "size": "sm",
                "color": "#111111",
                "align": "end"
              }
            ]
          },
          {
            "type": "separator",
            "margin": "xxl"
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "開盤價",
                "size": "sm",
                "color": "#555555",
                "flex": 0
              },
              {
                "type": "text",
                "text": start_price,
                "size": "sm",
                "color": "#111111",
                "align": "end"
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "margin": "sm",
            "contents": [
              {
                "type": "text",
                "text": "最高價",
                "size": "sm",
                "color": "#555555"
              },
              {
                "type": "text",
                "text": high_price,
                "size": "sm",
                "color": "#111111",
                "align": "end"
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "最低價",
                "size": "sm",
                "color": "#555555"
              },
              {
                "type": "text",
                "text": low_price,
                "size": "sm",
                "color": "#111111",
                "align": "end"
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "收盤價",
                "size": "sm",
                "color": "#555555"
              },
              {
                "type": "text",
                "text": end_price,
                "size": "sm",
                "color": "#111111",
                "align": "end"
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "漲跌價差",
                "size": "sm",
                "color": "#555555"
              },
              {
                "type": "text",
                "text": gap_price,
                "size": "sm",
                "color": "#111111",
                "align": "end"
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "成交筆數",
                "size": "sm",
                "color": "#555555"
              },
              {
                "type": "text",
                "text": trade_num,
                "size": "sm",
                "color": "#111111",
                "align": "end"
              }
            ]
          }
        ]
      },
      {
        "type": "separator",
        "margin": "xxl"
      },
      {
        "type": "box",
        "layout": "horizontal",
        "margin": "md",
        "contents": [
          {
            "type": "text",
            "size": "xs",
            "color": "#aaaaaa",
            "flex": 0,
            "align": "center",
            "text": "資料來源為臺灣證券交易所",
            "action": {
              "type": "uri",
              "label": "action",
              "uri": "https://data.gov.tw/dataset/11549"
            },
            "decoration": "underline"
          }
        ]
      }
    ],
    "backgroundColor": "#FAFFFA"
  },
  "styles": {
    "footer": {
      "separator": true
    }
  }
}}],
      }
    }
      send(payload);
  }
  else if(userMessage.substr(0,2)=="新聞")
    {
        / 資料取自newsapi
          var news = UrlFetchApp.fetch("https://newsapi.org/v2/top-headlines?country=tw&apiKey="+'你的newsapi key'+"&pageSize=100");
          var data = JSON.parse(news);
          var total = JSON.stringify(data.totalResults);
          var k = random(0,Math.floor(total/5)+1)-1;
          k=k*5;
      if(k==30)
      {k=29;}
      
      if(userMessage.length!=2)
      {
        var k=userMessage.substr(2,userMessage.length-2);
        k = Number(k);
      }
      
      
      var urltoimage1=data.articles[k].urlToImage;
      if(urltoimage1==null)
      {
        urltoimage1="https://i.imgur.com/oH2OohZ.jpeg";
      }
      var urltoimage2=data.articles[k+1].urlToImage;
      if(urltoimage2==null)
      {
        urltoimage2="https://i.imgur.com/oH2OohZ.jpeg";
      }
      var urltoimage3=data.articles[k+2].urlToImage;
      if(urltoimage3==null)
      {
        urltoimage3="https://i.imgur.com/oH2OohZ.jpeg";
      }
      var urltoimage4=data.articles[k+3].urlToImage;
      if(urltoimage4==null)
      {
        urltoimage4="https://i.imgur.com/oH2OohZ.jpeg";
      }
      var urltoimage5=data.articles[k+4].urlToImage;
      if(urltoimage5==null)
      {
        urltoimage5="https://i.imgur.com/oH2OohZ.jpeg";
      }
      
      var author1=data.articles[k].author;
      if(author1==null)
      {
        author1=" ";
      }
      var author2=data.articles[k+1].author;
      if(author2==null)
      {
        author2=" ";
      }
      var author3=data.articles[k+2].author;
      if(author3==null)
      {
        author3=" ";
      }
      var author4=data.articles[k+3].author;
      if(author4==null)
      {
        author4=" ";
      }
      var author5=data.articles[k+4].author;
      if(author5==null)
      {
        author5=" ";
      }
      
      var time1=JSON.stringify(data.articles[k].publishedAt);
      var time2=JSON.stringify(data.articles[k+1].publishedAt);
      var time3=JSON.stringify(data.articles[k+2].publishedAt);
      var time4=JSON.stringify(data.articles[k+3].publishedAt);
      var time5=JSON.stringify(data.articles[k+4].publishedAt);
      
          var payload = 
      {
  'replyToken': replyToken,
  'messages': [{
      "type": "flex",
      "altText": "新聞",
      "contents": {
  "type": "carousel",
  "contents": [
    {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "image",
            "url": urltoimage1,
            "size": "full",
            "aspectMode": "cover",
            "aspectRatio": "2:3",
            "gravity": "top"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": data.articles[k].title,
                    "size": "xl",
                    "color": "#ffffff",
                    "weight": "bold",
                    "wrap": true,
                    "maxLines": 3,
                    "style": "normal",
                    "align": "start",
                    "action": {
                      "type": "uri",
                      "label": "action",
                      "uri": data.articles[k].url
                    },
                    "decoration": "underline"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": author1,
                    "color": "#ebebeb",
                    "size": "sm",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": time1.substr(1,10),
                    "color": "#ebebeb"
                  }
                ],
                "spacing": "none"
              }
            ],
            "position": "absolute",
            "offsetBottom": "0px",
            "offsetStart": "0px",
            "offsetEnd": "0px",
            "backgroundColor": "#03303Acc",
            "paddingAll": "20px",
            "paddingTop": "18px"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "新聞一",
                "color": "#ffffff",
                "align": "center",
                "size": "xs",
                "offsetTop": "3px"
              }
            ],
            "position": "absolute",
            "cornerRadius": "20px",
            "offsetTop": "18px",
            "backgroundColor": "#41CF34",
            "offsetStart": "18px",
            "height": "25px",
            "width": "53px"
          }
        ],
        "paddingAll": "0px"
      }
    },
    {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "image",
            "url": urltoimage2,
            "size": "full",
            "aspectMode": "cover",
            "aspectRatio": "2:3",
            "gravity": "top"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": data.articles[k+1].title,
                    "size": "xl",
                    "color": "#ffffff",
                    "weight": "bold",
                    "wrap": true,
                    "maxLines": 3,
                    "style": "normal",
                    "align": "start",
                    "action": {
                      "type": "uri",
                      "label": "action",
                      "uri": data.articles[k+1].url
                    },
                    "decoration": "underline"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": author2,
                    "color": "#ebebeb",
                    "size": "sm",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": time2.substr(1,10),
                    "color": "#ebebeb"
                  }
                ],
                "spacing": "none"
              }
            ],
            "position": "absolute",
            "offsetBottom": "0px",
            "offsetStart": "0px",
            "offsetEnd": "0px",
            "backgroundColor": "#03303Acc",
            "paddingAll": "20px",
            "paddingTop": "18px"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "新聞二",
                "color": "#ffffff",
                "align": "center",
                "size": "xs",
                "offsetTop": "3px"
              }
            ],
            "position": "absolute",
            "cornerRadius": "20px",
            "offsetTop": "18px",
            "backgroundColor": "#41CF34",
            "offsetStart": "18px",
            "height": "25px",
            "width": "53px"
          }
        ],
        "paddingAll": "0px"
      }
    },
    {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "image",
            "url": urltoimage3,
            "size": "full",
            "aspectMode": "cover",
            "aspectRatio": "2:3",
            "gravity": "top"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": data.articles[k+2].title,
                    "size": "xl",
                    "color": "#ffffff",
                    "weight": "bold",
                    "wrap": true,
                    "maxLines": 3,
                    "style": "normal",
                    "align": "start",
                    "action": {
                      "type": "uri",
                      "label": "action",
                      "uri": data.articles[k+2].url
                    },
                    "decoration": "underline"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": author3,
                    "color": "#ebebeb",
                    "size": "sm",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": time3.substr(1,10),
                    "color": "#ebebeb"
                  }
                ],
                "spacing": "none"
              }
            ],
            "position": "absolute",
            "offsetBottom": "0px",
            "offsetStart": "0px",
            "offsetEnd": "0px",
            "backgroundColor": "#03303Acc",
            "paddingAll": "20px",
            "paddingTop": "18px"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "新聞三",
                "color": "#ffffff",
                "align": "center",
                "size": "xs",
                "offsetTop": "3px"
              }
            ],
            "position": "absolute",
            "cornerRadius": "20px",
            "offsetTop": "18px",
            "backgroundColor": "#41CF34",
            "offsetStart": "18px",
            "height": "25px",
            "width": "53px"
          }
        ],
        "paddingAll": "0px"
      }
    },
    {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "image",
            "url": urltoimage4,
            "size": "full",
            "aspectMode": "cover",
            "aspectRatio": "2:3",
            "gravity": "top"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": data.articles[k+3].title,
                    "size": "xl",
                    "color": "#ffffff",
                    "weight": "bold",
                    "wrap": true,
                    "maxLines": 3,
                    "style": "normal",
                    "align": "start",
                    "action": {
                      "type": "uri",
                      "label": "action",
                      "uri": data.articles[k+3].url
                    },
                    "decoration": "underline"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": author4,
                    "color": "#ebebeb",
                    "size": "sm",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": time4.substr(1,10),
                    "color": "#ebebeb"
                  }
                ],
                "spacing": "none"
              }
            ],
            "position": "absolute",
            "offsetBottom": "0px",
            "offsetStart": "0px",
            "offsetEnd": "0px",
            "backgroundColor": "#03303Acc",
            "paddingAll": "20px",
            "paddingTop": "18px"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "新聞四",
                "color": "#ffffff",
                "align": "center",
                "size": "xs",
                "offsetTop": "3px"
              }
            ],
            "position": "absolute",
            "cornerRadius": "20px",
            "offsetTop": "18px",
            "backgroundColor": "#41CF34",
            "offsetStart": "18px",
            "height": "25px",
            "width": "53px"
          }
        ],
        "paddingAll": "0px"
      }
    },
    {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "image",
            "url": urltoimage5,
            "size": "full",
            "aspectMode": "cover",
            "aspectRatio": "2:3",
            "gravity": "top"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": data.articles[k+4].title,
                    "size": "xl",
                    "color": "#ffffff",
                    "weight": "bold",
                    "wrap": true,
                    "maxLines": 3,
                    "style": "normal",
                    "align": "start",
                    "action": {
                      "type": "uri",
                      "label": "action",
                      "uri": data.articles[k+4].url
                    },
                    "decoration": "underline"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": author5,
                    "color": "#ebebeb",
                    "size": "sm",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": time5.substr(1,10),
                    "color": "#ebebeb"
                  }
                ],
                "spacing": "none"
              }
            ],
            "position": "absolute",
            "offsetBottom": "0px",
            "offsetStart": "0px",
            "offsetEnd": "0px",
            "backgroundColor": "#03303Acc",
            "paddingAll": "20px",
            "paddingTop": "18px"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "新聞五",
                "color": "#ffffff",
                "align": "center",
                "size": "xs",
                "offsetTop": "3px"
              }
            ],
            "position": "absolute",
            "cornerRadius": "20px",
            "offsetTop": "18px",
            "backgroundColor": "#41CF34",
            "offsetStart": "18px",
            "height": "25px",
            "width": "53px"
          }
        ],
        "paddingAll": "0px"
      }
    }
  ]
}
    
  },{
        'type': 'text',
        'text': '以上為你隨機播報五則新聞',
      "quickReply": { 
    "items": [
      {
        "type": "action",
        "imageUrl":"https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-3/177800/135-512.png",
        "action": {
          "type": "message",
          "label": "help",
          "text": "help"
        }
      },
      {
        "type": "action",
        "imageUrl":"https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-1/254000/99-512.png",
        "action": {
          "type": "message",
          "label": "換一批",
          "text": "新聞"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "自行輸入關鍵字",
          "text": "輸入範例:(關鍵字)的新聞."
        }}]}
      }]
}   
   
      send(payload);
        
    }
  else if(userMessage.substr(userMessage.length-3,3)=="的新聞")
    {
      var keyword = userMessage.substr(0,userMessage.length-3);
      if(keyword!="科技")
        {
          var business_news = UrlFetchApp.fetch("https://newsapi.org/v2/top-headlines?country=tw&q="+keyword+"&apiKey=138f14be6ee14463b4300c10972ef151");
          var data = JSON.parse(business_news);
          var total=JSON.stringify(data.totalResults);
          
          var payload = {
    'replyToken': replyToken,
    'messages' : [{
        'type': 'text',
        'text': "目前查無此關鍵字相關新聞!",
      "quickReply": help}],
          }
          if(total!=0&&total!=1)
          {
            var k=random(0,Math.floor(total/2+0.1)+1)-1;
            var urltoimage1=data.articles[k].urlToImage;
            if(urltoimage1==null)
            {
              urltoimage1="https://i.imgur.com/oH2OohZ.jpeg";
            }
            var urltoimage2=data.articles[k+1].urlToImage;
            if(urltoimage2==null)
            {
              urltoimage2="https://i.imgur.com/oH2OohZ.jpeg";
            }
            
            var author1=data.articles[k].author;
            if(author1==null)
            {
              author1=" ";
           }
            var author2=data.articles[k+1].author;
            if(author2==null)
            {
              author2=" ";
            }
            var time1=JSON.stringify(data.articles[k].publishedAt);
      var time2=JSON.stringify(data.articles[k+1].publishedAt);
      
             payload = 
      {
  'replyToken': replyToken,
  'messages': [{
      "type": "flex",
      "altText": "新聞",
      "contents": {
  "type": "carousel",
  "contents": [
    {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "image",
            "url": urltoimage1,
            "size": "full",
            "aspectMode": "cover",
            "aspectRatio": "2:3",
            "gravity": "top"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": data.articles[k].title,
                    "size": "xl",
                    "color": "#ffffff",
                    "weight": "bold",
                    "wrap": true,
                    "maxLines": 3,
                    "style": "normal",
                    "align": "start",
                    "action": {
                      "type": "uri",
                      "label": "action",
                      "uri": data.articles[k].url
                    },
                    "decoration": "underline"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": author1,
                    "color": "#ebebeb",
                    "size": "sm",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": time1.substr(1,10),
                    "color": "#ebebeb"
                  }
                ],
                "spacing": "none"
              }
            ],
            "position": "absolute",
            "offsetBottom": "0px",
            "offsetStart": "0px",
            "offsetEnd": "0px",
            "backgroundColor": "#03303Acc",
            "paddingAll": "20px",
            "paddingTop": "18px"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "新聞一",
                "color": "#ffffff",
                "align": "center",
                "size": "xs",
                "offsetTop": "3px"
              }
            ],
            "position": "absolute",
            "cornerRadius": "20px",
            "offsetTop": "18px",
            "backgroundColor": "#41CF34",
            "offsetStart": "18px",
            "height": "25px",
            "width": "53px"
          }
        ],
        "paddingAll": "0px"
      }
    },
    {
      "type": "bubble",
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "image",
            "url": urltoimage2,
            "size": "full",
            "aspectMode": "cover",
            "aspectRatio": "2:3",
            "gravity": "top"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": data.articles[k+1].title,
                    "size": "xl",
                    "color": "#ffffff",
                    "weight": "bold",
                    "wrap": true,
                    "maxLines": 3,
                    "style": "normal",
                    "align": "start",
                    "action": {
                      "type": "uri",
                      "label": "action",
                      "uri": data.articles[k+1].url
                    },
                    "decoration": "underline"
                  }
                ]
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": author2,
                    "color": "#ebebeb",
                    "size": "sm",
                    "flex": 0
                  },
                  {
                    "type": "text",
                    "text": time2.substr(1,10),
                    "color": "#ebebeb"
                  }
                ],
                "spacing": "none"
              }
            ],
            "position": "absolute",
            "offsetBottom": "0px",
            "offsetStart": "0px",
            "offsetEnd": "0px",
            "backgroundColor": "#03303Acc",
            "paddingAll": "20px",
            "paddingTop": "18px"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "新聞二",
                "color": "#ffffff",
                "align": "center",
                "size": "xs",
                "offsetTop": "3px"
              }
            ],
            "position": "absolute",
            "cornerRadius": "20px",
            "offsetTop": "18px",
            "backgroundColor": "#41CF34",
            "offsetStart": "18px",
            "height": "25px",
            "width": "53px"
          }
        ],
        "paddingAll": "0px"
      }
    }
  ]
}
    
  },{
        'type': 'text',
    'text': '以上為你播報兩則「'+keyword+'」相關新聞',
      "quickReply": help
      }]
}
      }
          
            
   
      send(payload);
        }
    }
  else if (userMessage.substr(userMessage.length-3,3)=="的天氣"){
    var place = userMessage.substr(0,userMessage.length-3);
    var place1 = LanguageApp.translate(place, 'zh', 'en');
    var weadata = UrlFetchApp.fetch("http://api.openweathermap.org/data/2.5/weather?q="+place1+"&units=metric&appid="+'你的openweathermap key'+"&lang=zh_tw");
    var data = JSON.parse(weadata);

    if(data.coord.lon)
    {
    var sendmsg="查無此地名";
    }
    
    var coordlon = JSON.stringify(data.coord.lon);
    var coordlat = JSON.stringify(data.coord.lat);
    var des = JSON.stringify(data.weather[0].description);
    var temp = JSON.stringify(data.main.temp);
    var feelstemp = JSON.stringify(data.main.feels_like);
    var min = JSON.stringify(data.main.temp_min);
    var max = JSON.stringify(data.main.temp_max);
    var pressure = JSON.stringify(data.main.pressure);
    var humidity = JSON.stringify(data.main.humidity);
    sendmsg=place+"的天氣如下:\n主要:"+des+"\n目前溫度:"+temp+"C\n體感溫度:"+feelstemp+"°C\n最低:"+min+"°C 最高:"+max+"°C\n氣壓:"+pressure+"hpa\n濕度:"+humidity+"%\n(經度:"+coordlon+"/緯度:"+coordlat+")";

    
    var payload = {
    'replyToken': replyToken,
    'messages' : [{
        'type': 'text',
        'text': sendmsg,
      "quickReply": help}],
      }
    send(payload);
  }
}
function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function send(payload) {
  var send_payload={
      'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify(payload),
  };
  UrlFetchApp.fetch(url, send_payload);
//   Sheet.getRange(LastRow+1, 10).setValue(d);  // 紀錄回復訊息 (測試用)
//   Sheet.getRange(LastRow+1, 11).setValue(JSON.stringify(payload.messages));
}