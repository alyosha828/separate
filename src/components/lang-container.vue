<template>
  <section id="langContainer" class="langContainer">
    <div id="langDefault" class="langDefault">
      <textarea
        id="speechText"
        :style="{ fontSize: speechTextSize + 'px' }"
        disabled
        v-model="speekText"
      >
先日のお見積もりの件ですが、ご要望に沿う条件でご提案することが可能のようです。こちらの先日のお見積もりの件ですが、ご要望に沿う条件でご提案することが可能のようです。こちらの先日のお見積もりの件ですが、ご要望に沿う条件でご提案することが可能のようです。こちらの先日のお見積もりの件ですが、ご要望に沿う条件でご提案することが可能のようです。こちらの資料をご覧ください。先日のお見積もりの件ですが、ご要望に沿う条件でご提案することが可能のようです。こちらの資料をご覧ください。</textarea
      >
    </div>
    <div id="langTranslate" class="langTranslate">
      <textarea
        id="translateText"
        :style="{ fontSize: translateTextSize + 'px', fontFamily: specialLang == 'ev' ? 'ElvishFont' : ''}"
        disabled
        v-model="translateText"
      >
Regarding your recent quotation, it seems that it is possible for us to offer you a proposal with terms that meet your requirements. Please take a look at this document.</textarea
      >
    </div>
    
    <textarea id="outLanguage" v-show="false" v-model="langText" style="position:absolute">
      Elvish
    </textarea>
  </section>
</template>
<script>
var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = SpeechRecognition ? new SpeechRecognition() : false;

import { EventBus } from "../Event.js";

