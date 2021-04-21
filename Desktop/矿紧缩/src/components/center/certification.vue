<template>
    <div id="certification">
        <van-nav-bar
        :title="$i18n.certification['實名認證']"
        left-arrow
        fixed
        @click-left="$router.back(-1)"
        />
        <p class="status">
            <span>{{ $i18n.certification['已認證信息'] }}</span>
            <span>[{{ $i18n.certification['認證通過'] }}]</span>
        </p>
        <div class="infoCard">
            <p>
                <span>{{ $i18n.certification['姓名'] }}</span>
                <span>{{ name }}</span>
            </p>
            <p>
                <span>{{ $i18n.certification['證件類型'] }}</span>
                <span>{{ $i18n.certification['身份證'] }}</span>
            </p>
            <p>
                <span>{{ $i18n.certification['證件號碼'] }}</span>
                <span>{{ID}}</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'certification',
    data() {
        return {
            name: '',
            ID: ''
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        async getData () {
            let res = await $ajax('certification', {})
            let {name, ID} = res
            this.name = name
            this.ID = ID
        }
    }
}
</script>
<style lang="less" scoped>
.flex {
    display: flex;
    display: -webkit-flex;
}
#certification {
    background-color: #f6f6f6;
    * {
        box-sizing: border-box;
    }
    p {
        margin: 0;
    }
    p.status {
        font-size: 0.9rem;
        padding: 0.5rem 1rem;
        color: #999;
        margin-top: 50px;
        span:nth-child(2) {
            color: green;
        }
    }
    .infoCard {
        background-color: #fff;
        padding: 0 1rem;
        > p {
            height: 3rem;
            line-height: 3rem;
            .flex;
            justify-content: space-between;
            > span:nth-child(2) {
                color: #999;
            }
        }
        > p:not(:last-child) {
            border-bottom: 1px solid #eee;
        }
    }
}
</style>