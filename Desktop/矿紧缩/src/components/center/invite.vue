<template>
    <div>
        <van-nav-bar
        title="邀请好友"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <div id="invite" @touchstart="touchStrat" @touchend="touchEnd">
            <img :src="img" alt="分享二維碼">
        </div>
    </div>

</template>

<script>
export default {
    name: 'invite',
    data() {
        return {
            img: '',
            longTouch: false, // 長觸碰控制器
            timer: 0, //計時器
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        async getData() {
            let res = await $ajax('invite', {})
            this.img = res
        },
        touchStrat () {
            this.timer = setTimeout( () => {
                this.longTouch = true //達到長按
                Dialog.confirm({
                    title: this.$i18n.invite['提示'],
                    message: this.$i18n.invite['確定下載圖片嗎']
                })
                .then( () => {
                    this.toDownLoad()
                }).catch( err => {
                    console.log(err)
                    this.longTouch = false
                })
            }, 500)
        },
        async touchEnd () {
            // 如果未達到長按
            if (!this.longTouch) {
                clearTimeout(this.timer)
                return false
            }
        },
        async toDownLoad () {
            // 如果不是 在 app 中使用
            if (!apicloud) {
                console.warn('此功能只能在 app 中使用')
                return false
            }
            // 進行登錄 提示
			const toast = Toast.loading({
				message: this.$i18n.invite['下載中'],
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
            this.longTouch = false //重置回未長按
            Toast( this.$i18n.invite['下載完成'] )
        }
    }
}
</script>
<style lang="less" scoped>
#invite {
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    background-color: #999;
    img {
        width: 100%!important;
        height: 100%;
    }
}
</style>