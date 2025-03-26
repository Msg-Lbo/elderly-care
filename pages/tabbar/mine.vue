<template>
  <view class="content">
    <!-- <c-navBar title="个人中心" class="nav" :isPerch="true" :isTran="true" backgroundColor="#f7f7f7" :isMiddle="false" :isBack="false"></c-navBar> -->
    <!-- <image style="position: absolute;top: 0;left: 0;z-index: 1;width: 100%;" :src="imgBg" mode="widthFix"></image> -->
    <!-- <scroll-view scroll-y="true" style="width: 100%;"> -->
    <view class="myInfoBox">
      <view @click="getPerson" class="topC">
        <view class="topL">
          <image style="border-radius: 50%" src="/static/images/avatar.png" mode=""></image>
          <view class="topLtxt">
            <view class="txt-name">
              {{ userInfo.nickname }}
            </view>
            <view class="txt-phone">
              {{ userInfo.phone }}
            </view>
          </view>
        </view>
        <image style="width: 28rpx; height: 28rpx" src="@/static/common/go.png" mode=""></image>
      </view>
      <view class="myServices">
        <view class="contCg">
          <view v-for="(item, index) in navList" :key="index" @click="getIc(item)" class="contItem">
            <view class="contBxv">
              <!-- <image class="cont-icon" :src="item.icon" mode=""></image> -->
              <view class="texc">
                {{ item.title }}
              </view>
            </view>
            <image class="grCs" src="@/static/common/go.png" mode=""></image>
          </view>
        </view>
      </view>
    </view>
    <!-- </scroll-view> -->

    <!-- <m-tabbar ref="tabbar" fixed fill native current="3" ></m-tabbar> -->
  </view>
</template>

