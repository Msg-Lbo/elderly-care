<template>
  <view class="home">
    <section class="content">
      <view class="search-box">
        <view class="search-input" @click="$fn.jumpPage('/pages/service/searchList')">
          <input class="search-input-text" type="text" placeholder="足不出户预约挂号" />
          <view class="search-icon">
            <u-icon name="search" size="60rpx" color="#fff"></u-icon>
          </view>
        </view>
      </view>
      <view class="classify-box">
        <view class="classify-item" v-for="(item, index) in classifyList" :key="index" @click="$fn.toPath(item.path)">
          <view class="classify-icon">
            <u-image :src="item.icon" width="110rpx" height="auto" mode="widthFix"></u-image>
          </view>
          <view class="classify-title">{{ item.title }}</view>
        </view>
      </view>
      <!-- 健康资讯 -->
      <view class="health-box">
        <view class="health-title">
          <view>健康资讯</view>
          <view class="more" @click="$fn.jumpPage('/pages/service/searchList?type=health')">
            <text>全部</text>
            <u-icon name="arrow-right" size="55rpx" color="#606060"></u-icon>
          </view>
        </view>
        <u-scroll-list>
          <view class="health-item" v-for="(item, index) in healthList" :key="index" @click="$fn.jumpPage('/pages/tabbar/agreement')">
            <view class="health-cover">
              <u-image :src="item.cover + index" width="450rpx" height="760rpx" mode="aspectFill"></u-image>
            </view>
          </view>
        </u-scroll-list>
      </view>
    </section>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value1: 0,
      classifyList: [
        {
          icon: "/static/common/c1.png",
          title: "医疗服务",
          path: "/pages/service/medical",
        },
        {
          icon: "/static/common/c2.png",
          title: "生活服务",
          path: "/pages/service/life",
        },
        // {
        // 	icon: '/static/common/c3.png',
        // 	title: '社交娱乐',
        // 	path: '/pages/service/social'
        // },
        // {
        // 	icon: '/static/common/c4.png',
        // 	title: '线上服务',
        // 	path: '/pages/service/online'
        // }
      ],
      healthList: [
        {
          cover: "https://picsum.photos/450/760/?random",
          title: "疾病预防",
          desc: "了解疾病预防的知识，减少疾病发病率"
        },
        {
          cover: "https://picsum.photos/450/760/?random",
          title: "健康饮食",
          desc: "了解健康饮食的原理，保障健康饮食的关键"
        },
        {
          cover: "https://picsum.photos/450/760/?random",
          title: "养生保健",
          desc: "了解养生保健的原理，保障养生保健的关键"
        },
      ],
    };
  },
  onShow() {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.home {
  .content {
    background-color: #d6e2bf;
    padding: 40rpx;
    .search-box {
      .search-input {
        // width: 100%;
        height: 150rpx;
        border-radius: 75rpx;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        padding: 0 20rpx;

        .search-input-text {
          // width: 80%;
          font-size: 60rpx;
          flex: 1;
          height: 100%;
          border: none;
          padding-left: 20rpx;
        }

        .search-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #a6cf6f;
          width: 110rpx;
          height: 110rpx;
          border-radius: 50%;
        }
      }
    }

    .classify-box {
      margin-top: 40rpx;
      display: grid;
      align-items: center;
      gap: 20rpx;
      grid-template-columns: 1fr 1fr 1fr 1fr;

      .classify-item {
        .classify-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          // padding: 20rpx;
          background-color: #fff;
          border-radius: 10rpx;
          // width: 160rpx;
          height: 150rpx;
        }

        .classify-title {
          font-size: 30rpx;
          font-weight: bold;
          color: #606060;
          text-align: center;
          margin-top: 20rpx;
        }
      }
    }

    .health-box {
      margin-top: 40rpx;

      .health-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 55rpx;
        font-weight: bold;
        color: #606060;
        margin-bottom: 20rpx;

        .more {
          display: flex;
          align-items: center;
          color: #606060;
          cursor: pointer;

          .u-icon {
            margin-left: 10rpx;
          }
        }
      }

      .health-item {
        .health-cover {
          margin-right: 120rpx;
          box-shadow: 10rpx 5rpx 15rpx #a6cf6f80;
        }
      }
    }
  }
}
</style>
