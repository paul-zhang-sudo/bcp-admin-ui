<template lang="html">
  <div class="app-container">
    <mod-filter :datas="datas" @query="getData">
      <template slot="lastBtn">
        <sxf-export-excel :params="datas.params" :sxf-export-data="sxfExportData" />
      </template>
      <template slot="enable" slot-scope="scope">
        <span>{{ scope.value.enable?'启用':'禁用' }}</span>
      </template>
    </mod-filter>
  </div>
</template>

<script>
import * as api from '@/api/userlog'

export default {
  data() {
    return {
      sxfExportData: {
        url: api.URL.userlog,
        title: '日志表',
        sheetName: '操作日志',
        fileName: '操作日志.xls'
      },
      tableData: [],
      params: {
        currentPage: 1,
        pageSize: 10
      },
      datas: {
        multipleSelection: [],
        params: {
          currentPage: 1,
          pageSize: 10
        },
        table: {
          selection: true,
          loading: true
        },
        resData: {
          rows: [],
          pageSize: 10,
          currentPage: 1,
          totalCount: 0
        },
        filterList: [
          {
            type: 'sxf-proplist',
            prop: 'page',
            conditionshow: true,
            filedShow: true,
            label: '页面',
            placeholder: 'fw.userLog.page',
            optList: []
          },
          {
            type: 'sxf-freelist',
            prop: 'free',
            params: '1,97,98',
            conditionshow: true,
            filedShow: true,
            label: '页面',
            placeholder: 'user_freelist',
            optList: []
          },
          {
            type: 'sxf-proplist',
            prop: 'operation',
            conditionshow: true,
            filedShow: true,
            label: '操作',
            placeholder: 'fw.userLog.operation',
            optList: []
          },
          {
            type: 'input',
            prop: 'operator',
            conditionshow: true,
            filedShow: true,
            label: '操作人',
            placeholder: '操作人',
            optList: []
          },
          {
            type: 'input',
            prop: 'createTime',
            conditionshow: false,
            filedShow: true,
            isSearchHide: true,
            label: '操作时间',
            placeholder: '操作时间',
            optList: []
          },
          {
            type: 'daterange',
            // prop: 'createTimeRange',
            dateProp: 'createTimeRange',
            props: ['createTimeBegin', 'createTimeEnd'],
            conditionshow: true,
            isSearchHide: false,
            just: true,
            createTimeRange: [],
            label: '操作时间',
            startTitle: '开始日期',
            endTitle: '结束日期'
          },
          {
            type: 'input',
            prop: 'params',
            conditionshow: true,
            filedShow: true,
            label: '参数',
            placeholder: '参数',
            optList: []
          }
        ]
      }
    }
  },
  async created() {
  },
  mounted() {},
  methods: {
    getData(datas = this.datas) {
      for (const item in datas.params) {
        if (!datas.params[item]) {
          delete datas.params[item]
        }
      }
      this.$set(this, 'datas', datas)
      this.$set(this, 'params', datas.params)
      this.$set(this.datas.table, 'loading', true)
      api.getPage(this.params).then(res => {
        this.$set(this.datas.resData, 'rows', res.model)
        this.$set(this.datas.params, 'currentPage', res.currentPage)
        this.$set(this.datas.params, 'pageSize', res.pageSize)
        this.$set(this.datas.resData, 'totalCount', res.totalCount)
        this.$set(this.datas.table, 'loading', false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
