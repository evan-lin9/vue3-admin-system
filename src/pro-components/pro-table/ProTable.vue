<template>
  <div class="ba-table">
    <el-table
      ref="table"
      v-loading="loading"
      border
      stripe
      element-loading-text="数据正在加载中"
      :data="newList"
      v-bind="$attrs"
      @selection-change="handleSelectionChange"
    >
      <template v-for="item in newFields">
        <el-table-column
            v-if="item.options && item.options.length > 1"
            :key="item.key"
            :label="$t(`${item.title}`)"
            :prop="item.key"
            align="center"
            v-bind="item"
        >
          <template #default="scope">
            <el-tag size="mini" :type="getLabelType(item.options, scope.row[item.key])">
              {{
                item.isInternational ? $t(`${getLabel(item.options, scope.row[item.key])}`) : getLabel(item.options, scope.row[item.key])
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.slot"
          :key="item.key"
          v-bind="item"
        >
          <template slot-scope="scope">
            <slot :name="item.key" v-bind="scope"></slot>
          </template>
        </el-table-column>
        <base-table-column
          v-else
          :key="item.key"
          :column="item"
        />
      </template>
    </el-table>
    <div class="table-footer">
      <el-pagination
        v-if="hasPagination"
        background
        :disabled="loading"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[20, 50, 200]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getTableFields } from './core'
import BaseTableColumn from './BaseTableColumn'

function noop() {
}

export default {
  name: 'ProTable',
  components: {BaseTableColumn},
  props: {
    api: {
      type: Function,
      default: noop()
    },
    data: {
      type: Array,
      default: () => []
    },
    params: {
      type: Object,
      default: () => {
      }
    },
    hasPagination: {
      type: Boolean,
      default: true
    },
    fields: {
      type: Array,
      default: () => []
    },
    handlerDataFunc: {
      type: Function,
      default: null
    },
    handleSelectionChange: {
      type: Function,
      default: function () {
      }
    }
  },
  data() {
    return {
      loading: false,
      list: this.data,
      currentPage: 1,
      pageSize: 20,
      total: 0
    }
  },
  computed: {
    newFields() {
      return getTableFields(this.fields)
    },
    // 有些接口返回的数据需要做额外处理
    newList() {
      return this.handlerDataFunc ? this.handlerDataFunc(this.list) : this.list
    }
  },
  methods: {
    getData() {
      const {api, params, currentPage, pageSize, hasPagination} = this
      if (!api) return
      const filterParams = {
        ...params
      }
      if (hasPagination) {
        filterParams.page = currentPage
        filterParams.rows = pageSize
      }
      this.loading = true
      api(filterParams).then(res => {
        if (res.status === 'OK') {
          if (Array.isArray(res.data)) {
            this.list = res.data
            return
          }
          const {rows, total, list, data} = res.data
          // 因为后端团队不同，返回的数据结构也不同
          if (Array.isArray(rows) && typeof total === 'number') {
            this.list = rows
            this.total = total
          } else if (Array.isArray(list) && typeof rows === 'number') {
            this.list = list
            this.total = rows
          } else if (Array.isArray(data) && typeof total === 'number') {
            this.list = data
            this.total = total
          } else {
            this.list = list
            this.total = list.length
          }
        } else if (res.code) {
          // 兼容币安宝团队的接口
          this.list = res.data.list
          this.total = res.data.total
        }
      }).finally(() => {
        this.loading = false
      })
    },

    refresh(isReset = true) {
      if (isReset) {
        this.currentPage = 1
        this.pageSize = 20
      }
      this.$nextTick(() => {
        this.getData()
      })
    },

    getSelection() {
      return this.$refs.table.selection
    },

    onSizeChange(val) {
      this.pageSize = val
      this.getData()
    },

    onCurrentChange(val) {
      this.currentPage = val
      this.getData()
    },

    getLabel(list, id) {
      const temp = list.find(i => i.value === id)
      return temp ? temp.label : ''
    },

    getLabelType(list, id) {
      const temp = list.find(i => i.value === id)
      return temp ? temp.type : ''
    }
  }
}
</script>

<style scoped>
.table-footer {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>
