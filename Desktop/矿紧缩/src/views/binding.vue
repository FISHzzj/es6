<template>
    <div class="binding">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" color="#000" size="20" />
            <p>绑定{{typeName}}</p>
            <span @click="cancle" v-if="id != 0">解绑</span>
        </div>
        <div style="height:12vw"></div>
        <div class="container">
            <div class="content" v-if="type == 'bank'">
                <van-field :required="true" input-align="right" v-model="bank.realname" label="真实姓名" placeholder="请输入真实姓名" />
                <van-field :required="true" input-align="right" v-model="bank.card_id" label="银行卡号" placeholder="请输入银行卡号" />
                <van-field :required="true" input-align="right" v-model="bank.bankname" label="开户银行" placeholder="请输入开户银行" />
                <van-field :required="true" input-align="right" v-model="bank.bankAddress" label="开户支行" placeholder="请输入开户支行" />
            </div>
            <!-- <div class="content" v-if="type == 'weixin'">
                <van-field :required="true" input-align="right" v-model="bank.realname" label="微信昵称" placeholder="请输入微信昵称" />
                <van-field :required="true" input-align="right" v-model="bank.realname" label="微信号" placeholder="请输入微信号" />
            </div> -->
            <!-- <div class="content" v-if="type == 'ali'">
                <van-field :required="true" input-align="right" v-model="bank.realname" label="真实姓名" placeholder="请输入真实姓名" />
                <van-field :required="true" input-align="right" v-model="bank.realname" label="支付宝账号" placeholder="请输入真实姓名" />
            </div> -->
            <div class="usdt" v-if="type == 'USDT'">
                <div class="title">链类型</div>
                <div class="nav flex ali_center">
                    <div class="item" :class="{on: status == 0}" @click="change(0)">ERC20</div>
                    <div class="item" :class="{on: status == 1}" @click="change(1)">TRC20</div>
                </div>
            </div>
            <div
                class="eng"
                v-if="
                  type == 'USDT' ||
                    type == 'BTC' ||
                    type == 'ETH' ||
                    type == 'FIL'
                "
            >
                <div class="title flex ali_center flex_between">
                    <p><span>*</span>{{typeName}}</p>
                    <van-icon name="scan" size="20" />
                </div>
                <input class="address" type="text" :placeholder="'请输入' + type + '钱包地址'" v-model="address" />
            </div>
            <van-field
                v-model="sms"
                center
                clearable
                input-align="right"
                label="短信验证码"
                :required="true"
                placeholder="请填写"
            >
                <template #button>
                    <van-button size="small" @click="senVerifyCode()">{{timeAndTextOfSendcode}}</van-button>
                </template>
            </van-field>
            <div class="code" v-if="type == 'weixin' || type == 'ali'">
                <div class="left" v-if="type == 'weixin'"><span>*</span>微信收款吗</div>
                <div class="left" v-if="type == 'ali'"><span>*</span>支付宝收款吗</div>
                <div class="img flex">
                    <van-uploader preview-size="192" after-read="afterread"></van-uploader>
                </div>
            </div>
        </div>
        <div class="tips">
            <div class="title">温馨提示：</div>
            <div class="tip">1.带*的选型为必填项</div>
            <div class="tip">1.用户信息仅限于绑定,平台保障用户信息安全.</div>
        </div>
        <div class="submit" @click="submit">{{id != 0?'修改绑定':'提交'}}</div>
    </div>
