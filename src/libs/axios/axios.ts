import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AxiosService } from './axios.service';

export class Axios extends AxiosService {
  private instance: AxiosInstance;
  constructor() {
    const axiosInstance = axios.create({
      // baseURL: 'http://localhost:3000',
      baseURL: 'https://api.auto-delovi-3sp.com/',
    });
    super(axiosInstance);
    this.instance = axiosInstance;
  }

  api_get = <T>(url: string, config: AxiosRequestConfig): Promise<T> => {
    return this.instance.get(url, config);
  };

  api_post = <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<T> => {
    return this.instance.post(url, data, { ...config });
  };

  api_put = <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<T> => {
    return this.instance.put(url, data, { ...config });
  };

  api_patch = <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<T> => {
    return this.instance.patch(url, data, { ...config });
  };

  api_delete = <T>(url: string, config: AxiosRequestConfig): Promise<T> => {
    return this.instance.delete(url, config);
  };
}
