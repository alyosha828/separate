<template>
  <div
    class="modal fade exportServicesModal show modal-overlay"
    style="display: block"
    tabindex="-1"
    @click.self="$emit('resetModal', '')"
  >
    <the-modal :modal-id="'exportSkypeModal'">
      <template #header>
        <img src="@/assets/images/ic_skype-on.png" alt="skype" />
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
        {{ this.data.skype1 }}
        <!-- Skypeに入室し、通訳を開始します。<br />
        会議のURLを入力してください。 -->
      </p>
      <VueSlickCarousel
        :arrows="false"
        :speed="700"
        :autoplaySpeed="1500"
        :autoplay="true"
        :accessibility="false"
      >
        <img src="@/assets/images/skype-ex-01.png" alt="skypeImg" />
        <img src="@/assets/images/skype-ex-02.png" alt="skypeImg" />
      </VueSlickCarousel>

      <form>
        <div class="form-group row">
          <label for="skypeText" class="col-sm-12 col-form-label text-center"
            >
            {{ this.data.skype2 }}
            <!-- ミーティングURL -->
            </label
          >
          <div class="col-sm-12">
            <input
              type="text"
              class="form-control"
              id="skypeText"
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
            <!-- AI通訳の<a href="#">利用規約</a>に同意する。 -->
            {{ this.data.skype3 }}
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
        {{ this.data.skype4 }}
         <!-- Skypeに入室して通訳を開始 -->
        </button>
      </div>
    </the-modal>
  </div>
</template>

<script>
import TheModal from "./the-modal.vue";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";

export default {
  components: {
    TheModal,
    VueSlickCarousel
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
