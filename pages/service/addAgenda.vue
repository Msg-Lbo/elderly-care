<template>
  <view class="add-agenda">
    <view class="form-card">
      <view class="form-item">
        <view class="form-label">日程标题</view>
        <view class="form-input">
          <input type="text" v-model="form.title" placeholder="请输入日程标题" />
        </view>
      </view>
      <u-line color="#f5f5f5"></u-line>

      <view class="form-item">
        <view class="form-label">提醒日期</view>
        <view class="form-input">
          <picker mode="date" :value="form.date" :start="minDate" @change="onDateChange">
            <view class="picker-value">{{ form.date || '请选择日期' }}</view>
          </picker>
        </view>
      </view>
      <u-line color="#f5f5f5"></u-line>

      <view class="form-item">
        <view class="form-label">提醒时间</view>
        <view class="form-input">
          <picker mode="time" :value="form.time" @change="onTimeChange">
            <view class="picker-value">{{ form.time || '请选择时间' }}</view>
          </picker>
        </view>
      </view>
      <u-line color="#f5f5f5"></u-line>

      <view class="form-item">
        <view class="form-label">备注</view>
        <view class="form-input">
          <textarea v-model="form.content" placeholder="请输入备注信息（选填）" />
        </view>
      </view>
    </view>

    <view class="action-bar">
      <u-button type="primary" @click="handleSubmit" :custom-style="{
        height: '100rpx',
        fontSize: '36rpx',
        fontWeight: 500,
        background: 'linear-gradient(90deg, #208a5b 0%, #00693a 100%)'
      }">{{ isEdit ? '保存' : '确定' }}</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      isEdit: false,
      form: {
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
      this.isEdit = true
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
          this.form = {
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
    onDateChange(e) {
      this.form.date = e.detail.value
      if (this.form.date === this.getCurrentDate() && this.form.time) {
        this.validateTime()
      }
    },
    onTimeChange(e) {
      this.form.time = e.detail.value
      if (this.form.date) {
        this.validateTime()
      }
    },
    validateTime() {
      if (!this.form.date || !this.form.time) return true
      
      const now = new Date()
      const selectedDate = new Date(`${this.form.date} ${this.form.time}`)
      
      if (selectedDate <= now) {
        uni.showToast({
          title: '提醒时间必须晚于当前时间',
          icon: 'none'
        })
        this.form.time = ''
        return false
      }
      return true
    },
    handleSubmit() {
      if (!this.form.title) {
        uni.showToast({
          title: '请输入日程标题',
          icon: 'none'
        })
        return
      }
      if (!this.form.date) {
        uni.showToast({
          title: '请选择日期',
          icon: 'none'
        })
        return
      }
      if (!this.form.time) {
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
        title: this.form.title,
        reminder_time: `${this.form.date} ${this.form.time}:00`,
        content: this.form.content || ''
      }

      if (this.isEdit) {
        // 编辑模式
        this.$api.updateHealthSchedules({
          id: this.id,
          ...submitData
        }).then(res => {
          if (res.code === 200) {
            uni.showToast({
              title: '更新成功',
              icon: 'success'
            })
            setTimeout(() => {
              uni.navigateBack()
            }, 1500)
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
      } else {
        // 新增模式
        this.$api.createHealthSchedules(submitData).then(res => {
          if (res.code === 200) {
            uni.showToast({
              title: '添加成功',
              icon: 'success'
            })
            setTimeout(() => {
              uni.navigateBack()
            }, 1500)
          } else {
            uni.showToast({
              title: res.message || '添加失败',
              icon: 'none'
            })
          }
        }).catch(err => {
          uni.showToast({
            title: '添加失败，请重试',
            icon: 'none'
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.add-agenda {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 30rpx;
  padding-bottom: 160rpx;

  .form-card {
    background: #fff;
    border-radius: 24rpx;
    padding: 0 40rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);

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
}
</style>
