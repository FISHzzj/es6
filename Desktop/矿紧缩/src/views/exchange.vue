<template>
    <div class="exchange">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="20" />
            <p>{{typetype}}</p>
            <span @click="showService = true">联系客服</span>
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
            <div v-if="type == 'USDT'" class="types flex ali_center">
                <span>链类型：</span>
                <div class="on" @click="changenav('ERC')">TRC20</div>
                <div @click="changenav('TRC')">ERC20</div>
            </div>
            <img class="code" :src="code" alt="" />
            <div class="address">{{wallet}}</div>
            <div class="btns flex ali_center flex_between">
                <div class="copy" :data-clipboard-text="wallet">复制地址</div>
                <div class="save" @click="toDownLoad">保存图片</div>
            </div>
        </div>
        <div class="pays">
            <div class="num flex flex_between ali_center">
                <div class="title">{{typetype}}数量</div>
                <input v-model="num" type="text" placeholder="输入转入数量" />
            </div>
            <div class="img flex flex_between ali_center">
                <div class="title">完成转账截图</div>
                <van-uploader :after-read="afterRead" v-if="!baseimg" />
                <img :src="baseimg" alt="" v-if="baseimg" >
            </div>
        </div>
        <div class="tips">
            <p>温馨提示：</p>
            <div>转账钱请无比确认地址接比重信息无误，已经转出则不可撤销，USDT充值链名称为ERC20，请仔细核对。</div>
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
    name: "exchange",
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

        }
    },
    mounted(){
        this.type = this.$route.params.type
        this.typetype = this.$route.params.typetype
        //傳遞複製按鈕選擇器, 接受複製插件的 clipboard 實例
        this.clipboard = copy('.copy')
        this.getData()
    },
    methods: {
        async getData() {
            
            let type = this.type.toLowerCase()
            // let type = this.type.toLowerCase()
            let res = await $ajax('userrecharge', {rechargeType: type, getType: 1 })
            if(!res) return false
            this.money = res.money
            this.code = res.code
            this.wallet = res.wallet
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
            if(!this.baseimg) return Toast("请上传转账截图!")
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
                getType: 1,
                image: this.baseimg,
                money: this.num,
                // realname: this.zhuanname,
                accountType: this.accountType,
                lid: this.id,
            })
            if(!res) return false
            console.log(res)
            Toast(res.msg)
            this.$router.go(-1)
        },
        async toDownLoad () {
            // 如果不是 在 app 中使用
            if (!apicloud) {
                console.warn('此功能只能在 app 中使用')
                return false
            }
            // 進行登錄 提示
			const toast = Toast.loading({
				message: '下載中',
				forbidClick: true, // 禁用背景点击
				loadingType: 'spinner',
				position: 'bottom',
				duration: 0
            })
            let resDownload = await apicloud.download(this.code)
            // alert(resDownload.isOk)
            if (!resDownload.isOk) {
                toast.clear() //取消加載提示
                // alert(JSON.stringify(esDownload.err))
                return alert(`downloadErr${resDownload.err}`)
            }
            let resSave = await apicloud.saveToAlbum(resDownload.path)
            // alert(resSave.isOk)
            if (!resSave.isOk) {
                toast.clear() //取消加載提示
                return alert(`saveErr:${resSave.err}`)
            }
            toast.clear() //取消加載提示
            // this.longTouch = false //重置回未長按
            Toast('下載完成')
        }
    }
};
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.exchange {
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
        height: 120vw;
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
            width: 50vw;
            height: 50vw;
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
        padding: 0 4vw;
        .num {
            .title {
                font-size: 4.8vw;
                font-weight: 600;
                height: 12vw;
                line-height: 12vw;
            }
            input {
                text-align: right;
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