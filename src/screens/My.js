import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigation from '../components/common/BottomNavigation';
import {useNavigation} from '@react-navigation/native';
const defaultAvatar = require('../../assets/img/common/Avatar.jpg');

const My = () => {
  const navigation = useNavigation();
  const scheme = useColorScheme();
  const isDarkMode = scheme === 'dark';
  const [userName, setUserName] = useState('');
  const [avatarUri, setAvatarUri] = useState('');

  const backgroundColor = isDarkMode ? '#1C1C1C' : '#F2F2F2';
  const buttonBackgroundColor = isDarkMode ? '#262626' : '#FFFFFF';
  const buttonTextBackgroundColor = isDarkMode ? '#FFFFFF' : '#000000';

  useEffect(() => {
    async function fetchUserInfo() {
      const storedUserName = await AsyncStorage.getItem('userName');
      if (storedUserName) {
        setUserName(storedUserName);
      }

      const storedAvatarUrl = await AsyncStorage.getItem('avatar');
      let avatarSource;

      if (storedAvatarUrl && storedAvatarUrl !== '') {
        avatarSource = {uri: storedAvatarUrl};
      } else {
        avatarSource = defaultAvatar;
      }

      setAvatarUri(avatarSource);
    }

    fetchUserInfo();
  }, []);

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.userProfile}>
        {avatarUri ? (
          <Image
            source={avatarUri}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              overflow: 'hidden',
            }}
          />
        ) : (
          <Image
            source={defaultAvatar}
            style={{width: 50, height: 50, borderRadius: 25}}
          />
        )}
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: buttonBackgroundColor}]}>
        <Text style={[styles.buttonText, {color: buttonTextBackgroundColor}]}>
          我的信息
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: buttonBackgroundColor}]}>
        <Text style={[styles.buttonText, {color: buttonTextBackgroundColor}]}>
          选课单
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: buttonBackgroundColor}]}>
        <Text style={[styles.buttonText, {color: buttonTextBackgroundColor}]}>
          课程历史
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: buttonBackgroundColor}]}>
        <Text style={[styles.buttonText, {color: buttonTextBackgroundColor}]}>
          收藏
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: buttonBackgroundColor}]}>
        <Text style={[styles.buttonText, {color: buttonTextBackgroundColor}]}>
          优惠券
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: buttonBackgroundColor}]}>
        <Text style={[styles.buttonText, {color: buttonTextBackgroundColor}]}>
          设置
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: buttonBackgroundColor}]}>
        <Text style={[styles.buttonText, {color: buttonTextBackgroundColor}]}>
          给我们好评
        </Text>
      </TouchableOpacity>

      <BottomNavigation currentRoute="My" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    alignItems: 'center',
  },
  userProfile: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  userName: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'NotoSerifSC-Regular',
    textAlign: 'center',
    marginTop: 10,
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

export default My;
