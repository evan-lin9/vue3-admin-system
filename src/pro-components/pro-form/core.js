import ElementMap from './element-map';
import { app } from '@/main';

export const isFunction = (functionToCheck) => {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
};

function getRule(item, form = {}) {
  const { rule, isRequired, type, title } = item
  const _isRequired = typeof isRequired === 'boolean' ? isRequired
    : (Object.prototype.toString.call(isRequired) === '[object Function]' ? isRequired(form) : null)

  if (_isRequired) {
    const isInput = type === 'el-input' || type === 'el-input-number' || type === 'ba-editor'
    return {
      required: true,
      message: app.$t(`请${isInput ? '输入' : '选择'}`) + app.$t(`${title}`),
      trigger: `${isInput ? 'blur' : 'change'}`
    }
  } else if (rule) {
    return rule
  } else {
    return null
  }
}

export function computeFormItem(config, form) {
  const item = { ...config }
  // 计算组件真实对应的名称并传入一些默认配置
  const res = ElementMap[item.type || 'input']
  item.type = res.component
  item.props = Object.assign({}, res.props, item.props)

  if (isFunction(item.getProps)) {
    Object.assign(item.props, item.getProps(form))
  }
  // 处理联动
  item._isShow = isFunction(item.isShow) ? !!item.isShow(form) : true

  // 处理校验
  item._rule = getRule(item, form)

  // 设置内容宽度
  if (item.props.contentWidth) {
    item.props.style = { width: typeof item.props.contentWidth === 'number' ? `${item.props.contentWidth}px` : item.props.contentWidth }
  }

  return item
}
