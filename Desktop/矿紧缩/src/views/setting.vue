<template>
    <div class="setting">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="20" />
            <p>账户设置</p>
        </div>
        <div class="content">
            <div class="item avatar flex ali_center flex_between">
                <div class="label">头像</div>
                <div class="right flex ali_center">
                    <div class="pic_wrapper">
                        <van-uploader max-count="1" preview-size="50" :after-read="afterRead" />
                        <img class="avatar_1" :src="src" alt="" />
                    </div>
                    <van-icon name="arrow" />
                </div>
            </div>
            <div @click="openNickname" class="item nickname flex ali_center flex_between">
                <div class="label">昵称</div>
                <div class="right flex ali_center">
                    <span class="nickname_1">{{nickname}}</span>
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="item mobile flex ali_center flex_between">
                <div class="label">登录手机号</div>
                <div class="right flex ali_center">
                    <span class="phone">{{mobile}}</span>
                </div>
            </div>
            <div @click="sftype" class="item realname flex ali_center flex_between">
                <div class="label">身份认证</div>
                <div class="right flex ali_center">
                    <span class="realname_1" v-if="sf_type == '1'">已实名</span>
                    <span class="realname_1" v-else>未实名</span>
                    <van-icon name="arrow" />
                </div>
            </div>
        </div>
        <div class="content_1">
            <div class="item flex ali_center flex_between" @click="$router.push('/safe')">
                <div class="label">账户与安全</div>
                <van-icon name="arrow" />
            </div>
            <div class="item flex ali_center flex_between" @click="$router.push('/receiveSet')">
                <div class="label">收/付款设置</div>
                <van-icon name="arrow" />
            </div>
            <!-- <div class="item item-1 flex ali_center flex_between">
                <div class="label">成为合格投资者</div>
                <van-icon name="arrow" />
            </div> -->
        </div>
        <div class="logout" @click="logout">退出当前账户</div>
        <change-name
            :nickname="nickname"
            :showNickname="showNickname"
            @close="closeName"
            @clear="clearname"
            v-if="showNickname"
        ></change-name>
    </div>
</template>
<script>
import changeName from './common/changeName';
export default {
    name: "setting",
    components: {
        changeName
    },
    data() {
        return {
            nickname: "这是昵称",
            showNickname: false,
            show: false,
            src: require("@/assets/images/icon/jyjl.png"),
            mobile: "",
            sf_type: "",
        };
    },
    mounted() {
        this.getlist()
    },
    methods: {
        sftype(){
            if(this.sf_type == 1){

            }else{
                this.$router.push('/user/realname')

            }
        },
        async getlist() {
             let res = await $ajax('userInfo', {
                requstType: "info"
            })
            if(!res) return false
            this.src = res.avatar
            this.nickname = res.nickname
            this.mobile = res.mobile
            this.sf_type = res.sf_type

        },
        async clearname(e) {
            this.nickname = e;
            let res = await $ajax('userSet', {
                nickname: e
            })
            if(!res) return false
            Toast(res.msg)
        },
        async afterRead(e) {
            console.log(e);
            var content = e.content
            let res = await $ajax('userSet', {
                avatar: content
            })
            if(!res) return false
            console.log(res)
            this.src = res.avatar
            Toast(res.msg)

        },
        closeName() {
            this.showNickname = false;
        },
        openNickname() {
            this.showNickname = true;
        },
        logout() {
            Dialog.confirm({
                title: '温馨提示',
                message: '是否退出登录？',
            }).then(async () => {
                // on close
                let res = await $ajax('logout', {})
                if(!res) return false
                
                Toast(res.msg)
                this.$router.push({
                    name: "login"
                })
                localStorage.removeItem('openid')
                localStorage.removeItem('mobile')
            });
        },
    }
}
</script>
<style lang="less" scoped>
.setting {
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
        p {
            width: 100%;
            line-height: 12vw;
            font-size: 4vw;
            text-align: center;
        }
    }
    .content {
        background: #fff;
        padding: 0 4vw;
        .item {
            height: 12vw;
            .label {
                color: #333;
                font-size: 3.73vw;
                font-weight: 600;
            }
            .right {
                .van-icon {
                    margin-left: 2.4vw;
                }
                .pic_wrapper {
                    width: 12vw;
                    height: 12vw;
                    position: relative;
                    .van-uploader {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 12vw;
                        height: 12vw;
                        opacity: 0;
                    }
                    .avatar_1 {
                        width: 12vw;
                        height: 12vw;
                        border-radius: 50%;
                    }
                }
                .nickname_1 {
                    font-size: 3.47vw;
                    font-weight: 600;
                }
                .phone {
                    padding-right: 6vw;
                    color: #666;
                }
                .realname_1 {
                    color: #fff;
                    font-size: 3.2vw;
                    border: 1px solid #da428d;
                    padding: 0.5vw 1vw;
                    border-radius: 0.5vw;
                    background: #da428d;
                }
            }
        }
        .avatar {
            height: 17vw;
        }
    }
    .content_1 {
        padding-top: 3vw;
        .item {
            height: 15vw;
            padding: 0 4vw;
            background: #fff;
            .label {
                color: #333;
                font-size: 3.73vw;
                font-weight: 600;
            }
            .van-icon {
                color: #666;
            }
        }
        .item-1 {
            margin-top: 3vw;
        }
    }
    .logout {
        height: 15vw;
        line-height: 15vw;
        text-align: center;
        margin-top: 3vw;
        background: #fff;
        color: #da428d;
        font-weight: 600;
        font-size: 3.2vw;
        
    }
}
</style>