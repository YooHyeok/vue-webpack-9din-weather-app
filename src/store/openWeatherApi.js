// vuex 모듈 - 사용되는 api가 다르기 때문에 store(src/store/index.js) 내에서 이름을 부여하여 관리.

import axios from "axios";
export default {
  /* [namespaced]: 하나의 store에서 모듈화 하여 사용할 수 있음을 명시적으로 나타내는 개념 */
  namespaced: true,
  /* [state]: 실제로 취급해야하는 데이터 */
  state: {},
  /* [getters]: 계산된 상태의 데이터를 만들어내는 속성 - computed와 유사한 기능 */
  getters: {},
  /* [mutations]: 변이 메소드, 우리가 관리하는 데이터인 state를 오로지 이곳 mutations 에서만 변경시킬 수 있다. */
  mutations: {},
  /* 
  [actions]: 특정한 데이터를 직접적으로 수정하는것이 허용되지 않으며, 비동기로 동작한다.
    - mutations처럼 state를 바로 불러올 수 없고, context라는 객체 데이터를 호출 후 참조하여 데이터를 불러온다.
    - context안에는 state, getters, mutations를 활용할 수 있는 내용이 들어있다.
    - mutations를 호출하기 위해서는 context.mutations 접근이 아닌 context.commit('mutation 이름', payload) 형식으로 호출해야 한다.
      - 객체 구조 분해 할당을 통해 불러올 수도 있다.
  */
  actions: {
  }

}