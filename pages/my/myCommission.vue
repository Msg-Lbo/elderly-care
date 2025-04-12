<template>
  <view class="my-commission">
    <section class="tabs">
      <c-tabs :tab="tab" :dataList="tabList" @change="changeTab"></c-tabs>
    </section>
    <section class="content">
      <u-list height="90vh" v-if="commissionList.length > 0">
        <view v-for="(item, index) in commissionList" :key="index" class="item">
          <view class="title">
            <text>委托编号：{{ item.id }}</text>
            <text style="color: #00693a" v-if="item.status === 'PENDING'">待处理</text>
            <text style="color: #00693a" v-else-if="item.status === 'IN_PROGRESS'">进行中</text>
            <text style="color: #00693a" v-else-if="item.status === 'COMPLETED'">已完成</text>
            <text style="color: #00693a" v-else-if="item.status === 'CANCELLED'">已取消</text>
          </view>
          <u-line></u-line>
          <view class="item-content">
            <view class="name">{{ item.title }}</view>
            <view class="info-item">
              <view class="label">被服务人：</view>
              <view class="value">{{ item.client.nickname }}</view>
            </view>
            <view class="info-item">
              <view class="label">执行护工：</view>
              <view class="value">{{ item.caregiver.nickname }}</view>
            </view>
            <view class="info-item">
              <view class="label">委托类型：</view>
              <view class="value" v-if="item.service_type === 'CARE'">日常照护</view>
              <view class="value" v-else-if="item.service_type === 'MEDICAL'">医疗护理</view>
              <view class="value" v-else-if="item.service_type === 'REHAB'">康复训练</view>
              <view class="value" v-else-if="item.service_type === 'MENTAL'">心理疏导</view>
              <view class="value" v-else>其他</view>
            </view>
            <view class="info-item">
              <view class="label">委托备注：</view>
              <view class="value">{{ item.notes }}</view>
            </view>
          </view>
          <u-line></u-line>
          <view class="actions">
            <u-button color="#00693A" plain size="small" @click="handleDetail(item)">详情</u-button>
            <u-button type="success" plain size="small" @click="handleComplete(item)" v-if="item.status === 'PENDING'">完成</u-button>
            <u-button
              type="error"
              plain
              size="small"
              @click="handleCancel(item)"
              v-if="item.status === 'PENDING' || item.status === 'IN_PROGRESS'"
              >取消</u-button
            >
          </view>
        </view>
      </u-list>
      <view class="no-data" v-else>
        <text>暂无委托信息</text>
      </view>
    </section>

    <c-confirm
      :show="showConfirm"
      :title="confirmTitle"
      :content="confirmContent"
      :confirm-text="confirmText"
      :confirm-color="confirmColor"
      @close="showConfirm = false"
      @cancel="showConfirm = false"
      @confirm="handleConfirmAction"
    />
  </view>
</template>
<script>
export default {
  data() {
    return {
      tab: {
        value: "待处理",
        key: "PENDING",
      },
      tabList: [
        {
          value: "待处理",
          key: "PENDING",
        },
        {
          value: "进行中",
          key: "IN_PROGRESS",
        },
        {
          value: "已完成",
          key: "COMPLETED",
        },
        {
          value: "已取消",
          key: "CANCELLED",
        },
      ],
      commissionList: [],
      showConfirm: false,
      confirmTitle: "",
      confirmContent: "",
      confirmText: "",
      confirmColor: "",
      currentAction: "",
      currentItem: null,
    };
  },
  onShow() {
    this.getCommissionList(this.tab.key);
  },
  methods: {
    changeTab(tab) {
      this.tab = tab;
      this.getCommissionList(this.tab.key);
    },
    handleDetail(item) {
      uni.navigateTo({
        url: `/pages/service/commissionDetail?id=${item.id}`,
      });
    },
    handleComplete(item) {
      this.currentItem = item;
      this.showConfirm = true;
      this.confirmTitle = "完成委托";
      this.confirmContent = "确定要完成此委托吗？";
      this.confirmText = "确定完成";
      this.confirmColor = "#00693A";
      this.currentAction = "complete";
    },
    handleCancel(item) {
      this.currentItem = item;
      this.showConfirm = true;
      this.confirmTitle = "取消委托";
      this.confirmContent = "确定要取消此委托吗？";
      this.confirmText = "确定取消";
      this.confirmColor = "#fa3534";
      this.currentAction = "cancel";
    },
    handleConfirmAction() {
      this.showConfirm = false;
      const status = this.currentAction === "complete" ? "COMPLETED" : "CANCELLED";

      this.$api
        .updateServiceDetail({
          id: this.currentItem.id,
          client: this.currentItem.client.id,
          caregiver: this.currentItem.caregiver.id,
          service_type: this.currentItem.service_type,
          service_time: this.currentItem.service_time,
          address: this.currentItem.address,
          notes: this.currentItem.notes,
          status: status,
        })
        .then((res) => {
          if (res.code === 200) {
            this.$fn.toast("操作成功");
            this.getCommissionList(this.tab.key);
          }
        });
    },
    getData() {
      console.log(this.tab);
    },
    toPath(path) {
      uni.navigateTo({
        url: path,
      });
    },
    getCommissionList(key) {
      console.log(key);

      this.$api.getServiceList(key).then((res) => {
        if (res.code === 200) {
          this.commissionList = res.data;
        }
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
        gap: 16rpx;
        ::v-deep .u-button {
          margin: 0;
          width: auto;
        }
      }
    }
    .no-data {
      padding: 20rpx 24rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
