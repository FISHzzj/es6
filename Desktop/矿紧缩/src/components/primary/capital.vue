<template>
    <div id="capital">
        <div>
            <p>
                {{ $i18n.capital['資產折合'] }}
            </p>
            <p>
                {{total || 0}} <span>USDT</span>
            </p>
            <p>
                ≈{{CNY || 0}} CNY
            </p>
            <div>
                <van-swipe :autoplay="3000">
                    <van-swipe-item v-for="(item, index) in images" :key="index" @click="jumpUrl(item.url)">
                        <img v-lazy="item.img" />
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
        <div>
            <p>
                <span>{{ $i18n.capital['可用額度'] }}</span>
                <span>{{money || 0}}</span>
            </p>
            <p>
                <span>{{  $i18n.capital['接單額度'] }}</span>
                <span>{{frozen || 0}}</span>
            </p>
            <p>
                <span>{{ $i18n.capital['今日收益'] }}</span>
                <span>{{toDay || 0}}</span>
            </p>
        </div>
        <div>
            <p @click="recharge">
                <span>
                    <i class="iconfont iconchongbi red"></i>
                </span>
                <span>
                    {{ $i18n.capital['充幣'] }}
                </span>
            </p>
            <router-link to="/withdrawals/0" tag="p">
                <span>
                    <i class="iconfont icontibi green"></i>
                </span>
                <span>
                    {{ $i18n.capital['提幣'] }}
                </span>
            </router-link>
            <router-link to="/transfer" tag="p">
                <span>
                    <i class="iconfont iconzhuanzhang blue"></i>
                </span>
                <span>
                    {{ $i18n.capital['轉賬'] }}
                </span>
            </router-link>
        </div>
        <van-grid :border="false" :column-num="3">
            <van-grid-item to="/rechargeList">
                <img src="@/assets/images/icon/cbjl.png">
                <span>{{ $i18n.capital['充值記錄'] }}</span>
            </van-grid-item>
            <van-grid-item to="/withdrawalsList">
                <img src="@/assets/images/icon/tbjl.png">
                <span>{{ $i18n.capital['提幣記錄'] }}</span>
            </van-grid-item>
            <van-grid-item to="/transferList">
                <img src="@/assets/images/icon/zzjl.png">
                <span>{{ $i18n.capital['轉賬記錄'] }}</span>
            </van-grid-item>
            <van-grid-item to="/getOrdersList">
                <img src="@/assets/images/icon/jdjl.png">
                <span>{{ $i18n.capital['接單記錄'] }}</span>
            </van-grid-item>
            <van-grid-item to="/pyList">
                <img src="@/assets/images/icon/jyjl.png">
                <span>{{ $i18n.capital['交易記錄'] }}</span>
            </van-grid-item>
            <van-grid-item to="/incomeList">
                <img src="@/assets/images/icon/syjl.png">
                <span>{{ $i18n.capital['收益記錄'] }}</span>
            </van-grid-item>
            <van-grid-item to="/exchangeList">
                <img src="@/assets/images/icon/dhjl.png">
                <span>{{ $i18n.capital['兌換記錄'] }}</span>
            </van-grid-item>
            <van-grid-item to="/streamDetail">
                <img src="@/assets/images/icon/lsmx.png">
                <span>{{ $i18n.capital['流水明細'] }}</span>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
export default {
    name: 'capital',
    data() {
        return {
            total: '',
            money: '',
            frozen: '',
            toDay: '',
            CNY: '',
            images: []
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        async getData () {
            let res = await $ajax('capital', {})
            if (!res) return false
            // console.log(res)
            Object.keys(res).forEach( key => {
                this[key] = res[key]
            })
            // 将 总金额 保存到 sessionStorage
            sessionStorage.setItem('money', this.money || 0)
        },
        // 跳转链接
        jumpUrl (url) {
            window.location.href = url
        },
        recharge() {
            let openid = localStorage.getItem('openid')
            let http = 'http://jiufu.ch'
            location.href=`${http}/app/index.php?i=96&c=entry&m=wx_shop&do=mobile&r=apay&openid=${openid}`
        }
    }
}
</script>
<style lang="less" scoped>
.flex {
    display: flex;
    display: -webkit-flex;
}
#capital {
    p {
        margin: 0;
    }
    > div:first-child {
        .flex;
        flex-direction: column;
        align-items: center;
        // justify-content: center;
        height: 12rem;
        // background-color: #4c81e8;
        background-image: url('../../assets/images/centerInfoBg.png');
        background-size: 100% 100%;
        color: rgba(255, 255, 255, 0.8);
        border-bottom-left-radius: 10%;
        border-bottom-right-radius: 10%;
        position: relative;
        box-sizing: border-box;
        > p {
            margin-top: 0.8rem;
        }
        > p:nth-child(2) {
            font-size: 1.5rem;
            color: white;
        }
        > p:first-child {
            margin-top: 2rem;
        }
        > div:nth-of-type(1) {
            height: 5rem;
            width: 100%;
            box-sizing: border-box;
            padding: 0 1rem;
            position: absolute;
            bottom: -5vh;
            left: 0;
            > div.van-swipe {
                height: 100%;
                border-radius: 5px;
                overflow: hidden;
            }
            img {
                height: 100%;
                width: 100%;
            }
        }
    }
    > div:nth-child(2) {
        width: 92%;
        margin: 0 auto;
        margin-top: 6vh;
        .flex;
        justify-content: center;
        // background-color: #4c81e8;
        background-image: url('../../assets/images/centerInfoBg.png');
        background-size: 100% 100%;
        color: white;
        border-radius: 5px;
        padding: 8px 0;
        > p:not(:last-child) {
            border-right: 1px solid rgba(255, 255, 255, 0.5);
        }
        > p {
            flex-grow: 1;
            padding: 5px 0;
            text-align: center;
            .flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            span:nth-child(2) {
                font-size: 0.8rem;
                margin-top: 5px;
                color: rgba(255, 255, 255, 0.7);
            }
        }
    }
    > div:nth-child(3) {
        .flex;
        margin: 10px;
        padding: 1.2rem 0;
        background-color: white;
        border-radius: 5px;
        box-shadow: 1px 5px 10px #ccc;
        > p {
            flex-grow: 1;
            text-align: center;
            > span {
                display: block;
            }
            > span:not(:last-child) {
                margin-bottom: 5px;
            }
            i {
                font-size: 1.5rem;
            }
        }
    }
    > div.van-grid {
        img {
            height: 3rem;
            width: 3rem;
        }
    }
}
</style>