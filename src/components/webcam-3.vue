<template lang="html">
  <section class="webcam-3">
    <video
      id="video1"
      width="720"
      height="560"
      autoplay
      muted
    />
    <canvas
      id="canvas1"
      width="720"
      height="560"
    />

    <button
      type="button"
      @click="captureVideoButton"
    >
      Open Camera
    </button>
    <button
      type="button"
      @click="turnCameraOff"
    >
      Turn Camera Off
    </button>
    <select id="videoSource" v-on:change="startVideo"></select>
  </section>
</template>

<script lang="js">
import * as faceapi from "../../public/face-api.min.js"
const axios = require('axios');

export default {
  name: 'Webcam3',
  props: [],
  data() {
    return {}
  },
  computed: {

  },
  mounted() {
    const videoSelect = document.getElementById('videoSource');
    navigator.mediaDevices.enumerateDevices()
    .then((devices) => {
      devices.forEach((device) => {
        if (device.kind === 'videoinput') {
          const option = document.createElement('option');
          option.value = device.deviceId;
          option.text = device.label || `camera ${videoSelect.length + 1}`;
          videoSelect.appendChild(option);
        } else {
          console.log('No video device found');
        }
      })

    })
  },
  methods: {
    startVideo: () => {
      const video = document.getElementById('video1')

      if (window.stream) {
        window.stream.getTracks().forEach(function(track) {
          track.stop();
        });
      }

      const constraints = {video: {deviceId: {exact: videoSelect.value}}};

      navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          window.stream = stream; //should be redone using stateVars in vue
          video.srcObject = stream;
        })
        .catch((err) => {
          console.error('Error: ', err);
        });

    },

    captureVideoButton: () => {
      const video = document.getElementById('video1')
      const output = document.getElementById('output')

      Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
          faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
          faceapi.nets.faceExpressionNet.loadFromUri('./models')
        ])
        .then(() => {
          startRecognizing()
        });

      var startRecognizing = () => {

        console.log(video.readyState)
        navigator.getUserMedia({
            video: {}
          },
          stream => video.srcObject = stream,
          err => console.error(err)
        )
        video.addEventListener('playing', () => {
          const canvas = faceapi.createCanvasFromMedia(video)
          document.body.append(canvas)
          const displaySize = {
            width: video.width,
            height: video.height
          }
          faceapi.matchDimensions(canvas, displaySize)
          //clearInterval(refreshId);
          var refreshId = setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceExpressions().withFaceDescriptors()

            if (detections) {
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

                const resizedDetections = faceapi.resizeResults(detections, displaySize)
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                faceapi.draw.drawDetections(canvas, resizedDetections)
                faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
                faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
            }

            }, 3000)
        })
      }
    },
    turnCameraOff: () => {
      const video = document.getElementById('video1')
      let stream = video.srcObject;
      let tracks = stream.getTracks()[0].stop();
    }

  }
}
</script>

<style scoped lang="scss">
.webcam-2 {}
</style>
