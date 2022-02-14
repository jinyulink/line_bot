var CHANNEL_ACCESS_TOKEN = 'Your Token'; //�A��bot token
var d = new Date();
// var SpreadSheet = SpreadsheetApp.openById('Your SpreadSheet ID'); //�ΥH�����T�� (���ե�)
// var Sheet = SpreadSheet.getSheetByName("�������쪺�T��");
// var LastRow = Sheet.getLastRow();
var userMessage, msg, replyToken, url = 'https://api.line.me/v2/bot/message/reply';
var help =  { 
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "�{�b�Ѯ�",
          "text": "�Ѯ�"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "�T�E�H��",
          "text": "�T�E"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "����a�_",
          "text": "�a�_"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "�Ѳ�",
          "text": "�Ѳ�"
        }
      },
    {
        "type": "action",
        "action": {
          "type": "message",
          "label": "�ײv",
          "text": "�ײv"
        }
      },
    {
        "type": "action",
        "action": {
          "type": "message",
          "label": "�s�D",
          "text": "�s�D"
        }
      }]
    }

//�s���T��(�ǰT���ܩҦ��Τ�)
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
                text:'�o�O�s�����հT���A�Щ����C'
            }]
        }),
    });  
}

//���o�ϥΪ̦W��
function getUsername(userId) {
  var url1 = 'https://api.line.me/v2/bot/profile/'+userId;
  var response = UrlFetchApp.fetch(url1, {
    'headers': {
      'authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
    }
  });
  return JSON.parse(response).displayName;
}

//���o�s�զW��
function getGroupname(groupId) {
  var url = 'https://api.line.me/v2/bot/group/'+groupId+'/summary';
  var response = UrlFetchApp.fetch(url, {
    'headers': {
      'authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
    }
  });
  return JSON.parse(response).groupName;
}

//���o�s�դH��
function getnumgroup(groupId) {
  var url = 'https://api.line.me/v2/bot/group/'+groupId+'/members/count';
  var response = UrlFetchApp.fetch(url, {
    'headers': {
      'authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
    }
  });
  return JSON.parse(response).count;
}

//�����H���}�s��
function leavegroup(groupId) {
  var url = 'https://api.line.me/v2/bot/group/'+groupId+'/leave';
  var response = UrlFetchApp.fetch(url, {
    "method": "post",
    'headers': {
      'authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
    }
  });
}

//�D�{��
function doPost(e) {
  
  msg = JSON.parse(e.postData.contents);
  console.log(msg);
  
  // ���X replyToken �M�o�e���T����r
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
//     Sheet.getRange(LastRow+1, 4).setValue(groupname+" ("+num+"�H)");
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
//   Sheet.getRange(LastRow+1, 9).setValue('<-���� || �^�_->');

  if (typeof replyToken === 'undefined') {
    return;
  }
  
  if(userMessage=="�Ѯ�")
  {
    var payload = {
    'replyToken': replyToken,
    'messages' : [{
  "type": "text", 
  "text": "��ܩο�J�A���Ҧb�a�Ѯ�",
  "quickReply": { 
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "�x�_���Ѯ�",
          "text": "�x�_���Ѯ�"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "�x�����Ѯ�",
          "text": "�x�����Ѯ�"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "�������Ѯ�",
          "text": "�������Ѯ�"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "�ۦ��J",
          "text": "��J�d��:(�a�W)���Ѯ�"
        }}]}}]}
      send(payload);
  }
  else if(userMessage=="�N���T�T"||userMessage=="�N�̫���"&&type1=='"group"')
    {
      if(useridx=='U5f4141aa1e7a436586e67a0d4622b20c')
      {
        var payload = {
    'replyToken': replyToken,
    'messages' : [{
        'type': 'text',
        'text': '�����ġA�ڤ��n',
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
        'text': '�T�TQ',
      }],
      }
      send(payload);
      leavegroup(groupId);
      Sheet.getRange(LastRow+1, 11).setValue("���}�s��");
      }
      
    }
  else if(userMessage=="�T�E")
    {
    // ��ƨ���https://covid-19.nchc.org.tw/api �C�馭�W9�I��s
      var COVID19_data = UrlFetchApp.fetch("https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw&querydata=3001&limited=TWN");
      var data = JSON.parse(COVID19_data);
      var date = data[0].a04;//���
      var total_cases = data[0].a05;//�`�T�E�H��
      var new_cases = data[0].a06;//�s�W�T�E
      var total_deaths = data[0].a08;//�`���`��
      var new_deaths = data[0].a09;//�s�W���`��
      var payload = {
    'replyToken': replyToken,
    'messages' : [{
        "type": "flex",
      "altText": "�a�_",
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
            "text": "�s�W"+new_cases+"��, "+new_deaths+"��",
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
                "text": "�ֿn�T�E"+total_cases+"�� / "+total_deaths+"���`",
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
        'text': "����^�۽åͺ֧Q���e�f�ި�p(�C���s)",
      "quickReply": help
      }],
      }
      send(payload);
    }
  else if(userMessage=="�a�_")
    {
    // ��ƨ��۽åͧ� ����a�_
      var c_data = UrlFetchApp.fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/E-A0015-001?authorization=CWB-9B5A873E-E32C-4E9F-BF45-A9D8AD371D36&format=JSON&stationName=string")
      var data = JSON.parse(c_data);
      var payload = {
    'replyToken': replyToken,
    "messages": [
    {
      "type": "flex",
      "altText": "�a�_",
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
            "text": "�W��"+data.records.earthquake[0].earthquakeInfo.magnitude.magnitudeValue,
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
  "text": "��ܥH�U�\��",
  "quickReply": help}],
      }
      send(payload);
    }
