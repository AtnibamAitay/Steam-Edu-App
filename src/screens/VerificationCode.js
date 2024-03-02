import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {api} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';

const VerificationCodeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [verificationCode, setVerificationCode] = useState('');
  const [inputArray, setInputArray] = useState(new Array(6).fill(''));
  const [seconds, setSeconds] = useState(5);
  const [resendText, setResendText] = useState('重新发送 5s');
  const [timerColor, setTimerColor] = useState('#cacaca');
  const timerRef = useRef(null);

  const startCountdown = () => {
    setSeconds(5);
    setTimerColor('#cacaca');
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(timerRef.current);
          setResendText('重新发送');
          setTimerColor('#000000');
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startCountdown();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (seconds > 0) {
      setResendText(`重新发送 ${seconds}s`);
    } else {
      setResendText('重新发送'); // 当时间为0时，只显示重新发送
    }
  }, [seconds]);

  const verifyCode = async () => {
    try {
      const accountNumber = route.params.accountNumber;
      const loginMethod = route.params.codeType;

      // 使用api实例发送请求来利用已经设置的拦截器
      const response = await api.post('/auth/login', {
        accountNumber,
        verifyCode: verificationCode,
        loginMethod,
      });

      const data = response.data;

      if (data && data.code === 200 && data.data.accessToken) {
        console.log('登录成功！');

        // 保存用户数据到AsyncStorage
        await AsyncStorage.setItem('Authorization', `${data.data.accessToken}`);
        await AsyncStorage.setItem('userName', `${data.data.userName}`);
        await AsyncStorage.setItem('avatar', `${data.data.avatar}`);

        // 导航到首页
        navigation.reset({
          index: 0, // 表示用户处于堆栈中的哪个页面，0 表示第一页
          routes: [{name: 'Discover'}], // 定义新的路由堆栈，只包含首页
        });
      } else {
        // 登录失败的处理逻辑...
        Alert.alert('验证失败', data.message || '验证码不正确，请重新输入');
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        '请求失败',
        error.response?.data?.message || '无法连接到服务器，请检查您的网络设置',
      );
    }
  };

  const resendVerificationCode = async () => {
    const accountNumber = route.params.accountNumber; // 从路由参数中获取账号
    const loginMethod = route.params.codeType; // 从路由参数中获取登录方法

    try {
      // 发送请求到后端，要求重新发送验证码
      const method = loginMethod === 'email' ? 2 : 1; // 根据登录方法确定参数
      const response = await api.post('/user/sendVerifyCode', {
        accountNumber,
        loginMethod: method,
      });
      const {data} = response;

      if (data.code === 200) {
        // 验证码发送成功
        startCountdown(); // 重新开始倒计时
      } else {
        // 其它错误情况
        Alert.alert('发送失败', data.message || '无法发送验证码，请稍后重试');
      }
    } catch (error) {
      // 网络错误或其他异常处理
      let message = '无法连接到服务器，请检查您的网络设置';
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message = error.response.data.message;
      }
      Alert.alert('网络异常', message);
    }
  };

  // 更新输入框数组
  useEffect(() => {
    const validCode = verificationCode.replace(/[^0-9]/g, ''); // 使用正则表达式保证只有数字
    if (verificationCode !== validCode) {
      setVerificationCode(validCode);
    }

    const newArr = new Array(6).fill('');
    for (let i = 0; i < validCode.length; i++) {
      newArr[i] = validCode[i];
    }
    setInputArray(newArr);

    // 当输入满足长度6时，尝试验证验证码
    if (validCode.length === 6) {
      verifyCode();
    }
  }, [verificationCode]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Image
          style={styles.backIcon}
          source={require('../../assets/icon/common/left.png')}
        />
      </TouchableOpacity>
      <View style={styles.header}>
        <Svg height="60" width="200">
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0" stopColor="#0623CD" stopOpacity="1" />
              <Stop offset="1" stopColor="#266BF1" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <SvgText
            fill="url(#grad)"
            fontSize="22"
            x="0"
            y="48"
            fontFamily="PingFang-Blod">
            邮箱验证码
          </SvgText>
        </Svg>
        <Text style={styles.description}>
          Adaptive Coordinative Algorithmic Conflux Cardinal
        </Text>
      </View>
      <View style={styles.inputContainer}>
        {inputArray.map((item, index) => (
          <View key={index} style={styles.box}>
            <Text style={styles.boxText}>{item}</Text>
          </View>
        ))}
        <TextInput
          style={styles.realInput}
          maxLength={6}
          keyboardType="numeric"
          value={verificationCode}
          onChangeText={text =>
            setVerificationCode(text.replace(/[^0-9]/g, ''))
          }
          underlineColorAndroid="#63065F"
        />
      </View>
      <TouchableOpacity disabled={seconds > 0} onPress={resendVerificationCode}>
        <Text style={[styles.resendText, {color: timerColor}]}>
          {resendText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    marginTop: 60,
    marginLeft: 22,
    width: 20,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  header: {
    marginHorizontal: 26,
    marginTop: 65,
  },
  title: {
    fontSize: 22,
    fontFamily: 'PingFang-Blod',
    color: '#63065F',
  },
  description: {
    fontSize: 14,
    color: '#C6C6C6',
    fontFamily: 'NotoSerifSC-Regular',
    paddingTop: 0,
    paddingBottom: 0,
    includeFontPadding: false,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 26,
  },
  realInput: {
    position: 'absolute',
    top: 0,
    left: 26,
    right: 26,
    bottom: 0,
    opacity: 0,
  },
  box: {
    borderBottomWidth: 3,
    borderBottomColor: '#f5f5f5',
    marginRight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    width: 20,
  },
  boxText: {
    fontSize: 35,
    color: '#000',
    fontFamily: 'NotoSerifSC-Medium',
    paddingTop: 0,
    paddingBottom: 0,
    includeFontPadding: false,
  },
  resendText: {
    alignSelf: 'center',
    marginTop: 140,
    fontSize: 16,
  },
});

export default VerificationCodeScreen;
