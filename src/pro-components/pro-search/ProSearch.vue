<template>
  <pro-form
    ref="form"
    class="pro-search"
    :fields="searchFields"
    :toggle-fields="searchToggleFields"
    v-bind="$attrs"
    :inline="true"
    :has-control="false"
    :toggleable="true"
    @submit="submit"
    @reset="reset"
  >
    <el-col slot="search" :span="6">
      <el-button
          v-if="hasPermission(searchAuth)"
          type="primary"
          icon="el-icon-search"
          @click="onSearch"
      >
        {{ $t('查询') }}
      </el-button>
      <el-button
          v-if="hasPermission(searchAuth)"
          type="primary"
          icon="el-icon-refresh-right"
          @click="onReset"
      >
        {{ $t('重置') }}
      </el-button>
      <el-button
          v-if="exportApi && hasPermission(exportAuth)"
          icon="el-icon-download"
          type="primary"
          @click="onOfflineExport"
      >
        {{ $t('离线导出') }}
      </el-button>
      <slot name="btn"></slot>
    </el-col>
  </pro-form>
</template>

<script>
import { getSearchFields, getSearchToggleFields } from './core'

export default {
  name: 'ProSearch',
  props: {
    isDefaultShow: {
      type: Boolean,
      default: true
    },
    searchAuth: {
      type: String,
      default: 'search'
    },
    exportAuth: {
      type: String,
      default: 'offlineExport'
    },
    exportApi: {
      type: Function,
      default: null
    },
    fields: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      useRoute: false
    }
  },
  computed: {
    searchFields() {
      return getSearchFields(this.fields, this.isDefaultShow)
    },
    searchToggleFields() {
      return getSearchToggleFields(this.fields, this.isDefaultShow)
    }
  },
  mounted() {
    try {
      if (this.$route.query.userId && this.fields) {
        this.$nextTick(() => {
          this.useRoute = true
          this.submit()
        })
      }
    } catch (e) {
      console.info(e)
    }
  },
  methods: {
    submit(form, valid) {
      if (this.useRoute) {
        this.$refs.form.form.userId = this.$route.query.userId
        form = { userId: this.$route.query.userId }
        valid = true
        this.useRoute = false
      }
      if (valid) {
        this.$emit('submit', form)
      } else {
        return false
      }
    },

    reset() {
      this.$emit('reset')
    },

    onSearch() {
      this.$refs.form.submit()
    },

    onReset() {
      this.$refs.form.reset()
      this.onSearch()
    },

    onOfflineExport() {
      this.exportApi(this.$refs.form.form).then(() => {
        this.$message.success('导出成功, 请请问离线任务查看')
      }).catch(err => {
        this.$message.error(err.errorData)
      })
    }
  }
}
</script>
