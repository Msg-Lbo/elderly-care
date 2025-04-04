<template>
    <view class="add-guardian">
        <section class="search-bar">
            <u-search shape="square" inputAlign="center" placeholder="输入监护人手机号" height="40" :showAction="false"></u-search>
        </section>
        <section class="list">
            <c-scroll-list :api="api" :apiParams="apiParams" @load="load" ref="listRef" :option="{ auto: true }">
                <view class="item">
                    <view class="item-content">
                        <view class="left">
                            <u-image src="/static/mine/m3.png" width="160rpx" height="160rpx" mode="widthFix"></u-image>
                        </view>
                        <view class="right">
                            <view class="desc-label">张三三</view>
                            <view class="desc-value">122****5555</view>
                        </view>
                    </view>
                    <u-icon name="arrow-right" color="#999999" size="24"></u-icon>
                </view>
            </c-scroll-list>
        </section>
        <section class="fab" @click.stop="handleFabClick">
            <u-image width="80rpx" height="80rpx" src="/static/home/feb.png" mode="aspectFill"></u-image>
        </section>
    </view>
</template>

<script>
export default {
    data() {
        return {
            api: this.$api.purchaseListApi,
            tabIndex: 0,
            tabsList: [
                {
                    value: "全部",
                    key: 0,
                },
                {
                    value: "待开始",
                    key: 1,
                },
                {
                    value: "进行中",
                    key: 2,
                },
                {
                    value: "待开标",
                    key: 3,
                },
                {
                    value: "已结束",
                    key: 4,
                },
            ],
        };
    },
    computed: {
        apiParams() {
            return {
                pageNum: 1,
                pageSize: 10,
                purchaseStatus: this.tabIndex,
            };
        },
    },
    methods: {
        handleTabClick(item) {
            this.tabIndex = item.key;
            this.tab = item;
        },
        load(res) {
            console.log("list", res);

            if (res.list != null) {
                this.list = res.list;
            }
        },
        handleFabClick() {
            uni.navigateTo({
                url: "/pages/home/purchaseCreate",
            });
        },
        /** 改变tab */
        change(tab, index) {
            this.tab = tab;
            this.tabIndex = index;
            console.log(this.apiParams);
            this.$refs.listRef.refresh();
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
.add-guardian {
    background-color: #fff;
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
            .item-content {
                padding: 28rpx 24rpx;
                margin-top: 24rpx;
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
                    .desc-label{
                        font-size: 42rpx;
                        font-weight: bold;
                    }
                    .desc-value {
                        color: #666666;
                        font-size: 32rpx;
                    }
                }
            }
            .item-action {
                padding: 20rpx;
                display: flex;
                gap: 20rpx;
                ::v-deep .u-button {
                    margin: 0;
                    padding: 8rpx 14rpx;
                    //   &:last-child {
                    //     width: 160rpx;
                    //   }
                }
            }
        }
    }
    .fab {
        position: fixed;
        bottom: 400rpx;
        right: 24rpx;
        z-index: 999;
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
    }
}
</style>
