import { sleep } from "@/utils";

export function fetchOfficerList () {
  return sleep(1000).then(() => ([1, 2, 3]));
}
