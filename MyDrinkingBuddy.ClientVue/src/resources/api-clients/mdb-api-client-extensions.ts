import dayjs from "dayjs";

export class ClientBase {
  public getBaseUrl(url: any, defaultUrl: any) {
    return import.meta.env.VITE_API_URL;
  }
}
