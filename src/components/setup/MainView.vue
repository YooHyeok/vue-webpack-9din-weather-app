<template>
  <div class="leftContainer">
    <div id="cityNameBox">
      <div class="cityName">
        <p>{{ cityName }}</p>
        <p>{{ currentTime }}</p>
      </div>
    </div>
    <div id="contentsBox">
      <div class="buttonBox">
        <div class="buttonBackground">
          <button class="forecast">
            Forecast
          </button>
          <button class="airquality">
            Air Quality
          </button>
        </div>
      </div>
      <div class="weatherBox">
        <div class="weatherDegree">
          <p>{{ Math.round(currentTemp) }}&deg;</p> <!-- &deg;: html 특수기호 -->
        </div>
        <div class="weatherIcon">
          <img
            src="~/assets/43.png"
            alt="MainLogo" />
        </div>
        <div class="weatherData">
          <div
            class="detailData"
            v-for="temporary in temporaryData"
            :key="temporary.title">
            <p>{{ temporary.title }}</p>
            <p>{{ temporary.value }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="todayWeather">
      <div class="textBox">
        <p>시간대별 날씨 정보</p>
        <p>이번주 날씨 보기</p>
      </div>
      <div
        ref="weatherBox"
        class="timelyWeatherBox">
        <!-- <div class="timelyWeather"> -->
        <div
          class="timelyWeather"
          v-for="(temp, index) in arrayTemps"
          :key="index">
          <div class="icon">
            <img
              src="~/assets/29.png"
              alt="" />
          </div>
          <!-- 날씨 api 호출시 상세 데이터를 출력할 공간 -->
          <div class="data">
            <p class="time">
              {{ Unix_timestamp(temp.dt) }}
            </p>
            <p class="currentDegree">
              {{ temp.main.temp }}&deg;
            </p>
            <!-- <p class="currentDegree">
              32&deg;
            </p> -->
            <div>
              <!-- 습도 아이콘 -->
              <img
                src="~/assets/drop.png"
                alt="" />
              <p class="fall">
                {{ temp.main.humidity }}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav>
      <i class="fas fa-home"></i>
      <i class="fas fa-search-location"></i>
      <i class="fas fa-chart-line"></i>
      <i class="fas fa-cog"></i>
    </nav>
  </div>
</template>
<script>
import axios from "axios"
import { onBeforeMount, onMounted, ref } from 'vue';
import dayjs from "dayjs" //  npm install dayjs
import "dayjs/locale/ko"
dayjs.locale("ko"); // 한국어 locale  글로벌 설정
export default {
  setup() {
    let currentTime = dayjs().format("YYYY. MM. DD. ddd") // 현재 시간을 나타내기 위한 Dayjs 플러그인 사용
    let currentTemp = ref("")
    let temp = ref([]) // 상세 날씨 데이터를 받아주는 데이터 할당
    let arrayTemps = ref([])
    let icons = ref([])
    let cityName = ref("")
    let temporaryData = ref([
      {
        title: '습도',
        value: '88%'
      },
      {
        title: '풍속',
        value: '10m/s'
      },
      {
        title: '풍향',
        value: 'WS'
      },
    ]) // 임시 데이터

    const API_KEY = "32c7ade76f0e3f495584cbb0d0cd1efe";
      let initialLat = 36.5683;
      let initialLon = 126.9778;

      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${initialLat}&lon=${initialLon}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        const {data: { name, sys: {country}, main: { temp, humidity, feels_like }, wind: { speed } } } = response

        cityName.value = `${name} (${country})`

        currentTemp.value = temp

        temporaryData.value[0].value = humidity + "%"
        temporaryData.value[1].value = speed + "m/s"
        temporaryData.value[2].value = feels_like + "도"
      })
      .catch((error) => {
        console.log(error);
      });

      // 시간대별 날씨 데이터 제어
      axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${initialLat}&lon=${initialLon}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        const {data: { list } } = response

        // this.arrayTemps = list;
        
        for(let i = 0; i < 24; i++) {
          arrayTemps.value[i] = list[i];
        }
      })
      .catch((error) => {
        console.log(error);
      });

    const Unix_timestamp = (dt) => {
      let date = new Date(dt * 1000);
      // return hour.substr(-2) + "시" // ❌ deprecated 경고 발생
      // let hour = "0" + date.getHours(); // 019시를 19시로 출력하는 방법1.
      let hour = date.getHours().toString().padStart(2, "0"); // 019시를 19시로 출력하는 방법2.
      return hour.substring(hour.length - 2) + "시"
    }

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        weatherBox.value.scrollLeft += e.deltaY;
        // weatherBox.value.scrollBy({ left: 100, behavior: 'smooth' });
      }
    }

    const weatherBox = ref(null)
    onMounted(() => {
       const box = weatherBox.value;
      if (box) {
        box.addEventListener('wheel', handleWheel, { passive: false });
      }
    })
    onBeforeMount(() => {
      const box = weatherBox.value;
      if (box) {
        box.removeEventListener('wheel', handleWheel);
      }
    })
    return {
      currentTime,
      currentTemp,
      temp,
      arrayTemps,
      icons,
      cityName,
      temporaryData,
      weatherBox,
      Unix_timestamp
    }
  },
 
}
</script>
<style lang="scss" scoped>
@import "~/scss/main.scss";
.leftContainer {
  width: 324px;
  height: 700px;
  border-radius: 50px;
  background: linear-gradient(#16455f, #0e1239);
  box-shadow: 5px 5px;

  #cityNameBox {
    width: 100%;
    height: 10%;

    .cityName {
      @include c-center;
      width: 100%;
      height: 100%;

      p {
        color: white;
        font-family: "Poppins", sans-serif;
        line-height: 2.5;
        text-align: center;

        &:first-child { /* 가장 첫번째 p태그 속성 */
          width: 241px;
          height: 33px;
          font-size: 1.35rem;
        }
        &:last-child { /* 가장 첫번째 p태그 속성 */
          width: 160px;
          height: 19px;
          font-size: 0.9rem;
          font-weight: 100;
        }
      }
    }
  }

  #contentsBox {
    width: 100%;
    height: 62.5%;

    .buttonBox {
      @include center;
      width: 100%;
      height: 20%;

      .buttonBackground {
        width: 224px;
        height: 35px;
        background-color: #052137;
        border-radius: 10px;
        display: flex; // 가로 배치
        
        button {
          width: 112px;
          height: 35px;
          border: 0;
          border-radius: 7.5px;
          outline: 0;

          cursor: pointer;

          /* &: 자기자신 즉, &.forecast=button.forecast와 같음 */
          &.forecast { /* 첫번째 button forecast class 선택자 */
            background-color: #0889ff;
            color: white;
          }
          &.airquality { /* 두번쨰 button airquality class 선택자 */
            background: transparent; // 투명
            color: #467599;
          }
        }
      }
    }

    .weatherBox {
      width: 100%;
      height: 80%;

      .weatherDegree {
        @include center;
        width: 100%;
        height: 15%;

        p {
          font-size: 3.5rem;
          font-weight: 500;
          font-family: "Be Vietnam pro", sans-serif;
          color: white;
        }
      }

      .weatherIcon {
        @include center;
        width: 100%;
        height: 60%;

        img {
          width: 168px;
          height: 160px;
        }
      }

      .weatherData {
        display: flex;
        width: 100%;
        height: 25%;
        
        .detailData {
          @include c-center;
          width: 33.33%;
          height: 100%;

          /*
           - nth-child(n): 부모안에 모든 요소 중 n번째 요소
           - &:nth-child(n): .detailData:nth-child(n)
           - .detailData의 부모 weatherData의 모든 하위 요소 중 n번째
           - 레이아웃이 3개이기 때문에 동일한 레이아웃(.detailData )을 반복시킴을 알 수 있다. 
           */
          &:nth-child(1) { // 1번째 .detailData에 css 효과 부여
            margin-left: 10px;
          }
          &:nth-child(2) {
            margin-left: 0 - 10px;
          }
          &:nth-child(3) {
            margin-right: 10px;
          }

          p {
            line-height: 1.5;
            color: white;

            &:first-child { // p의 부모(.detailData) 기준 첫번째 요소: 첫번째 p
              font-size: 1rem;
              font-weight: 300;
              font-family: "Noto Sans KR", sans-serif;
              color: #799ed0;
            }
            &:last-child { // p의 부모(.detailData) 기준 마지막 요소: 마지막 p
              font-size: 1rem;
              font-weight: 300;
              font-family: "Poppins", sans-serif;
            }
          }
        }
      }
    }
  }

  #todayWeather {
    width: 100%;
    height: 17.5%;

    .textBox {
      @include center-sb; // center, space-between
      width: calc(100% - 70px);
      height: 35%;
      padding: 0 35px; // 위 아래 0 좌우 35px - width:calc() 에서 - 70px 한 이유.
      font-family: 'Noto Sans KR', sans-serif;

      p {
        font-weight: 400;
        font-size: 0.8rem;
        color: white;
        text-align: center;
        
        &:last-child {
          font-weight: 400;
          font-size: 0.8rem;
          color: #0085ff;
          cursor: pointer;
          margin-bottom: 2px;
        }
      }
    }
    .timelyWeatherBox {
      display: flex;
      align-items: center;
      width: calc(100% - 70px);
      height: 65%;
      padding: 0 30px;
      /* overflow-x: auto; */
      overflow: scroll;
      scroll-behavior: smooth;
      
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }

      .timelyWeather {
        display: flex;
        width: 126px;
        min-width: 126px;
        height: 70px;
        background-color: #0989ff;
        border-radius: 20px;
        margin-left: 15px;

        &:first-child {
          margin-left: 0;
        }
        .icon {
          @include center;
          width: 45%;
          height: 100%;

          img {
            width: 100%;
          }
        }

        .data {
          @include c-center-se;
          width: 55%;
          height: 100%;

          p {
            color: whitesmoke;
            font-family: 'Poppins', sans-serif;
            text-align: center;

            &.time {
              font-size: 0.8rem; // rem: r은 root를 의미, root 폰트 크기(16px) 기준 상대값(배수) - 16px * 0.8 = 12.8px | em: 부모 혹은 자신의 font-size에 대한 상대값(배수)
              font-weight: 200;
              margin-top: 7.5px;
            }

            &.currentDegree {
              font-size: 1.2rem;
              margin-top: 7.5px;
            }
          }

          div {
            @include center;
            width: 100%;
            height: 33.33%;

            img {
              height: 55%;
            }
            .fall {
              font-size: 0.9rem;
              margin-top: 1.5px;
            }
          }
        }
      }
    }
  }
  nav {
    @include center-sb;
    width: calc(100% - 100px);
    height: 10%;
    padding: 0 50px;

    i {
      color: rgb(255, 255, 255);
      font-size: 1.15rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
          color: #799ed0;
      }
    }
  }
}
</style>