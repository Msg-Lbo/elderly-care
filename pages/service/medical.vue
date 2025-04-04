<template>
  <view class="medical">
    <view class="service-title">
      <view
        class="service-name"
        :class="{ active: activeTab === item.value }"
        :style="{ backgroundColor: item.bgColor }"
        v-for="item in tabs"
        :key="item.value"
        @click="handleSwitch(item.value)"
        >{{ item.label }}</view
      >
    </view>
    <section class="service-card" v-if="activeTab === 1">
      <view class="service-content">
        <view class="user">
          <view class="user-avatar">
            <u-image src="https://picsum.photos/100/100" width="100rpx" height="100rpx" mode="aspectFill"></u-image>
          </view>
          <view class="user-desc">
            <view class="user-name">{{ userInfo.name }}</view>
            <view class="user-phone">{{ userInfo.phone }}</view>
          </view>
          <view class="qr-code">
            <u-image src="/static/common/qr-code.png" width="100rpx" height="100rpx" mode="aspectFill"></u-image>
          </view>
        </view>
        <view class="health-id">
          <text style="color: #606060">电子健康卡</text>
          <text style="color: #a3a3a3">[{{ userInfo.healthId }}]</text>
        </view>
        <view class="health-manager">
          <view class="card">
            <view class="icon" @click="$fn.jumpPage(`/pages/service/fileManagement`)">
              <u-image src="/static/common/c6.png" width="110rpx" height="100rpx" mode="widthFix"></u-image>
            </view>
            <text class="card-name">档案查看</text>
          </view>
          <view class="line"></view>
          <view class="card" @click="$fn.jumpPage(`/pages/service/healthAgenda`)">
            <view class="icon">
              <u-image src="/static/common/c5.png" width="110rpx" height="100rpx" mode="widthFix"></u-image>
            </view>
            <text class="card-name">健康日程</text>
          </view>
        </view>
      </view>
    </section>
    <section class="health-service" v-if="activeTab === 1">
      <view class="left">
        <view class="service-item" @click="handleAppointment">
          <view class="title">预约挂号</view>
          <view class="desc">专家号在线预约</view>
          <view class="service-icon">
            <u-image src="/static/common/c7.png" width="180rpx" height="160rpx" mode="aspectFill"></u-image>
          </view>
        </view>
      </view>
      <view class="right">
        <view class="service-item">
          <view>
            <view class="title">线上问诊</view>
            <view class="desc">专家在线解答</view>
          </view>
          <view class="service-icon">
            <u-image src="/static/common/c8.png" width="60rpx" height="80rpx" mode="aspectFill"></u-image>
          </view>
        </view>
        <view class="service-item" @click="openNavigation">
          <view>
            <view class="title">线下导医</view>
            <view class="desc">长者就医无压力</view>
          </view>
          <view class="service-icon">
            <u-image src="/static/common/c9.png" width="60rpx" height="80rpx" mode="aspectFill"></u-image>
          </view>
        </view>
      </view>
    </section>
    <section class="health-monitor" v-if="activeTab === 2">
      <view class="monitor-item" v-for="item in healthData" :key="item.label">
        <view class="monitor-flex">
          <view class="monitor-title">{{ item.label }}</view>
          <view class="monitor-value">{{ item.value }}{{ item.unit }}</view>
        </view>
        <view class="monitor-icon">
          <u-image :src="item.icon" width="80rpx" height="100rpx" mode="WidthFix"></u-image>
        </view>
      </view>
    </section>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 1,
      userInfo: {
        name: "张三",
        phone: "13800138000",
        healthId: "123456789012345678",
      },
      tabs: [
        { label: "诊疗服务", value: 1, bgColor: "#A6CF6F" },
        { label: "健康监测", value: 2, bgColor: "#F1E779" },
      ],
      healthData: [
        {
          label: "血压",
          value: 100,
          unit: "mmHg",
          icon: "/static/common/h1.png",
        },
        {
          label: "血氧",
          value: 90,
          unit: "%",
          icon: "/static/common/h2.png",
        },
        
        {
          label: "血糖",
          value: 80,
          unit: "mg/dl",
          icon: "/static/common/h3.png",
        },
        {
          label: "体温",
          value: 36.5,
          unit: "°C",
          icon: "/static/common/h4.png",
        },
        {
          label: "体重",
          value: 70,
          unit: "kg",
          icon: "/static/common/h5.png",
        },
      ],
    };
  },
  methods: {
    // 切换tab
    handleSwitch(value) {
      this.activeTab = value;
    },

    // 打开导航
    openNavigation() {
      // 获取当前位置
      uni.getLocation({
        type: "gcj02",
        success: (res) => {
          const latitude = res.latitude;
          const longitude = res.longitude;

          // 打开地图
          uni.openLocation({
            latitude: latitude,
            longitude: longitude,
            scale: 18,
            success: () => {
              console.log("打开地图成功");
            },
            fail: (err) => {
              console.error("打开地图失败", err);
              uni.showToast({
                title: "打开地图失败",
                icon: "none",
              });
            },
          });
        },
        fail: (err) => {
          console.error("获取位置失败", err);
          uni.showToast({
            title: "获取位置失败",
            icon: "none",
          });
        },
      });
    },

    // 处理预约挂号
    handleAppointment() {
      // 打开链接
      uni.setClipboardData({
        data: "#小程序://预约挂号网/Fn6LYLkQFrelKQE",
        success: () => {
          uni.showToast({ title: "复制成功，请打开微信", icon: "none" });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.medical {
  padding: 20rpx;
  background-color: #d6e2bf;
  height: 100vmax;

  .service-title {
    margin-top: 40rpx;

    display: flex;

    text-align: center;

    .service-name {
      padding: 20rpx;
      border-radius: 20rpx 20rpx 0 0;
      font-size: 40rpx;
      color: #fff;
      position: relative;
    }

    .active {
      background-color: #a6cf6f;
      position: relative;
      overflow: hidden;
      z-index: 1;
    }

    .active::after {
      content: "";
      position: absolute;
      bottom: -20rpx;
      left: 0;
      right: 0;
      height: 20rpx;
      background-color: #a6cf6f;
      border-radius: 0 0 20rpx 20rpx;
    }
  }

  .service-card {
    .service-content {
      padding: 20rpx;
      background-color: #a6cf6f;
      border-radius: 0 20rpx 20rpx 20rpx;

      .user {
        display: flex;
        align-items: center;

        .user-avatar {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50rpx;
          overflow: hidden;
        }

        .user-desc {
          margin-left: 20rpx;
          flex: 1;

          .user-name {
            font-size: 50rpx;
            color: #333;
          }

          .user-phone {
            font-size: 30rpx;
            color: #606060;
          }
        }
      }

      .health-id {
        margin-top: 40rpx;
        background: #ffffff;
        border-radius: 10rpx;
        padding: 20rpx;
        display: flex;
        align-items: center;
        text-align: center;
        font-size: 30rpx;
      }

      .health-manager {
        display: flex;
        justify-content: center;
        margin-top: 40rpx;
        gap: 100rpx;
        .line {
          width: 4rpx;
          height: 200rpx;
          background-color: #fff;
        }

        .card {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          .icon {
            width: 150rpx;
            height: 150rpx;
            background-color: #ffffff;
            border-radius: 10rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
          }

          .card-name {
            margin-top: 20rpx;
            font-size: 40rpx;
            color: #333;
            text-align: center;
          }
        }
      }
    }
  }

  .health-service {
    margin-top: 40rpx;
    display: flex;
    align-items: start;
    gap: 20rpx;

    .left {
      flex: 1;

      .service-item {
        height: 260rpx;
        position: relative;

        .service-icon {
          position: absolute;
          top: 100%;
          left: 100%;
          transform: translate(-100%, -100%);
        }
      }
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 20rpx;

      .service-item {
        display: flex;
        height: 100rpx;
        position: relative;

        .service-icon {
          position: absolute;
          top: 95%;
          left: 95%;
          transform: translate(-95%, -95%);
        }
      }
    }

    .service-item {
      background-color: #fff;
      border-radius: 20rpx;
      padding: 20rpx;
      color: #606060;

      .title {
        font-size: 40rpx;
      }

      .desc {
        font-size: 30rpx;
      }
    }
  }

  .health-monitor {
    background-color: #f1e779;
    padding: 20rpx;
    border-radius: 0 0 20rpx 20rpx;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40rpx;

    .monitor-item {
      height: 260rpx;
      background-color: #fff;
      border-radius: 20rpx;
      padding: 20rpx;
      position: relative;

      .monitor-flex {
        display: flex;
        flex-direction: column;
        gap: 160rpx;

        .monitor-title {
          font-size: 40rpx;
          color: #333;
          font-size: 40rpx;
          color: #333;
        }

        .monitor-value {
          font-size: 30rpx;
          color: #333;
        }
      }

      .monitor-icon {
        overflow: hidden;
        margin-top: 20rpx;
        position: absolute;
        bottom: 40rpx;
        right: 40rpx;
      }
    }
  }
}
</style>
