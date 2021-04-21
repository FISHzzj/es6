<template>
    <div class="exchangechu">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="20" />
            <p>{{typetype}}</p>
            <!-- <span @click="showService = true">联系客服</span> -->
        </div>
        <div style="height:8vw"></div>
        <div class="content flex ali_center">
            <img class="icon" src="@/assets/images/icon/5.png" alt=""  v-if="type == 'USDT'" />
            <img class="icon" src="@/assets/images/icon/4.png" alt=""  v-if="type == 'BTC'"/>
            <img class="icon" src="@/assets/images/icon/2.png" alt=""  v-if="type == 'ETH'"/>
            <img class="icon" src="@/assets/images/icon/3.png" alt=""  v-if="type == 'FIL'"/>
           

            <div class="name">{{typetype}}{{type}}</div>
            <div class="change flex ali_center" @click="show = true">
                <span>{{typetype}}</span>
                <van-icon name="arrow"></van-icon>
            </div>
            <!-- <div v-if="type == 'USDT'" class="types flex ali_center">
                <span>链类型：</span>
                <div class="on" @click="changenav('ERC')">ERC20</div>
                <div @click="changenav('TRC')">TRC20</div>
            </div> -->
            <!-- <img class="code" :src="code" alt="" />
            <div class="address">{{wallet}}</div>
            <div class="btns flex ali_center flex_between">
                <div class="copy" :data-clipboard-text="wallet">复制地址</div>
                <div class="save">保存图片</div>
            </div> -->
        </div>
        <div class="pays">
            <div class="num flex flex_between ali_center">
                <div class="title">{{typetype}}数量</div>
                <input v-model="num" type="text" placeholder="可提现金额" />
            </div>
             <div class="num flex flex_between ali_center">
                <div class="title">转账地址</div>
                <input v-model="wallet" type="text" placeholder="输入转账地址" />
            </div>
            <!-- <div class="img flex flex_between ali_center">
                <div class="title">转账地址</div>
                <input v-model="address" type="text" placeholder="输入转账地址" />
            </div> -->
            
        </div>
        <div class="tips">
            <p>温馨提示：</p>
            <div>1.最小输入数量为0.007</div>
            <div>2.请务必保证提币钱包地址的准确性，否则资产将无法找回；</div>
            <div>3.旷工费具体多少由市场决定，平台不收取手续费</div>
            <div>4.提币审核会在24小时内完成，具体到账时间会受网络影响，可能有所延迟；</div>
            <div>5.如长时间未到账，请及时联系客服</div>
        </div>
        <div class="submit" :class="{on: num}" @click="submit">确认{{typetype}}</div>
        <van-action-sheet
            v-model="show"
            :actions="actions"
            @select="onSelect"
            cancel-text="取消"
        />
        <service
            :showService="showService"
            @close="closeservice"
        ></service>
    </div>
</template>
<script>
import service from "./common/service"
import {copy} from '../func/copy'

