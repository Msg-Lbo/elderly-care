<template>
  <view class="life">
    <section class="tabs">
      <u-tabs
        :list="list"
        @click="handleTabClick"
        lineHeight="4"
        lineWidth="40"
        lineColor="#A6CF6F"
        :activeStyle="{
          color: '#303133',
          fontWeight: 'bold',
          fontSize: '46rpx',
        }"
        :inactiveStyle="{
          color: '#606266',
          fontSize: '40rpx',
        }"
      ></u-tabs>
    </section>
    <section class="content" v-if="currentIndex === 0">
      <view class="content-item" @click="$fn.jumpPage('/pages/service/commission?type=1')">
        <view class="left">
          <view class="title">上门照护</view>
          <view class="desc"> 喂药|看护|做饭|打扫 </view>
        </view>
        <view class="right">
          <u-image src="/static/common/l1.png" width="250rpx" height="220rpx" mode="WidthFix"></u-image>
        </view>
      </view>
      <view class="content-item" @click="$fn.jumpPage('/pages/service/commission?type=2')">
        <view class="left">
          <view class="title">委托代办</view>
          <view class="desc"> 资料代取|取药|取快递|代购 </view>
        </view>
        <view class="right">
          <u-image src="/static/common/l2.png" width="250rpx" height="220rpx" mode="WidthFix"></u-image>
        </view>
      </view>
    </section>
    <section class="content" v-if="currentIndex === 1">
      <u-list height="80vh">
        <view class="content-item" v-for="(item, index) in aricleList" :key="index"  @click="$fn.jumpPage('/pages/tabbar/agreement')">
          <view class="left">
            <view class="title">{{ item.title }}</view>
            <view class="desc"> {{ item.desc }} </view>
          </view>
          <view class="right">
            <u-image src="/static/common/l1.png" width="250rpx" height="220rpx" mode="WidthFix"></u-image>
          </view>
        </view>
      </u-list>
    </section>
    <section class="content" v-if="currentIndex === 2">
      <u-list height="80vh">
        <view class="content-item" v-for="(item, index) in aricleList" :key="index"  @click="$fn.jumpPage('/pages/tabbar/agreement')">
          <view class="left">
            <view class="title">{{ item.title }}</view>
            <view class="desc"> {{ item.desc }} </view>
          </view>
          <view class="right">
            <u-image src="/static/common/l1.png" width="250rpx" height="220rpx" mode="WidthFix"></u-image>
          </view>
        </view>
      </u-list>
    </section>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      list: [
        {
          name: "生活照护",
        },
        {
          name: "交通百科",
        },
        {
          name: "健康百科",
        },
      ],
<<<<<<< HEAD
      articleList:[]
=======
      aricleList: [
        {
          title: "文章标题",
          desc: "文章介绍",
        },
      ],
>>>>>>> 5a8d6cd50aa11f0a40fd3ab9c784604ea6accf19
    };
  },
  onShow(){
    console.log(12312);
    
    this.getArticleList();
  },
  methods: {
    handleTabClick(item) {
      console.log(item);
      this.currentIndex = item.index;
    },

    // 获取文章列表
   async getArticleList() {
      try {
        const res = await this.$api.getArticles();
        console.log(res);

      } catch (error) {
        console.log(error);
        
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.life {
  padding: 20rpx;
  background-color: #d6e2bf;
  height: 100vmax;

  .tabs {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    .content-item {
      margin-top: 40rpx;
      padding: 30rpx 20rpx;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 10rpx;
      background-color: #fff;
      border-radius: 20rpx;
      box-shadow: 10rpx 10rpx 20rpx #798860;
      .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .title {
          font-size: 56rpx;
          color: #303133;
          font-weight: bold;
          margin-bottom: 10rpx;
        }
        .desc {
          font-size: 36rpx;
          color: #606266;
          margin-bottom: 10rpx;
        }
        .right {
          width: 150rpx;
          height: 150rpx;
          border-radius: 10rpx;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
