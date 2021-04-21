<template>
    <div class="user">
        <div class="header flex flex_between ali_center">
            <div class="title">我的</div>
            <div class="right">
                <van-icon @click="showService = true" name="service-o" size="20" />
                <van-icon @click="$router.push('/setting')" name="setting-o" size="20" />
            </div>
        </div>
        <div class="userInfo flex ali_center">
            <img @click="$router.push('/setting')" :src="src" alt="" />
            <div class="right">
                <div class="nickname">{{nickname}}</div>
                <div class="mobile">{{mobile}}</div>
            </div>
        </div>
        <div class="nav flex ali_center flex_between">
            <div class="item" @click="$router.push('/myOrder')">
                <img src="@/assets/images/icon/dingdan.png" alt="" />
                <p class="type">我的订单</p>
            </div>
            <div class="item" @click="$router.push('/wollet')">
                <img src="@/assets/images/icon/qianbao.png" alt="" />
                <p class="type">我的钱包</p>
            </div>
            <div class="item" @click="$router.push('/poster')">
                <img src="@/assets/images/icon/jia.png" alt="" />
                <p class="type">邀请好友</p>
            </div>
        </div>
       <!-- 公告 -->
        <!-- <div class="notice flex ali_center">
            <swiper ref="notice" class="swiper" :options="noticeSwiper">
                <swiper-slide v-for="(item, index) in 5" :key="index">
                    <p class="line">这里是公告这里是公告这里是公告这里是公告这里是公告</p>
                </swiper-slide>
            </swiper>
        </div> -->
        <!-- <div class="money">
            <div class="title flex ali_center flex_between">
                <div class="left flex ali_center">
                    <div class="type">CNY余额</div>
                    <i @click="iconeyeclose = !iconeyeclose" v-if="iconeyeclose" class="iconfont iconeyeopen"></i>
                    <i @click="iconeyeclose = !iconeyeclose" v-else class="iconfont iconeyeclose"></i>
                </div>
                <div class="right flex ali_center">
                    <span class="num">0.00</span>
                    <van-icon name="play" color="#eec881" size="10" />
                </div>
            </div>
            <div class="bottom flex">
                <div class="item">
                    <div class="type">BTC余额</div>
                    <div class="num" v-if="iconeyeclose">0.00</div>
                    <div class="num" v-else>* * * *</div>
                </div>
                <div class="item">
                    <div class="type">USDT余额</div>
                    <div class="num" v-if="iconeyeclose">0.00</div>
                    <div class="num" v-else>* * * *</div>
                </div>
                <div class="item">
                    <div class="type">ETH余额</div>
                    <div class="num" v-if="iconeyeclose">0.00</div>
                    <div class="num" v-else>* * * *</div>
                </div>
                <div class="item">
                    <div class="type">FIL余额</div>
                    <div class="num" v-if="iconeyeclose">0.00</div>
                    <div class="num" v-else>* * * *</div>
                </div>
            </div>
        </div> -->
        <div class="all_money flex ali_center flex_between">
            <div class="left">资产预估(CNY) <span>≈ {{credit2}}</span></div>
            <div class="right flex ali_center" >
                <div class="cash" @click="$router.push('/cash')">提现</div>
                <p></p>
                <div class="recharge" @click="$router.push('/recharge/CNY')">充值</div>
            </div>
        </div>
        <div class="list">
            <!-- <div class="item flex ali_center flex_between">
                <div class="left flex ali_center">
                    <img src="" alt="" />
                    <span>质押借币</span>
                </div>
                <van-icon name="arrow" color="#ccc" />
            </div> -->
            <div @click="$router.push('/agent')" class="item flex ali_center flex_between">
                <div class="left flex ali_center">
                    <img src="@/assets/images/icon/daili.png" alt="" />
                    <span>代理中心</span>
                </div>
                <van-icon name="arrow" color="#ccc" />
            </div>
            <div @click="$router.push('/receiveSet')" class="item flex ali_center flex_between">
                <div class="left flex ali_center">
                    <img src="@/assets/images/icon/shoufukuan.png" alt="" />
                    <span>收/付款设置</span>
                </div>
                <van-icon name="arrow" color="#ccc" />
            </div>
            <!-- <div class="item flex ali_center flex_between">
                <div class="left flex ali_center">
                    <img src="" alt="" />
                    <span>卡券包</span>
                </div>
                <van-icon name="arrow" color="#ccc" />
            </div> -->
            <div @click="$router.push('/feedback')" class="item flex ali_center flex_between">
                <div class="left flex ali_center">
                    <img src="@/assets/images/icon/fankui.png" alt="" />
                    <span>意见反馈</span>
                </div>
                <van-icon name="arrow" color="#ccc" />
            </div>
            <div @click="$router.push('/about')" class="item flex ali_center flex_between">
                <div class="left flex ali_center">
                    <img src="@/assets/images/icon/about.png" alt="" />
                    <span>关于我们</span>
                </div>
                <van-icon name="arrow" color="#ccc" />
            </div>
        </div>
        <bottom-nav></bottom-nav>
        <service
            :showService="showService"
            @close="closeservice"
        ></service>
    </div>
