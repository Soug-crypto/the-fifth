<template lang="html">
  <section class="webcam-2">
    <video id="video1"  ref="video1" width="100%" height="560" autoplay muted/>
    <select id="videoSource"  ref="videoSource" v-on:change="startRecognizing"></select>
  </section>
</template>

<script lang="js">
import * as faceapi from "../../public/face-api.min.js"
const axios = require('axios');

export default {
  name: 'faceLogin',
  props: [],
  data() {
    return {
      detections: null,
      refreshId: null
    }
  },
  computed: {
  },
  mounted() {
    const videoSelect = this.$refs.videoSource;
    const video = this.$refs.video1;
    navigator.mediaDevices.enumerateDevices()
    .then((devices) => {
      devices.forEach((device) => {
        if (device.kind === 'videoinput') {
          const option = document.createElement('option');
          option.value = device.deviceId;
          option.text = device.label || `camera ${videoSelect.length + 1}`;
          videoSelect.appendChild(option);
        }
      })
    })

    video.addEventListener('playing', async () => {
      this.refreshId = setInterval(this.detect, 5000)
      this.detect()
    })

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
      faceapi.nets.faceExpressionNet.loadFromUri('./models')
      ])
      .then(() => {
        this.startRecognizing()
      });
  },
  methods: {
     startRecognizing: function (){
      const video = this.$refs.video1
      navigator.getUserMedia({video: {}},(stream) => video.srcObject = stream, (err) => console.error(err))
    },
    detect: async function(){
      const video = this.$refs.video1
      const displaySize = { width:video.width, height: video.height }
      const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions().withFaceDescriptor()
        if (detections) {
          this.detections = detections
          video.pause();
          video.removeAttribute('src');
          video.srcObject.getTracks().forEach(track => {
            track.stop();
          });
          clearInterval(this.refreshId);
        }
    }
  }
}


// axios({
//     method: 'post',
//     url: 'http://localhost:3000/',
//     data: detections,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(function(response) {
//     console.log({response});
//   })
//   .catch(function(error) {
//     console.log({error});
//   });
// captureVideoButton: function() {
//   Promise.all([
//       faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
//       faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
//       faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
//       faceapi.nets.faceExpressionNet.loadFromUri('./models')
//     ])
//     .then(() => {
//       this.startRecognizing()
//     });
// },
//console.log(this.video.readyState)

</script>

<style scoped lang="scss">
.webcam-2 {
}
</style>
