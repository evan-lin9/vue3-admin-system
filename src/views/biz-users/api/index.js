import { get } from "@/utils/http";

// const prefix = '/v1'
export function fetchUserList () {
  // return sleep(1000).then(() => ([1, 2, 3]));
  return get(`/users`)
}
