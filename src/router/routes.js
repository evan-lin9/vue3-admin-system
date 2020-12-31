export default [
  {
    path: "/officer/officer-category/index",
    component: () => import('@/views/biz-officer/pages/officer-category'),
    meta: {
      title: "首页",
      number: 1,
      hide: true
    },
    name: "OfficerCategory"
  }
];