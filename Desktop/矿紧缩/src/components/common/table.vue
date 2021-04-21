<template>
    <div class="tableBox">
        <table ref="refTable">
            <thead :style="styleSet">
                <tr>
                    <th :style="`width:${thWidth}`" v-for="(item, index) in thead || []" :key="index">
                        {{ item }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in tbody || []" :key="index">
                    <td v-for="(son, ind) in item" 
                        :key="ind" 
                        v-html="son"
                        @click="prevImg(son)">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
export default {
    name: 'tableBox',
    data () {
        return {
            
        }
    },
    props: ['thead', 'tbody', 'styleSet', 'thWidth'],
    methods: {
        setTableWidth () {
            let length =  this.thead ? this.thead.length : 5
            // 如果 传递 的 thead 数组 长度 大于7, 则 每多1, + 4rem
            if (length > 4) {
                this.$refs.refTable.style.width = `calc(100% + ${(length - 4) * 6}rem)`
            }
        },
        prevImg (arg) {
            try {
                // 如果 相应 的 对象 是 html 标签
                if (arg.indexOf('<') !== -1 && arg.indexOf('img') !== -1) {
                    // 利用 正则 表达式, 提取 src 中的 url
                    let reg = /src="([^"]*)"/g
                    let src = arg.match(reg)[0]
                    let url = src.substring(5, src.length-1)
                    this.$imagePreview([url])  //预览图片
                }
            }
            catch (err) {
                console.warn(err)
            }
        }
    },
    mounted () {
        this.setTableWidth()
    }
}
</script>


<style scoped>
.tableBox {
    overflow-x: scroll;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 1rem;
}
table {
    border-collapse:collapse;
    min-width: 100%;
    color: black;
    border: 1px solid #ccc;
    border-bottom: transparent;
    font-size: 0.95rem;
}
thead {
    background-color: #f8f8f8;
    border-bottom: 1px solid #ccc;
}
th {
    font-weight: 100;
    height: 2.5rem;
}
table tbody tr {
    text-align: center;
}
table tbody tr:not(:last-child) {
    border: 1px solid #ccc;
}
td {
    height: 2.5rem;
    max-width: 6rem;
    font-size: 0.8rem;
    word-wrap: break-word;
    word-break: break-all;
}
</style>
