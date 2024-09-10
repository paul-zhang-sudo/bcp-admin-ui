<template lang="html">
  <div class="app-container">
    <el-form ref="searchForm" :model="searchForm" label-width="100px" size="mini" inline-message label-position="top">
        <el-form-item>
          <el-date-picker
            v-model="searchForm.runTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
          <el-input size="mini" v-model="searchForm.taskId" placeholder="请输入任务名称" maxlength="50" style="width: 200px;"></el-input>
          <el-button size="mini" @click="getData">搜索</el-button>
        </el-form-item>
      </el-form>
      <br>
      <div>
        <el-table :data="tableData" class="mt10" :cell-style="{padding:'10px 0px'}" :header-cell-style="{background:'#fafafa',color:'#606266',padding:'12px 0px','text-align':'center'}" fit
                  highlight-current-row style="width: 100%">
        <el-table-column prop="index" label="序号" width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
          <el-table-column prop="sourceType" align="center" label="任务名称" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.taskName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="运行方式">
            <template slot-scope="scope">
              <span>{{ scope.row.execType }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="总条数">
            <template slot-scope="scope">
              <span>{{ scope.row.validSize_sum }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="成功条数">
            <template slot-scope="scope">
              <span>{{ scope.row.successSize_sum }}</span>
            </template>
          </el-table-column>
          <el-table-column align="right" label="失败条数">
            <template slot-scope="scope">
              <span>{{ scope.row.validSize_sum - scope.row.validSize_sum }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
  </div>
</template>

<script>
import * as api from '@/api/taskStatistics'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      rowData: {
        id: null,
        name: null,
        code: null,
        type: null,
        remark: null
      },
      searchForm: {
        taskId: '', //任务id
        runTime: [] //允许时间段
      },
      tableData: []
    }
  },
  async created() {
     this.initData()
     this.getData()
  },
  mounted() {
  },
  computed: {
    ...mapGetters([
      'cur_user'
    ])
  },
  methods: {
    input(data){
      console.log('data===>',data)
    },
    inputByMenu() {
      this.subFormData.cron = null
    },
    inputByCustom() {
      this.subFormData.cron = null
    },  //初始化日期默认值，默认当天
    initData() {
      this.searchForm.runTime = []
      let curDate = new Date()
      let pattern = 'yyyy-MM-dd 00:00:00'
      let startDate = curDate.format(pattern)
      let endDate = curDate.format('yyyy-MM-dd 23:59:59')
      this.searchForm.runTime.push(startDate)
      this.searchForm.runTime.push(endDate)
    },
    // 删除
    remove(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.singleDelete(row.id).then(res => {
            this.$message.success({
              message: '删除成功'
            })
            this.getData()
          })
        })
        .catch(() => {
        })
    },getData() {
      if( this.searchForm.runTime==null || this.searchForm.runTime.length<2 ){
          this.$message.error('请选择开始结束日期')
          return
      }
      api.getTaskStatistics(this.searchForm).then((res) => {
        this.tableData = res     
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>