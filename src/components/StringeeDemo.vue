<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px">
      <img class="max-width-image" src="../assets/logo.png" />
      <h2>Demo Stringee</h2>
    </el-aside>

    <el-container>
      <el-main>
        <!-- <el-steps :space="200" :active="1" simple>
          <el-step
            class="el-step-title"
            title="Generate Access Token"
            icon="el-icon-edit"
          ></el-step>
          <el-step
            class="el-step-title"
            title="Choose userId"
            icon="el-icon-upload"
          ></el-step>
          <el-step
            class="el-step-title"
            title="Make Call"
            icon="el-icon-picture"
          ></el-step>
          <el-step
            class="el-step-title"
            title="Ringing"
            icon="el-icon-picture"
          ></el-step>
          <el-step
            class="el-step-title"
            title="Answer"
            icon="el-icon-picture"
          ></el-step>
        </el-steps> -->
        <el-button type="danger" @click="swap">Swap</el-button>
        <el-container>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Access Token">
              <el-input
                class="textarea-form"
                type="textarea"
                v-model="form.accessTokenStringee"
                width="100%"
              ></el-input>
            </el-form-item>
            <el-form-item label="UserId Local">
              <el-input v-model="form.userIdLocal"></el-input>
            </el-form-item>
            <el-form-item label="UserId Remote">
              <el-input v-model="form.userId"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="success" @click="onConnectAndAuth">
                Connect
              </el-button>
              <el-button type="primary" @click="onCallClient"
                >Call Client</el-button
              >
              <el-button type="warning" @click="onReceiveCall"
                >Recieve Call</el-button
              >
            </el-form-item>
          </el-form>
        </el-container>
      </el-main>
      <div id="video-container" ref="fullscreenRef">
        <video
          id="localVideo"
          autoplay
          :srcObject.prop="srcVideoLocal"
          ref="localVideoRef"
        ></video>
        <div id="remoteVideo">
          <video
            autoplay
            :srcObject.prop="srcVideoRemote"
            style="height: 100%; width: 100%"
            ref="remoteVideoRef"
          ></video>
          <div id="action">
            <div class="left">
              <!-- <el-button
                type="info"
                icon="el-icon-minus"
                plain
                circle
              ></el-button> -->
            </div>
            <div class="center">
              <el-button
                type="info"
                icon=" el-icon-refresh"
                plain
                circle
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-picture"
                plain
                circle
                @click="onMute"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-phone"
                plain
                circle
                @click="hangupCall"
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-mobile-phone"
                plain
                circle
              ></el-button>
              <el-button
                type="info"
                class="active-action"
                plain
                icon="el-icon-setting"
                circle
                @click="onTurnVideoCapture"
              ></el-button>
            </div>
            <div class="right">
              <el-dropdown @command="handleCommand" trigger="click">
                <el-button
                  type="info"
                  icon="el-icon-more"
                  plain
                  circle
                ></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="720">720p </el-dropdown-item>
                  <el-dropdown-item command="480">480p</el-dropdown-item>
                  <el-dropdown-item command="360">360p</el-dropdown-item>
                  <el-dropdown-item command="240">240p</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-button
                type="info"
                icon="el-icon-rank"
                plain
                circle
                @click="onFullScreen"
              ></el-button>
            </div>
          </div>
        </div>
      </div>
    </el-container>
  </el-container>
</template>

