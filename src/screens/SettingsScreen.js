import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  useColorScheme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {api, getEnvVars} from '../../config';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';

  const backgroundColor = isDarkMode ? '#1C1C1C' : '#F2F2F2';
  const buttonBackgroundColor = isDarkMode ? '#262626' : '#FFFFFF';
  const buttonTextBackgroundColor = isDarkMode ? '#FFFFFF' : '#000000';
  // 获取当前环境的版本号
  const currentVersion = getEnvVars().SteamEduApp_VERSION;

  const checkForUpdates = async () => {
    try {
      const response = await api.get('/system/checkUpdate');
      const {version: latestVersion} = response.data.data;

      if (latestVersion === currentVersion) {
        ToastAndroid.show('当前版本是最新版', ToastAndroid.SHORT);
      } else {
        // TODO: 更新的逻辑
        console.log('发现新版本:', latestVersion);
        // 显示新版本信息
        ToastAndroid.show(`发现新版本: ${latestVersion}`, ToastAndroid.LONG);
      }
    } catch (error) {
      console.error('检查更新失败:', error);
      ToastAndroid.show('检查更新失败，请稍后再试', ToastAndroid.SHORT);
    }
  };

  const handleLogout = async () => {
    try {
      // 向后端发送退出登录请求
      await api.post('/users/logout');

      // 清除本地存储中的token
      await AsyncStorage.removeItem('Authorization');

      // 登出成功后跳转到AccountInput页面
      navigation.navigate('AccountInput');
    } catch (error) {
      // 如果请求失败，则显示错误信息
      let message = '发生未知错误，请重试。';
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message = error.response.data.message;
      }
      Alert.alert('退出登录失败', message);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: buttonBackgroundColor}]}>
        <Text style={[styles.buttonText, {color: buttonTextBackgroundColor}]}>
          账号与安全
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: buttonBackgroundColor}]}
        onPress={checkForUpdates}>
        <Text style={[styles.buttonText, {color: buttonTextBackgroundColor}]}>
          检查更新
        </Text>
        <Text style={[styles.versionText, {color: buttonTextBackgroundColor}]}>
          v{currentVersion}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          styles.centeredButtonText,
          {backgroundColor: buttonBackgroundColor},
        ]}
        onPress={handleLogout}>
        <Text
          style={[
            styles.buttonText,
            styles.buttonTextCentered,
            {color: buttonTextBackgroundColor},
          ]}>
          退出登录
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    marginVertical: 8,
    width: '93%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'NotoSerifSC-Regular',
  },
  buttonTextCentered: {
    textAlign: 'center',
  },
  centeredButtonText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '93%',
    marginTop: 8,
  },
  versionText: {
    fontSize: 14,
    color: '#8e8e8e',
    fontFamily: 'NotoSerifSC-Regular',
  },
});

export default SettingsScreen;
