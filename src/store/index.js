// vuex 설치: npm install vuex@next
import { createStore } from "vuex"
import openWeatherApi from "./openWeatherApi"

export default createStore({
  // vuex 모듈 - 사용되는 api가 다르기 때문에 store 내에서 이름을 부여하여 관리
  modules: {
    openWeatherApi 
  }
})