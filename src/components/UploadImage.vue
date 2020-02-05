<template>
  <div
    id="my-strictly-unique-vue-upload-multiple-image"
    style="display: flex; justify-content: center;"
  >
    <vue-upload-multiple-image
      @upload-success="uploadImageSuccess"
      @before-remove="beforeRemove"
      @edit-image="editImage"
      @data-change="dataChange"
      @limit-exceeded="limitExceeded"
    />
  </div>
</template>


<script>
import VueUploadMultipleImage from '../components/VueUploadMultipleImage'
export default {
  name: 'UploadImage',
  components: {
    VueUploadMultipleImage
  },
  data () {
    return {
    }
  },
  methods: {
    uploadImageSuccess() {
      // console.log(formData);
      // console.log(fileList);
      // Upload image api
      // axios.post('http://gostore.gostore-api.test/api/items/upload', formData).then(response => {
      //   console.log(response)
      // })
    },
    beforeRemove (index, done) {
      // console.log('index', index, fileList);
      const r = confirm("remove image");
      if (r == true) {
        done()
      }
    },
    editImage () {
      // console.log('edit data', formData, index, fileList)
    },
    dataChange () {
      // console.log(data)
    },
    limitExceeded(){
      // console.log(amount)
    }
  }
}
</script>