export default {
    name: "exchangechu",
    components: {
        service
    },
    data() {
        return {
            showService: false,
            img: require('@/assets/images/icon/jyjl.png'),
            show: false,
            type: "USDT",
            num: "",
            actions: [
                {name: "USDT", img: require('@/assets/images/icon/5.png')},
                {name: "BTC", img: require('@/assets/images/icon/4.png')},
                {name: "ETH", img: require('@/assets/images/icon/2.png')},
                {name: "FIL", img: require('@/assets/images/icon/3.png')}
            ],
            code: "",
            wallet: "",
            typetype: "",
            baseimg: "",
            payId: "",

        }
    },
    mounted(){
        this.type = this.$route.params.type
        this.typetype = this.$route.params.typetype
        //傳遞複製按鈕選擇器, 接受複製插件的 clipboard 實例
        // this.clipboard = copy('.copy')
        this.getData()
    },
    methods: {
        async getData() {
            
            let type = this.type.toLowerCase()
            // let type = this.type.toLowerCase()
            if(type == "cny"){
                this.accountType = 1
            }else if(type == "usdt") {
                this.accountType = 2
            }else if(type == "btc"){
                this.accountType = 3
            }else if(type == "eth"){
                this.accountType = 4
            }else if(type == "fil"){
                this.accountType = 5
            }
            let res = await $ajax('userrecharge', {rechargeType: type, getType: 2, accountType: this.accountType})
            if(!res) return false
            this.money = res.money
            this.code = res.code
            this.wallet = res.wallet
            this.payId = res.id
        },
        async afterRead(s) {
            console.log(s);
            let img = s.content
            let res = await $ajax('userrechargeimages', {image: img})
            if(!res) return false
            console.log(res)
            this.baseimg = res.img

        },
        changenav(type) {
            if (type == 'TRC') return Toast("即将开放");
        },
        onSelect(e) {
            console.log(e);
            this.type = e.name;
            this.img = e.img;
            this.show = false;
            this.getData()
        },
        closeservice(e) {
            this.showService = false;
        },
        async submit() {
            if(!this.num) return Toast("请输入数量!")
            if(!this.wallet) return Toast("输入转账地址!")
            let type = this.type.toLowerCase()
            if(type == "cny"){
                this.accountType = 1
            }else if(type == "usdt") {
                this.accountType = 2
            }else if(type == "btc"){
                this.accountType = 3
            }else if(type == "eth"){
                this.accountType = 4
            }else if(type == "fil"){
                this.accountType = 5
            }
            let res = await $ajax('userrechargepays', {
                getType: 2,
                payId: this.payId,
                money: this.num,
                wallet: this.wallet,
                // carType: this.carType,
                accountType: this.accountType
        
            })
            if(!res) return false
            console.log(res)
            Toast(res.msg)
            this.$router.go(-1)
        }
    }
};
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.exchangechu {
    background: #f7f7f7 !important;
    .header {
        width: 100%;
        height: 12vw;
        position: relative;
        background: #fff;
        .van-icon {
            position: absolute;
            top: 0;
            left: 3vw;
            bottom: 0;
            height: 4vw;
            margin: auto 0;
        }
        span {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 4vw;
            font-size: 3.47vw;
            margin: auto 0;
            color: #999;
            line-height: 12vw;
        }
        p {
            width: 100%;
            line-height: 12vw;
            font-size: 4vw;
            text-align: center;
        }
    }
    .content {
        width: 92vw;
        background: #fff;
        border-radius: 3vw;
        height: 28vw;
        margin: 0 4vw;
        flex-direction: column;
        padding: 0 4vw;
        .icon {
            width: 12vw;
            height: 12vw;
            border-radius: 50%;
            margin: -6vw 40vw 0;
        }
        .name {
            line-height: 8vw;
            font-weight: 600;
        }
        .change {
            color: #999;
            font-size: 3.2vw;
            height: 12vw;
        }
        .types {
            width: 100%;
            div {
                width: 20vw;
                height: 8vw;
                line-height: 8vw;
                text-align: center;
                color: #999;
                font-weight: 600;
                background: #f7f7f7;
                margin-left: 3vw;
                border-radius: 1vw;
                &.on {
                    color: #da428d;
                    border: 1px solid #da428d;
                }
            }
        }
        .code {
            width: 30vw;
            height: 30vw;
            margin: 6vw 0;
        }
        .address {
            word-break: break-all;
            text-align: center;
            font-weight: 600;
        }
        .btns {
            width: 100%;
            padding: 0 10vw;
            text-align: center;
            color: #da428d;
            height: 12vw;
            div {
                width: 50%;
            }
        }
    }
    .pays {
        background: #fff;
        width: 92vw;
        margin: 4vw;
        padding: 20px 4vw;
        .num {
            flex-wrap: wrap;
            margin-bottom: 10px;
            .title {
                font-size: 4.8vw;
                font-weight: 600;
                height: 12vw;
                line-height: 12vw;
                width: 100%;
            }
            input {
                text-align: left;
                width: 100%;
                background: #eee;
                padding: 10px 10px;
                border-radius: 8px;
            }
        }
        .img{
            position: relative;
            img{
                width: 80px;
                height: 80px;
            }
        }
    }
    .tips {
        color: #999;
        font-size: 3.1vw;
        padding: 0 4vw;
    }
    .submit {
        width: 92vw;
        height: 12vw;
        line-height: 12vw;
        text-align: center;
        color: #fff;
        background: #bbb;
        border-radius: 1vw;
        margin: 4vw;
        &.on{
            background: #da428d;
        }
    }
}
</style>