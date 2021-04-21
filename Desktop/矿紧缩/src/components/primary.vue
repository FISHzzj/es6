<template>
    <div id="primary">
        <router-view/>
        <!-- 底部导航 -->
        <van-tabbar 
        class="tabbar"
        safe-area-inset-bottom
        fixed
        route>
            <van-tabbar-item to="/capital">
                <span>{{ $i18n.primary['資產'] }}</span>
                <span slot="icon" slot-scope="props">
                    <i class="iconfont iconzichan-quanbushebei"></i>
                </span>
            </van-tabbar-item>
            <van-tabbar-item to="/getOrders">
                <span>{{ $i18n.primary['接單'] }}</span>
                <span slot="icon" slot-scope="props">
                    <i class="iconfont iconjiedanzhongxinweixuan"></i>
                </span> 
            </van-tabbar-item>
            <van-tabbar-item to="/center">
                <span>{{ $i18n.primary['我的'] }}</span>
                <span slot="icon" slot-scope="props">
                    <i class="iconfont iconmine-gray"></i>
                </span>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: 'primary',
    data () {
        return {
            
        }
    }
}
</script>

<style lang="less" scoped>
#primary {
    > div:first-child {
        margin-bottom: 65px;
    }
    .tabbar {
        padding: 5px 0;
        > div {
                font-size: 0.9rem!important;
            i {
                font-size: 1.4rem;
            }
        }
    }
    
}
</style>


