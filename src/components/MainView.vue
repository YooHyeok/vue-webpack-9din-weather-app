<template>
  <div class="leftContainer">
    <div id="cityNameBox">
      <div class="cityName">
        <p>San Fransisco</p>
        <p>Jan 28, 2022</p>
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
          <p>10&deg;</p> <!-- &deg;: html 특수기호 -->
        </div>
        <div class="weatherIcon">
          <img
            src="~/assets/43.png"
            alt="MainLogo" />
        </div>
        <div class="weatherData">
          <div class="detailData">
            <p>.weatherData>.detailData>p1</p>
            <p>.weatherData>.detailData>p2</p>
          </div>
        </div>
      </div>
    </div>
    <div id="todayWeather">
      <div class="textBox">
        <p>시간대별 날씨 정보</p>
        <p>이번주 날씨 보기</p>
      </div>
      <div class="timelyWeatherBox">
        <div class="timelyWeather">
          <div class="icon">
            <img
              src="~/assets/29.png"
              alt="" />
          </div>
          <!-- 날씨 api 호출시 상세 데이터를 출력할 공간 -->
          <div class="data">
            <p class="time">
              2pm
            </p>
            <p class="currentDegree">
              32&deg;
            </p>
            <div>
              <!-- 습도 아이콘 -->
              <img
                src="~/assets/drop.png"
                alt="" />
              <p class="fall">
                15%
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
export default {
 data() {
  
 }
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
        &:first-child { /* 가장 첫번째 p태그 속성 */
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

            &:first-child {
              font-size: 1rem;
              font-weight: 300;
              font-family: "Noto Sans KR", sans-serif;
              color: #799ed0;
            }
            &:last-child {
              font-size: 1rem;
              font-weight: 300;
              font-family: "Poppins", sans-serif;
            }
          }
        }
      }
    }
  }
}
</style>