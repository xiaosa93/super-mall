<template>
  <div class="back-top" @click="backClick">
      <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
    name:"BackTop",
    methods: {
        backClick(){
            this.$bus.$emit('backClick')
        }
    },
}
</script>

<style>
.back-top{
    position: fixed;
    bottom: 60px;
    right: 0
}
.back-top img{
    width: 50%;
}
</style>