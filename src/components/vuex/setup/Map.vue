<template>
  <div id="mapContainer">
    <!-- map이 그려질 영역 -->
    <div id="map"></div>
  </div>
</template>

<script>
import MapPositions from "~/assets/map-positions.json"
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const initMap = () => {
      let mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        // center: new kakao.maps.LatLng(37.564343, 126.947613), // 지도의 중심좌표
        center: new kakao.maps.LatLng(37.73035, 127.967487), // 지도의 중심좌표
        level: 13, // 지도의 확대 레벨
      };

      let map = new kakao.maps.Map(mapContainer, mapOption);
      const positions = MapPositions.map((pos) => ({
        latlng: new kakao.maps.LatLng(...pos.latlng),
        cityName: pos.cityName,
      }))

      // 마커를 생성합니다
      positions.forEach(function (pos) {
        let marker = new kakao.maps.Marker({
          position: pos.latlng, // 마커의 위치
        });
        marker.setMap(map); // 마커가 지도에 표시되도록 set

        // 마커를 클릭했을 때, 클릭된 마커의 좌표를 Vuex Store에 전달
        kakao.maps.event.addListener(marker, "click", () => {
          
          // 클릭한 위도, 경도 정보를 불러온 후 watch로 따로 빼지 않고, 직접 Vuex Store에 할당
          store.commit('openWeatherApi/SET_CITYNAME', pos.cityName);
          store.commit('openWeatherApi/SET_LATLON', marker.getPosition());
          store.dispatch('openWeatherApi/FETCH_OPENWEATHER_API');
        })
      }, this);
    }
    onMounted(() => {
      if (window.kakao && window.kakao.maps) {
        initMap();
      } else {
        const script = document.createElement('script');
        /* global kakao */
        script.onload = () => kakao.maps.load(initMap);
        /* https://greed-yb.tistory.com/335 */
        script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=110d1acf7c25542f27e793583a5c26ec';
        document.head.appendChild(script);
      }
    })
  }
};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";
#mapContainer {
  @include center;
  width: 100%;
  height: 35%;

  #map {
    width: 80%;
    height: 90%;
    border-radius: 10px;
  }
}
</style>