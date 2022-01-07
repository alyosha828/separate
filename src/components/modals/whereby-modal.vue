<template>
  <div
    class="modal fade exportServicesModal show modal-overlay"
    style="display: block"
    tabindex="-1"
    @click.self="$emit('resetModal', '')"
  >
    <the-modal :modal-id="'exportWherebyModal'">
      <template #header>
        <img src="@/assets/images/ic_whereby-on.png" alt="teams" />
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="$emit('resetModal', '')"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </template>

      <p style="word-wrap: break-word;">
        {{ this.data.whereby1 }}
        <!-- Wherebyに入室し、通訳を開始します。<br />
        会議のURLを入力してください。 -->
      </p>
      <form>
        <div class="form-group row">
          <label for="wherebyText" class="col-sm-12 col-form-label text-center"
            >
            {{ this.data.whereby2 }}
            <!-- ミーティングURL -->
            </label
          >
          <div class="col-sm-12">
            <input
              type="text"
              class="form-control"
              id="wherebyText"
              v-model="teamsId"
              placeholder="XXXXXX"
            />
          </div>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            name="agree"
            id="agree"
            v-model="isChecked"
          />
          <label class="form-check-label" for="agree">
            {{ this.data.whereby3 }}
            <!-- AI通訳の<a href="#">利用規約</a>に同意する。 -->
          </label>
        </div>
      </form>

      <div style="display: flex;margin: auto;">
        <button
          type="button"
          class="btn btn-primary"
          data-dismiss="modal"
          data-toggle="modal"
          data-target="#recording"
          @click="handle"
        >
        {{ this.data.whereby4 }}
         <!-- Wherebyに入室して通訳を開始 -->
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
  props: {
    data:{
    },
  },
  data: () => ({
    teamsId: "",
    password: "",
    isChecked: false,
  }),
  methods: {
    handle() {
      if (!this.isChecked) return;
      if (this.teamsId == "") return;

      window.open(this.teamsId, "_blank");
      this.$emit("resetModal", "");
    }
  }
};
</script>
