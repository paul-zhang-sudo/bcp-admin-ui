<template lang="html">
  <div class="app-container">
    <mod-filter :datas="datas" @query="getData">
      <template slot="lastBtn">
        <el-button type="primary" size="mini" @click="edit(0)">新增</el-button>
        <el-button type="primary" size="mini" @click="remove(0)">删除</el-button>
      </template>
      <template slot="enable" slot-scope="scope">
        <span>{{ scope.value.enable ? '启用' : '禁用' }}</span>
      </template>
      <template slot="oper" slot-scope="scope">
        <el-button size="mini" type="text" @click="edit(scope.value)">编辑</el-button>
        <el-button size="mini" type="text" @click="remove(scope.value)">删除</el-button>
      </template>
    </mod-filter>
    <!--新增/编辑界面-->
    <el-dialog width="50%" :title="subFormData.id?'编辑':'新增'" :visible.sync="dialogFormVisible">
      <el-form ref="subFormData" :model="subFormData" :rules="subFormDataRule" class="subFormData" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="subFormData.name" size="mini" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="subFormData.code" size="mini" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="计划输入方式">
          <el-radio-group v-model="planCheckWay">
            <el-radio :label="1" @change="inputByMenu">菜单选择</el-radio>
            <el-radio :label="2" @change="inputByCustom">自定义cron</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="planCheckWay===1" label="运行计划" prop="plan">
          <el-select v-model="subFormData.plan" size="mini" auto-complete="off" @change="getCronByPlan">
            <el-option v-for="(optItem,optindex) in planOptions" :key="optindex" :label="optItem.propvalue"
                       :value="optItem.propkey"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="planCheckWay===1" v-show="false" label="cron">
          <el-input v-model="subFormData.cron" size="mini" auto-complete="off"/>
        </el-form-item>
        <el-form-item v-if="planCheckWay===2">
          <cron v-if="showCronBox" v-model="subFormData.cron"></cron>
        </el-form-item>
        <el-form-item label="cron" v-if="planCheckWay===2">
          <el-input v-model="subFormData.cron" size="mini" auto-complete="off">
            <el-button slot="append" v-if="!showCronBox" icon="el-icon-arrow-up" @click="showCronBox = true"
                       title="打开图形配置"
            ></el-button>
            <el-button slot="append" v-else icon="el-icon-arrow-down" @click="showCronBox = false" title="关闭图形配置"
            ></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="绑定service" prop="execService">
          <el-input v-model="subFormData.execService" size="mini" auto-complete="off"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false;showCronBox=false">取 消</el-button>
        <el-button size="mini" type="primary" @click="subForm('subFormData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/task'
import cron from '@/components/cron/cron'

