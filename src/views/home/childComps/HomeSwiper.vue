<template>
  <Swiper>
    <SwiperItem v-for="item in bannerList">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImageLoad" />
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  data(){
    return {
      isLoad:false
    }
  },
  props: {
    bannerList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    swiperImageLoad() {
      // 发送一次就行了
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad=true
      }
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>