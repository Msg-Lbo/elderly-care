<template>
  <view id="wrap">
    <u-parse :content="content"></u-parse>
  </view>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      id: "",
    };
  },
  onLoad(options) {
    this.id = Number(options.id);
    uni.setNavigationBarTitle({
      title: "档案详情",
    });
    this.getInfo();
  },
  methods: {
    async getInfo() {
      try {
        const res = await this.$api.getArchivesDetail(this.id);
        if (res.code === 200) {
          this.content = res.data.content;
          this.id = res.data.id;
          uni.setNavigationBarTitle({
            title: res.data.title,
          });
        } else {
          uni.showToast({
            title: res.message,
            icon: "none",
            duration: 2000,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#wrap {
  padding: 30rpx;
}
</style>
