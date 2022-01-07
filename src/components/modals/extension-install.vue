<template>
  <div
    class="modal fade exportServicesModal show modal-overlay"
    style="display: block"
    tabindex="-1"
  >
    <the-modal :modal-id="'exportZoomModal'">
      <div class="modal-body">
        <p style="font-size: 26px; font-weight: bold">
          <!-- {{ this.data.extension1 }} -->
          <!-- Please install <br>the extension -->
          <span v-html="this.data.extension1"></span>
          <br />
        </p>
        <p style="font-size: 17px">
          <!-- It seems that the extension is not installed
          <br />in this browser. This service uses the "AI <br />HONYAKU
          extension" for Google Chrome. <br />Please click the button below to
          install the <br />extension.
          <br />
          <br />This screen will not appear after the <br />extension
          installation is complete. -->
          <span v-html="this.data.extension2"></span>
        </p>
      </div>

      <div style="display: flex;margin: auto;">
        <button
          type="button"
          class="btn btn-primary"
          data-dismiss="modal"
          data-toggle="modal"
          data-target="#recording"
          @click="gotoInstall"
        >
          {{ this.data.extension3 }}
          <!-- Install the extension -->
        </button>
      </div>
    </the-modal>
  </div>
</template>

<script>
import TheModal from "./the-modal.vue";

export default {
  components: {
    TheModal,
  },
  watch:{
    data: function () {
      console.log(" ========" + this.data.extension1);
    }
  },
  props: [
    'data',
  ],
  data: () => ({
    roomId: "",
    password: "",
    isChecked: false,
  }),
  methods: {
    gotoInstall() {
      const key = require("../../constant.json");
      const extensionid = key.extensionid;
      window.open(
        "https://chrome.google.com/webstore/detail/bulk-url-opener-extension/" +
          extensionid,
        "_blank"
      );
    },
  },
  mounted(){
    // console.log(" ====sadsdaaadwww====" + this.data.extension1);
  }
};
</script>

