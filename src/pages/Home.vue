<template>
  <div class="wrap">
    <div class="container">
      <MainView v-if="dispatchComplete" />
      <SubView v-if="dispatchComplete" />
    </div>
  </div>
</template>

<script>
// import MainView from '../components/options/MainView.vue';
// import SubView from '../components/options/SubView.vue';
// import MainView from '../components/setup/MainView.vue';
// import SubView from '../components/setup/SubView.vue';
// import MainView from '../components/vuex/options/MainView.vue';
// import SubView from '../components/vuex/options/SubView.vue';
import MainView from '../components/vuex/setup/MainView.vue';
import SubView from '../components/vuex/setup/SubView.vue';

export default {
  components: {
    MainView,
    SubView
  },
  data() {
    return {
      dispatchComplete: false
    }
  },
  async created() {
    await this.$store.dispatch("openWeatherApi/FETCH_OPENWEATHER_API"); // Vuex Store에 선언된 api 호출 완료
    this.dispatchComplete = true;
  }
};
</script>

<style lang="scss" scoped>
@import '~/scss/main.scss';
.wrap {
  @include center;
  width: 100%;
  height: 100vh;
  font-size: 16px;

  .container {
    @include center-sb;
    width: 55%;
    height: 90%;
    max-width: 1920px;
    max-height: 1354px;
  }
}
</style>