<template>
    <div id="safe">
        <van-nav-bar
        :title="$i18n.safe['賬戶安全']"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <div class="infoCard">
            <router-link to="/changePwd/login" tag="p">
                <span>{{ $i18n.safe['修改登錄密碼'] }}</span>
                <span>
                    <i class="iconfont iconright"></i>
                </span>
            </router-link>
            <router-link to="/changePwd/money" tag="p">
                <span>{{ $i18n.safe['資金密碼'] }}</span>
                <span>
                    {{ $i18n.safe['修改'] }}
                    <i class="iconfont iconright"></i>
                </span>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'safe',
    data() {
        return {
            
        }
    },
}
</script>
<style lang="less" scoped>
.flex {
    display: flex;
    display: -webkit-flex;
}
#safe {
    .infoCard {
        background-color: #fff;
        padding: 0 1rem;
        margin-top: calc(50px + 1rem);
        > p {
            height: 3rem;
            line-height: 3rem;
            .flex;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
            > span:nth-child(2) {
                color: #999;
            }
        }
    }   
}
</style>