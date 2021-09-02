<template lang="html">
  <div class="app-container">
    <mod-filter :datas="datas" @query="getData">
      <template slot="lastBtn">
        <el-button type="primary" size="mini" @click="edit(0)">新增</el-button>
        <el-button type="primary" size="mini" @click="remove(0)">删除</el-button>
        <el-button type="primary" size="mini" @click="allocation(0)">分配</el-button>
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
    <el-dialog width="50%"  :title="subFormData.id?'编辑':'新增'" :visible.sync="dialogFormVisible">
      <el-form ref="subFormData" :model="subFormData" :rules="subFormDataRule" class="subFormData " label-width="100px" >
        <!--新增界面的集成名称项-->
        <el-form-item label="集成名称" prop="name">
          <el-input v-model="subFormData.name" placeholder="集成名称" maxlength="20" size="mini" auto-complete="off"></el-input>
        </el-form-item>
        <!--新增界面的客户项-->
        <el-form-item label="客户" prop="tenantName">
          <el-select v-model="subFormData.tenantName" placeholder="请选择客户项">
            <el-option
              v-for="item in optionsOne"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!--新增界面的集成节点-->
        <el-form-item label="集成节点" prop="nodeId">
          <el-input v-model="subFormData.nodeId" placeholder="集成节点" maxlength="20" size="mini" auto-complete="off"  ></el-input>
        </el-form-item>
        <!--新增界面的模板选择-->
        <el-form-item label="模板选择" prop="templateName" :inline="true">
          <!--el-col可以让一行el-form-item放下两个组件-->
          <el-col :span="12">
            <el-input v-model="subFormData.templateName" placeholder="模板选择" maxlength="20" size="mini" auto-complete="off"  ></el-input>
          </el-col>
          <el-col :span="12">
            <el-button @click="ShowMoule=true">选择模板</el-button>
          </el-col>
        </el-form-item>
        <!--新增界面的参数-->
        <el-form-item label="参数" prop="">
          <el-table ref="multipleTable" :data="tableData"   @selection-change="select"  tooltip-effect="dark" style="width: 100%"   @select="handleSelectionChange">
            <el-table-column prop="name" label="参数名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="参数数据">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="操作" >
              <template slot-scope="scope">
              <el-button type="text" @click="delTableData(scope,1)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--参数的添加按钮-->
          <div @click="tableAdd">添加</div>
        </el-form-item>
        <!--新增界面的插件文件-->
        <el-form-item label="插件文件" prop="">
          <el-button type="primary">上传插件<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-form-item>
        <!--新增界面的任务列表-->
        <el-form-item label="任务列表" prop="">
          <el-table ref="multipleTable" :data="tableData"   @selection-change="select"  tooltip-effect="dark"style="width: 100%"   @select="handleSelectionChange">
            <!--任务列表的选择点击按钮-->
            <el-table-column type="selection"  width="55">
            </el-table-column>
            <!--任务列表的名称-->
            <el-table-column prop="name" label="名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" />
              </template>
            </el-table-column>
            <!--任务列表的输入节点-->
            <el-table-column prop="name" label="输入节点">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" />
              </template>
            </el-table-column>
            <!--任务列表的转换节点-->
            <el-table-column prop="name" label="转换节点" >
              <template slot-scope="scope">
              <el-button type="text" @click="delTableData(scope,1)">删除</el-button>
              </template>
            </el-table-column>
            <!--任务列表的输出节点-->
            <el-table-column prop="name" label="输出节点" >
              <template slot-scope="scope">
              <el-button type="text" @click="delTableData(scope,1)">删除</el-button>
              </template>
            </el-table-column>
            <!--任务列表的状态-->
            <el-table-column prop="name" label="状态" >
              <template slot-scope="scope">
              <el-button type="text" @click="delTableData(scope,1)">删除</el-button>
              </template>
            </el-table-column>
            <!--任务列表的操作-->
            <el-table-column prop="name" label="操作" >
              <template slot-scope="scope">
              <el-button type="text" @click="delTableData(scope,1)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--任务列表的按钮-->
          <div @click="tableAdd">添加</div>
        </el-form-item>
      </el-form>
      <!--新增界面的确定取消-->
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false;showCronBox=false">取 消</el-button>
        <el-button size="mini" type="primary" @click="subForm('subFormData')">确 定</el-button>
      </div>
    </el-dialog>
