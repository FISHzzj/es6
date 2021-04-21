<template>
    <div class="products">
        <!-- 首页轮播 -->
        <swiper ref="mySwiper" class="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item, index) in banner" :key="index">
                <a href="#">
                    <img :src="item" alt="">
                </a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!-- 顶部导航 -->
        <div class="nav flex ali_center flex_around">
            <div class="item" @click="changenav(item.id, index)" v-for="(item, index) in nav" :key="index" :class="{on: status == item.id}">
                <img :src="b" alt="" v-if="index == 0">
                <img :src="e" alt="" v-if="index == 1">
                <img :src="f" alt="" v-if="index == 2">
                <div>{{item.name}}专区</div>
            </div>
        </div>
        <!-- 商品列表 -->
        <div class="list">
            <van-list
                v-model="loading"
                :finished="finished"
                :finished-text="'我是有底线的'"
                @load="onLoad"
                >
                    <router-link 
                        class="item flex" 
                        :to="{name: 'detail', query:{id:`${item.id}`}}" tag="div"
                        v-for="item in list" :key="item.id">
                        <div class="left">
                            <!-- <div class="type">{{item.title}}</div> -->
                            <img :src="item.thumb" class="pro_img" alt="" />
                            <div class="num">剩余：<span>{{item.total}}</span>台</div>
                        </div>
                        <div class="right">
                            <div class="name line">{{item.title}}</div>
                            <div class="first second"> <!-- 算力:110TH/s  | --> 功耗:{{item.power}}kw/h</div> 
                            
                            <div class="first">预计日产出:{{item.today_bi}} {{item.unit}}/台</div>
                            <div class="first">≈{{item.cny}} CNY/台</div>
                            <div class="bottom">
                                <div class="price">{{item.marketprice}}<span>CNY</span></div>
                                <div class="price1">≈{{item.usdt}}USDT</div>
                            </div>
                        </div>
                    </router-link>
            </van-list>

        </div>
        <div class="bgbottom flex ali_center">
            <img src="@/assets/images/home/laba_bai.png" alt="">
            <div>专业的矿机租赁 算力交易平台</div>
        </div>
        <bottom-nav></bottom-nav>
    </div>
</template>
<script>
import bottomNav from "../common/footernav";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
export default {
    name: "products",
    components: {
        bottomNav,
        swiper,
        swiperSlide,
    },
    data() {
        return {
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
            swiperOptions: {
                loop: true,
                speed: 2000,
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
                // 显示分页
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true, //允许分页点击跳转
                },
            },
            status: "9",
            page: 1,
            limit: 10,
            finished: false,
            loading: false,
            list: [],
            nav: [],
            b: require("@/assets/images/b.jpg"),
            e: require("@/assets/images/e.jpg"),
            f: require("@/assets/images/f.jpg"),
            banner: [],
        };
    },
    mounted() {
        this.getnav()
    },
    methods: {
        async getnav(){
            let res = await $ajax('goodscategory',{})
            if (!res) return false

            this.nav = res.category
            this.status = res.category[0].id
            this.b = require("@/assets/images/b_1.jpg")
        },
        async onLoad() {
            let res = await $ajax('goods',{
                page: this.page,
                cateid: this.status
            })
            if (!res) return false
            this.banner = res.thumbs
            this.page++
            console.log(res)
            let lists = res.lists
            this.list.push(...lists)
            // // 加载状态结束
            this.loading = false
            if (lists.length === 0) {
                this.finished = true //加载完成
            } 
        },
        changenav(index, a) {
            console.log(index)
            this.status = index;
            this.list = []
            this.page = 1
            this.onLoad()
            if(a == 0){
                this.b = require("@/assets/images/b_1.jpg")
                // b: require("@/assets/images/b.jpg"),
                this.e = require("@/assets/images/e.jpg")
                this.f = require("@/assets/images/f.jpg")
                
            }else if(a == 1){
                this.e = require("@/assets/images/e_1.jpg")
                this.b = require("@/assets/images/b.jpg")
            // e: require("@/assets/images/e.jpg"),
                this.f = require("@/assets/images/f.jpg")
            }else if(a == 2){
                this.f = require("@/assets/images/f_1.jpg")
                this.b = require("@/assets/images/b.jpg")
                this.e = require("@/assets/images/e.jpg")
                // f: require("@/assets/images/f.jpg"),
            }
        },
        // godetail(id) {
        //     this.$router.push({
        //         path: "/detail",
        //         query: {
        //             id
        //         }
        //     })
        // }
    }
}
</script>
<style lang="less" scope>
.products {
    .mySwiper {
        .swiper-container {
            background: #ccc;
        }
        .pagination-bullet-active {
            color: #fff;
        }
        .swiper-slide {
            height: 50vw;
            img {
                width:100vw;
                height: 50vw;
            }
        }
    }
    .nav {
        width: 92vw;
        height: 25vw;
        margin: 2vw 4vw;
        background: #fff;
        .item {
            width: 30%;
            height: 20vw;
            color: #999;
            line-height: 10vw;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            &.on {
                background: #fff;
                color: #000;
            }
            img{
                width: 40px;
                height: 40px;
            }
            // div{

            // }
        }
    }
    .list {
        padding: 2vw 0;
        .item {
            margin-bottom: 6vw;
            padding: 0 3vw;
            flex-wrap: nowrap;
            .left {
                position: relative;
                width: 35vw;
                height: 48vw;
                .type {
                    color: #aa9d8a;
                    font-size: 3.2vw;
                    text-align: center;
                    line-height: 6vw;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 50%;
                    background: #1b1612;
                    z-index: 1;
                    border-radius: 2vw 0 2vw 0;
                } 
                .pro_img {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    background: chartreuse;
                    border-radius: 3vw;
                }
                .num {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    line-height: 8vw;
                    z-index: 1;
                    font-size: 3vw;
                    padding-left: 2vw;
                    // color:#fff;
                    span {
                        color: #da428d;
                        margin: 0 1vw;
                    }
                }
            }
            .right {
                width: 55vw;
                position: relative;
                margin-left: 2vw;
                .name {
                    color: #333;
                    font-size: 4vw;
                    font-weight: 600;
                }
                .first {
                    color: #999;
                    font-size: 3vw;
                    line-height: 5vw;
                }
                .second {
                    line-height: 8vw;
                }
                .bottom {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    text-align: right;
                    .price {
                        color: #da428d;
                        font-size: 6vw;
                        font-weight: 600;
                        span {
                            font-size: 3vw;
                            font-weight: 500;
                        }
                    }
                    .price1 {
                        color: #666;
                        font-size: 3vw;
                    }
                }
            }
        }
    }
    .bgbottom{
        flex-direction: column;
        background: #eee;
        img{
            width: 50px;
            height: 50px;
        }
        div{
            padding: 10px 10px;
            font-size: 12px;
            color: #484646;
        }
    }
}
</style>