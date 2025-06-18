<template>
  <div id="mapContainer">
    <!-- map이 그려질 영역 -->
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    
    return {}
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement('script');
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      /* https://greed-yb.tistory.com/335 */
      script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=110d1acf7c25542f27e793583a5c26ec';
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      let mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        // center: new kakao.maps.LatLng(37.564343, 126.947613), // 지도의 중심좌표
        center: new kakao.maps.LatLng(37.73035, 127.967487), // 지도의 중심좌표
        level: 13, // 지도의 확대 레벨
      };

      let map = new kakao.maps.Map(mapContainer, mapOption);
      let positions = [
        {
          // 서울
          latlng: new kakao.maps.LatLng(36.5683, 126.9778),
        },
        {
          // 인천
          latlng: new kakao.maps.LatLng(37.40864282648822, 126.65071862847725),
        },
        {
          // 수원
          latlng: new kakao.maps.LatLng(37.2911, 127.0089),
        },
        {
          // 대전
          latlng: new kakao.maps.LatLng(36.3519957815787, 127.39131469478555),
        },
        {
          // 태백
          latlng: new kakao.maps.LatLng(37.15818414766273, 128.928560966107),
        },
        {
          // 강릉
          latlng: new kakao.maps.LatLng(37.791688035246636, 128.82867301427635),
        },
        {
          // 대구
          latlng: new kakao.maps.LatLng(35.871148697228875, 128.61345034272617),
        },
        {
          // 울산
          latlng: new kakao.maps.LatLng(35.5372, 129.3167),
        },
        {
          // 부산
          latlng: new kakao.maps.LatLng(35.185997613083536, 129.0662809358643),
        },
        {
          // 전주
          latlng: new kakao.maps.LatLng(35.90493196781132, 127.17357575637105),
        },
        {
          // 광주
          latlng: new kakao.maps.LatLng(35.166611792579545, 126.84603104436039),
        },
        {
          // 목포
          latlng: new kakao.maps.LatLng(34.823630139082525, 126.39766650967137),
        },
        {
          // 제주도
          latlng: new kakao.maps.LatLng(33.5097, 126.5219),
        },
      ];
      // 마커를 생성합니다
      positions.forEach(function(pos) {
        let marker = new kakao.maps.Marker({
          position: pos.latlng, // 마커의 위치
        });
        marker.setMap(map);
      });
    }
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