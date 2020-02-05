<template lang="html">
  <section class="step-three">
    <b-col
      lg="12"
      xs="12"
    >
      <h3 class="text-center py-5">
        <strong>Upload Image</strong>
      </h3>
      <UploadImage />
    </b-col>
  </section>
</template>

<script lang="js">
import UploadImage from '@/components/UploadImage';

  export default  {
    name: 'StepThree',
    components: {
      UploadImage
    },
    props: [],
    data () {
      return {

      }
    },
    computed: {

    },
    mounted () {

    },
    methods: {

    }
}


</script>

<style scoped lang="scss">
  .step-three {

  }
</style>
