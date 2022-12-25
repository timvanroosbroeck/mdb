// import dayjs from "dayjs";

// export class ClientBase {
//   public getBaseUrl(url: any, defaultUrl: any) {
//     return import.meta.env.VITE_API_URL;
//   }
// }
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelToken,
} from "axios";
import axios from "axios";
import dayjs from "dayjs";
export class ClientBase {
  public getBaseUrl(url: any) {
    return import.meta.env.VITE_API_URL;
  }
}
