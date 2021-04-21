<template>
    <div id="center">
        <van-nav-bar
        :title="$i18n.center['我的']"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <div class="info">
            <div>
                <img :src="avatar">
            </div>
            <div>
                <p>
                    <span>{{ $i18n.center['手機號碼'] }} : </span>
                    <span>{{mobile}}</span>
                </p>
                <p>
                    <span>{{ $i18n.center['邀請碼'] }} : </span>
                    <span>{{inviteCode}}</span>
                    <span class="copy" :data-clipboard-text="inviteCode">
                        <i class="iconfont iconfuzhi"></i>
                    </span>
                </p>
                <p>
                    <span>ID : </span>
                    <span>{{id}}</span>
                </p>
            </div>
            <div>
                <img :src="level">
            </div>
            <!-- <div class="tyle_div">{{tyle_div}}</div> -->
        </div>
        <div class="list">
            <router-link class="item" :to="`${verified === 1 ? '/certification' : `/toCertificate/${verified}`}`" tag="p">
                <span>
                    <i class="iconfont iconshimingrenzheng"></i>
                </span>
                <span>{{ $i18n.center['實名認證'] }}</span>
                <span>
                    {{
                        verifiedStatus()
                    }}
                    <i class="iconfont iconsanx-up1"></i>
                </span>
            </router-link>
        </div>
        <div class="list" v-for="(item, index) in list" :key="index">
            <Item :data="item" >
            </Item>
        </div>
        <div class="exit" @click="exit()">
            <span>
                <i class="iconfont iconlogout"></i>
            </span>
            <span>{{ $i18n.center['登出'] }}</span>
            <span>
                <i class="iconfont iconsanx-up1"></i>
            </span>
        </div>
    </div>
</template>

<script>
import Item from './sub/item.vue'
import defaultAvatar from '@/assets/images/defaultAvatar.jpg'
import V0 from '@/assets/images/vip0.png'
import V1 from '@/assets/images/vip1.png'
import V2 from '@/assets/images/vip2.png'
import V3 from '@/assets/images/vip3.png'
const levelImg = {
    V0,
    V1,
    V2,
    V3,
}
 // 複製模塊
import {copy} from '../../func/copy'

export default {
    name: 'center',
    components: {
        Item
    },
    data () {
        return {
            mobile: '',
            inviteCode: '',
            id: '',
            avatar: '',
            verified: -1,
            level: '',
            tyle_div:"未激活",
            // 列表 內容 配置
            list: [
                {
                    icon: 'iconicon_tianjiahaoyou',
                    content: this.$i18n.center['邀請好友'],
                    route: '/invite',
                },
                {
                    icon: 'icontuandui',
                    content: this.$i18n.center['我的團隊'],
                    route: '/team',
                },
                {
                    icon: 'iconfenxiang',
                    content: this.$i18n.center['提幣地址'],
                    route: '/cashAddress',
                },
                {
                    icon: 'iconanquanguanli',
                    content: this.$i18n.center['賬戶安全'],
                    route: '/safe',
                },
                {
                    icon: 'iconwenti',
                    content: this.$i18n.center['問題反饋'],
                    route: '/feedback',
                },
                {
                    icon: 'iconfenxiang',
                    content: this.$i18n.center['動態分享'],
                    route: '/announcement',
                },
            ]
        }
    },
    methods: {
        async getData () {
            let res = await $ajax('center',{})
            // console.log(res)

            if(res.jihuo==true){
                this.tyle_div="已激活"
            }

            let {id, mobile, inviteCode, verified, avatar, level} = res
            this.avatar = avatar || defaultAvatar
            this.id = id
            this.mobile = mobile
            this.inviteCode = inviteCode
            this.verified = verified
            this.level = levelImg[`V${level}`]
        },
        verifiedStatus () {
            let {verified} = this
            return  verified === -1 ? this.$i18n.center['未實名'] :　
                    verified === 0 ? this.$i18n.center['审核中'] :
                    verified === 1 ? this.$i18n.center['已實名'] : this.$i18n.center['已駁回']
        },
        exit () {
            localStorage.removeItem('openid')
            localStorage.removeItem('ip')
            localStorage.removeItem('mobile')
            window.location.reload()
        },
    },
    mounted () {
        this.clipboard = copy('.copy') //傳遞複製按鈕選擇器
        this.getData()
    },
    beforeDestroy () {
        this.clipboard.destroy() //銷毀複製實例
    }
}
</script>
<style lang="less" scoped>
.flex {
    display: flex;
    display: -webkit-flex;
}
div.info {
    height: 8.5rem;
    width: 90%;
    position: relative;
    margin: 0 auto;
    margin-top: 50px;
    border-radius: 5px;
    background-image: url(../../assets/images/centerInfoBg.png);
    background-size: 100% 100%;
    color: white;
    .flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 1rem;
    p {
        margin: 0;
    }
    > div:first-child {
        width: 4rem;
        margin-right: 10px;
        img {
            width: 100%;
        }
    }
    > div:nth-child(2) {
        flex-grow: 1;
        height: 100%;
        .flex;
        flex-direction: column;
        justify-content: center;
        font-size: 0.95rem;
        p:not(:last-child) {
            margin-bottom: 8px;
        }
    }
    > div:nth-child(3) {
        width: 3rem;
        img {
            width: 100%;
        }
    }
    .tyle_div{
        position: absolute;
        right: 4%;
        bottom: 11%;
        border: 1px solid #fff;
        padding: 2px 10px;
        border-radius: 30px;
    }

}
div.list {
    box-sizing: border-box;
    width: 95%;
    margin: 0 auto;
}
.exit {
    .flex;
    box-sizing: border-box;
    width: 95%;
    margin: 0 auto;
    align-items: center;
    > span:first-child {
        margin-right: 1rem;
        i {
            font-size: 2rem;
            color: #1989fa;
        }
    }
    > span:nth-child(2) {
        flex-grow: 1;
    }
    > span:last-child {
        color: #ccc;
    }
}
.item {
    .flex;
    align-items: center;
    > span:first-child {
        margin-right: 1rem;
        i {
            font-size: 2rem;
            color: #1989fa;
        }
    }
    > span:nth-child(2) {
        flex-grow: 1;
    }
    > span:last-child {
        color: #ccc;
    }
}
</style>