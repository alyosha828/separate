<template>
  <div
      class="modal fade exportServicesModal show modal-overlay"
      style="display: block"
      tabindex="-1"
      @click.self="$emit('resetModal', '')"
  >
    <the-modal :modal-id="'exportHangoutsModal'">
      <template #header>
        <img src="@/assets/images/ic_hangouts-on.svg" alt="hangouts" />
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

      <p>Hangoutsに入室し、翻訳を開始します。<br>Hangouts会議のRoom IDとパスワードを入力してください。</p>

      <form>
        <div class="form-group row">
          <label for="HangoutsID" class="col-sm-12 col-form-label text-center"
          >ミーティングURL</label
          >
          <div class="col-sm-12">
            <input
                type="text"
                readonly
                class="form-control-plaintext"
                id="HangoutsID"
                :value="hangoutsId"
                placeholder="xxxxx"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-12 col-form-label text-center"
          >表示名</label
          >
          <div class="col-sm-12">
            <input
                v-model="password"
                type="password"
                class="form-control"
                id="inputPassword"
                placeholder="AI Interpreter"
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
            AI翻訳の<a href="#">利用規約</a>に同意する。
          </label>
        </div>
      </form>

      <template #footer>
        <button
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            data-toggle="modal"
            data-target="#recording"
            @click="handle"
        >
          Hangoutsに入室して翻訳を開始
        </button>
      </template>
    </the-modal>
  </div>
</template>

<script>
import TheModal from "./the-modal.vue";

export default {
  components: {
    TheModal
  },
  data: () => ({
    hangoutsId: "",
    password: "",
    isChecked: false
  }),
  methods: {
    handle: () => {
      console.log(123)
    }
  }
};
</script>
