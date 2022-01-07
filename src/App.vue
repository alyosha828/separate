<template>
  <div class="beforeTranslate">
    
    <ai-navigation></ai-navigation>

    <!-- Topscreen -->
    <main id="topscreen" class="topscreen">
      <div id="contents">
        <lang-container :class="{ openSettingPanel: !isSettingsHided }" />

        <setting-panel
          v-model="modal"
          @toggle-settings="isSettingsHided = $event"
          :data="this.csvData"
          :langData="this.lang"
        ></setting-panel>
        <!-- /END #settingPanel -->
      </div>
      <!-- /END #contents -->

      <div class="topscreen_overlay"></div>
    </main>
    <!-- /END #topscreen -->

    <zoom-modal v-if="modal === 'zoom'" :data="this.csvData" @resetModal="modal = $event" />
    <teams-modal v-if="modal === 'teams'" :data="this.csvData" @resetModal="modal = $event" />
    <meet-modal v-if="modal === 'meet'" :data="this.csvData" @resetModal="modal = $event" />
    <whereby-modal v-if="modal === 'whereby'" :data="this.csvData" @resetModal="modal = $event" />
    <hangouts-modal v-if="modal === 'hangouts'" @resetModal="modal = $event" />
    <skype-modal v-if="modal === 'skype'" :data="this.csvData" @resetModal="modal = $event" />
    
    <extension-install
      id="install"
      v-if="showInstall"
      :data="this.csvData"
      @resetModal="modal = $event"
    />
    <!-- <circle-spin color="#ff0000" width=100px height=100px :loading="isLoading"></circle-spin> -->
    <loading
      id="loading"
      v-if="isLoading"
      @resetModal="modal = $event"
    />
    <!-- <vue-simple-spinner size="medium" /> -->
  </div>
</template>

