<template lang="html">
  <section class="webcam-2">
    <video id="video1" width="720" height="560" autoplay muted/>
    <canvas id="canvas1" width="720"  height="560"/>
    <button type="button" @click="takeScreenShot"> Take Screenshot </button>
  </section>
</template>

<script lang="js">
import * as faceapi from "../../public/face-api.min.js"
const axios = require('axios');

//add progress bar

export default {
  name: 'Webcam4',
  props: [],
  data() {
    return {
      video : null,
      canvas : null,
      detections: null
    }
  },
  computed: {
  },
  mounted() {
    this.video = document.getElementById('video1');
    this.canvas = document.getElementById('canvas1');


    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
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
       //console.log(this.video.readyState)
      navigator.getUserMedia({
          video: {}
        },
        stream => this.video.srcObject = stream,
        err => console.error(err)
      )
      this.video.addEventListener('playing', async () => {
          var refreshId = setInterval(async() => {
            faceapi.detectSingleFace(this.video).withFaceLandmarks().withFaceDescriptor()
            .then((detections) => {
              if (detections) {
                console.log(detections)
                this.detections = detections
                this.takeScreenShot()
                clearInterval(refreshId);
              }
            })
        }, 5000)

      })

    },
    takeScreenShot: function (){
      var video = this.video
      var canvas = this.canvas
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      canvas = faceapi.createCanvasFromMedia(this.video)

      const displaySize = {
        width: this.video.width,
        height: this.video.height
      }
      faceapi.matchDimensions(canvas, displaySize)

      const resizedDetections = faceapi.resizeResults(this.detections, displaySize)
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      faceapi.draw.drawDetections(canvas, resizedDetections)
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      //faceapi.draw.drawFaceExpressions(canvas, resizedDetections,0.05 )

      video.srcObject.getTracks()[0].stop()
      video.parentNode.removeChild(video);
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
</script>

<style scoped lang="scss">
.webcam-2 {}
</style>
