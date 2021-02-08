<template>
  <el-form
      ref="form"
      :model="form"
      v-bind="$attrs"
  >
    <el-row :gutter="16">
      <el-col v-for="item in formItems" :key="item.key" :span="item.span || 24">
        <el-form-item
            v-if="item._isShow"
            :rules="item._rule"
            :prop="item.key"
            :label="$t(`${item.title}`)"
        >
          <component
            :is="item.type"
            v-model="form[item.key]"
            :options="item.options"
            :is-international="item.isInternational"
            v-bind="item.props"
          >
            <template v-if="item.type === 'el-input' && item.prepend" slot="prepend">{{ item.prepend }}</template>
            <template v-if="item.type === 'el-input' && item.append" slot="append">{{ item.append }}</template>
          </component>
        </el-form-item>
      </el-col>
      <template v-if="toggleable && searchFormToggle">
        <el-col v-for="item in toggleFormItems" :key="item.key" :span="item.span || 6">
          <el-form-item
              v-if="item._isShow"
              :rules="item._rule"
              :prop="item.key"
              :label="$t(`${item.title}`)"
          >
            <component
                :is="item.type"
                v-model="form[item.key]"
                :options="item.options"
                v-bind="item.props"
            />
          </el-form-item>
        </el-col>
      </template>
      <slot name="search"></slot>
    </el-row>
    <el-form-item v-if="hasControl">
      <el-button v-if="hasSubmitBtn" type="primary" @click="submit">{{ $t(`${submitText}`) }}</el-button>
      <el-button v-if="hasResetBtn" @click="reset">{{ $t(`${resetText}`) }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import BaSelect from '../base/base-select'
import BaRadio from '../base/base-radio'
import { computeFormItem } from './core'

export default {
  name: 'ProForm',
  components: {BaSelect, BaRadio},
  props: {
    toggleable: {
      type: Boolean,
      default: false
    },
    searchFormToggle: Boolean,
    fields: {
      type: Array,
      default: () => []
    },
    toggleFields: {
      type: Array,
      default: () => []
    },
    hasControl: {
      type: Boolean,
      default: true
    },
    hasSubmitBtn: {
      type: Boolean,
      default: true
    },
    hasResetBtn: {
      type: Boolean,
      default: true
    },
    submitText: {
      type: String,
      default: '提交'
    },
    resetText: {
      type: String,
      default: '重置'
    }
  },
  data() {
    return {
      form: this.initForm()
    }
  },
  computed: {
    formItems() {
      return this.fields.map(item => computeFormItem(item, this.form))
    },
    toggleFormItems() {
      return this.toggleFields.map(item => computeFormItem(item, this.form))
    }
  },
  methods: {
    initForm() {
      const form = {}
      const map = {
        input: '',
        inputNumber: undefined,
        select: '',
        multipleSelect: []
      }
      this.fields.concat(this.toggleFields).forEach(item => {
        if (item.defaultValue !== undefined) {
          form[item.key] = item.defaultValue
        } else {
          // TODO 每种表单类型元素不一样，所以默认值也有所不同
          form[item.key] = map[item.type]
        }
      })
      return form
    },
    submit() {
      this.$refs.form.validate((valid) => {
        this.$emit('submit', this.form, valid)
      })
    },
    reset() {
      this.$refs.form.resetFields()
    },
    clear() {
      this.$refs.form.clearValidate()
    },
    setForm(form) {
      for (const key in form) {
        if (form.hasOwnProperty(key)) {
          this.form[key] = form[key]
        }
      }
    }
  }
}
</script>
