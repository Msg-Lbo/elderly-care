<template>
  <view class="agenda-detail">
    <view class="detail-card">
      <view class="detail-item">
        <view class="detail-label">日程标题</view>
        <view class="detail-value">{{ detail.title }}</view>
      </view>
      <u-line color="#f5f5f5"></u-line>

      <view class="detail-item">
        <view class="detail-label">提醒时间</view>
        <view class="detail-value">{{ $u.timeFormat(detail.reminder_time, 'yyyy年mm月dd日 hh:MM') }}</view>
      </view>
      <u-line color="#f5f5f5"></u-line>

      <view class="detail-item">
        <view class="detail-label">备注</view>
        <view class="detail-value">{{ detail.content || '暂无备注' }}</view>
      </view>
    </view>

    <view class="action-bar">
      <u-button type="primary" @click="handleEdit" :custom-style="{
        height: '100rpx',
        fontSize: '36rpx',
        fontWeight: 500,
        background: 'linear-gradient(90deg, #208a5b 0%, #00693a 100%)'
      }">编辑</u-button>
    </view>

    <!-- 编辑弹窗 -->
    <u-popup v-model="showEdit" mode="center" width="90%" border-radius="24">
      <view class="edit-popup">
        <view class="popup-title">编辑日程</view>
        <view class="form-item">
          <view class="form-label">日程标题</view>
          <view class="form-input">
            <input type="text" v-model="editForm.title" placeholder="请输入日程标题" />
          </view>
        </view>
        <u-line color="#f5f5f5"></u-line>

        <view class="form-item">
          <view class="form-label">提醒日期</view>
          <view class="form-input">
            <picker mode="date" :value="editForm.date" :start="minDate" @change="onDateChange">
              <view class="picker-value">{{ editForm.date || '请选择日期' }}</view>
            </picker>
          </view>
        </view>
        <u-line color="#f5f5f5"></u-line>

        <view class="form-item">
          <view class="form-label">提醒时间</view>
          <view class="form-input">
            <picker mode="time" :value="editForm.time" @change="onTimeChange">
              <view class="picker-value">{{ editForm.time || '请选择时间' }}</view>
            </picker>
          </view>
        </view>
        <u-line color="#f5f5f5"></u-line>

        <view class="form-item">
          <view class="form-label">备注</view>
          <view class="form-input">
            <textarea v-model="editForm.content" placeholder="请输入备注信息（选填）" />
          </view>
        </view>

        <view class="popup-btns">
          <u-button type="default" @click="showEdit = false" :custom-style="{
            height: '88rpx',
            fontSize: '32rpx',
            marginRight: '24rpx'
          }">取消</u-button>
          <u-button type="primary" @click="handleSubmit" :custom-style="{
            height: '88rpx',
            fontSize: '32rpx',
            background: 'linear-gradient(90deg, #208a5b 0%, #00693a 100%)'
          }">确定</u-button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      detail: {},
      showEdit: false,
      editForm: {
        title: '',
        date: '',
        time: '',
        content: ''
      },
      minDate: this.getCurrentDate()
    }
  },
  onLoad(options) {
    if (options.id) {
      this.id = options.id
      this.getDetail()
    }
  },
  methods: {
    getCurrentDate() {
      const date = new Date()
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    getDetail() {
      this.$api.getHealthSchedulesDetail(this.id).then(res => {
        if (res.code === 200) {
          this.detail = res.data
          // 初始化编辑表单
          this.editForm = {
            title: res.data.title,
            date: this.$u.timeFormat(res.data.reminder_time, 'yyyy-mm-dd'),
            time: this.$u.timeFormat(res.data.reminder_time, 'hh:MM'),
            content: res.data.content
          }
        } else {
          uni.showToast({
            title: res.message || '获取日程详情失败',
            icon: 'none'
          })
        }
      }).catch(err => {
        uni.showToast({
          title: '获取日程详情失败，请重试',
          icon: 'none'
        })
      })
    },
    handleEdit() {
      this.showEdit = true
    },
    onDateChange(e) {
      this.editForm.date = e.detail.value
      if (this.editForm.date === this.getCurrentDate() && this.editForm.time) {
        this.validateTime()
      }
    },
    onTimeChange(e) {
      this.editForm.time = e.detail.value
      if (this.editForm.date) {
        this.validateTime()
      }
    },
    validateTime() {
      if (!this.editForm.date || !this.editForm.time) return true
      
      const now = new Date()
      const selectedDate = new Date(`${this.editForm.date} ${this.editForm.time}`)
      
      if (selectedDate <= now) {
        uni.showToast({
          title: '提醒时间必须晚于当前时间',
          icon: 'none'
        })
        this.editForm.time = ''
        return false
      }
      return true
    },
    handleSubmit() {
      if (!this.editForm.title) {
        uni.showToast({
          title: '请输入日程标题',
          icon: 'none'
        })
        return
      }
      if (!this.editForm.date) {
        uni.showToast({
          title: '请选择日期',
          icon: 'none'
        })
        return
      }
      if (!this.editForm.time) {
        uni.showToast({
          title: '请选择时间',
          icon: 'none'
        })
        return
      }
      
      // 验证时间是否在当前时间之后
      if (!this.validateTime()) {
        return
      }

      // 组装提交数据
      const submitData = {
        title: this.editForm.title,
        reminder_time: `${this.editForm.date} ${this.editForm.time}:00`,
        content: this.editForm.content || ''
      }

      this.$api.updateHealthSchedules({
        id: this.id,
        ...submitData
      }).then(res => {
        if (res.code === 200) {
          uni.showToast({
            title: '更新成功',
            icon: 'success'
          })
          this.showEdit = false
          this.getDetail()
        } else {
          uni.showToast({
            title: res.message || '更新失败',
            icon: 'none'
          })
        }
      }).catch(err => {
        uni.showToast({
          title: '更新失败，请重试',
          icon: 'none'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.agenda-detail {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 30rpx;
  padding-bottom: 160rpx;

  .detail-card {
    background: #fff;
    border-radius: 24rpx;
    padding: 0 40rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);

    .detail-item {
      display: flex;
      align-items: flex-start;
      padding: 40rpx 0;
      position: relative;

      .detail-label {
        width: 200rpx;
        font-size: 32rpx;
        color: #333;
        font-weight: 500;
      }

      .detail-value {
        flex: 1;
        font-size: 32rpx;
        color: #666;
        line-height: 1.5;
      }
    }
  }

  .action-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20rpx 32rpx;
    background: #fff;
    box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.08);
  }

  .edit-popup {
    padding: 40rpx;
    
    .popup-title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      text-align: center;
      margin-bottom: 40rpx;
    }

    .form-item {
      padding: 30rpx 0;
      
      .form-label {
        font-size: 32rpx;
        color: #333;
        margin-bottom: 20rpx;
      }
      
      .form-input {
        input, textarea {
          width: 100%;
          font-size: 32rpx;
          color: #333;
        }
        
        .picker-value {
          font-size: 32rpx;
          color: #333;
        }
      }
    }

    .popup-btns {
      display: flex;
      justify-content: center;
      margin-top: 40rpx;
    }
  }
}
</style> 