<script>
import navBar from "@/components/nav-bar/nav-bar.vue";
import mTabbar from "@/components/m-tabbar.vue";
import TabbarConfig from "@/utils/tabbar.js";
export default {
  components: {
    navBar,
    mTabbar,
  },
  data() {
    return {
      imgBg: "https://common-mfwl.obs.cn-southwest-2.myhuaweicloud.com/study/2024/07/16/2c90517745f24862aa6b77d7002f1d4e.png",
      tabbar: TabbarConfig,
      userInfo: {
        nickname: "测试名称",
        phone: "1588102545454",
        cumulativeIntegral: "",
        availableIntegral: "",
      },
      navList: [
        {
          // icon: require('@/static/home/ctb_icon.png'),
          title: "错题本",
          url: "/pages/person/wrongQuestionBook",
        },
        {
          // icon: require('@/static/home/gkjl_icon.png'),
          title: "视频观看记录",
          url: "/pages/navIndex/viewingRecord",
        },

        {
          // icon: require('@/static/home/fk_icon.png'),
          title: "意见反馈",
          url: "/pages/person/feedback",
        },
        {
          // icon: require('@/static/home/gy_icon.png'),
          title: "关于我们",
          url: "/pages/person/aboutUs",
        },
        {
          // icon: require('@/static/home/xy_icon.png'),
          title: "使用协议",
          url: "/pages/person/agreementC",
        },
      ],
    };
  },
  onShow() {
    // this.getUserInfo()
  },
  onLoad() {
    // uni.hideTabBar()
  },
  methods: {
    getAnswerInfo() {
      this.$api.getWronglist().then((res) => {
        if (res.data.total == 0) {
          uni.showToast({
            title: "暂无错题",
            icon: "none",
          });
        } else {
          uni.navigateTo({
            url: "/pages/person/wrongQuestionBook",
          });
        }
      });
    },
    getIc(v) {
      if (v.title == "错题本") {
        this.getAnswerInfo();
      } else {
        uni.navigateTo({
          url: v.url,
        });
      }

      console.log(v);
    },
    gotoAgree() {
      uni.navigateTo({
        url: "/pages/person/instructions/instructions",
      });
    },
    getUserInfo() {
      this.$api.userInfo().then((res) => {
        this.userInfo = res.data;
        console.log("this.userInfo", this.userInfo);
      });
    },
    getPerson() {
      uni.navigateTo({
        url: "/pages/person/user-info/user-info",
      });
    },
    gotoDetail() {
      uni.navigateTo({
        url: "/pages/person/myIntegral/myIntegral",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.myServices {
  width: 100%;
  height: 600rpx;
  border-radius: 20rpx;
  background-color: #fff;
  padding: 0 24rpx;

  .servTitle {
    padding-top: 28rpx;
    box-sizing: border-box;
    font-weight: bold;
    font-size: 32rpx;
    color: #11141a;
  }

  .contCg {
    padding-top: 8rpx;
    box-sizing: border-box;

    .contItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 102rpx;

      .contBxv {
        height: 100%;
        display: flex;
        align-items: center;

        .cont-icon {
          width: 28rpx;
          height: 28rpx;
        }

        .texc {
          margin-left: 16rpx;
          font-weight: 500;
          font-size: 28rpx;
          color: #373e51;
        }
      }

      .grCs {
        height: 24rpx;
        width: 24rpx;
      }
    }

    .contItem:not(:last-child) {
      border-bottom: 1rpx solid #dfe0e5;
    }
  }
}

.jfBox {
  margin-top: 62rpx;
  width: 100%;
  height: 252rpx;
  background: linear-gradient(180deg, #5999e5 0%, #00469b 100%);
  border-radius: 20rpx 20rpx 20rpx 20rpx;

  .jfB-top {
    width: 100%;
    display: flex;
    height: 152rpx;
    padding-top: 36rpx;
    box-sizing: border-box;
    position: relative;

    .bol-icon {
      width: 1rpx;
      height: 32rpx;
      background: #fff;
      position: absolute;
      left: 50%;
      top: 60rpx;
      margin-left: -0.5rpx;
    }

    .jfB-topL {
      width: 50%;
      display: flex;
      flex-direction: column;
      height: 128rpx;
      text-align: center;
      width: 50%;

      .jf-txt1 {
        font-weight: bold;
        font-size: 56rpx;
        color: #ffffff;
      }

      .jf-txt2 {
        font-weight: 500;
        font-size: 24rpx;
        color: #ffffff;
      }
    }
  }

  .jfB-bot {
    width: 100%;
    height: 80rpx;
    padding: 0 20rpx;
    margin-top: 10rpx;
    box-sizing: border-box;

    .jfb-botBox {
      background: #d9eaff;
      width: 100%;
      height: 100%;
      display: flex;
      border-radius: 10rpx 10rpx 10rpx 10rpx;
      position: relative;

      .bot-icon {
        width: 1rpx;
        height: 32rpx;
        background: #00469b;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -16rpx;
        margin-left: -0.5rpx;
      }

      .bot-L {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        image {
          width: 28rpx;
          height: 28rpx;
        }

        .bot-ltxt {
          margin-left: 8rpx;
          font-weight: 500;
          font-size: 28rpx;
          color: #00469b;
        }
      }
    }
  }
}

.content {
}

.myInfoBox {
  position: relative;
  width: 100%;
  z-index: 1;
  min-height: 100%;

  .topC {
    // background-color: #f7f7f7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 2;
    padding: 20rpx 32rpx;
    width: 100%;
    position: relative;

    .topL {
      display: flex;
      align-items: center;

      image {
        width: 144rpx;
        height: 144rpx;
      }

      .topLtxt {
        margin-left: 32rpx;
        height: 144rpx;
        padding: 8rpx 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .txt-name {
          font-size: 40rpx;
          font-weight: bold;
          // color: #fff;
        }

        .txt-phone {
          font-size: 28rpx;
          // color: #fff;
        }
      }
    }

    .topR {
      width: 136rpx;
      height: 48rpx;
      border-radius: 24rpx;
      border: 1rpx solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 24rpx;
    }
  }
}
</style>
