export default [
  {
    path: "/biz-officer/pages/officer-category/",
    component: () => import('@/views/biz-officer/pages/officer-category'),
    meta: {
      title: "首页",
      number: 1,
      hide: true
    },
    name: "OfficerCategory"
  },
  {
    path: "/dashboard",
    component: () => import('@/views/dashboard'),
    name: "Dashboard"
  },
  {
    path: "/login",
    component: () => import('@/views/login'),
    name: "Login"
  },
  {
    path: "/product/pages/:product-price?/",
    component: () => import('@/views/product/pages/[product-price$]')
  },
  {
    path: "/product/pages/:product-setting/coupon",
    component: () => import('@/views/product/pages/[product-setting]/coupon'),
    name: "coupon"
  },
  {
    path: "/product/pages/:product-setting/ship",
    component: () => import('@/views/product/pages/[product-setting]/ship'),
    name: "ship"
  },
  {
    path: "/product/pages/product-category/:",
    component: () => import('@/views/product/pages/product-category/[index]')
  },
  {
    path: "/product/pages/product-list/:index?",
    component: () => import('@/views/product/pages/product-list/[index$]'),
    name: "[index$].vue"
  }
];