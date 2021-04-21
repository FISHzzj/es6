<template>
  <div class="test-wrap">
    <v-status-test v-if="isShow"></v-status-test>
    <ul >
      <li v-for="(item,index) in allList" :key="index">
        编号：{{item.id}}
        姓名：{{item.name}}
        性别：{{item.sex}}
      </li>
    </ul>
    <p>
      <button class="hide" @click="hide">隐藏</button>
      <button class="show" @click="show">展示</button>
      <button class="addList1" @click="invokePushItems(items)">异步提交数据</button>
      <button class="addList2" @click="pushCollects(items)">同步提交数据</button>
    </p>
  </div>
</template>

<script>
import StatusTest from './StatusTest.vue'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'


export default {
  name : 'test',
  data () {
    return {
      items : {
        id : 0,
        name : 'zzj',
        sex : 'man'
      }
    }
  },
  components : {
    'v-status-test' : StatusTest
  },
  mounted() {
    console.log(this.isShow)
    console.log(this.allList)
  },
  computed: {
    ...mapState({  //
      isShow : state => state.footerstatus.showFooter, //获取isShow
      allList: state => state.collection.collects, //获取changeNum
    }),

    //你也可以使用下面的方式来获取 isShow 的值
    // footerStatus指的是modules文件夹下的footerStatus.js模块
     // 第一个isShow是我自定义的只要对应template里v-if="isShow"就行，
      // 第二个isShow是对应的footerStatus.js里的getters里的isShow
    ...mapGetters('footerstatus', {
      isShow : 'isShow'
    }),
    ...mapGetters('collection', {
      allList : 'renderCollects'
    })

  },
  methods: {
    hide () {
      this.$store.dispatch('footerstatus/hideFooter')
    },
    show () {
      this.$store.dispatch('footerstatus/showFooter')
    },
    //异步提交数据
    ...mapActions ('collection', [
      'invokePushItems'  // -> this.invokePushItems
    ]),
    //同比提交数据
    ...mapMutations ('collection', [
      'pushCollects'  // -> this.pushCollect
    ])
  },


}
</script>