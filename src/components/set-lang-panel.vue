<template>
  <div class="setLang">
    <ul>
      <li>
        <span class="title"
          ><img
            src="@/assets/images/ic_comment.svg"
            alt="発話言語"
          />
          {{ this.data.menu6}}
          <!-- 発話言語 -->
          </span
        >
        <div class="selectdiv">
          <select @change="translateFromHandler">
            <option
              v-for="(lang, ind) in translateFrom"
              :key="lang"
              :selected="ind === selecktedLangFrom"
              >{{ lang }}</option
            >
          </select>
        </div>
      </li>
      <li>
        <span class="title"
          ><img
            src="@/assets/images/ic_translate.svg"
            alt="通訳言語の追加"
          />
          {{ this.data.menu7}}
          <!-- 通訳言語の追加 -->
          </span
        >
        <div class="selectdiv">
          <select @change="translateToHandler">
            <option
              v-for="(lang, ind) in translateTo"
              :key="lang + 2"
              :selected="ind === selecktedLangTo"
            >
              {{ lang }}
            </option>
          </select>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {EventBus} from '../Event.js'
export default {
  props: {
    langData:{

    },
    data:{

    }
  },
  data: () => ({
    curLangData:"ja",
    selecktedLangFrom: 45,
    selecktedLangTo: 22,
    codeList: [
      "af",
      "sq",
      "am",
      "ar",
      "hy",
      "az",
      "eu",
      "be",
      "bn",
      "bs",
      "bg",
      "ca",
      "ceb",
      "ny",
      "zh-CN",
      "zh-TW",
      "co",
      "hr",
      "cs",
      "da",
      "nl",
      "en",
      "eo",
      "et",
      "tl",
      "fi",
      "fr",
      "fy",
      "gl",
      "ka",
      "de",
      "el",
      "gu",
      "ht",
      "ha",
      "haw",
      "iw",
      "hi",
      "hmn",
      "hu",
      "is",
      "ig",
      "id",
      "ga",
      "it",
      "ja",
      "kn",
      "kk",
      "km",
      "ko",
      "ku",
      "ky",
      "lo",
      "la",
      "lv",
      "lt",
      "lb",
      "mk",
      "mg",
      "ms",
      "ml",
      "mt",
      "mi",
      "mr",
      "mn",
      "my",
      "ne",
      "no",
      "ps",
      "fa",
      "pl",
      "pt",
      "ma",
      "ro",
      "ru",
      "sm",
      "gd",
      "sr",
      "st",
      "sn",
      "sd",
      "si",
      "sk",
      "sl",
      "so",
      "es",
      "su",
      "sw",
      "sv",
      "tg",
      "ta",
      "te",
      "th",
      "tr",
      "uk",
      "ur",
      "uz",
      "vi",
      "cy",
      "xh",
      "yi",
      "yo",
      "zu"
    ],
    translateFrom: [
      "Afrikaans",
      "Albanian",
      "Amharic",
      "Arabic",
      "Armenian",
      "Azeerbaijani",
      "Basque",
      "Belarusian",
      "Bengali",
      "Bosnian",
      "Bulgarian",
      "Catalan",
      "Cebuano",
      "Chichewa",
      "Chinese (Simplified)",
      "Chinese (Traditional)",
      "Corsican",
      "Croatian",
      "Czech",
      "Danish",
      "Dutch",
      "English",
      "Esperanto",
      "Estonian",
      "Filipino",
      "Finnish",
      "French",
      "Frisian",
      "Galician",
      "Georgian",
      "German",
      "Greek",
      "Gujarati",
      "Haitian Creole",
      "Hausa",
      "Hawaiian",
      "Hebrew",
      "Hindi",
      "Hmong",
      "Hungarian",
      "Icelandic",
      "Igbo",
      "Indonesian",
      "Irish",
      "Italian",
      "Japanese",
      "Kannada",
      "Kazakh",
      "Khmer",
      "Korean",
      "Kurdish",
      "Kyrgyz",
      "Lao",
      "Latin",
      "Latvian",
      "Lithuanian",
      "Luxembourgish",
      "Macedonian",
      "Malagasy",
      "Malay",
      "Malayalam",
      "Maltese",
      "Maori",
      "Marathi",
      "Mongolian",
      "Burmese",
      "Nepali",
      "Norwegian",
      "Pashto",
      "Persian",
      "Polish",
      "Portuguese",
      "Punjabi",
      "Romanian",
      "Russian",
      "Samoan",
      "Scots Gaelic",
      "Serbian",
      "Sesotho",
      "Shona",
      "Sindhi",
      "Sinhala",
      "Slovak",
      "Slovenian",
      "Somali"
      ,"Spanish",
      "Sundanese",
      "Swahili",
      "Swedish",
      "Tajik",
      "Tamil",
      "Telugu",
      "Thai",
      "Turkish",
      "Ukrainian"
      ,"Urdu",
      "Uzbek",
      "Vietnamese",
      "Welsh",
      "Xhosa",
      "Yiddish",
      "Yoruba"
      ,"Zulu"
    ],
    translateTo: [
      "Afrikaans",
      "Albanian",
      "Amharic",
      "Arabic",
      "Armenian",
      "Azeerbaijani",
      "Basque",
      "Belarusian",
      "Bengali",
      "Bosnian",
      "Bulgarian",
      "Catalan",
      "Cebuano",
      "Chichewa",
      "Chinese (Simplified)",
      "Chinese (Traditional)",
      "Corsican",
      "Croatian",
      "Czech",
      "Danish",
      "Dutch",
      "Elvish",
      "English",
      "Esperanto",
      "Estonian",
      "Filipino",
      "Finnish",
      "French",
      "Frisian",
      "Galician",
      "Georgian",
      "German",
      "Greek",
      "Gujarati",
      "Haitian Creole",
      "Hausa",
      "Hawaiian",
      "Hebrew",
      "Hindi",
      "Hmong",
      "Hungarian",
      "Icelandic",
      "Igbo",
      "Indonesian",
      "Irish",
      "Italian",
      "Japanese",
      "Kannada",
      "Kazakh",
      "Khmer",
      "Korean",
      "Kurdish",
      "Kyrgyz",
      "Lao",
      "Latin",
      "Latvian",
      "Lithuanian",
      "Luxembourgish",
      "Macedonian",
      "Malagasy",
      "Malay",
      "Malayalam",
      "Maltese",
      "Maori",
      "Marathi",
      "Mongolian",
      "Burmese",
      "Nepali",
      "Norwegian",
      "Pashto",
      "Persian",
      "Polish",
      "Portuguese",
      "Punjabi",
      "Romanian",
      "Russian",
      "Samoan",
      "Scots Gaelic",
      "Serbian",
      "Sesotho",
      "Shona",
      "Sindhi",
      "Sinhala",
      "Slovak",
      "Slovenian",
      "Somali",
      "Spanish",
      "Sundanese",
      "Swahili",
      "Swedish",
      "Tajik",
      "Tamil",
      "Telugu",
      "Thai",
      "Turkish",
      "Ukrainian"
      ,"Urdu",
      "Uzbek",
      "Vietnamese",
      "Welsh",
      "Xhosa",
      "Yiddish",
      "Yoruba"
      ,"Zulu"
    ]
  }),
  watch: {
    langData: function () {
      this.curLangData = this.langData;
      // console.log("-------------------- " + this.langData + " == " + this.codeList.length);
      if (this.curLangData === 'zh')
        this.curLangData = 'zh-CN';
      if (this.curLangData != null) {
        for (let n = 0; n < this.codeList.length; n++){
      // console.log("-----------n--------- " + this.langData + " == " + this.codeList[n]);
          if (this.curLangData === this.codeList[n]){
            this.selecktedLangFrom = n;
      // console.log("------selecktedLangFrom-------------- " + this.selecktedLangFrom);
            break;
          }
        }
        console.log("changeInputLang2222 == " + this.curLangData);
        EventBus.$emit("changeInputLang", this.curLangData);
      }
    }
  },
  methods: {
    translateFromHandler(e) {
      console.log("langFrom: ", e.target.value + " == " + this.getLangCode(e.target.value));
          console.log("changeInputLang11111 == " + e.target.value);
      EventBus.$emit("changeInputLang", this.getLangCode(e.target.value));
  //    this.sendMessage(this.getLangCode(e.target.value), "From");
      // action to choose lang
    },
    translateToHandler(e) {
      // action to choose lang
      console.log("langTo: ", e.target.value + " == " + this.getLangCode(e.target.value));
      var outLang = this.getLangCode(e.target.value);
      var speLang = "";
      if (outLang === "ev"){
        speLang = outLang;
        outLang = "en";
      }
      EventBus.$emit("changeOutputLang", outLang, speLang);
   //   this.sendMessage(this.getLangCode(e.target.value), "To");
    },
    getLangCode(totalName){
      var langCode = "";
      if (totalName == "English")
        langCode = "en";
      else if (totalName == "訳文の言語")
        langCode = "ja";
      else if (totalName == "Elvish")
        langCode = "ev";
      else if (totalName == "Afrikaans")
        langCode = "af";
      else if (totalName == "Albanian")
        langCode = "sq";
      else if (totalName == "Amharic")
        langCode = "am";
      else if (totalName == "Arabic")
        langCode = "ar";
      else if (totalName == "Armenian")
        langCode = "hy";
      else if (totalName == "Azeerbaijani")
        langCode = "az";
      else if (totalName == "Basque")
        langCode = "eu";
      else if (totalName == "Belarusian")
        langCode = "be";
      else if (totalName == "Bengali")
        langCode = "bn";
      else if (totalName == "Bosnian")
        langCode = "bs";
      else if (totalName == "Bulgarian")
        langCode = "bg";
      else if (totalName == "Catalan")
        langCode = "ca";
      else if (totalName == "Cebuano")
        langCode = "ceb";
      else if (totalName == "Chichewa")
        langCode = "ny";
      else if (totalName == "Chinese (Simplified)")
        langCode = "zh-CN";
      else if (totalName == "Chinese (Traditional)")
        langCode = "zh-TW";
      else if (totalName == "Corsican")
        langCode = "co";
      else if (totalName == "Croatian")
        langCode = "hr";
      else if (totalName == "Czech")
        langCode = "cs";
      else if (totalName == "Danish")
        langCode = "da";
      else if (totalName == "Dutch")
        langCode = "nl";
      else if (totalName == "Esperanto")
        langCode = "eo";
      else if (totalName == "Estonian")
        langCode = "et";
      else if (totalName == "Filipino")
        langCode = "tl";
      else if (totalName == "Finnish")
        langCode = "fi";
      else if (totalName == "French")
        langCode = "fr";
      else if (totalName == "Frisian")
        langCode = "fy";
      else if (totalName == "Galician")
        langCode = "gl";
      else if (totalName == "Georgian")
        langCode = "ka";
      else if (totalName == "German")
        langCode = "de";
      else if (totalName == "Greek")
        langCode = "el";
      else if (totalName == "Gujarati")
        langCode = "gu";
      else if (totalName == "Haitian Creole")
        langCode = "ht";
      else if (totalName == "Hausa")
        langCode = "ha";
      else if (totalName == "Hawaiian")
        langCode = "haw";
      else if (totalName == "Hebrew")
        langCode = "iw";
      else if (totalName == "Hindi")
        langCode = "hi";
      else if (totalName == "Hmong")
        langCode = "hmn";
      else if (totalName == "Hungarian")
        langCode = "hu";
      else if (totalName == "Icelandic")
        langCode = "is";
      else if (totalName == "Igbo")
        langCode = "ig";
      else if (totalName == "Indonesian")
        langCode = "id";
      else if (totalName == "Irish")
        langCode = "ga";
      else if (totalName == "Italian")
        langCode = "it";
      else if (totalName == "Japanese")
        langCode = "ja";
      else if (totalName == "Kannada")
        langCode = "kn";
      else if (totalName == "Kazakh")
        langCode = "kk";
      else if (totalName == "Khmer")
        langCode = "km";
      else if (totalName == "Korean")
        langCode = "ko";
      else if (totalName == "Kurdish")
        langCode = "ku";
      else if (totalName == "Kyrgyz")
        langCode = "ky";
      else if (totalName == "Lao")
        langCode = "lo";
      else if (totalName == "Latin")
        langCode = "la";
      else if (totalName == "Latvian")
        langCode = "lv";
      else if (totalName == "Lithuanian")
        langCode = "lt";
      else if (totalName == "Luxembourgish")
        langCode = "lb";
      else if (totalName == "Macedonian")
        langCode = "mk";
      else if (totalName == "Malagasy")
        langCode = "mg";
      else if (totalName == "Malay")
        langCode = "ms";
      else if (totalName == "Malayalam")
        langCode = "ml";
      else if (totalName == "Maltese")
        langCode = "mt";
      else if (totalName == "Maori")
        langCode = "mi";
      else if (totalName == "Marathi")
        langCode = "mr";
      else if (totalName == "Mongolian")
        langCode = "mn";
      else if (totalName == "Burmese")
        langCode = "my";
      else if (totalName == "Nepali")
        langCode = "ne";
      else if (totalName == "Norwegian")
        langCode = "no";
      else if (totalName == "Pashto")
        langCode = "ps";
      else if (totalName == "Persian")
        langCode = "fa";
      else if (totalName == "Polish")
        langCode = "pl";
      else if (totalName == "Portuguese")
        langCode = "pt";
      else if (totalName == "Punjabi")
        langCode = "ma";
      else if (totalName == "Romanian")
        langCode = "ro";
      else if (totalName == "Russian")
        langCode = "ru";
      else if (totalName == "Samoan")
        langCode = "sm";
      else if (totalName == "Scots Gaelic")
        langCode = "gd";
      else if (totalName == "Serbian")
        langCode = "sr";
      else if (totalName == "Sesotho")
        langCode = "st";
      else if (totalName == "Shona")
        langCode = "sn";
      else if (totalName == "Sindhi")
        langCode = "sd";
      else if (totalName == "Sinhala")
        langCode = "si";
      else if (totalName == "Slovak")
        langCode = "sk";
      else if (totalName == "Slovenian")
        langCode = "sl";
      else if (totalName == "Somali")
        langCode = "so";
      else if (totalName == "Spanish")
        langCode = "es";
      else if (totalName == "Sundanese")
        langCode = "su";
      else if (totalName == "Swahili")
        langCode = "sw";
      else if (totalName == "Swedish")
        langCode = "sv";
      else if (totalName == "Tajik")
        langCode = "tg";
      else if (totalName == "Tamil")
        langCode = "ta";
      else if (totalName == "Telugu")
        langCode = "te";
      else if (totalName == "Thai")
        langCode = "th";
      else if (totalName == "Turkish")
        langCode = "tr";
      else if (totalName == "Ukrainian")
        langCode = "uk";
      else if (totalName == "Urdu")
        langCode = "ur";
      else if (totalName == "Uzbek")
        langCode = "uz";
      else if (totalName == "Vietnamese")
        langCode = "vi";
      else if (totalName == "Welsh")
        langCode = "cy";
      else if (totalName == "Xhosa")
        langCode = "xh";
      else if (totalName == "Yiddish")
        langCode = "yi";
      else if (totalName == "Yoruba")
        langCode = "yo";
      else if (totalName == "Zulu")
        langCode = "zu";
      return langCode;
    }
  }
};
</script>