export default {
  props: {
    lang: {
      type: String,
      default: "ja-JP",
    },
  },
  data() {
    return {
      error: false,
      speaking: false,
      toggle: false,
      isChange: false,
      speekText: "",
      translateText: "",
      runtimeTranscription: "",
      sentences: [],
      inputLang: "ja",
      outputLang: "en",
      specialLang: "",
      // testlang: "",
      speechTextSize: 30,
      translateTextSize: 30,
      tts: "google",
      extensionid: "",
      langText: ""
    };
  },
  methods: {
    updateSize() {
      var speechDivEl = document.getElementById("speechText");
      if (speechDivEl.scrollHeight > speechDivEl.clientHeight) {
        this.speechTextSize = this.speechTextSize * 0.9;
      } else {
        this.speechTextSize = 30;
      }

      var translateDivEl = document.getElementById("translateText");
      if (translateDivEl.scrollHeight > translateDivEl.clientHeight) {
        this.translateTextSize = this.translateTextSize * 0.9;
      } else {
        this.translateTextSize = 30;
      }

      setTimeout(() => {
        this.updateSize();
      }, 10);
    },
    calc() {
      setTimeout(() => {
        this.updateSize();
      }, 0);
    },
    checkCompatibility() {
      if (!recognition) {
        this.error =
          "Speech Recognition is not available on this browser. Please use Chrome or Firefox";
        return;
      }
      this.startSpeechRecognition();
    },
    endSpeechRecognition() {
      this.translateGoogle("I speak English");
    },
    startSpeechRecognition() {
      if (!recognition) {
        this.error =
          "Speech Recognition is not available on this browser. Please use Chrome or Firefox";
        return false;
      }
      this.toggle = true;
      recognition.lang = this.inputLang;
      recognition.interimResults = true;

      recognition.addEventListener("speechstart", (event) => {
        this.speaking = true;
        console.log("speechstart " + event + " = " + this.inputLang);
      });

      recognition.addEventListener("speechend", (event) => {
        this.speaking = false;
        console.log("speechend " + event);
      });

      recognition.addEventListener("result", (event) => {
        const text = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        this.runtimeTranscription = text;
        this.speekText = text;
      });

      recognition.addEventListener("end", () => {
        if (this.runtimeTranscription !== "") {
          this.sentences.push(
            this.capitalizeFirstLetter(this.runtimeTranscription)
          );
          console.log(
            "addEventListener end " +
              `${this.text}${this.sentences.slice(-1)[0]}. `
          );

          this.$emit(
            "update:text",
            `${this.text}${this.sentences.slice(-1)[0]}. `
          );
        }
        this.runtimeTranscription = "";
        if (this.toggle) {
          // keep it going.
          try {
            recognition.start();
          } catch (e) {
            console.log("Exception: ", e);
          }
        }
      });
      if (!this.isChange) recognition.start();
      this.isChange = false;
    },
    capitalizeFirstLetter(string) {
      console.log("Final " + string.charAt(0).toUpperCase() + string.slice(1));
      this.speekText = string.charAt(0).toUpperCase() + string.slice(1);
      this.translateGoogle(this.speekText);
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    translateGoogle(text) {
      let result = "";
      
      console.log("translateSpecial ==text=== " + text + " == " + this.inputLang + " == " + this.specialLang);
      if (this.inputLang == 'en' && this.specialLang == 'ev') {
        this.translateSpecial(text);
        return;
      }
      fetch(
        "https://translation.googleapis.com/language/translate/v2?json=true&key=AIzaSyBln_lQXmZDeYw_RWLS1fp1fTC4OrquwYw&source=" +
          this.inputLang +
          "&target=" +
          this.outputLang +
          "&format=text&q=" +
          text
      )
        .then(async (response) => {
          const data = await response.json();
          if (!data.data) return "";
          for (const translation of data.data.translations) {
            result += translation.translatedText;
          }
          this.translateTextSize = 30;
          if (this.specialLang === "ev"){
            this.translateSpecial(result);
          }
          else{
            this.translateText = result;
          }
          // localStorage.setItem("result", result);
        })
        .catch(function (error) {
          console.log("error == " + error);
        });
    },
    translateSpecial(text) {
      console.log("translateSpecial ==text=== " + text);
      let result = "";
      fetch("http://124.158.4.209:8888/sindarin?text=" + text)
        .then(async (response) => {
          const data = await response.json();
          if (!data.result) return "";
          result = data.result;
          console.log("translateSpecial ===== " + result);
          this.translateText = result;
        })
        .catch(function (error) {
          console.log("error == " + error);
        });
    }
  },
  mounted() {
    //this.translateSpecial("how are you?");
    const key = require("../constant.json");
    this.extensionid = key.extensionid;
    this.calc();
    this.checkCompatibility();
    EventBus.$on("changeInputLang", language => {
      //    console.log("changeInputLang == " + language);
      this.inputLang = language;
      // if (language == "")
      //   this.inputLang = 'ja';
      this.isChange = true;
      this.toggle = true;
      this.startSpeechRecognition();
    });
    EventBus.$on("changeOutputLang", (language, language2) => {
      this.outputLang = language;
      // if (language == "")
      //   this.outputLang = 'en';
      this.specialLang = language2;
      this.langText = language2;
    });
  },
};
</script>

<style>
.langContainer {
  height: calc(100vh - 90px);
  margin-top: 70px;
  width: calc(100% - 55px);
  -webkit-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
}
.langContainer.openSettingPanel {
  width: calc(100% - 250px);
}
.langDefault,
.langTranslate {
  height: calc(50vh - 45px);
  margin: 0 20px 0 40px;
  padding: 40px 0 !important;
  width: calc(100% - 60px);
}
.langTranslate {
  border-top: 1px solid rgba(255, 255, 255, 0.3) !important;
}
.langDefault textarea,
.langTranslate textarea {
  background: transparent;
  border: 0 !important;
  color: #fff;
  height: 100%;
  padding: 0;
  resize: none;
}
.langDefault textarea:focus {
  color: #fff;
}
.langTranslate textarea,
.langTranslate textarea:focus {
  color: #fff300;
}

@media (max-width: 767px) {
  .langContainer.openSettingPanel {
    width: calc(100% - 55px);
  }
}

@media (max-width: 575px) {
  .langContainer.openSettingPanel {
    width: calc(100% - 55px);
  }
}
</style>
