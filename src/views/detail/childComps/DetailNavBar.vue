<template>
  <div>
    <NavBar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div class="itemTitle"
         v-for="(item,index) in titles"
         @click="itemClick(index)"
         :class="{active:currentIndex===index}">
            {{ item }}
       </div>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex:0,
    };    
  },
  components: {
    NavBar,
  },
  methods: {
      itemClick(index){
          this.currentIndex=index;
          this.$emit('itemClick',index)
      },
      backClick(){
          this.$router.back()
      }
  },
};
</script>

<style scoped>
.title {
  display: flex;
}
.itemTitle{
    flex: 1;
}
.active{
    color:var(--color-high-text);
}
.back img{
    margin: 11px;
}
</style>