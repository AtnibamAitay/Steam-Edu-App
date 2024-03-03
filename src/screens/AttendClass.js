import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from '../service/NavigationService';
import {getEnvVars, api} from '../config';

const AttendClass = () => {
  const [message, setMessage] = useState('Hello World!');

  useEffect(() => {
    // 这里可以编写检查登录状态的逻辑，如果未登录则跳转至登录页
    // 暂时不涉及请求，因此此处为空
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'NotoSerifSC-Regular', // 使用已存在的字体文件
  },
});

export default AttendClass;
