<template lang="html">
  <section class="step-one">
    <Widget
      body-class="widget-form-overflow"
      custom-header
    >
      <b-row>
        <b-col
          lg="10"
          xs="12"
          class="m-auto w-100 p-4"
        >
          <h3 class="text-center py-4">
            <strong>User Data</strong>
          </h3>
          <form>
            <b-row>
              <b-col
                class="my-2"
                sm="3"
              >
                <label> FirstName: </label>
              </b-col>
              <b-col
                class="my-2"
                sm="9"
              >
                <input
                  value=""
                  name="firstName"
                  type="text"
                  required
                  @input="handleChange"
                >
              </b-col>
              <b-col
                class="my-2"
                sm="3"
              >
                <label> LastName: </label>
              </b-col>
              <b-col
                class="my-2"
                sm="9"
              >
                <input
                  value=""
                  name="lastName"
                  type="text"
                  required
                  @input="handleChange"
                >
              </b-col>
              <b-col
                class="my-2"
                sm="3"
              >
                <label> Age: </label>
              </b-col>
              <b-col
                class="my-2"
                sm="9"
              >
                <input
                  value=""
                  name="age"
                  type="text"
                  required
                  @input="handleChange"
                >
              </b-col>
              <b-col
                class="my-2"
                sm="3"
              >
                <label> Gender: </label>
              </b-col>
              <b-col
                class="my-2"
                sm="9"
              >
                <select
                  name="gender"
                  @input="addGender"
                >
                  <option
                    name="Option"
                    value="Select One"
                  >
                    Chose One ...
                  </option>                    
                  <option
                    name="gender"
                    value=""
                  >
                    Male
                  </option>
                  <option
                    name="gender"
                    value=""
                  >
                    Female
                  </option>
                </select>
              </b-col>
            </b-row>
          </form>
        </b-col>
      </b-row>
    </Widget>
  </section>
</template>

<script lang="js">
import { mapState } from 'vuex'

  export default  {
    name: 'StepOne',
    props: [],
    // eslint-disable-next-line vue/no-shared-component-data
    data () {
      return {
        
      }
    },
    computed: {
      // ...mapState({
      //   firstName: state => state.firstName
      // })
    },
    mounted () {
    },
    methods: {
      handleChange (event) {
        this.$store.commit('handleChange', event)
      },
      addGender (event) {
        if (event.target.selectedOptions[0].label !== 'Chose One ...') {
          this.$store.commit('addGender', event.target.selectedOptions[0].label)
        }
      }
    }
}


</script>

<style scoped lang="scss">
  .step-one {

  }
</style>
