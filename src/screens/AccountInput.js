import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {api} from '../../config';

const AccountInputScreen = () => {
  const navigation = useNavigation();

  const [accountNumber, setAccountNumber] = useState('');
  const [checkStatus, setCheckStatus] = useState('undefined');
  const applyButtonBackground =
    accountNumber.length > 0 ? '#266BF1' : '#9DB9FF'; // 当输入框为空时使用浅紫色背景
  const [isButtonActive, setIsButtonActive] = useState(false);

  const inputHandler = text => {
    setAccountNumber(text);
    const method = detectLoginMethod(text); // 检测输入内容
    // 直接使用method结果来设置按钮状态和checkStatus
    setIsButtonActive(method !== null); // 如果是邮箱或手机号码则激活按钮
    setCheckStatus(method ? 'apply' : 'undefined');
  };

  // 检测登录方式函数，返回'phone'、'email'或null
  const detectLoginMethod = value => {
    const phoneReg =
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (phoneReg.test(value)) {
      return 'phone'; // 手机号登录验证
    } else if (emailReg.test(value)) {
      return 'email'; // 邮箱登录验证
    }
    return null; // 无法确定登录方式
  };

  // 跳转到验证码页面函数
  const goTocode = () => {
    const codeType = detectLoginMethod(accountNumber);
    if (codeType === null) {
      Alert.alert('登录失败', '请输入正确的邮箱地址');
    } else {
      // 发送验证码，并导航至验证码输入界面
      sendVerifyCode(accountNumber, codeType);
    }
  };

  const sendVerifyCode = async (accountNumber, codeType) => {
    const method = codeType === 'email' ? 2 : 1;

    try {
      const response = await api.post('/auth/verification-codes', {
        accountNumber,
        codeType: method,
      });
      const {data} = response;

      if (data.code === 200) {
        navigation.navigate('VerificationCode', {
          accountNumber,
          codeType: method,
        });
      } else if (data.code === 2003) {
        Alert.alert('登录失败', data.message);
      } else {
        Alert.alert('登录失败', data.message || '出现未知错误，请稍后重试');
      }
    } catch (error) {
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

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.loginHeader}>
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
            账号登录
          </SvgText>
        </Svg>
        <Text style={styles.loginDescription}>
          Adaptive Coordinative Algorithmic Conflux Cardinal
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.accountInput}
          placeholder="邮箱地址"
          fontFamily="NotoSerifSC-SemiBold"
          onChangeText={inputHandler}
          value={accountNumber}
          maxLength={30}
          placeholderTextColor="#C6C6C6"
          selectionColor="#800080"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.applyButton,
            {backgroundColor: isButtonActive ? '#266BF1' : '#9DB9FF'},
          ]}
          onPress={goTocode}
          disabled={!isButtonActive} // 只有当isButtonActive为true时，按钮才可用
        >
          <Image
            style={styles.icon}
            source={require('../../assets/icon/login/right.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    backgroundColor: '#FFFFFF',
  },
  loginHeader: {
    alignItems: 'flex-start',
    marginTop: 145,
  },
  loginTitle: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'PingFang-Blod',
    paddingTop: 0,
    paddingBottom: 0,
    includeFontPadding: false,
  },
  loginDescription: {
    fontSize: 14,
    color: '#C6C6C6',
    fontFamily: 'NotoSerifSC-Regular',
    paddingTop: 0,
    paddingBottom: 0,
    includeFontPadding: false,
  },
  inputContainer: {
    borderBottomWidth: 0,
    fontSize: 30,
    alignSelf: 'stretch',
    paddingTop: 20,
    paddingBottom: 0,
    includeFontPadding: false,
  },
  accountInput: {
    color: '#000000',
    fontSize: 30,
    height: 34,
    fontFamily: 'NotoSerifSC-Medium',
    borderBottomColor: 'transparent',
    textAlign: 'left',
    paddingStart: 0,
    paddingTop: 0,
    paddingBottom: 0,
    includeFontPadding: false,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  applyButton: {
    width: 66,
    height: 66,
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 33,
    borderWidth: 0,
  },
  icon: {
    width: 43.2,
    height: 43.2,
  },
});

export default AccountInputScreen;
