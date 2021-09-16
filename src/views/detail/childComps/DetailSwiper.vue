<template>
  <Swiper>
    <SwiperItem class="swiperItem" v-for="item in topImages">
      <img :src="item" alt="" />
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style>
.swiperItem {
  height: 300px;
  overflow: hidden;
}
</style>