//�ײv�\��|������ �r�u�ϥ�
//   else if (userMessage=="�ײv")
//     {
//       var payload = {
//     'replyToken': replyToken,
//     'messages' :[{
//   "type": "text", 
//   "text": "�п�ܥ~��",
//   "quickReply": { 
//     "items": [
//       {
//         "type": "action",
//         "action": {
//           "type": "message",
//           "label": "����",
//           "text": "TWD_USD"
//         }
//       },
//       {
//         "type": "action",
//         "action": {
//           "type": "message",
//           "label": "���",
//           "text": "TWD_HKD"
//         }
//       },
//       {
//         "type": "action",
//         "action": {
//           "type": "message",
//           "label": "�^��",
//           "text": "TWD_GBP"
//         }
//       },
//       {
//         "type": "action",
//         "action": {
//           "type": "message",
//           "label": "���",
//           "text": "TWD_JPY"
//         }},
//     {
//         "type": "action",
//         "action": {
//           "type": "message",
//           "label": "�H����",
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
        'text': "1 �x���i�I�� "+result.substr(0,9)+" ����",
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
        'text': "1 �x���i�I�� "+result.substr(0,9)+" ���",
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
        'text': "1 �x���i�I�� "+result.substr(0,9)+" �^��",
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
        'text': "1 �x���i�I�� "+result.substr(0,9)+" ���",
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
        'text': "1 �x���i�I�� "+result.substr(0,9)+" �H����",
      "quickReply": help
      }],
      }}
      send(payload);
  }
  else if (userMessage=="�Ѳ�")
  {
    var payload = {
    'replyToken': replyToken,
    'messages' :[{
  "type": "text", 
  "text": "��ܱ��F�Ѫ��Ѳ��ο�J�Ѳ��N�X",
  "quickReply": { 
    "items": [
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "�x�n�q",
          "text": "�Ѳ�2330"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "�U��",
          "text": "�Ѳ�2615"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "���a",
          "text": "�Ѳ�2603"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "�ۦ��J�N�X",
          "text": "��J�d��:�Ѳ�XXXX"
        }}]}}],
      }
      send(payload);
  }
  else if (userMessage.substr(0,2)=="�Ѳ�")
  {
    var stock = userMessage.substr(2,4);
    // ��ƨ���https://www.twse.com.tw/
    var stockdata = UrlFetchApp.fetch("https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=open_datadownload=json&stockNo="+stock);
    var data = JSON.parse(stockdata);
    if(data.stat=="�ܩ�p�A�S���ŦX���󪺸��!")
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
          "label": "�x�n�q",
          "text": "�Ѳ�2330"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "�U��",
          "text": "�Ѳ�2615"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "���a",
          "text": "�Ѳ�2603"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "�ۦ��J�N�X",
          "text": "��J�d��:�Ѳ�XXXX"
        }}]}
      }],
      }
    }
    else
    {
    var l = data.data.length;
    var date = data.data[l-1][0]; //���
    var title = data.title.substr(13,10); //���D
    var trade_num1 = data.data[l-1][1]; //����Ѽ�
    var trade_money = data.data[l-1][2]; //������B
    var start_price = data.data[l-1][3]; //�}�L��
    var high_price = data.data[l-1][4]; //�̰���
    var low_price = data.data[l-1][5]; //�̧C��
    var end_price = data.data[l-1][6]; //���L��
    var gap_price = data.data[l-1][7]; //���^���t
    var trade_num = data.data[l-1][8]; //���浧��
    var payload = {
    'replyToken': replyToken,
    'messages' : [{
      "type": "flex",
      "altText": "�Ѳ�",
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
                "text": "����Ѽ�",
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
                "text": "������B",
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
                "text": "�}�L��",
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
                "text": "�̰���",
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
                "text": "�̧C��",
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
                "text": "���L��",
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
                "text": "���^���t",
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
                "text": "���浧��",
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
            "text": "��ƨӷ����O�W�Ҩ�����",
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
  else if(userMessage.substr(0,2)=="�s�D")
    {
        / ��ƨ���newsapi
          var news = UrlFetchApp.fetch("https://newsapi.org/v2/top-headlines?country=tw&apiKey="+'�A��newsapi key'+"&pageSize=100");
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
      "altText": "�s�D",
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
                "text": "�s�D�@",
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
                "text": "�s�D�G",
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
                "text": "�s�D�T",
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
                "text": "�s�D�|",
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
                "text": "�s�D��",
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
        'text': '�H�W���A�H���������h�s�D',
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
          "label": "���@��",
          "text": "�s�D"
        }
      },
      {
        "type": "action",
        "action": {
          "type": "message",
          "label": "�ۦ��J����r",
          "text": "��J�d��:(����r)���s�D."
        }}]}
      }]
}   
   
      send(payload);
        
    }
  else if(userMessage.substr(userMessage.length-3,3)=="���s�D")
    {
      var keyword = userMessage.substr(0,userMessage.length-3);
      if(keyword!="���")
        {
          var business_news = UrlFetchApp.fetch("https://newsapi.org/v2/top-headlines?country=tw&q="+keyword+"&apiKey=138f14be6ee14463b4300c10972ef151");
          var data = JSON.parse(business_news);
          var total=JSON.stringify(data.totalResults);
          
          var payload = {
    'replyToken': replyToken,
    'messages' : [{
        'type': 'text',
        'text': "�ثe�d�L������r�����s�D!",
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
      "altText": "�s�D",
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
                "text": "�s�D�@",
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
                "text": "�s�D�G",
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
    'text': '�H�W���A������h�u'+keyword+'�v�����s�D',
      "quickReply": help
      }]
}
      }
          
            
   
      send(payload);
        }
    }
  else if (userMessage.substr(userMessage.length-3,3)=="���Ѯ�"){
    var place = userMessage.substr(0,userMessage.length-3);
    var place1 = LanguageApp.translate(place, 'zh', 'en');
    var weadata = UrlFetchApp.fetch("http://api.openweathermap.org/data/2.5/weather?q="+place1+"&units=metric&appid="+'�A��openweathermap key'+"&lang=zh_tw");
    var data = JSON.parse(weadata);

    if(data.coord.lon)
    {
    var sendmsg="�d�L���a�W";
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
    sendmsg=place+"���Ѯ�p�U:\n�D�n:"+des+"\n�ثe�ū�:"+temp+"C\n��P�ū�:"+feelstemp+"�XC\n�̧C:"+min+"�XC �̰�:"+max+"�XC\n����:"+pressure+"hpa\n���:"+humidity+"%\n(�g��:"+coordlon+"/�n��:"+coordlat+")";

    
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
//   Sheet.getRange(LastRow+1, 10).setValue(d);  // �����^�_�T�� (���ե�)
//   Sheet.getRange(LastRow+1, 11).setValue(JSON.stringify(payload.messages));
}