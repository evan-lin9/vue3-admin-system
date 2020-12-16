import axios from "axios";
import store from "@/store";
import { ElMessage } from "element-plus";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
  noCode: "Error"
};

const http = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 60 * 1000
});

http.interceptors.request.use(
  config => {
    // 1. add token
    if (store.getters.token) {
      config.headers["X-Token"] = store.getters.token;
    }
    // 2. add csrf validate
    if (store.getters.csrf) {
      config.headers["X-Token"] = store.getters.csrf;
    }
    // 3. add custom headers
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    const result = response.data;
    if (result?.code !== 200) {
      ElMessage.error({
        duration: 3 * 1000,
        message: codeMessage[result.code || "noCode"]
      });
    } else {
      return result;
    }
  },
  error => {
    ElMessage.error({
      duration: 3 * 1000,
      message: error.message
    });
    return Promise.reject(error);
  }
);

/**
 * @param: {string} url
 * @param: {Object} [params]
 */
export const get = async (url, params) => {
  return http({
    url,
    method: "get",
    params
  });
};

/**
 * @param: {string} url
 * @param: {Object} [data]
 */
export const post = async (url, data) => {
  return http({
    url,
    method: "post",
    data
  });
};
