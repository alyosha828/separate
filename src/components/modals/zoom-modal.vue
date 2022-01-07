<template>
  <div
    class="modal fade exportServicesModal show modal-overlay"
    style="display: block"
    tabindex="-1"
    @click.self="$emit('resetModal', '')"
  >
    <the-modal :modal-id="'exportZoomModal'">
      <template #header>
        <img src="@/assets/images/ic_zoom-on.svg" alt="zoom" />
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="$emit('resetModal', '')"
          style=""
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </template>

      <div class="modal-body">
        <p style="word-wrap: break-word;">
          {{ this.data.zoom1 }}
          <!-- Enter Zoom and start translating.<br />Enter the URL and display name
          of your Zoom meeting. -->
        </p>
        <form>
          <div class="form-group row">
            <label for="meetingURL" class="col-sm-12 col-form-label text-center"
              >
              {{ this.data.zoom2 }}
              <!-- Meeting Room URL -->
              </label
            >
            <div class="col-sm-12">
              <input
                type="text"
                class="form-control-plaintext"
                id="meetingURL"
                v-model="roomId"
                placeholder="xxxxx"
              />
            </div>
          </div>
          <!-- <div class="form-group row">
            
            <div class="col-sm-6">
                <label for="meetingId" class="col-sm-12 col-form-label text-center"
                style="padding-left: 0 !important; padding-right: 0 !important;">
                Meeting Room ID</label
              >
              <input
                type="text"
                class="form-control-plaintext"
                id="meetingId"
                v-model="meetingId"
                placeholder="xxxxx"
              />
            </div>
            <div class="col-sm-6">
              <label for="meetingPassword" class="col-sm-12 col-form-label text-center"
              style="padding-left: 0 !important; padding-right: 0 !important;">
              Meeting Password</label>
              <input
                type="text"
                class="form-control-plaintext"
                id="meetingPassword"
                v-model="meetingPassword"
                placeholder="xxxxx"
              />
            </div>
          </div> -->
          <div class="form-group row">
            <label
              for="displayName"
              class="col-sm-12 col-form-label text-center"
              >
              
              {{ this.data.zoom3 }}
              <!-- Display Name -->
              </label
            >
            <div class="col-sm-12">
              <input
                v-model="displayName"
                type="text"
                class="form-control"
                id="displayName"
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
              
              {{ this.data.zoom4 }}
              <!-- I agree to <a href="#">the terms of use</a> of AI HONYAKU. -->
            </label>
          </div>
        </form>
      </div>

      <div style="display: flex;margin: auto;">
        <button
          type="button"
          class="btn btn-primary"
          data-dismiss="modal"
          data-toggle="modal"
          data-target="#recording"
          @click="gotoZoom"
        >
        
          {{ this.data.zoom5 }}
          <!-- Enter Zoom and start translating -->
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
  props: [
    'data',
  ],
  data: () => ({
    roomId: "",
    meetingId: "",
    meetingPassword: "",
    displayName: "",
    isChecked: false,
    zoomUrl: "/zoom-meeting/",
  }),
  methods: {
    gotoZoom() {
      //
      if (!this.isChecked) return;
      if (this.roomId == "") return;

      //roomId = https://us05web.zoom.us/j/81037204202?pwd=UnppZkhDUUgxKzZiWHRvU05HazZhZz09

      const p1 = this.roomId.split("zoom.us/j/");
      const s = p1[1].split("?pwd=");

      this.meetingId = s[0];
      this.meetingPassword = s[1];

      window.open(
        this.zoomUrl +
          "index.html?email=&role=0&lang=en-US&mn=" +
          this.meetingId +
          "&pwd=" +
          this.meetingPassword +
          "&name=" +
          btoa(this.displayName),
        "_blank"
      );
      this.$emit("resetModal", "");
    },
  },
};
</script>