export default {
  components: {
    cron
  },
  data() {
    return {
      planOptions: [],
      planCheckWay: 1,
      tenants: [],
      dialogFormVisible: false,
      dialogRowTitle: null,
      selectionPropList: [],
      rowData: {
        id: null,
        name: null,
        code: null,
        plan: null,
        execService: null,
        cron: null
      },
      subFormData: {
        id: null,
        name: null,
        code: null,
        plan: null,
        execService: null,
        cron: null
      },
      subFormDataRule: {
        'name': [{
          required: true,
          message: '请填写名称'
        }],
        'code': [{
          required: true,
          message: '请填写编码'
        }],
        'plan': [{
          required: true,
          message: '请填写运行计划'
        }],
        'execService': [{
          required: true,
          message: '请填写绑定service'
        }],
        'cronExpression': [
          { required: true, validator: handleCronValidate, trigger: 'blur' }
        ]

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
            type: 'input',
            prop: 'name',
            conditionshow: true,
            filedShow: true,
            label: '名称',
            placeholder: '名称',
            optList: []
          },
          {
            type: 'input',
            prop: 'code',
            conditionshow: true,
            filedShow: true,
            label: '编码',
            placeholder: '编码',
            optList: []
          },
          {
            type: 'input',
            prop: 'planName',
            conditionshow: false,
            filedShow: true,
            label: '运行计划',
            placeholder: '运行计划',
            optList: []
          },
          {
            type: 'input',
            prop: 'execService',
            conditionshow: false,
            filedShow: true,
            label: '绑定service',
            placeholder: '绑定service',
            optList: []
          },
          {
            type: 'input',
            prop: 'oper',
            conditionshow: false,
            filedShow: true,
            isSearchHide: true,
            slot: true,
            label: '操作',
            placeholder: '操作',
            optList: []
          }
        ]
      },
      showCronBox: false
    }
    // 校验是否为cron表达式
    var handleCronValidate = (rule, value, callback) => {
      if (value) {
        const parser = require('cron-parser')
        try {
          const interval = parser.parseExpression(value)
          console.log('cronDate:', interval.next().toDate())
        } catch (e) {
          callback('非Cron表达式格式，请检查！' + e.message)
        }
      } else {
        callback('Cron表达式不能为空！')
      }
      callback()
    }
  },
  async created() {
    this.getPlanOptions()
  },
  mounted() {
  },
  methods: {
    inputByMenu() {
      this.subFormData.cron = null
    },
    inputByCustom() {
      this.subFormData.cron = null
    },
    // 删除
    remove(row) {
      let items = []
      if (!row) {
        if (!this.datas.multipleSelection.length) {
          this.$message.info('请选择相关数据')
          return
        }
        items = this.datas.multipleSelection.map((value) => {
          return value['id']
        })
      } else {
        items.push(row.id)
      }
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api.batchDelete({
            'items': items
          }).then(res => {
            this.$message.success({
              message: '删除成功'
            })
            this.getData()
            this.dialogFormVisible = false
          })
        })
        .catch(() => {
        })
    },
    subForm(formData) {

      this.showCronBox = false
      this.$refs[formData].validate((valid) => {
        if (valid) {
          console.log(this[formData])
          api.submitForm(this[formData]).then(res => {
            this.$message.success('保存成功')
            this.getData(this.datas)
            this.dialogFormVisible = false
          }).catch(() => {
          })
        } else {
          return false
        }
      })
    },
    // 新增或编辑页面
    edit(row) {
      this.dialogFormVisible = true
      if (!row) {
        this.$set(this, 'subFormData', {
          'name': null,
          'code': null,
          'plan': null,
          'execService': null,
          'cron': null
        })
        this.$nextTick(() => {
          this.$refs['subFormData'].resetFields()
        })
        return
      }
      this.$set(this.subFormData, 'id', row.id)
      this.$set(this.subFormData, 'name', row.name)
      this.$set(this.subFormData, 'code', row.code)
      this.$set(this.subFormData, 'plan', row.plan)
      this.$set(this.subFormData, 'execService', row.execService)
      this.$set(this.subFormData, 'cron', row.cron)
    },
    getData(datas = this.datas) {
      this.$set(this, 'datas', datas)
      this.$set(this, 'params', datas.params)
      this.$set(this.datas.table, 'loading', true)
      this.$set(this.params, 'orgId', this.params.orgName)
      api.getPage(this.params).then(res => {
        this.$set(this.datas.resData, 'rows', res.model)
        this.$set(this.datas.params, 'currentPage', res.currentPage)
        this.$set(this.datas.params, 'pageSize', res.pageSize)
        this.$set(this.datas.resData, 'totalCount', res.totalCount)
        this.$set(this.datas.table, 'loading', false)
      })
    },
    getPlanOptions() {
      api.getPlanOptions('fw.task.plan').then(res => {
        this.planOptions = res.model
      }).catch(e => {
        return false
      })
    },
    // 定义plan转cron表达式
    getCronByPlan(plan) {
      let cron
      switch (plan) {
        case '1':
          cron = '0 0/1 * * * ?'
          break
        case '2':
          cron = '0 0/5 * * * ?'
          break
        case '3':
          cron = '0 0/10 * * * ?'
          break
        case '4':
          cron = '0 0/30 * * * ?'
          break
        case '5':
          cron = '0 0 */1 * * ?'
          break
        case '6':
          cron = '0 0 */3 * * ?'
          break
        case '7':
          cron = '0 0 */6 * * ?'
          break
        case '8':
          cron = '0 0 */12 * * ?'
          break
        case '9':
          cron = '0 0 0 * * ? *'
          break
        case '10':
          cron = '0 0 0 /2 * ? *'
          break
        case '11':
          cron = '0 0 0 0 0 ? *'
          break
        case '12':
          cron = '0 0 0 0 * ? *'
          break
      }
      this.$set(this.subFormData, 'cron', cron)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