</template>
<script>
export default {
    name: "binding",
    data() {
        return {
            sms: "",
            bank: {
                realname: "",
                card_id: "",
                bankname: "",
                bankAddress: "",
            },
            timeAndTextOfSendcode: "发送验证码",
            address:"",
            id: 0,
            status: 0,
            type: "",
            typeName: "",
            mobile: "",
        };
    },
    created() {
        this.mobile = localStorage.getItem("mobile")
        if (this.$route.query.id) {
            this.id = this.$route.query.id;
        }
        this.type = this.$route.query.type;
        if (this.type == "bank") {
            this.typeName = "银行卡";
        } else if (this.type == "weixin") {
            this.typeName = "微信";
        } else if (this.type == "ali") {
            this.typeName = "支付宝";
        } else if (this.type == "USDT") {
            this.typeName = this.type + "地址";
        } else if (this.type == "BTC") {
            this.typeName = this.type + "地址";
        } else if (this.type == "ETH") {
            this.typeName = this.type + "地址";
        } else if (this.type == "FIL") {
            this.typeName = this.type + "地址";
        }
    },
    methods: {
        timing () {
            this.timer = setInterval( () => {
                this.timeAndTextOfSendcode--
                if (this.timeAndTextOfSendcode <= 0) {
                    clearInterval(this.timer)
                    this.timeAndTextOfSendcode = '发送验证码'
                }
            }, 1000)
        },
        // 发送验证码
        async senVerifyCode () {
            // let { register } = this.$i18n
            
            if ( this.timeAndTextOfSendcode !== '发送验证码') return false
            if (!this.mobile) return Toast( '请输入手机号')
            let res = await $ajax('accountverifycode',{
                mobile: this.mobile,
                // temp: 'sms_reg'
            })
            if (!res) return false
            Toast(res.msg)
            this.timeAndTextOfSendcode = 60
            this.timing() //執行倒計時
        },
        async submit() {
            if(this.type == "bank"){
                let {realname,card_id,bankname,bankAddress } = this.bank
                if (!realname) return Toast('请输入真实姓名')
                if (!card_id) return Toast('请输入银行卡号')
                if (!bankname) return Toast('请输入开户银行')
                if (!bankAddress) return Toast('请输入开户支行')
                if (!this.sms) return Toast('请输入短信验证码')
                let res = await $ajax('userpayment', {
                    realname: realname,
                    bankcard: card_id,
                    opencard: bankname,
                    openbranch: bankAddress,
                    paymentType: "1",
                    code:this.sms
                })
                if (!res) return false
                Toast(res.msg)
                this.$router.go(-1)

            }else{
                var paymentType = ""
                if (!this.address) return Toast('请输入钱包地址！')
                if (!this.sms) return Toast('请输入短信验证码!')
                if(this.type == "USDT"){
                    paymentType = "2"
                    
                }else if(this.type == "BTC"){
                    paymentType = "3"
                }else if(this.type == "ETH"){
                    paymentType = "4"
                }else if(this.type == "FIL"){
                    paymentType = "5"
                }
                let res = await $ajax('userpayment', {
                    wallet:this.address,
                    paymentType: paymentType,
                    usdtType: this.status,
                    code: this.sms
                })
                if (!res) return false
                Toast(res.msg)
                this.$router.go(-1)
            }
            
            
        },
        afterRead(res) {

        },
        change(index) {
            this.status = index;
        }
    }
}
</script>
<style lang="less" scoped>
.binding {
    padding: 0 4vw;
    background: #f7f7f7 !important;
    .header {
        width: 100%;
        height: 12vw;
        top: 0;
        left: 0;
        position: fixed;
        background: #f7f7f7;
        z-index: 100;
        color: #000;
        .van-icon {
            position: absolute;
            top: 0;
            left: 3vw;
            bottom: 0;
            height: 4vw;
            margin: auto 0;
        }
        p {
            width: 100%;
            line-height: 12vw;
            font-size: 4vw;
            text-align: center;
        }
        span {
            position: absolute;
            top: 0;
            bottom: 0;
            line-height: 12vw;
            right: 4vw;
            margin: auto 0;
            font-size: 3.2vw;
            color: #999;
        }
    }
    .container {
        .van-cell {
            background: transparent !important;
        }
        .eng {
            padding-left: 1vw;
            margin-bottom: 5vw;
            .title {
                height: 12vw;
                color: #333;
                p {
                    font-size: 3.73vw;
                    span {
                        color: #fc4142;
                    }
                }
            }
            .address {
                height: 12vw;
                width: 100%;
                line-height: 12vw;
                border-bottom: 1px solid #da428d;
            }
        }
        .usdt {
            .title {
                line-height: 12vw;
                font-weight: 600;
                font-size: 3.73vw;
            }
            .nav {
                height: 15vw;
                .item {
                    color: #999;
                    background: #eee;
                    width: 20vw;
                    height: 10vw;
                    line-height: 10vw;
                    border-radius: 2vw;
                    text-align: center;
                    margin-right: 3vw;
                    &.on {
                        color: #da428d;
                        border: 1px solid #da428d;
                        background: transparent;
                    }
                }
            }
        }
        .code {
            margin-top: 5vw;
            .left {
                padding: 0 2vw;
                font-size: 3.73vw;
                line-height: 12vw;
                color: #666;
                span {
                    color: #fc4142;
                }
            }
            .img {
                justify-content: center;
                width: 200px;
                height: 200px;
                border: 1px solid #eee;
                border-radius: 2vw;
                margin: 0 auto;
            }
        }
        .content {
            margin-bottom: 4vw;
        }
    }
    .tips {
        margin: 8vw 0 8vw;
        .title {
            line-height: 8vw;
            color: #666;
            font-size: 3.73vw;
        }
        .tip {
            color: #999;
            font-size: 3.2vw;
            line-height: 5vw;
        }
    }
    .submit {
        width: 92vw;
        color: #fff;
        background: #da428d;
        font-size: 4.2vw;
        line-height: 12vw;
        height: 12vw;
        border-radius: 2vw;
        text-align: center;
    }
}
</style>