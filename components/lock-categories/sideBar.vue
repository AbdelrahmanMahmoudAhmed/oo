<template>
  <div class="lock-sidebar">
    <ul v-if="items.length">
      <li class="active" v-for="(item , i) in items" :key="i" >
      <img :src="require(`../../static/${item.pic}`)" alt="">
        <span> {{item.title}} </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      items:[
        {title : "series" , pic : "series.svg" },
        {title : "movies" , pic : "movies.svg"},
        {title : "live" , pic : "live.svg"},
      ]
    }
  }

}
</script>

<style lang="scss">
.lock-sidebar{
width: 378px;
height: 270px;
background: #151315 0% 0% no-repeat padding-box;
opacity: 1;
color: #fff;
>ul >li{
  width: 349px;
  height: 68px;
  &.active{
      background: transparent linear-gradient(90deg, #B6012C 0%, #910123 64%, #5B0116 100%) 0% 0% no-repeat padding-box;
      border-radius: 5px;
      opacity: 1;
  }
  >img{
// background: transparent url('img/bg.png') 0% 0% no-repeat padding-box;
width: 36px;
height: 36px;
  }
  >span{
width: 51px;
height: 40px;
text-align: left;
font: normal normal normal 30px/40px Segoe UI;
letter-spacing: 0px;
color: #FFFFFF;
  }
}
}

</style>
