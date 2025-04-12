<template>
    <view class="add-guardian">
        <!-- 搜索栏 -->
        <section class="search-bar">
            <u-search 
                v-model="searchKey" 
                shape="square" 
                inputAlign="center" 
                placeholder="输入手机号搜索用户" 
                height="40" 
                :showAction="false"
                @search="handleSearch"
                @clear="handleClear"
            ></u-search>
        </section>

        <!-- 搜索结果列表 -->
        <section class="list">
            <view class="item" v-for="user in userList" :key="user.id" @click="handleSelect(user)">
                <view class="item-content">
                    <view class="left">
                        <u-image :src="vuex_imgUrl + user.avatar" width="160rpx" height="160rpx" mode="widthFix"></u-image>
                    </view>
                    <view class="right">
                        <view class="desc-label">{{ user.nickname }}</view>
                        <view class="desc-value">{{ user.phone }}</view>
                    </view>
                </view>
                <u-icon name="arrow-right" color="#999999" size="24"></u-icon>
            </view>

            <!-- 空状态 -->
            <u-empty v-if="userList.length === 0" text="暂无搜索结果" mode="list"></u-empty>
        </section>

        <!-- 添加监护人弹窗 -->
        <u-popup :show="showAddPopup" mode="center" width="80%" border-radius="20">
            <view class="popup-content">
                <view class="popup-title">添加监护人</view>
                <view class="user-info">
                    <view class="avatar">
                        <u-image :src="vuex_imgUrl + selectedUser.avatar" width="120rpx" height="120rpx" mode="widthFix"></u-image>
                    </view>
                    <view class="info">
                        <view class="name">{{ selectedUser.nickname }}</view>
                        <view class="phone">{{ selectedUser.phone }}</view>
                    </view>
                </view>
                <view class="form-item">
                    <text class="label">关系</text>
                    <u-picker
                        :show="showRelationSelect"
                        :columns="[relations]"
                        @confirm="handleRelationSelect"
                        @cancel="showRelationSelect = false"
                    ></u-picker>
                    <view class="relation-input" @click="showRelationSelect = true">
                        <text>{{ form.relation ? getRelationText(form.relation) : '请选择关系' }}</text>
                        <u-icon name="arrow-down" color="#999999" size="24"></u-icon>
                    </view>
                </view>
                <view class="popup-buttons">
                    <u-button @click="showAddPopup = false">取消</u-button>
                    <u-button type="primary" @click="handleSubmit">确定</u-button>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script>
export default {
    data() {
        return {
            searchKey: '',
            userList: [],
            showAddPopup: false,
            showRelationSelect: false,
            selectedUser: {
                id: '',
                nickname: '',
                phone: '',
                avatar: ''
            },
            form: {
                relation: ''
            },
            relations: [
                { text: '子女', value: 'child' },
                { text: '配偶', value: 'spouse' },
                { text: '亲属', value: 'relative' },
                { text: '朋友', value: 'friend' },
                { text: '其他', value: 'other' }
            ]
        };
    },
    methods: {
        // 搜索监护人
        handleSearch() {
            if (!this.searchKey) {
                uni.showToast({
                    title: '请输入手机号',
                    icon: 'none'
                });
                return;
            }
            this.$api.getGuardians(this.searchKey)
                .then(res => {
                    if (res.code === 200) {
                        this.userList = res.data;
                    } else {
                        uni.showToast({
                            title: res.message || '搜索失败',
                            icon: 'none'
                        });
                    }
                })
                .catch(err => {
                    uni.showToast({
                        title: '搜索失败，请重试',
                        icon: 'none'
                    });
                });
        },
        // 清除搜索
        handleClear() {
            this.searchKey = '';
            this.userList = [];
        },
        // 选择用户
        handleSelect(user) {
            this.selectedUser = { ...user };
            this.form.relation = '';
            this.showAddPopup = true;
        },
        // 选择关系
        handleRelationSelect(e) {
            this.form.relation = e.value[0].value;
            this.showRelationSelect = false;
        },
        // 提交表单
        handleSubmit() {
            if (!this.form.relation) {
                uni.showToast({
                    title: '请选择关系',
                    icon: 'none'
                });
                return;
            }

            const params = {
                guardian: this.selectedUser.id,
                ward: uni.getStorageSync('userInfo').id,
                relationship: this.getRelationText(this.form.relation)
            };

            this.$api.addGuardian(params)
                .then(res => {
                    if (res.code === 200) {
                        uni.showToast({
                            title: '添加成功',
                            icon: 'success'
                        });
                        this.showAddPopup = false;
                        setTimeout(() => {
                            uni.navigateBack();
                        }, 1500);
                    } else {
                        uni.showToast({
                            title: res.message || '添加失败',
                            icon: 'none'
                        });
                    }
                })
                .catch(err => {
                    uni.showToast({
                        title: '添加失败，请重试',
                        icon: 'none'
                    });
                });
        },
        getRelationText(relation) {
            const relationText = {
                child: '子女',
                spouse: '配偶',
                relative: '亲属',
                friend: '朋友',
                other: '其他'
            };
            return relationText[relation] || relation;
        }
    }
};
</script>

<style lang="scss" scoped>
.add-guardian {
    background-color: #fff;
    min-height: 100vh;

    .search-bar {
        padding: 32rpx;
    }

    .list {
        padding: 24rpx;
        background-color: #f7f7f7;

        .item {
            background-color: #fff;
            border-radius: 12rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20rpx;

            .item-content {
                padding: 28rpx 24rpx;
                display: flex;
                align-items: center;
                gap: 12rpx;

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
                    justify-content: center;
                    gap: 12rpx;

                    .desc-label {
                        font-size: 42rpx;
                        font-weight: bold;
                    }

                    .desc-value {
                        color: #666666;
                        font-size: 32rpx;
                    }
                }
            }
        }
    }

    .popup-content {
        padding: 30rpx;

        .popup-title {
            font-size: 32rpx;
            font-weight: bold;
            text-align: center;
            margin-bottom: 30rpx;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 24rpx;
            margin-bottom: 30rpx;
            padding: 20rpx;
            background-color: #f7f7f7;
            border-radius: 12rpx;

            .avatar {
                width: 120rpx;
                height: 120rpx;
                border-radius: 50%;
                overflow: hidden;
                background-color: #fff;
            }

            .info {
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
            }
        }

        .form-item {
            margin-bottom: 20rpx;

            .label {
                display: block;
                font-size: 28rpx;
                color: #666;
                margin-bottom: 10rpx;
            }

            .relation-input {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20rpx;
                background-color: #f7f7f7;
                border-radius: 8rpx;
                font-size: 28rpx;
                color: #333;

                text {
                    color: #999;
                }
            }
        }

        .popup-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 30rpx;

            .u-button {
                flex: 1;
                margin: 0 10rpx;
            }
        }
    }
}
</style>
