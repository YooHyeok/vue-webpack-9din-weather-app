<template>
  <div class="rightContainer">
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
        <!-- 날씨 api 데이트 활용 - 현재 온도에 대한 체감 온도를 출력 -->
        <div class="airCondition">
          <p>{{ feeling }}</p>
        </div>
        <div class="detail">
          <div class="title">
            <p>🌈상세한 날씨 데이터🌞</p>
          </div>
          <div
            class="data"
            v-for="(detailData, index) in subWeatherData"
            :key="index">
            <div class="dataName">
              <p></p>
              <p>{{ detailData.name }}</p>
            </div>
            <div class="dataValue">
              <p>{{ detailData.value }}</p><span></span> &deg;
            </div>
          </div>
        </div>
      </div>
    </div>
    <Map />
    <nav>
      <i class="fas fa-home"></i>
      <i class="fas fa-search-location"></i>
      <i class="fas fa-chart-line"></i>
      <i class="fas fa-cog"></i>
    </nav>
  </div>
</template>
<!-- 카카오맵 api 지도 렌더링 컴포넌트 -->
<script>
import axios from 'axios';
import dayjs from 'dayjs';
import Map from '~/components/options/Map.vue';
import "dayjs/locale/ko"
dayjs.locale("ko"); // 한국어 locale  글로벌 설정
export default {
  components: {
    Map
  },
  data() {
    return {
      currentTime: dayjs().format("YYYY. MM. DD. ddd"), // 현재 시간을 나타내기 위한 Dayjs 플러그인 사용
      cityName: "",
      feeling: "",
      subWeatherData: []
    }
  },
  created() {
  const API_KEY = "32c7ade76f0e3f495584cbb0d0cd1efe";
    let initialLat = 36.5683;
    let initialLon = 126.9778;
    // get() 메서드를 통해서 우리가 필요로하는 API 데이터를 호출한다.
    try {
      (async () => {

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${initialLat}&lon=${initialLon}&appid=${API_KEY}&units=metric`
        )
        const { 
          data:{
            name,
            main: {
              feels_like // 초기 체감온도 데이터
            },
            sys: {
              country,
              sunrise, // 일출시간 데이터
              sunset // 일몰시간 데이터
            },
            visibility // 가시거리
          }
        } = response

        /* switch (true) {
          case feels_like <= 0: this.feeling = "매우 추움"
            break;
          case feels_like <= 10: this.feeling = "추움"
            break;
          case feels_like <= 15: this.feeling = "쌀쌀함"
            break;
          case feels_like <= 20: this.feeling = "신선함"
            break;
          case feels_like <= 25: this.feeling = "보통"
            break;
          case feels_like <= 30: this.feeling = "더움"
            break;
          case feels_like > 30: this.feeling = "매우 더움"
            break;
        } */

        const tempPoints = [0, 10, 15, 20, 25, 30] // 체감 온도 분기 기준점
        const labels = ["매우 추움", "추움", "쌀쌀함", "신선함", "보통", "더움", "매우 더움"] // 체감 온도 분기 문구

        let index = 0;
        for (const point of tempPoints) { // 배열 요소 순회 및 비교 - 조건 맞다면 중단, 맞지 않다면 index 증가
          if(feels_like <= point) break;
          index++; // 모든 요소의 조건이 모두 일치하지 않는다면 최대값은 6(매우 더움)
        }
        this.feeling = labels[index];

        let isPrcessedData = [
          { name: "일출시간", value: this.Unix_timestamp(sunrise) },
          { name: "일몰시간", value: this.Unix_timestamp(sunset) },
          { name: "가시거리", value: visibility.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "M" },
        ]
        console.log(isPrcessedData)
        this.subWeatherData = isPrcessedData;
        
        this.cityName = `${name} (${country})`

      }) ();
    } catch (error) {
      console.error(error)
    }
 },
 methods: {
    Unix_timestamp(dt) {
      let date = new Date(dt * 1000);
      // return hour.substr(-2) + "시" // ❌ deprecated 경고 발생
      // let hour = "0" + date.getHours(); // 019시를 19시로 출력하는 방법1.
      let hour = date.getHours().toString().padStart(2, "0"); // 019시를 19시로 출력하는 방법2.
      return hour.substring(hour.length - 2) + "시"
    },
    handleWheel(e) {
      if (e.deltaY !== 0) {
        e.preventDefault();
        this.$refs.weatherBox.scrollLeft += e.deltaY;
        // this.$refs.weatherBox.scrollBy({ left: 100, behavior: 'smooth' });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";
.rightContainer {
  // width: 40%;
  // height: 100%;
  width: 324px;
  min-width: 324px;
  height: 700px;
  border-radius: 50px;
  background: linear-gradient(#cb0000, #0e1239);
  box-shadow: 5px 5px 10px gray;

  #cityNameBox {
    width: 100%;
    height: 10%;

    .cityName {
      @include c-center;
      width: 100%;
      height: 100%;

      p {
        color: white;
        font-family: 'Poppins', sans-serif;
        line-height: 2.5;
        text-align: center;

        &:first-child {
            width: 241px;
            height: 33px;
            font-size: 1.35rem;
        }
        &:last-child {
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
    height: calc(45% - 16px);
    margin-top: 16px;

    .buttonBox {
      @include center;
      width: 100%;
      height: 20%;

      .buttonBackground {
        width: 224px;
        height: 35px;
        background-color: #370505;
        border-radius: 10px;
        display: flex;

        button {
          width: 112px;
          height: 35px;
          border: 0;
          border-radius: 7.5px;
          outline: 0;
          cursor: pointer;
          &.forecast {
            background-color: transparent;
            color: #a52727;
          }
          &.airquality {
            background: #ff0000;
            color: white;
          }
        }
      }
    }
    .weatherBox {
      width: 100%;
      height: 80%;

      .airCondition {
        @include center;
        width: 100%;
        height: 35%;

        p {
          text-align: center;
          font-size: 2.25rem;
          font-weight: 500;
          font-family: 'GmarketSansBold';
          color: #fff;
        }
      }
      .detail {
        width: 100%;
        height: 65%;

        .title {
          @include center;
          width: 100%;
          height: 25%;
          color: white;

          p {
            font-family: 'LeferiPoint-WhiteObliqueA';
          }
        }
        .data {
          display: flex;
          width: 100%;
          height: 27.5%;
          // background-color: rgb(187, 127, 255);

          .dataName {
            display: flex;
            align-items: center;
            width: 50%;
            height: 100%;
            font-family: 'LeferiPoint-WhiteObliqueA';

            p {
              &:first-child {
                display: block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #ffde23;
                margin-left: 50px;
              }
              &:last-child {
                margin-left: 10px;
                color: white;
                font-weight: 300;
                font-size: 0.9rem;
              }
            }
          }
          .dataValue {
            display: flex;
            align-items: center;
            justify-content: right;
            width: 50%;
            height: 100%;
            font-family: 'LeferiPoint-WhiteObliqueA';

            p {
              color: white;
              font-weight: 300;
              margin-right: 50px;

              span {
                font-weight: 600;
              }
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