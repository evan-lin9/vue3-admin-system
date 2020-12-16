// import { post } from "@/utils/http";
import { sleep } from "@/utils";

export const login = async loginPayload => {
  return sleep(1000).then(() => ({ token: "dashkhdksjh" }));
  // return post('/v1/login', loginPayload)
};
