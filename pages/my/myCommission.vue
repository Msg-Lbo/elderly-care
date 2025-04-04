<template>
  <view class="my-commission">
    <section class="tabs">
      <c-tabs :tab="tab" :dataList="tabList" @change="changeTab"></c-tabs>
    </section>
    <section class="content">
      <u-list height="90vh">
        <view v-for="(item, index) in commissionList" :key="index" class="item">
          <view class="title">
            <text>委托编号：{{ item.id }}</text>
            <text style="color: #00693a">{{ item.status }}</text>
          </view>
          <u-line></u-line>
          <view class="item-content">
<<<<<<< HEAD
            <view class="name"> 指定超市买药 </view>
=======
            <view class="name">{{ item.title }}</view>
>>>>>>> 5a8d6cd50aa11f0a40fd3ab9c784604ea6accf19
            <view class="info-item">
              <view class="label">员工姓名：</view>
              <view class="value">张三三</view>
            </view>
            <view class="info-item">
              <view class="label">委托类型：</view>
              <view class="value">{{ item.type }}</view>
            </view>
            <view class="info-item">
              <view class="label">委托备注：</view>
              <view class="value">{{ item.remark }}</view>
            </view>
          </view>
          <u-line></u-line>
          <view class="actions">
            <u-button color="#00693A" plain size="small">详情</u-button>
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
      tab: {
        value: "全部",
        key: "",
      },
      tabList: [
        {
          value: "全部",
          key: "",
        },
        {
          value: "待分配",
          key: 1,
        },
        {
          value: "已分配",
          key: 2,
        },
        {
          value: "已完成",
          key: 3,
        },
        {
          value: "已取消",
          key: 4,
        },
      ],
      commissionList: [
        {
          id: 1,
          title: "福安市湾坞中学新校区建设项目一期工程",
          status: "已完成",
          type: "买药",
          remark: "123123123123123",
        },
      ],
    };
  },
  methods: {
    changeTab(tab) {
      this.tab = tab;
      this.getData();
    },
    getData() {
      console.log(this.tab);
    },
    toPath(path) {
      uni.navigateTo({
        url: path,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.my-commission {
  background-color: #f7f7f7;
  .content {
    padding: 24rpx;
    .item {
      margin-top: 20rpx;
      background-color: #fff;
      border-radius: 12rpx;
      &:first-child {
        margin-top: 0;
      }
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20rpx 24rpx;
        color: #4d4d4d;
        font-size: 32rpx;
      }
      .item-content {
        padding: 20rpx 24rpx;
        .name {
          font-size: 28rpx;
          color: #262626;
          margin-bottom: 12rpx;
        }
        .info-item {
          margin-top: 12rpx;
          display: flex;
          align-items: center;
          color: #666666;
          font-size: 28rpx;
          .label {
            white-space: nowrap;
          }
          .value {
            flex: 1;
            white-space: nowrap;
          }
        }
      }
      .actions {
        padding: 20rpx 24rpx;
        display: flex;
        justify-content: flex-end;
        ::v-deep .u-button {
          margin: 0;
          width: auto;
        }
      }
    }
  }
}
</style>
