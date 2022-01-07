<template>
  <section
    id="settingPanel"
    class="settingPanel"
    :class="{ panelClose: isSettingsHided || windowWidth <= 767 }"
  >
    <button
      class="settingPanelBtn"
      @click="isSettingsHided = !isSettingsHided"
    ></button>

    <set-export-services
      @openModal="$emit('input', $event)"
      :value="value"
      :data="this.data"
    ></set-export-services>

    <hr />

    <set-lang-panel :data="this.data" :langData="this.langData"></set-lang-panel>

  </section>
</template>

<script>
import SetLangPanel from "./set-lang-panel.vue";
import SetExportServices from "./set-export-services.vue";
export default {
  props: {
    data:{

    },
    langData:{

    },
    value: {
      type: String,
      required: true
    }
  },
  components: { SetLangPanel, SetExportServices },
  data: () => ({
    isSettingsHided: false,
    windowWidth: window.innerWidth
  }),
  watch: {
    isSettingsHided (value) {
      this.$emit("toggle-settings", value);
    }
  },
  created() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  }
};
</script>
