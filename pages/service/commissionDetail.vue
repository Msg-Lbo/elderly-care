<template>
  <view class="commission-detail">
    <view class="detail-card">
      <view class="status-bar" :class="statusClass">
        <text>{{ statusText }}</text>
      </view>
      
      <view class="info-section">
        <view class="info-item">
          <text class="label">委托编号</text>
          <text class="value">{{ detail.id }}</text>
        </view>
        <view class="info-item">
          <text class="label">委托类型</text>
          <text class="value">{{ serviceTypeText }}</text>
        </view>
        <view class="info-item">
          <text class="label">被服务人</text>
          <text class="value">{{ detail.client && detail.client.nickname }}</text>
        </view>
        <view class="info-item">
          <text class="label">执行护工</text>
          <text class="value">{{ detail.caregiver && detail.caregiver.nickname || '待分配' }}</text>
        </view>
        <view class="info-item">
          <text class="label">服务时间</text>
          <text class="value">{{ $u.timeFormat(detail.service_time, 'yyyy年mm月dd日 hh:MM') }}</text>
        </view>
        <view class="info-item">
          <text class="label">服务地址</text>
          <text class="value">{{ detail.address }}</text>
        </view>
        <view class="info-item column">
          <text class="label">委托备注</text>
          <text class="value">{{ detail.content }}</text>
        </view>
      </view>
    </view>

    <view class="action-bar" v-if="detail.status === 'PENDING' || detail.status === 'IN_PROGRESS'">
      <u-button 
        v-if="detail.status === 'PENDING'"
        type="success" 
        @click="handleComplete"
        :custom-style="{ marginRight: '20rpx' }"
      >完成委托</u-button>
      <u-button 
        type="error" 
        @click="handleCancel"
      >取消委托</u-button>
    </view>

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
      detail: {},
      showConfirm: false,
      confirmTitle: '',
      confirmContent: '',
      confirmText: '',
      confirmColor: '',
      currentAction: '',
    }
  },
  computed: {
    statusText() {
      const statusMap = {
        'PENDING': '待处理',
        'IN_PROGRESS': '进行中',
        'COMPLETED': '已完成',
        'CANCELLED': '已取消'
      }
      return statusMap[this.detail.status] || '未知状态'
    },
    statusClass() {
      const statusMap = {
        'PENDING': 'pending',
        'IN_PROGRESS': 'in-progress',
        'COMPLETED': 'completed',
        'CANCELLED': 'cancelled'
      }
      return statusMap[this.detail.status] || ''
    },
    serviceTypeText() {
      const typeMap = {
        'FOOD': '喂药',
        'MEDICINE': '看护',
        'DIET': '做饭',
        'CLEANING': '打扫',
        'OTHER': '其他'
      }
      return typeMap[this.detail.service_type] || '未知类型'
    }
  },
  onLoad(options) {
    if (options.id) {
      this.getDetail(options.id)
    }
  },
  methods: {
    getDetail(id) {
      this.$api.getServiceDetail(id).then(res => {
        if (res.code === 200) {
          this.detail = res.data
        }
      })
    },
    handleComplete() {
      this.showConfirm = true
      this.confirmTitle = '完成委托'
      this.confirmContent = '确定要完成此委托吗？'
      this.confirmText = '确定完成'
      this.confirmColor = '#00693A'
      this.currentAction = 'complete'
    },
    handleCancel() {
      this.showConfirm = true
      this.confirmTitle = '取消委托'
      this.confirmContent = '确定要取消此委托吗？'
      this.confirmText = '确定取消'
      this.confirmColor = '#fa3534'
      this.currentAction = 'cancel'
    },
    handleConfirmAction() {
      this.showConfirm = false
      const status = this.currentAction === 'complete' ? 'COMPLETED' : 'CANCELLED'
      
      this.$api.updateServiceDetail({
        id: this.detail.id,
        status: status
      }).then(res => {
        if (res.code === 200) {
          this.$fn.toast('操作成功')
          setTimeout(() => {
            uni.navigateBack()
          }, 1500)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.commission-detail {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 30rpx;
  padding-bottom: 120rpx;

  .detail-card {
    background: #fff;
    border-radius: 24rpx;
    overflow: hidden;
    
    .status-bar {
      padding: 30rpx;
      text-align: center;
      font-size: 32rpx;
      font-weight: 500;
      
      &.pending {
        background: #e6f7ff;
        color: #00693A;
      }
      
      &.in-progress {
        background: #fff7e6;
        color: #fa8c16;
      }
      
      &.completed {
        background: #f6ffed;
        color: #52c41a;
      }
      
      &.cancelled {
        background: #fff1f0;
        color: #f5222d;
      }
    }
    
    .info-section {
      padding: 30rpx;
      
      .info-item {
        display: flex;
        margin-bottom: 24rpx;
        
        &.column {
          flex-direction: column;
          
          .value {
            margin-top: 16rpx;
          }
        }
        
        .label {
          width: 160rpx;
          color: #666;
          font-size: 28rpx;
        }
        
        .value {
          flex: 1;
          color: #333;
          font-size: 28rpx;
        }
      }
    }
  }
  
  .action-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20rpx 30rpx;
    background: #fff;
    box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.08);
    display: flex;
    justify-content: flex-end;
  }
}
</style> 