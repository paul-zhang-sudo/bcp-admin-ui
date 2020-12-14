<template lang="html">
  <div>
    <el-select v-model="svalue" clearable size="mini" filterable>
      <el-option v-for="(optItem,optindex) in options" :key="optindex" :label="optItem.label" :value="optItem.value" />
    </el-select>
  </div>
</template>

<script>
import * as sel from '@/api/select'

export default {
  name: 'SXFSqllist',
  props: {
    code: String,
    value: String,
    params: String
  },
  data() {
    return {
      options: [],
      svalue: this.value
    }
  },
  watch: {
    // 判断下拉框的值是否有改变
    svalue(val, oldVal) {
      if (val !== oldVal) {
        this.$emit('input', val)
      }
    }
  },
  mounted() {
    sel.getFreelist({ code: this.code, params: this.params }).then(res => {
      for (const item in res.model) {
        this.options.push({ label: res.model[item], value: item })
      }
    })
  }
}
</script>

<style lang="css">
</style>
