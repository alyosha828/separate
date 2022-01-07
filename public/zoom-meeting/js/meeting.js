window.addEventListener('DOMContentLoaded', function (event) {
  console.log('DOM fully loaded and parsed');
  websdkready();
});

function websdkready() {
  var testTool = window.testTool;
  // get meeting args from url
  var tmpArgs = testTool.parseQuery();
  var API_KEY = "5Kk_o3vsTVC9g3_-C7wPsg";
  var API_SECRET = "3VodgkGn05LQiYLJ6D2Q1ybkAJlwTu9CVJd9";
  var userId = '';

  var meetingConfig = {
    apiKey: API_KEY,
    meetingNumber: tmpArgs.mn,
    userName: (function () {
      if (tmpArgs.name) {
        try {
          return testTool.b64DecodeUnicode(tmpArgs.name);
        } catch (e) {
          return tmpArgs.name;
        }
      }
      return (
        "CDN#" +
        tmpArgs.version +
        "#" +
        testTool.detectOS() +
        "#" +
        testTool.getBrowserInfo()
      );
    })(),
    passWord: tmpArgs.pwd,
    leaveUrl: "https://zoom.us/",
    role: parseInt(tmpArgs.role, 10),
    userEmail: (function () {
      try {
        return testTool.b64DecodeUnicode(tmpArgs.email);
      } catch (e) {
        return tmpArgs.email;
      }
    })(),
    lang: tmpArgs.lang,
    signature: tmpArgs.signature || "",
    china: tmpArgs.china === "1",
  };

  // a tool use debug mobile device
  if (testTool.isMobileDevice()) {
    vConsole = new VConsole();
  }
  console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

  // it's option if you want to change the WebSDK dependency link resources. setZoomJSLib must be run at first
  // ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.7/lib", "/av"); // CDN version defaul
  if (meetingConfig.china) {
    ZoomMtg.setZoomJSLib("https://jssdk.zoomus.cn/1.9.7/lib", "/av"); // china cdn option
  }
  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareJssdk();
  function beginJoin(signature) {
    console.log(meetingConfig);
    ZoomMtg.init({
      leaveUrl: meetingConfig.leaveUrl,
      webEndpoint: meetingConfig.webEndpoint,
      disableCORP: !window.crossOriginIsolated, // default true
      disablePreview: false, // default false
      success: function () {
        console.log(meetingConfig);

        ZoomMtg.join({
          meetingNumber: meetingConfig.meetingNumber,
          userName: meetingConfig.userName,
          signature: signature,
          apiKey: meetingConfig.apiKey,
          userEmail: meetingConfig.userEmail,
          passWord: meetingConfig.passWord,
          success: function (res) {
            console.log("join meeting success");

            $('#audio_modal').addClass('backdrop');
            var element = document.getElementById("audio_modal");
            element.classList.add("backdrop");

            document.getElementById("audiobutton").addEventListener("click", function () {
              element.classList.remove("backdrop");
              // ZoomMtg.mute({
              //   userId,
              //   mute: false
              // });
              $('.send-video-container__btn').trigger('click')
            });

            setTimeout(() => {
              $('.send-video-container__btn').trigger('click')
            }, 5000)

            ZoomMtg.getAttendeeslist({});
            console.log("get attendeelist");
            ZoomMtg.getCurrentUser({
              success: function (res) {
                const data = res.result.currentUser;
                console.log("success getCurrentUser", data);
                userId = data.userId

                // ZoomMtg.mute({
                //   userId: data.userId,
                //   mute: true
                // });
              },
            });
          },
          error: function (res) {
            console.log(res);
          },
        });
      },
      error: function (res) {
        console.log(res);
      },
    });

    ZoomMtg.inMeetingServiceListener('onUserJoin', function (data) {
      console.log('inMeetingServiceListener onUserJoin', data);
    });

    ZoomMtg.inMeetingServiceListener('onUserLeave', function (data) {
      console.log('inMeetingServiceListener onUserLeave', data);
    });

    ZoomMtg.inMeetingServiceListener('onUserIsInWaitingRoom', function (data) {
      console.log('inMeetingServiceListener onUserIsInWaitingRoom', data);
    });

    ZoomMtg.inMeetingServiceListener('onMeetingStatus', function (data) {
      console.log('inMeetingServiceListener onMeetingStatus', data);
    });
  }
  function getSignature(meetingConfig) {
    console.log(meetingConfig.meetingNumber, meetingConfig.role)
    ZoomMtg.generateSignature({
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      meetingNumber: meetingConfig.meetingNumber,
      role: meetingConfig.role,
      success: function (res) {
        console.log(res.result);
        meetingConfig.signature = res.result;
        beginJoin(meetingConfig.signature);
      },
    });
  }
  getSignature(meetingConfig);
};