<!-----------------------------------------------跳转的界面--------------------------------------------------------->
    <!--模板选择按钮的跳转界面-->
    <el-dialog width="50%" title="选择模板" :visible.sync="ShowMoule">
      <el-table ref="multipleTable" :data="tableData"   @selection-change="select"  tooltip-effect="dark"style="width: 100%"   @select="handleSelectionChange">
        <el-table-column type="selection"  width="55">
        </el-table-column>
        <el-table-column prop="name" label="模板名称">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="ShowMoule = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="modelShow">确 定</el-button>
      </div>
    </el-dialog>
<!-------------------------------------------------------------------------------------------------------->
    <!--分配界面-->
    <el-dialog width="50%" :title="'分配'" :visible.sync="allocationDialogFormVisible">
      <el-form ref="allocationSubFormData" :model="allocationSubFormData" :rules="allocationSubFormDataRule"
               class="allocationSubFormData" label-width="100px"
      >
        <el-form-item label="计划任务名称">
          <el-select v-model="allocationNames" multiple disabled size="mini" auto-complete="off">
            <el-option v-for="item in allocationNames" :key="item" :label="item" :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="false" label="items" prop="items">
          <el-input v-model="allocationSubFormData.items" size="mini" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="租户" prop="sourceType">
          <el-select v-model="allocationSubFormData.tenantId" size="mini" @change="getComputers">
            <el-option v-for="(optItem,optindex) in tenants" :key="optindex" :label="optItem.name" :value="optItem.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="前置机" prop="sourceType">
          <el-select v-model="allocationSubFormData.computerId" size="mini">
            <el-option v-for="(optItem,optindex) in computers" :key="optindex" :label="optItem.name"
                       :value="optItem.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="allocationDialogFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="allocationSubForm('allocationSubFormData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/task'

