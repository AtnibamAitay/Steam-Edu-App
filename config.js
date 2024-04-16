import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from './src/service/NavigationService';

const CONFIG = {
  development: {
    API_URL: 'http://10.0.2.2:6010/api',
    SteamEduApp_VERSION: '1.0.1',
  },
};

const getEnvVars = (env = process.env.NODE_ENV) => CONFIG[env];

const api = axios.create({
  baseURL: getEnvVars().API_URL,
  timeout: 25000,
});

// 请求拦截器
api.interceptors.request.use(
  async config => {
    // 在发送请求之前在请求头加入token
    const token = await AsyncStorage.getItem('Authorization');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    console.error('Error during request:', error);
    return Promise.reject(error);
  },
);

// 响应拦截器
api.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    const res = response.data;
    if (response.status === 200 && (res.code === 2005 || res.code === 2000)) {
      // 清除本地存储
      AsyncStorage.clear().then(() => {
        NavigationService.navigate('AccountInput');
      });
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return response;
    }
  },
  error => {
    // 对响应错误做点什么
    console.error('Error during response:', error);
    if (error.response && error.response.status === 500) {
      console.error(error.response.message);
    }
    return Promise.reject(error);
  },
);

export {api, getEnvVars};
