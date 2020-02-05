<template
  ref="formContainer"
  lang="html"
>
  <section
    class="facial-discriptor-extractor"
  >
    <b-col
      sm="8"
      xs="12"
      class="m-auto"
    >
      <b-form-file 
        id="imageUpload"
        class="mt-3"
        multiple 
      >
        <template
          slot="file-name"
          slot-scope="{ names }"
        >
          <b-badge variant="dark">
            {{ names[0] }}
          </b-badge>
          <b-badge
            v-if="names.length > 1"
            variant="dark"
            class="ml-1"
          >
            + {{ names.length - 1 }} More files
          </b-badge>
        </template>
      </b-form-file>
    </b-col>
    <br>
    <b-col sm="8 m-auto text-center">
      <b-button
        class="mt-4 border-0"
        type="button"
        variant="primary"
        style="background-color: #ffc247; color: black;"
        @click="extractDiscriptors"
      >
        Extract Discriptor
      </b-button>
    </b-col>
  </section>
</template>

<script lang="js">
import * as faceapi from "../../public/face-api.min.js"
import axios from 'axios';


export default {
  name: 'FacialDiscriptorExtractor',
  props: [],
  data() {
    return {

    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    extractDiscriptors: function() {
      const imageUpload = document.getElementById('imageUpload')
      const that = this

      if ( imageUpload.files.length === 0 ) {
        return alert('Please Add Pics')
      }
      
      // console.log(imageUpload.files)
      const loader = this.$loading.show({
        // Optional parameters
        container: this.$refs.formContainer,
        canCancel: false,
        // onCancel: this.onCancel,
      });
      

      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
        faceapi.nets.faceExpressionNet.loadFromUri('./models')
      ]).then(start)

      async function start() {
        addFace(imageUpload.files)
          .then((faceDescriptors) => {
            that.$store.commit(
              'addDescriptor', 
              faceDescriptors.map(elm => {
                return elm.descriptor;
              })
            )
            console.log('Done')
            loader.hide()
          })
      }

      var addFace = async (imagesArray) => {
        var descriptions = [
          faceapi.bufferToImage(imagesArray[0]).then((image) => {
            return faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor()
          }).catch((err) => {
            console.log({
              err
            })
          }),
          faceapi.bufferToImage(imagesArray[1]).then((image) => {
            return faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor()
          }).catch((err) => {
            console.log({
              err
            })
          }),
          faceapi.bufferToImage(imagesArray[2]).then((image) => {
            return faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor()
          }).catch((err) => {
            console.log({
              err
            })
          })
        ];
        return Promise.all(descriptions)
      }
    }
  }
}
</script>

<style scoped lang="scss">
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
}
.facial-discriptor-extractor {
  width: 100%;
  padding: 2em;
  // text-align: center;
}

#imageUpload {
  text-align: center;
  margin: auto;
}
</style>