</template>
<script>
import bottomNav from "../common/footernav";
import service from "../common/service";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
export default {
    name: "user",
    components: {
        bottomNav,
        service,
        swiper,
        swiperSlide,
    },
    data() {
        return {
            showService: false,
            iconeyeclose: true,
            noticeSwiper: {
                direction: "vertical",
                loop: true,
                speed: 500,
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
            },
            nickname: "",
            src: "",
            mobile: "",
            credit2: "",

        };
    },
    mounted() {
        this.getlist()
    },
    methods: {
        closeservice(e) {
            this.showService = false;
        },
        async getlist() {
             let res = await $ajax('userInfo', {
                requstType: "info"
            })
            if(!res) return false
            this.src = res.avatar
            this.nickname = res.nickname
            this.mobile = res.mobile
            this.credit2 = res.credit2
        },
    }
};
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.user {
    background: #f7f7f7 !important;
    .header {
        height: 12vw;
        padding: 0 4vw;
        .title {
            font-size: 4.8vw;
            font-weight: 600;
            color: #333;
        }
        .right {
            .van-icon {
                margin-left: 4vw;
            }
        }
    }
    .userInfo {
        padding: 0 4vw;
        margin: 8vw 0 10vw;
        img {
            width: 15vw;
            height: 15vw;
            border-radius: 50%;
            margin-right: 2.4vw;
        }
        .right {
            .nickname {
                font-size: 4.2vw;
                font-weight: 600;
                color: #333;
            }
            .mobile {
                color: #999;
                font-size: 3.2vw;
                margin-top: 1.5vw;
            }
        }
    }
    .nav {
        padding: 0 4vw;
        .item {
            width: 28vw;
            background: #fff;
            border-radius: 2vw;
            padding: 2vw;
            height: 17vw;
            img {
                width: 5.33vw;
                height: 5.33vw;
                // background: #000;
                margin-bottom: 1vw;
            }
            p {
                color: #333;
                font-size: 3.2vw;
                font-weight: 600;
            }
        }
    }
    .notice {
        padding: 0 4vw;
        height: 10vw;
        background: #fef7e5;
        color: #fbc07a;
        margin: 2.4vw 0;
        .swiper {
            width: 100%;
            height: 10vw;
            line-height: 10vw;
            font-size: 3.2vw;
        }
    }
    .money {
        padding: 0 4vw;
        .title {
            width: 88vw;
            margin: 0 2vw;
            padding: 0 2vw;
            height: 10vw;
            background: #343855;
            border-radius: 3vw 3vw 0 0;
            .left {
                color: #fff;
                font-size: 3.2vw;
                .iconfont {
                    margin-left: 2.4vw;
                    font-size: 4vw;
                }
            }
            .right {
                color: #eec881;
            }
        }
        .bottom {
            width: 92vw;
            border-radius: 3vw;
            background: #da428d;
            flex-wrap: wrap;
            .item {
                width: 50%;
                height: 20vw;
                padding-left: 4vw;
                position: relative;
                &:before {
                    position: absolute;
                    content: "";
                    width: 1px;
                    height: 6vw;
                    background: #ccc;
                    top: 0;
                    bottom: 0;
                    left: -1vw;
                    margin: auto 0;
                }
            }
            .type {
                color: #ccc;
                line-height: 10vw;
                font-size: 3.2vw;
            }
            .num {
                color: #fff;
                font-size: 5vw;
                font-weight: 600;
            }
        }
    }
    .all_money {
        height: 15vw;
        padding: 0 4vw;
        .left {
            color: #999;
            font-size: 3.73vw;
            span {
                color: #333;
                font-size: 4vw;
            }
        }
        .right {
            .cash {
                color: #afafb1;
            }
            .recharge {
                color: #da428d;
            }
            p {
                width: 1px;
                height: 4vw;
                margin: 0 3vw;
            }
        }
    }
    .list {
        background: #fff;
        .item {
            padding: 0 4vw;
            height: 14vw;
            border-bottom: 0.5px solid #eee;
            .left {
                img {
                    width: 5.33vw;
                    height: 5.33vw;
                    margin-right: 2.4vw;
                }
                span {
                    font-size: 3.73vw;
                    font-weight: 600;
                }
            }
        }
    }
}
</style>