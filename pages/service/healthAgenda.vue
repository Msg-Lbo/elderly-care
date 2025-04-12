<template>
  <view class="health-agenda">
    <section class="content">
      <u-list>
        <view class="list">
          <view class="item" v-for="item in list" :key="item.id" @click="handleDetail(item)">
            <view class="left">
              <view class="title">{{ item.title }}</view>
              <view class="time">提醒时间：{{ $u.timeFormat(item.reminder_time, 'yyyy年mm月dd日 hh:MM') }}</view>
            </view>
            <view class="right">
              <u-icon name="arrow-right"></u-icon>
            </view>
          </view>
        </view>
      </u-list>
      
      <!-- 空状态 -->
      <view class="empty" v-if="list.length === 0">
        <image src="/static/common/noContent.png" mode="aspectFit"></image>
        <text>暂无日程安排</text>
      </view>
    </section>
    
    <section class="btns" @click="$fn.jumpPage('/pages/service/addAgenda')">
      <view class="btn">新增日程</view>
    </section>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false
    };
  },
  onShow() {
    this.getList()
  },
  methods: {
    // 获取日程列表
    getList() {
      this.loading = true
      this.$api.getHealthSchedules().then(res => {
        if (res.code === 200) {
          this.list = res.data || []
        } else {
          uni.showToast({
            title: res.message || '获取日程列表失败',
            icon: 'none'
          })
        }
      }).catch(err => {
        uni.showToast({
          title: '获取日程列表失败',
          icon: 'none'
        })
      }).finally(() => {
        this.loading = false
      })
    },
    // 查看日程详情
    handleDetail(item) {
      this.$fn.jumpPage(`/pages/service/agendaDetail?id=${item.id}`)
    }
  }
};
</script>

<style lang="scss" scoped>
.health-agenda {
  min-height: 100vh;
  background-color: #f7f7f7;
  
  .content {
    padding: 24rpx;
    padding-bottom: 160rpx;
    
    .list {
      display: flex;
      flex-direction: column;
      gap: 24rpx;
      
      .item {
        padding: 32rpx;
        background-color: #fff;
        border-radius: 16rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
        
        .title {
          font-size: 42rpx;
          font-weight: bold;
          color: #333;
        }
        
        .time {
          font-size: 38rpx;
          color: #999;
          margin-top: 16rpx;
        }
      }
    }
    
    .empty {
      padding-top: 200rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #999;
      font-size: 32rpx;
      
      image {
        width: 300rpx;
        height: 140rpx;
        margin-bottom: 30rpx;
      }
    }
  }
  
  .btns {
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20rpx 32rpx;
    display: flex;
    justify-content: center;
    box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.08);

    .btn {
      width: 686rpx;
      height: 96rpx;
      background: linear-gradient(90deg, #208a5b 0%, #00693a 100%);
      border-radius: 48rpx;
      text-align: center;
      line-height: 96rpx;
      font-weight: bold;
      font-size: 36rpx;
      color: #ffffff;
    }
  }
}
</style>
