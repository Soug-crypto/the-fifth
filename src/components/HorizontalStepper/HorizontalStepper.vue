<template>
  <div class="stepper-box">
    <div class="top">
      <div
        class="divider-line"
        :style="{width: `${(100/(steps.length) * (steps.length - 1)) - 10}%`}"
      />
      <div class="steps-wrapper">
        <template v-if="topButtons">
          <div
            v-if="currentStep.index > 0"
            class="stepper-button-top previous"
            @click="backStep()"
          >
            <i class="material-icons">keyboard_arrow_left</i>
          </div>
        </template>
        <template v-for="(step, index) in steps">
          <div
            :key="index"
            :class="['step', isStepActive(index, step)]"
            :style="{width: `${100 / steps.length}%`}"
          >
            <div class="circle">
              <i class="material-icons md-18">
                {{ (step.completed) ? 'done' : step.icon }}
              </i>
            </div>
            <div class="step-title">
              <h4 class="text-center">{{ step.title }}</h4>
              <h5 class="step-subtitle">
                {{ step.subtitle }}
              </h5>
            </div>
          </div>
        </template>
        <div
          v-if="topButtons"
          :class="['stepper-button-top next', !canContinue ? 'deactivated' : '']"
          @click="nextStep()"
        >
          <i class="material-icons">keyboard_arrow_right</i>
        </div>
      </div>
    </div>
    <div class="content">
      <transition
        :enter-active-class="enterAnimation"
        :leave-active-class="leaveAnimation"
        mode="out-in"
      >
        <!--If keep alive-->
        <keep-alive v-if="keepAliveData">
          <component
            :is="steps[currentStep.index].component"
            :clicked-next="nextButton[currentStep.name]"
            :current-step="currentStep"
            @can-continue="proceed"
            @change-next="changeNextBtnValue"
          />
        </keep-alive>
        <!--If not show component and destroy it in each step change-->
        <component
          :is="steps[currentStep.index].component"
          v-else
          :clicked-next="nextButton[currentStep.name]"
          :current-step="currentStep"
          @can-continue="proceed"
          @change-next="changeNextBtnValue"
        />
      </transition>
    </div>
    <div :class="['bottom', (currentStep.index > 0) ? '' : 'only-next']">
      <div
        v-if="currentStep.index > 0"
        class="stepper-button previous"
        @click="backStep()"
      >
        <i class="material-icons">keyboard_arrow_left</i>
        <span>{{ 'back' | translate(locale) }}</span>
      </div>
      <div
        :class="['stepper-button next', !canContinue ? 'deactivated' : '']"
        @click="nextStep()"
      >
        <span @click="finalClick">{{ (finalStep) ? 'finish' : 'next' | translate(locale) }}</span>
        <i class="material-icons">keyboard_arrow_right</i>
      </div>
    </div>
  </div>
</template>

<script>
import translations from "./Translations.js";
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { uploadPhotoMutation } from "../../graphql/Mutations.js";
export default {
  name: 'Horizontal',
  filters: {
    translate: function(value, locale) {
      return translations[locale][value];
    }
  },
  props: {
    locale: {
      type: String,
      default: "en"
    },
    topButtons: {
      type: Boolean,
      default: false
    },
    steps: {
      type: Array,
      default: function() {
        return [
          {
            icon: "mail",
            name: "first",
            title: "User Data",
            // subtitle: "Subtitle sample",
            component: StepOne
          },
          {
            icon: "tag_faces",
            name: "second",
            title: "Face Descriptor",
            // subtitle: "Subtitle sample",
            component: StepTwo
          },
          {
            icon: "add_photo_alternate",
            name: "third",
            title: "Upload images",
            // subtitle: "Subtitle sample",
            component: StepThree
          }
        ];
      }
    },
    keepAlive: {
      type: Boolean,
      default: true
    },
    reset: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentStep: {},
      previousStep: {},
      nextButton: {},
      canContinue: true,
      finalStep: true,
      keepAliveData: this.keepAlive
    };
  },
  computed: {
    enterAnimation() {
      if (this.currentStep.index < this.previousStep.index) {
        return "animated quick fadeInLeft";
      } else {
        return "animated quick fadeInRight";
      }
    },
    leaveAnimation() {
      if (this.currentStep.index > this.previousStep.index) {
        return "animated quick fadeOutLeft";
      } else {
        return "animated quick fadeOutRight";
      }
    }
  },
  watch: {
    reset(val) {
      if(!val) {
        return;
      }
      this.keepAliveData = false;
      this.init();
      this.previousStep = {};
      this.$nextTick(() => {
        this.keepAliveData = this.keepAlive;
        this.$emit('reset', true);
      });
    }
  },
  created() {
    this.init();
  },
  methods: {
    isStepActive(index, step) {
      if (this.currentStep.index === index) {
        return "activated";
      } else {
        return "deactivated";
      }
    },
    activateStep(index, back = false) {
      if (this.steps[index]) {
        this.previousStep = this.currentStep;
        this.currentStep = {
          name: this.steps[index].name,
          index: index
        };
        if (index + 1 === this.steps.length) {
          this.finalStep = true;
        } else {
          this.finalStep = false;
        }
        if (!back) {
          this.$emit("completed-step", this.previousStep);
        }
      }
      this.$emit("active-step", this.currentStep);
    },
    nextStepAction() {
      this.nextButton[this.currentStep.name] = true;
      if (this.canContinue) {
        if (this.finalStep) {
          this.$emit("stepper-finished", this.currentStep);
        }
        let currentIndex = this.currentStep.index + 1;
        this.activateStep(currentIndex);
      }
      this.canContinue = false;
      this.$forceUpdate();
    },
    nextStep () {
      if (!this.$listeners || !this.$listeners['before-next-step']) {
        this.nextStepAction()
      }
      this.canContinue = true;
      this.$emit("before-next-step", { currentStep: this.currentStep }, (next = true) => {
        this.canContinue = true;
        if (next) {
          this.nextStepAction()
        }
      });
    },
    backStep() {
      this.$emit("clicking-back");
      let currentIndex = this.currentStep.index - 1;
      if (currentIndex >= 0) {
        this.activateStep(currentIndex, true);
      }
    },
    proceed(payload) {
      this.canContinue = payload.value;
    },
    changeNextBtnValue(payload) {
      this.nextButton[this.currentStep.name] = payload.nextBtnValue;
      this.$forceUpdate();
    },
    finalClick (e) {
      if (e.target.innerText === 'Finish') {
        let { firstName, lastName, age, gender, descriptors, photo } = this.$store.getters.getUserData
        if ( 
          this.file
          && firstName !== ''
          && lastName  !== ''
          && age !== 0
          && gender !== ''
          && descriptors.length !== 0
          && photo
        ) {
          this.$apollo.mutate({
            mutation: uploadPhotoMutation,
            variables: {
              firstName,
              lastName,
              age,
              gender,
              descriptors,
              photo
            }
          })
          console.log('NO ERROR')
          console.log(this.$store.getters.getUserData)
        } else {
          console.log('ERROR')
        }
      }
    },
    init() {
      // Initiate stepper
      this.activateStep(0);
      this.steps.forEach(step => {
        this.nextButton[step.name] = true;
      });
    }
  }
};
</script>

<style src="./HorizontalStepper.scss" scoped lang="scss">
</style>
<style scoped>
/* fallback */
@font-face {
  font-family: "Material Icons";
  font-style: normal;
  font-weight: 400;
  src: local("Material Icons"), local("MaterialIcons-Regular"),
    url(https://fonts.gstatic.com/s/materialicons/v17/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2)
      format("woff2");
}
.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}
</style>