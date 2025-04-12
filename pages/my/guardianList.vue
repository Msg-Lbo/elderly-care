<template>
    <view class="guardian-list">
        <!-- 列表 -->
        <view class="list">
            <view class="item" v-for="guardian in guardianList" :key="guardian.id">
                <view class="item-content">
                    <view class="left">
                        <u-image :src="vuex_imgUrl + guardian.avatar" width="160rpx" height="160rpx" mode="widthFix"></u-image>
                    </view>
                    <view class="right">
                        <view class="name">{{ guardian.nickname }}</view>
                        <view class="phone">{{ guardian.phone }}</view>
                        <view class="relation">{{ getRelationText(guardian.relation) }}</view>
                    </view>
                </view>
                <view class="delete-btn" @click="handleDelete(guardian)">
                    <u-icon name="trash" color="#ff4444" size="32"></u-icon>
                </view>
            </view>

            <!-- 空状态 -->
            <u-empty v-if="guardianList.length === 0" text="暂无监护人" mode="list"></u-empty>
        </view>

        <!-- 添加按钮 -->
        <view class="add-btn" @click="handleAdd">
            <u-icon name="plus" color="#ffffff" size="32"></u-icon>
            <text>添加监护人</text>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            guardianList: []
        };
    },
    onShow() {
        this.getGuardianList();
    },
    methods: {
        // 获取监护人列表
        getGuardianList() {
            this.$api.getGuardians()
                .then(res => {
                    if (res.code === 200) {
                        this.guardianList = res.data;
                    } else {
                        uni.showToast({
                            title: res.message || '获取失败',
                            icon: 'none'
                        });
                    }
                })
                .catch(err => {
                    uni.showToast({
                        title: '获取失败，请重试',
                        icon: 'none'
                    });
                });
        },
        // 删除监护人
        handleDelete(guardian) {
            uni.showModal({
                title: '提示',
                content: '确定要删除该监护人吗？',
                success: (res) => {
                    if (res.confirm) {
                        this.$api.deleteGuardian({ id: guardian.id })
                            .then(res => {
                                if (res.code === 200) {
                                    uni.showToast({
                                        title: '删除成功',
                                        icon: 'success'
                                    });
                                    this.getGuardianList();
                                } else {
                                    uni.showToast({
                                        title: res.message || '删除失败',
                                        icon: 'none'
                                    });
                                }
                            })
                            .catch(err => {
                                uni.showToast({
                                    title: '删除失败，请重试',
                                    icon: 'none'
                                });
                            });
                    }
                }
            });
        },
        // 添加监护人
        handleAdd() {
            uni.navigateTo({
                url: '/pages/my/addGuardian'
            });
        },
        // 获取关系文本
        getRelationText(relation) {
            const relationMap = {
                'child': '子女',
                'spouse': '配偶',
                'relative': '亲属',
                'friend': '朋友',
                'other': '其他'
            };
            return relationMap[relation] || '未知';
        }
    }
};
</script>

<style lang="scss" scoped>
.guardian-list {
    background-color: #f7f7f7;
    min-height: 100vh;
    padding: 24rpx;

    .list {
        .item {
            background-color: #fff;
            border-radius: 12rpx;
            padding: 24rpx;
            margin-bottom: 20rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .item-content {
                display: flex;
                align-items: center;
                gap: 24rpx;

                .left {
                    width: 160rpx;
                    height: 160rpx;
                    border-radius: 50%;
                    overflow: hidden;
                    background-color: #f7f7f7;
                }

                .right {
                    display: flex;
                    flex-direction: column;
                    gap: 8rpx;

                    .name {
                        font-size: 32rpx;
                        font-weight: bold;
                    }

                    .phone {
                        font-size: 28rpx;
                        color: #666;
                    }

                    .relation {
                        font-size: 24rpx;
                        color: #999;
                    }
                }
            }

            .delete-btn {
                padding: 20rpx;
            }
        }
    }

    .add-btn {
        position: fixed;
        bottom: 40rpx;
        left: 50%;
        transform: translateX(-50%);
        background-color: #54A4FF;
        color: #fff;
        padding: 20rpx 40rpx;
        border-radius: 40rpx;
        display: flex;
        align-items: center;
        gap: 8rpx;
        box-shadow: 0 4rpx 12rpx rgba(84, 164, 255, 0.3);

        text {
            font-size: 28rpx;
        }
    }
}
</style> 