export default {
  data() {
    return {
      modelData:{},
      ShowMoule:false,//当前模态窗的显示隐藏
      tableData:[],
      planOptions: [],
      userCaseOptions: [],
      typeOptions: [],
      nameOptions: [],
      planCheckWay: 1,
      tenants: [],
      computers: [],
      dialogFormVisible: false,
      allocationDialogFormVisible: false,
      dialogRowTitle: null,
      selectionPropList: [],
      rowData: {
        id: null,
        name: null,
        code: null,
        plan: null,
        execService: null,
        cron: null,
        type: null,
        userCaseId: null,
        remark: null
      },
      subFormData: {
        id: null,
        name: null,
        code: null,
        plan: null,
        execService: null,
        cron: null,
        type: '2',
        userCaseId: null,
        remark: null
      },
      allocationSubFormData: {
        items: null,
        tenantId: null,
        computerId: null
      },
      allocationNames: null,
      optionsOne: [{
          value: '1',
          label: '则成'
        }, {
          value: '2',
          label: '云鲸'
        }],
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
        'cron': [{
          required: true,
          message: '请填写cron'
        }],
        'type': [{
          required: true,
          message: '请填写类型'
        }],
        'userCaseId': [{
          required: true,
          message: '请填写绑定用户场景'
        }]
      },
      allocationSubFormDataRule: {
        'tenantId': [{
          required: true,
          message: '请选择租户'
        }],
        'computerId': [{
          required: true,
          message: '请选择前置机'
        }]
      },
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
            prop: 'code',
            conditionshow: true,
            filedShow: true,
            label: '序号',
            placeholder: '序号',
            optList: []
          },
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
            prop: '',
            conditionshow: false,
            filedShow: true,
            label: '客户',
            placeholder: '客户',
            optList: []
          },
          {
            type: 'input',
            prop: '',
            conditionshow: false,
            filedShow: true,
            label: '模板',
            placeholder: '模板',
            optList: []
          },
          {
            type: 'input',
            prop: '',
            conditionshow: false,
            filedShow: true,
            label: '修改时间',
            placeholder: '修改时间',
            optList: []
          },
          {
            type: 'input',
            prop: '',
            conditionshow: false,
            filedShow: true,
            label: '状态',
            placeholder: '状态',
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
  },
  async created() {
    this.getSourceTypeOptions()
    this.getTenants()
  },
  mounted() {
  },
  methods: {
    delTableData(index,type){
      console.log(index)
      console.log(type)

        this.tableData.splice(index.$index,1)
    },
    tableAdd(){
      this.tableData.push({
        name:"1111"
      })
    },
    modelShow(){
      
      this.subFormData.templateName = this.modelData.name
      this.ShowMoule =false
      console.log(this.modelData)
    },
    select(selection) {
      // console.log("selection",selection)
    },
    handleSelectionChange(selection){
     
      if(selection.length==1){
        this.modelData = selection[0]
         console.log("第一次",selection[0])
      }
    if (selection.length > 1) {
      let arr =  selection
        let del_row = arr.shift()
        this.modelData = arr[0]

      console.log("第er次",arr[0])

        this.$refs.multipleTable.toggleRowSelection(del_row, false)
      }
    },
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
    allocation(row) {
      let items = []
      let names = []
      if (!row) {
        if (!this.datas.multipleSelection.length) {
          this.$message.info('请选择相关数据')
          return
        }
        items = this.datas.multipleSelection.map((value) => {
          return value['id']
        })
        names = this.datas.multipleSelection.map((value) => {
          return value['name']
        })
      } else {
        items.push(row.id)
        names.push(row.name)
      }
      this.allocationNames = names
      this.allocationDialogFormVisible = true
      this.$set(this.allocationSubFormData, 'items', items)
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
    allocationSubForm(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          api.submitAllocationForm(this[formData]).then(res => {
            // console.log(this[formData])
            this.$message.success('分配成功')
            this.getData(this.datas)
            this.allocationDialogFormVisible = false
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
          'cron': null,
          'type': null,
          'userCaseId': null,
          'remark': null
        })
        if (this.$refs['subFormData']) {
          this.$refs['subFormData'].resetFields()
        }
        return
      }
      this.$set(this.subFormData, 'id', row.id)
      this.$set(this.subFormData, 'name', row.name)
      this.$set(this.subFormData, 'code', row.code)
      this.$set(this.subFormData, 'plan', row.plan)
      this.$set(this.subFormData, 'execService', row.execService)
      this.$set(this.subFormData, 'cron', row.cron)
      this.$set(this.subFormData, 'type', row.type)
      this.$set(this.subFormData, 'userCaseId', row.userCaseId)
      this.$set(this.subFormData, 'remark', row.remark)
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
    getSourceTypeOptions() {
      api.getSourceTypeOptions('fw.task.plan').then(res => {
        this.planOptions = res.model
      }).catch(e => {
        return false
      })
      api.getSourceTypeOptions('fw.task.userCase').then(res => {
        this.userCaseOptions = res.model
      }).catch(e => {
        return false
      })
      api.getSourceTypeOptions('fw.task.type').then(res => {
        this.typeOptions = res.model
      }).catch(e => {
        return false
      })
    },
    getTenants() {
      api.getTenants().then(res => {
        this.tenants = res.model
      }).catch(e => {
        return false
      })
    },
    getComputers() {
      this.allocationSubFormData.computerId = null
      const tenantId = this.allocationSubFormData.tenantId
      api.getComputers(tenantId).then(res => {
        console.log(res.model)
        this.computers = res.model
        if (this.computers.length === 1) {
          this.allocationSubFormData.computerId = this.computers[0].id
        }
      }).catch(e => {
        return false
      })
    },
    // // 定义plan转cron表达式
    // getCronByPlan(plan) {
    //   let cron
    //   switch (plan) {
    //     case '1':
    //       cron = '0 0/1 * * * ?'
    //       break
    //     case '2':
    //       cron = '0 0/5 * * * ?'
    //       break
    //     case '3':
    //       cron = '0 0/10 * * * ?'
    //       break
    //     case '4':
    //       cron = '0 0/30 * * * ?'
    //       break
    //     case '5':
    //       cron = '0 0 */1 * * ?'
    //       break
    //     case '6':
    //       cron = '0 0 */3 * * ?'
    //       break
    //     case '7':
    //       cron = '0 0 */6 * * ?'
    //       break
    //     case '8':
    //       cron = '0 0 */12 * * ?'
    //       break
    //     case '9':
    //       cron = '0 0 0 * * ? *'
    //       break
    //     case '10':
    //       cron = '0 0 0 /2 * ? *'
    //       break
    //     case '11':
    //       cron = '0 0 0 0 0 ? *'
    //       break
    //     case '12':
    //       cron = '0 0 0 0 * ? *'
    //       break
    //   }
    //   this.$set(this.subFormData, 'cron', cron)
    // }
  }
}
</script>

<style lang="scss" scoped>
 /deep/ .el-table__header-wrapper .el-checkbox {
  display: none;
}
</style>
