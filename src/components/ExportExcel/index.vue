<template lang="html">
  <el-dropdown @command="handleCommand">
    <el-button size="mini" type="primary">
      导出<i class="el-icon-arrow-down el-icon--right" />
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="all">全部页</el-dropdown-item>
      <el-dropdown-item command="part">当前页</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import * as tool from '@/api/common'
import qs from 'qs'
export default {
  props: {
    params: {
      type: Object,
      default: function() {
        return {}
      }
    },
    sxfExportData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      queryParams: {}
    }
  },
  methods: {
    handleCommand(val) {
      this.queryParams = tool.deepClone(this.params)
      if (val === 'all') {
        this.queryParams.currentPage = 0
        this.queryParams.pageSize = 0
      }
      this.$set(this.queryParams, 'mode', 'excel')
      this.$set(this.queryParams, 'title', this.sxfExportData.title)
      this.$set(this.queryParams, 'sheetName', this.sxfExportData.sheetName)
      this.$set(this.queryParams, 'fileName', this.sxfExportData.fileName)
      const paramsStr = qs.stringify(this.queryParams, {
        indices: false
      })
      window.location.href = process.env.VUE_APP_BASE_API + this.sxfExportData.url + '?' + paramsStr
    }
  }
}
</script>
