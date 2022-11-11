import { END_POINTS, ROUTES, THANH_KUN_REFRESH_TOKEN, THANH_KUN_USER_ID } from './../../constants/index';
import { ACCESS_TOKEN, BASE_URL } from '@/constants'
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { history } from '@/utils/history';
import { get } from 'lodash';

const instance = (headers?: Record<string, string>) => {
  let returnValue = axios.create()
  returnValue.interceptors.request.use(
    async (config) => {
      const accessToken: any = await localStorage.getItem(ACCESS_TOKEN)
      config.headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${accessToken}`,
        lang: 'en',
      }
      return config
    },
    (error) => {
      console.log(error)
      return Promise.reject(error)
    }
  )
  returnValue.interceptors.response.use(
    (response) =>{
        return response
    },
    async (error) => {
        const originalRequest = error.response.config;
        if(!error.response){
            localStorage.removeItem(ACCESS_TOKEN)
            localStorage.removeItem(THANH_KUN_REFRESH_TOKEN)
            localStorage.removeItem(THANH_KUN_USER_ID)
            localStorage.removeItem(THANH_KUN_REFRESH_TOKEN)
            history.push(ROUTES.LOGIN)
            return Promise.reject(error);
        }
        // refresh token expired
        if(error.response.status === 401 && originalRequest.url ==="sss"){
            localStorage.removeItem(ACCESS_TOKEN)
            localStorage.removeItem(THANH_KUN_REFRESH_TOKEN)
            localStorage.removeItem(THANH_KUN_USER_ID)
            localStorage.removeItem(THANH_KUN_REFRESH_TOKEN)
            history.push(ROUTES.LOGIN)
            return Promise.reject(error);
        }
        const accessToken = await localStorage.getItem(ACCESS_TOKEN);
        if(accessToken && error.response.status ===401 && !originalRequest._retry){
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem(THANH_KUN_REFRESH_TOKEN) || "_"
            const oldAccessToken = localStorage.getItem(ACCESS_TOKEN) || "_"
            const userId = localStorage.getItem(THANH_KUN_USER_ID) ||  "_"
            return axios({
                method:"POST",
                url:`${BASE_URL}${END_POINTS.NEW_ACCESS_TOKEN}`,
                headers:{
                    Authorization: `Bear ${oldAccessToken}`
                },
                data:{
                    user_id:userId,
                    refresh_token:refreshToken,
                    old_token:oldAccessToken
                }
            })
            .then(async (res) => {
                // console.log("resssssss", res);
                if (get(res, "data.code", 0) === 200) {
                  await localStorage.setItem(
                  ACCESS_TOKEN,
                    get(res, "data.data.token.access_token")
                  );
                  await localStorage.setItem(
                 THANH_KUN_REFRESH_TOKEN,
                    get(res, "data.data.refresh_token")
                  );
                  returnValue.defaults.headers.common[
                    "Authorization"
                  ] = `Bearer ${get(res, "data.data.token.access_token")}`;
                  // console.log("return values", returnValue);
                  return returnValue(originalRequest);
                } else {
                  console.log('2')
                  localStorage.removeItem(ACCESS_TOKEN)
                  localStorage.removeItem(THANH_KUN_REFRESH_TOKEN)
                  localStorage.removeItem(THANH_KUN_USER_ID)
                  localStorage.removeItem(THANH_KUN_REFRESH_TOKEN)
                  history.push(ROUTES.LOGIN);
                }
              })
              .catch((err) => {
                console.log('3')
                localStorage.removeItem(ACCESS_TOKEN)
                localStorage.removeItem(THANH_KUN_REFRESH_TOKEN)
                localStorage.removeItem(THANH_KUN_USER_ID)
                localStorage.removeItem(THANH_KUN_REFRESH_TOKEN)
                history.push(ROUTES.LOGIN);
                return Promise.reject(err);
              })
              .finally(() => {
                return 1;
              });
        } else{
            return Promise.reject(error);
        }
    } 
  )
  return returnValue;
}
export const apiCall = (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: Record<string, unknown>,
  headers?: Record<string, string>,
  useBody?: boolean
): Promise<AxiosResponse<any>> => {
  const config: AxiosRequestConfig = {
    method,
    url,
    baseURL: BASE_URL,
  }
  if (method === 'GET') {
    config.params = data
  } else {
    config.data = data
  }
  return instance(headers)(config).then((response) => {
    return response
  })
}
export const apiCallErrorHanding = async (
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    data?: Record<string, unknown>,
    options: Record<string, unknown> = {}
  ) => {
    let result;
    try {
      const response = await instance()({
        method,
        url,
        data,
        ...options,
      });
      result = response.data;
      return result;
    } catch (error: any) {
      result = error.response || error;
      return result;
    }
  };
  