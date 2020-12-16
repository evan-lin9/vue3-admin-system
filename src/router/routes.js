export default [
  {
    path: "/officer/officer-category/index",
    component: () => import('@/views/biz-officer/pages/officer-category')
  },
  {
    path: "/officer/officer-list/index",
    component: () => import('@/views/biz-officer/pages/officer-list')
  },
  {
    path: "/product/:product-price?/index",
    component: () => import('@/views/biz-product/pages/[product-price$]')
  },
  {
    path: "/product/:product-setting/coupon",
    component: () => import('@/views/biz-product/pages/[product-setting]/coupon')
  },
  {
    path: "/product/:product-setting/ship",
    component: () => import('@/views/biz-product/pages/[product-setting]/ship')
  },
  {
    path: "/product/product-category/:index",
    component: () => import('@/views/biz-product/pages/product-category/[index]')
  },
  {
    path: "/product/product-list/:index?",
    component: () => import('@/views/biz-product/pages/product-list/[index$]')
  }
];