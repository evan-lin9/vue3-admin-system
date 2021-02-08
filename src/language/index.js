import { createI18n } from 'vue-i18n'		//引入vue-i18n组件

//注册i8n实例并引入语言文件
const i18n = createI18n({
  locale: 'ch',		//默认显示的语言
  messages: {
    ch:require('./ch.js'),	//引入语言文件
    en:require('./en.js')
  }
})
export default i18n; //将i18n暴露出去，在main.js中引入挂载
