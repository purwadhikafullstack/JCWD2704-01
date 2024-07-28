import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface customAxiosInstance<Route extends string = string, Data = any> extends AxiosInstance {
  get<T = Data, R = AxiosResponse<T>, D = Data>(url: Route, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<T = Data, R = AxiosResponse<T>, D = Data>(url: Route, config?: AxiosRequestConfig<D>): Promise<R>;
  post<T = Data, R = AxiosResponse<T>, D = Data>(url: Route, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  put<T = Data, R = AxiosResponse<T>, D = Data>(url: Route, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patch<T = Data, R = AxiosResponse<T>, D = Data>(url: Route, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}
