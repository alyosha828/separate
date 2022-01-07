<template>
  <li id="exportToZoom" :class="{ active: value === id }">
    <p><span class="ic" :class="icon"></span> {{ title }}</p>
    <div class="custom-switch custom-switch-label-io">
      <input
        class="custom-switch-input"
        :id="id"
        type="radio"
        name="setExportServices"
        @click.stop="$emit('input', id)"
        :checked="value === id"
      />
      <label class="custom-switch-btn" :for="id"></label>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      require: true
    },
    title: {
      type: String,
      require: true
    },
    id: {
      type: String,
      require: true
    },
    icon: {
      type: String,
      require: true
    }
  }
};
</script>
