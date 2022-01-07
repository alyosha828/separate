<template>
  <section id="selectLangList" class="selectLangList">
    <div class="selectLangListBox">
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label
          v-for="(label, ind) in labels"
          :key="label"
          class="btn"
          :class="{ active: ind === checkedLabel }"
        >
          <span class="delete" @click="deleteLabel(label)"></span>
          <input
            type="radio"
            name="selectLangList"
            :id="label"
            :checked="ind === checkedLabel"
            @click="onCliclHandler(ind)"
          />{{ label }}
        </label>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    checkedLabel: 0,
    labels: [
      "English",
      "Spanish",
      "Korean",
      "Mandarin",
      "Cantonese",
      "Taiwanese",
      "Vietnamese",
      "French",
      "Italiano"
    ]
  }),
  methods: {
    onCliclHandler(labelInd) {
      this.checkedLabel = labelInd;
    },
    deleteLabel(label) {
      this.labels = this.labels.filter(i => i !== label);
    }
  }
};
</script>
