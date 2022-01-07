<template>
  <div
    class="modal fade exportServicesModal show modal-overlay"
    style="display: block"
    tabindex="-1"
    @click.self="$emit('resetModal', '')"
  >
    <the-modal :modal-id="'exportTeamsModal'">
      <template #header>
        <img src="@/assets/images/ic_teams-on.svg" alt="teams" />
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
        {{ this.data.teams1 }}
        <!-- 通常通りTeams会議に入室し「ウェブ上で参加 / ブラウ
        <br />ザ上で続行」をクリックしてください。 -->
      </p>
      <VueSlickCarousel
        :arrows="false"
        :speed="700"
        :autoplaySpeed="1500"
        :autoplay="true"
        :accessibility="false"
      >
        <img src="@/assets/images/teams02-4x3.png" alt="teamsImg" />
        <img src="@/assets/images/teams01-4x3.png" alt="teamsImg" />
      </VueSlickCarousel>

      <form>
        <div class="form-group row">
          <label for="meetText" class="col-sm-12 col-form-label text-center"
             style="word-wrap: break-word;">
            {{ this.data.teams2 }}
            <!-- ミーティングURL -->
            </label
          >
          <div class="col-sm-12">
            <input
              type="text"
              class="form-control"
              id="meetText"
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
            {{ this.data.teams3 }}
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
        
          {{ this.data.teams4 }}
          <!-- Teamsに入室して通訳を開始 -->
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
    isChecked: false,
  }),
  methods: {
    handle() {
      if (!this.isChecked) return;
      if (this.teamsId == "") return;

      window.open(this.teamsId, "_blank");
      this.$emit("resetModal", "");
    },
  },
};
</script>
