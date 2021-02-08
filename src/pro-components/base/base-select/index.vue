<template>
  <el-select
      v-model="currValue"
      filterable
      v-bind="$attrs"
      @change="change"
  >
    <el-option v-for="item in options" :key="item.value" :value="item.value" :label="isInternational ? $t(`${item.label}`) : item.label" />
  </el-select>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number, Boolean, Array],
      default: null
    },
    change: {
      type: Function,
      default: () => {}
    },
    isInternational: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    currValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
