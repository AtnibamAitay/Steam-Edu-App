import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BottomNavigation from '../components/common/BottomNavigation';
import {useNavigation} from '@react-navigation/native';

const Chat = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('Hello World!');

  useEffect(() => {
    // 这里可以编写检查登录状态的逻辑，如果未登录则跳转至登录页
    // 暂时不涉及请求，因此此处为空
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>

      {/* 引入底部导航栏 */}
      <BottomNavigation currentRoute="Chat" navigation={navigation} />
    </View>
  );
};

// 样式调整以适应底部导航栏
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 56, // 确保内容不被底部导航栏遮挡
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'NotoSerifSC-Regular',
  },
});

export default Chat;
