<template>
  <div id="mapContainer">
    <!-- map이 그려질 영역 -->
    <div id="map"></div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";
#mapContainer {
  @include center;
  width: 100%;
  height: 35%;
  background-color: whitesmoke;

  #map {
    width: 80%;
    height: 90%;
    border-radius: 10px;
  }
}
</style>