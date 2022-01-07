<template>
  <div class="setExportServices">
    <ul>
      <export-item
        v-model="exportTo"
        :title="this.data.menu1"
        id="export_zoom"
        icon="ic_zoom"
      ></export-item>
      <export-item
        v-model="exportTo"
        :title="this.data.menu2"
        id="export_teams"
        icon="ic_teams"
      ></export-item>
      <export-item
        v-model="exportTo"
        :title="this.data.menu3"
        id="export_meet"
        icon="ic_meet"
      ></export-item>
      <export-item
        v-model="exportTo"
        :title="this.data.menu4"
        id="export_whereby"
        icon="ic_whereby"
      ></export-item>
      <export-item
        v-model="exportTo"
        :title="this.data.menu5"
        id="export_skype"
        icon="ic_skype"
      ></export-item>
      <!-- <export-item
        v-model="exportTo"
        title="Hangouts に出力"
        id="export_hangouts"
        icon="ic_hangouts"
      ></export-item> -->
    </ul>
  </div>
</template>

<script>
import exportItem from "./export-item.vue";
export default {
  props: {
    data:{
    },
    value: {
      type: String,
      required: true,
    },

  },
  components: { exportItem },
  data: () => ({
    exportTo: "",
  }),
  watch: {
    exportTo() {
      if (this.exportTo === "export_zoom") {
        this.$emit("openModal", "zoom");
      }
      if (this.exportTo === "export_teams") {
        this.$emit("openModal", "teams");
      }
      if (this.exportTo === "export_hangouts") {
        this.$emit("openModal", "hangouts");
      }
      if (this.exportTo === "export_meet") {
        this.$emit("openModal", "meet");
      }
      if (this.exportTo === "export_whereby") {
        this.$emit("openModal", "whereby");
      }
      if (this.exportTo === "export_skype") {
        this.$emit("openModal", "skype");
      }
    },
    value() {
      if (this.value === "") this.exportTo = "";
    },
  },
};
</script>