<script>
import LangContainer from "@/components/lang-container.vue";
import AiNavigation from "@/components/ai-navigation.vue";
import SettingPanel from "@/components/setting-panel.vue";
import ZoomModal from "@/components/modals/zoom-modal.vue";
import TeamsModal from "@/components/modals/teams-modal.vue";
import HangoutsModal from "@/components/modals/hangouts-modal.vue";
import ExtensionInstall from "@/components/modals/extension-install.vue";
import WherebyModal from "@/components/modals/whereby-modal.vue";
import MeetModal from "@/components/modals/meet-modal.vue";
import SkypeModal from "@/components/modals/skype-modal.vue";
import Loading from "@/components/modals/loading.vue";
// import csvFile from "./assets/test.csv";
// var csvFile = require("./assets/test.csv");
import * as Papa from 'papaparse'
// import VueSimpleSpinner from 'vue-simple-spinner'
export default {
  components: {
    LangContainer,
    AiNavigation,
    SettingPanel,
    ZoomModal,
    TeamsModal,
    HangoutsModal,
    WherebyModal,
    MeetModal,
    SkypeModal,
    ExtensionInstall,
    Loading,
    // VueSimpleSpinner
  },
  data: () => ({
    isLoading: true,
    modal: "",
    isSettingsHided: false,
    showInstall: false,
    _id: "0",
    lang: "jp",
    csvData: {
      "cc":"jp",
      "extension1":"Please install the extension.",
      "extension2":"It seems that the extension is not installed in this browser. This service uses the \"AI HONYAKU extension\" for Google Chrome. Please click the button below to install the extension. This screen will not appear after the extension installation is complete.",
      "extension3":"Install the extension",
      "privacy1":"AI通訳の",
      "privacy2":"利用規約",
      "privacy3":"に同意する。",
      "meetingurl":"ミーティングURL",
      "zoom1":"ZoomミーティングルームのURLと表示名を入力してZoomを開始してください。",
      "zoom2":"表示名",
      "zoom3":"AI翻訳",
      "zoom4":"Zoomに入室し翻訳を開始",
      "zoom5":"Zoomに入室し翻訳を開始",
      "teams1":"??会議のURLを入力してTeamsに入室し、「ウェブ上で参加/ブラウ",
      "teams2":"??会議のURLを入力してTeamsに入室し、「ウェブ上で参加/ブラウ",
      "teams3":"ザで続行」をクリックしてください。",
      "teams4":"Teamsに入室して通訳を開始",
      "gmeet1":"Google?Meetに入室し、通訳を開始します。",
      "gmeet2":"Google?Meetに入室し、通訳を開始します。",
      "gmeet3":"会議のURLを入力してください。",
      "gmeet4":"Google?Meetに入室して通訳を開始",
      "whereby1":"Wherebyに入室し、通訳を開始します。",
      "whereby2":"Wherebyに入室し、通訳を開始します。",
      "whereby3":"会議のURLを入力してください。",
      "whereby4":"Wherebyに入室して通訳を開始",
      "skype1":"Skypeに入室し、通訳を開始します。",
      "skype2":"Skypeに入室し、通訳を開始します。",
      "skype3":"会議のURLを入力してください。",
      "skype4":"Skypeに入室して通訳を開始",
      "menu1":"zoomに出力",
      "menu2":"Teamsに出力",
      "menu3":"GoogleMeet?に出力",
      "menu4":"Wherebyに出力",
      "menu5":"Skypeに出力",
      "menu6":"発話言語",
      "menu7":"翻訳先言語"
    },
  }),
  watch: {
    csvData (current) {
      if (current) {
        console.log("============== " + current);
      }
    },
    modal() {
    },
    isSettingsHided() {
    },
  },
  methods: {
    openInstall() {
      const key = require("./constant.json");
      const extensionid = key.extensionid;
      this.detectExtension(extensionid);
    },
    detectExtension(extensionId) {
      
      this.intervalLoading = setInterval(() => {
        this.isLoading = false;
      }, 500);
      
      var img;
      img = new Image();
      img.src = "chrome-extension://" + extensionId + "/icon16.png";
      img.onload = function () {
        localStorage.setItem("stateInstall", false);
      };
      img.onerror = function () {
        localStorage.setItem("stateInstall", true);
      };
    },
    showModal() {
      var is = localStorage.getItem("stateInstall");
      if (is === "true") {
        this.showInstall = localStorage.getItem("stateInstall");
      }
    },
    changeInput(lang) {
      console.log("Input Lang===", lang);
    },
    checkInstall(data) {
      this.csvData = data;
      localStorage.setItem("stateInstall", null);
      
      console.log("checkInstall:\n " + data.cc);
      this.openInstall();
      this.interval = setInterval(() => this.showModal(), 1000);
    },
    createInput(file, aLang, callBack) {
      Papa.parse(file, {
        download: true,
        // rest of config ...
        header: true,
        encoding: "Unicode",
        dynamicTyping: false,
        skipEmptyLines: true,
        complete: function(results) {
          // console.log(aLang + " RESULTS:\n " + JSON.stringify(results));
                
          results.data.forEach(element => {
            if (element.cc === aLang) {
              this.csvData = element;
              // console.log("csvData222:\n " + this.csvData.zoom1);
              callBack(this.csvData);
              return;
            }
          });

          // this.csvData = results;
          // console.log("csvData:\n " + JSON.stringify(this.csvData.data[0]));
          // data = results;
          // makeCsvTable(fileList);
        }
      });
      
      
    },
    getCsvData() {
      const key = require("./constant.json");
      var csvFile = key.home_url + "languages.csv";
      this.createInput(csvFile, this.lang, this.checkInstall);
    }
  },
  mounted() {
    this.isLoading = true;
    var callTime = localStorage.getItem("callTime");
    var setLang = localStorage.getItem("setLang");
    let curTime = Math.round(new Date() / 1000);
    // console.log("callTime ================== " + callTime + " == " + setLang + " == " + curTime);
    
    if (callTime == null | setLang == null | curTime - callTime > 604800 | callTime == "null" | setLang == "null")
    {
      fetch( 'https://api.ipify.org?format=json' )
        .then(x => x.json())
        .then(({ ip }) => {
          console.log("IP Address ===", ip);
          this._id = ip;
          fetch(
            "http://api.ipstack.com/" + ip + "?access_key=da810eb17632d25a6d76072379f26fcb"
          )
            .then(async (response) => {
              const data = await response.json();
              if (data.location.languages.length > 0){
                console.log("response ===", data.location.languages.length + " == " + data.location.languages[0].code);
                this.lang = data.location.languages[0].code;
                localStorage.setItem("callTime", curTime);
                localStorage.setItem("setLang", this.lang);
                console.log("this.lang ===", this.lang);
              }
          //    this.checkInstall();
              this.getCsvData();
              // localStorage.setItem("result", result);
            })
            .catch(function (error) {
              console.log("error == " + error);
          //    this.checkInstall();
              this.getCsvData();
            });
        })
        .catch(function (error) {
          console.log("error == " + error);
        //  this.checkInstall();
          this.getCsvData();
        });
    }
    else{
      this.lang = setLang;
      this.getCsvData();
    }

  },
  
};
</script>


<style>
.modal-overlay {
  background: rgba(0, 0, 0, 0.3);
}
@font-face {
  font-family: "ElvishFont";
  src: local("PingFangSC-Regular"),
   url(./assets/fonts/tnganbi.woff) format("truetype");
}
</style>
