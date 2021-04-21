<template>
    <div class="poster">
        <div class="header">
            <van-icon @click="$router.go(-1)" name="arrow-left" size="20" />
            <p>邀请好友</p>
        </div>
        <div style="height:12vw"></div>
        <div class="code">
            <img :src="img" alt="" />
            <p class="yqcode">邀请码：{{yqCode}}</p>
        </div>
        <div class="list">
            <div class="title">已累计邀请<span>{{total}}</span>人，今日新增<span>{{today_user}}</span>人</div>
            <div class="title1 flex ali_center">
                <span class="time">注册时间</span>
                <span class="mobile">好有手机号</span>
            </div>
            <div class="item flex ali_center" v-for="(item,index) in list" :key="index">
                <span>{{item.createtime}}</span>
                <span>{{item.mobile}}</span>
            </div>
        </div>
        <div class="save" @click="toDownLoad">保存一下</div>
    </div>
</template>
<script>
export default {
    name: "poster",
    data(){
        return{
            img: "",
            yqCode: "",
            today_user: "",
            total: "",
            list: "",

        }
    },
    mounted(){
        this.getData()
        this.getlist()
    },
    methods:{
        async getData() {
            let res = await $ajax('useryqCode', {})
            if(!res) return false
            this.img = res.img
            this.yqCode = res.yqCode
        },
        async getlist() {
            let res = await $ajax('useryqCodeuserLog', {})
            if(!res) return false
            this.today_user = res.today_user
            this.total = res.total
            this.list = res.list
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
            let resDownload = await apicloud.download(this.img)
            if (!resDownload.isOk) {
                toast.clear() //取消加載提示
                return alert(`downloadErr${resDownload.err}`)
            }
            let resSave = await apicloud.saveToAlbum(resDownload.path)
            if (!resSave.isOk) {
                toast.clear() //取消加載提示
                return alert(`saveErr:${resSave.err}`)
            }
            toast.clear() //取消加載提示
            // this.longTouch = false //重置回未長按
            Toast('下載完成')
        }
        
    }
}
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
}
.poster {
    background: #f7f7f7 !important;
    .header {
        width: 100%;
        height: 12vw;
        position: fixed;
        top: 0;
        left: 0;
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
    .code {
        text-align: center;
        img {
            width: 70vw;
            height: auto;
        }
        .yqcode{
            padding: 10px;
            text-align: center;
            background: #fff;
        }
    }
    .list {
        width: 92vw;
        margin: 4vw;
        padding: 1vw 0.5vw 3vw;
        background: #fff;
        border-radius: 2vw;
        .title {
            height: 12vw;
            line-height: 12vw;
            border-radius: 1vw;
            text-align: center;
            span {
                color: #da428d;
                margin: 0 1vw;
            }
            background: #fff;
        }
        .title1 {
            height: 12vw;
            line-height: 12vw;
            border-bottom: 1px dashed #ccc;
            color: #999;
            font-size: 3.47vw;
            text-align: center;
            span {
                width: 50%;
            }
        }
        .item {
            text-align: center;
            height: 10vw;
            line-height: 10vw;
            color: #333;
            font-size: 3.47vw;
            span {
                width: 50%;
            }
        }
    }
    .save {
        background: #da428d;
        width: 92vw;
        position: fixed;
        bottom: 2vw;
        left: 4vw;
        height: 12vw;
        line-height: 12vw;
        text-align: center;
        color: #fff;
        border-radius: 1vw;
    }
}
</style>