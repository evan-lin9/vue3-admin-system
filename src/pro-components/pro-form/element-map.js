export default {
  // 默认输入类型
  input: {
    // 对应到 Element 中的组件 tag
    component: 'el-input',
    // 传递给 Element 组件的默认 props
    props: {
      clearable: true,
      style: { width: '180px' }
    }
  },
  checkbox: {
    component: 'el-checkbox',
    props: {
      clearable: true
    }
  },
  // 数字输入框
  inputNumber: {
    component: 'el-input-number',
    props: {
      clearable: true
    }
  },
  // 多行文本
  textarea: {
    component: 'el-input',
    props: {
      type: 'textarea',
      rows: 3,
      style: { width: '400px' }
    }
  },
  switch: {
    component: 'el-switch'
  },
  date: {
    component: 'el-date-picker',
    props: {
      type: 'date',
      valueFormat: 'timestamp'
    }
  },
  datetime: {
    component: 'el-date-picker',
    props: {
      type: 'datetime',
      valueFormat: 'timestamp'
    }
  },
  datetimerange: {
    component: 'el-date-picker',
    props: {
      type: 'datetimerange',
      valueFormat: 'timestamp'
    }
  },
  // 自定义的组件
  radio: {
    component: 'ba-radio'
  },
  select: {
    component: 'ba-select',
    props: {
      clearable: true
    }
  },
  multipleSelect: {
    component: 'ba-select',
    props: {
      clearable: true,
      filterable: true,
      multiple: true
    }
  },
  upload: {
    component: 'ba-upload'
  },
  editor: {
    component: 'ba-editor'
  }
}
