import Layout from "@/layouts";
import auth from "@/layouts/auth";

export default [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/biz-users/pages/role",
        component: () => import('@/views/biz-users/pages/role'),
        name: "Role",
        meta: {
          title: "角色列表"
        }
      },
      {
        path: "/biz-users/pages/user/:userId",
        component: () => import('@/views/biz-users/pages/user/:userId'),
        meta: {
          title: "用户详情"
        },
        name: "UserInfo"
      },
      {
        path: "/biz-users/pages/user",
        component: () => import('@/views/biz-users/pages/user'),
        meta: {
          title: "用户列表"
        },
        name: "UserList"
      }
    ]
  },
  {
    path: "/",
    component: auth,
    children: [
      {
        path: "/dashboard",
        component: () => import('@/views/dashboard'),
        name: "Dashboard"
      }
    ]
  },
  {
    path: "/login",
    component: () => import('@/views/login'),
    name: "Login"
  }
];