<script>
import "../assets/js/jquery.js";
import "../assets/js/stringee-web-sdk.min.js";
// import * as Stringee from "../assets/js/stringee-web-sdk.min.js";
// const stringGee = require('../assets/js/stringee-web-sdk.min.js');
export default {
  name: "StringeeDemo",
  data() {
    const item = {
      date: "2020-09-25",
      name: "Bảo",
      address: "374 Vo Van Tan, D.3, HCMC",
    };
    return {
      client: new window.StringeeClient(),
      currentCall: null,
      srcVideoLocal: null,
      srcVideoRemote: null,
      isRecieveCall: false,
      form: {
        userIdLocal: "baoTest",
        accessTokenStringee:
          "eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS0VtZDIxcG5uTzRoYWtwYkdXYm12VExvRVJOWm1WWGNDLTE2MDEwMDQ2NzciLCJpc3MiOiJTS0VtZDIxcG5uTzRoYWtwYkdXYm12VExvRVJOWm1WWGNDIiwiZXhwIjoxNjAzNTk2Njc3LCJ1c2VySWQiOiJiYW9UZXN0In0.mMO6P5x2F_GRqCTsIMq3VWS5_c6vkKKIec_So2Q-3zA",
        userId: "Office",
      },

      tableData: Array(20).fill(item),
    };
  },
  mounted() {
  },
  methods: {
    onFullScreen() {
      let el1 = this.$refs["fullscreenRef"];
      let refLocalStream = this.$refs["localVideoRef"];
      if (
        document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled
      ) {
        if (
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
        ) {
          refLocalStream.style.width = "90px";
          refLocalStream.style.height = "90px";
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (el1.requestFullscreen) {
            refLocalStream.style.width = "150px";
            refLocalStream.style.height = "150px";

            el1.requestFullscreen();
          } else if (el1.mozRequestFullScreen) {
            /* Firefox */
            el1.mozRequestFullScreen();
          } else if (el1.webkitRequestFullscreen) {
            /* Chrome, Safari & Opera */
            el1.webkitRequestFullscreen();
          } else if (el1.msRequestFullscreen) {
            /* IE/Edge */
            el1.msRequestFullscreen();
          }
        }
      } else {
        console.log("Fullscreen is not supported on your browser.");
      }
    },
    swap() {
      if (this.form.userIdLocal == "baoTest2") {
        this.form = {
          userIdLocal: "baoTest",
          accessTokenStringee:
            "eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS0VtZDIxcG5uTzRoYWtwYkdXYm12VExvRVJOWm1WWGNDLTE2MDEwMDQ2NzciLCJpc3MiOiJTS0VtZDIxcG5uTzRoYWtwYkdXYm12VExvRVJOWm1WWGNDIiwiZXhwIjoxNjAzNTk2Njc3LCJ1c2VySWQiOiJiYW9UZXN0In0.mMO6P5x2F_GRqCTsIMq3VWS5_c6vkKKIec_So2Q-3zA",
          userId: "baoTest2",
        };
      } else {
        this.form = {
          userIdLocal: "baoTest2",
          accessTokenStringee:
            "eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS0VtZDIxcG5uTzRoYWtwYkdXYm12VExvRVJOWm1WWGNDLTE2MDEwMjExMzUiLCJpc3MiOiJTS0VtZDIxcG5uTzRoYWtwYkdXYm12VExvRVJOWm1WWGNDIiwiZXhwIjoxNjAzNjEzMTM1LCJ1c2VySWQiOiJiYW9UZXN0MiJ9.Sr5B3QmcFpzTwsozHZ5vvXRgv8_8aEhNr5L6-ZhiWYg",
          userId: "baoTest",
        };
      }
    },
    handleCommand(command) {

      switch (command) {
        case "720":
          
          this.currentCall.videoResolution= { width: 1280, height: 720 };
          break;
        case "480":
          this.currentCall.videoResolution ={ width: 854, height: 480 };

          break;
        case "360":
          this.currentCall.videoResolution={ width: 640, height: 360 };

          break;
        case "240":
          this.currentCall.videoResolution={ width: 426, height: 240 };

          break;
        default:
          break;
      }
    },
    settingCallEvent(callCurrentEvent) {
      console.log("settingCallEvent was Called:");
      callCurrentEvent.on("addremotestream",  (stream) => {
        console.log("addRemoteStream....");
        console.log("stream:", stream);
        this.srcVideoRemote = stream;
      });
      callCurrentEvent.on("addlocalstream",  (stream) =>{
        console.log("addLocalStream....");
        console.log("stream:", stream);
        this.srcVideoLocal = stream;

      });
      callCurrentEvent.on("signalingstate", (state) => {
        console.log("signalingState....");
        console.log("state:", state);
        if (state.code == 6) {
          this.$notify({
            title: "Ended",
            message: "A conversation was ended",
          });
        }
      });
      callCurrentEvent.on("mediastate", (mediastate) => {
        console.log("mediastate ", mediastate);

        this.$notify({
          title: "Success",
          message: mediastate.reason,
          type: "success",
        });
      });

      callCurrentEvent.on("info", function (info) {
        console.log("on info:" + JSON.stringify(info));
      });
      callCurrentEvent.on("otherdevice", function (otherdevice) {
        console.log("otherdevice:", otherdevice);
      });
      callCurrentEvent.on("error", function (error) {
        console.log("error:", error);
      });
    },
    onConnectAndAuth() {
      this.client.connect(this.form.accessTokenStringee);
      this.client.on("connect", function () {
        console.log("------ connected!");
      });

      this.client.on("authen",  (res) => {
        console.log("------ on authen: ", res);
        this.$message({
          showClose: true,
          message: "Connect success!",
          type: "success",
        });
      });

      this.client.on("disconnect", function (res) {
        console.log("------ disconnected");
      });

      this.client.on("incomingcall",(incomingcall)=> {
        console.log("incomingcall:", incomingcall);
        this.isRecieveCall = true;
        if (incomingcall) this.currentCall = incomingcall;
        this.settingCallEvent(this.currentCall);
      });
    },
    onMute() {
      this.currentCall.mute(!this.currentCall.muted);
    },
    onTurnVideoCapture() {
      var success;
      if (this.currentCall.localVideoEnabled) {
        success = this.currentCall.enableLocalVideo(false);
      } else {
        success = this.currentCall.enableLocalVideo(true);
      }
      console.log("enableVideo result: " + success);
    },
    onCallClient() {
            this.currentCall = new StringeeCall(
        this.client,
        this.form.userIdLocal,
        this.form.userId,
        true
      );
      console.log("calling....:", this.currentCall);
      this.settingCallEvent(this.currentCall);
      this.currentCall.makeCall( (res) =>{
        console.log("+++ call callback: ", res);

        console.log("make Call success");

        document.dispatchEvent(new Event("connect_ok"));
      });
    },
    onReceiveCall() {
      console.log("currentCall inReceiveCall:", this.currentCall);
      this.currentCall.answer(function (res) {
        console.log("+++ answering call: ", res);
      });
    },
    hangupCall() {
      this.srcVideoRemote=null;
      this.currentCall.hangup(function (res) {
        console.log("+++ hangup call: ", res);
      });
    },
  },
  beforeDestroy() {
    // this.currentCall.hangup(function (res) {
    //   console.log("+++ hangup call: ", res);
    // });
  },
};
</script>

<style >
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  padding: 10px;
  border-right: 2px solid black;
  overflow: hidden;
}
.el-main {
  overflow: hidden;
}
.max-width-image {
  max-width: 100%;
}
.el-steps .el-step-title .el-step__title {
  font-size: 14px;
  word-break: normal !important;
}
.textarea-form textarea {
  width: 300px !important;
  min-height: 230px !important;
}

#video-container {
  position: relative;
  width: 640px;
  max-width: 100%;
}

video {
  background: #dee;
  width: 480px;
}

#localVideo {
  position: absolute;
  top: 2%;
  right: 3%;
  width: 95px;
  height: 95px;
  z-index: 10;
  background: #333;
  border-radius: 50%;
}

#remoteVideo {
  /* width: 100%; */
  height: 100%;
  position: relative;
}
#action {
  position: absolute;
  bottom: 3%;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
#action-buttons {
  margin: auto;
  text-align: center;
}
#action .active-action {
  color: red;
}
#action .el-button i {
  font-weight: bold;
  font-size: 1rem;
}
.hidden-first {
  display: none;
}
.el-dropdown-menu {
  top: 310px;
  overflow: hidden;
}
</style>