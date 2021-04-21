<template>
    <div id="cashAddress">
        <van-nav-bar
        :title="$i18n.cashAddress['提幣地址']"
        left-arrow
        :right-text="$i18n.cashAddress['編輯']"
        fixed
        @click-left="reback()"
        @click-right="showEdit"
        />
        <div class="cardBox">
            <div :class="['card', `${ show ? 'translate' : 'translateInit'}`]" 
            v-for="item in list" :key="item.id">
                <p>
                    <i class="iconfont icondizhi"></i>
                </p>
                <div @click="select(item.id)">
                    <p>
                        <span>{{ $i18n.cashAddress['地址'] }}</span>
                        <span>{{item.address}}</span>
                    </p>
                    <p>
                        <span>{{ $i18n.cashAddress['標籤'] }}</span>
                        <span>{{item.label}}</span>
                    </p>
                </div>
                <p>
                    <i @click="select(item.id)"
                    v-if="isCenter"
                    :class="['iconfont',
                    `${currentSelect === item.id ? 'iconbianzufuzhi' : 'iconxuanze1'}`,
                    `${currentSelect === item.id ? 'green' : 'gray'}`]">
                    </i>
                </p>
                <p>
                    <van-button type="info" size="small" @click="changeAddress(item.id)">
                        {{ $i18n.cashAddress['修改'] }}
                    </van-button>
                    <van-button type="warning" size="small" @click="removeAddress(item.id)">
                        {{ $i18n.cashAddress['刪除'] }}
                    </van-button>
                </p>
            </div>
        </div>
        <router-link to="/pushAddress/0" tag="div" class="add">
            + {{ $i18n.cashAddress['添加提幣地址'] }}
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'cashAddress',
    data() {
        return {
            list: [],
            show: false,
            currentSelect: '',
            isCenter: sessionStorage.getItem('isCenter') === '1' ? false : true, // 用於判斷進入該路由的是否爲我的(center)頁面
        }
    },
    created () {
        this.getData()
    },
    beforeRouteEnter (to, from, next) {
        // 進入之路由 爲 center
        if (from.name === 'center') {
            sessionStorage.setItem('isCenter', '1')
        }
        next()
    },
    methods: {
        async getData () {
            let res = await $ajax('cashAddress', {})
            if (!res || res.length <= 0) return false
            this.list = res
            this.currentSelect = res[0].id
        },
        // 更改提幣地址
        changeAddress (id) {
            // 跳轉路由, 傳遞參數
            this.$router.push({ 
                name: 'pushAddress', 
                params: {
                    id
                }
            })
        },
        // 地址選擇
        select (id) {
            if (!this.isCenter) return false // 若爲我的頁面進入的, 則終止函數
            this.currentSelect = id
            this.reback()
        },
        // 編輯
        showEdit () {
            this.show = !this.show
        },
        // 刪除地址
        async removeAddress (id) {
            let res = await $ajax( 'delAddress', { id } )
            if (!res) return false
            Toast({
                message: res.msg
            })
            // 根據 id ,移除數據
            let selectIndex = '' //刪除id 所在 數組之 索引
            this.list.some( (item, index) => {
                if (item.id === id) {
                    selectIndex = index
                    return true
                }
            })
            this.list.splice(selectIndex, 1)
        },
        // 帶 id 參數返回 / 根據 sessionStorage 不同, 進行跳轉
        reback () {
            if (sessionStorage.getItem('isCenter')) {
                this.$router.push({
                    name: 'center',
                })
                sessionStorage.removeItem('isCenter')
                return false
            }
            this.$router.push({
                name: 'withdrawals',
                params: { 
                    addressId: this.currentSelect || 0
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.translateInit {
    transition: 0.4s;
    transform: translateX(0);
}
.translate {
    transition: 0.4s;
    transform: translateX(-25%);
}


#cashAddress {
    overflow: hidden;
    width: 100%;
}
#cashAddress * {
    box-sizing: border-box;
}
.flex {
    display: flex;
    display: -webkit-flex;
}
.cardBox {
    padding: 0 1rem;
    margin-top: calc(50px + 1rem);
}
.add {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #1989fa;
    color: white;
    width: 100%;
    text-align: center;
    height: 3rem;
    line-height: 3rem;
}
.card {
    .flex;
    position: relative;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 5px;
    margin-bottom: 1rem;
    .iconfont {
        font-size: 1rem;
    }
    p {
        margin: 0;
    }
    > p:first-child {
        .flex;
        margin-right: 5px;
        flex-direction: column;
        position: relative;
    }
    > p:nth-of-type(2) {
        .flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
    }
    > p:nth-of-type(3) {
        .flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        right: -25%;
        button {
            margin-bottom: 5px;
        }
    }
    > div {
        .flex;
        flex-direction: column;
        width: calc(100% - 5px - 1rem);
        > p {
            span:first-child {
                color: #999;
            }
            span {
                display: block;
                word-break: break-all;
                word-wrap: break-word;
                margin-bottom: 5px;
            }
        }
    }
}
</style>