// import { post } from "@/utils/http";
import { sleep } from "@/utils";

const TOKEN = 'study-well2021'
const role = {
  username: 'yuge',
  nickname: 'evan',
  phone: '1381234678'
}

export const login = async loginPayload => {
  if (loginPayload.username === 'ygstudying@qq.com' && loginPayload.password === 123456) {
    return sleep(1000).then(() => ({
      token: TOKEN
    }));
  }
};

export const getUserInfo = async token => {
  if (token === TOKEN) {
    return sleep(1000).then(() => ({
      userInfo: role
    }));
  }
}
