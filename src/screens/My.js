import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  useColorScheme,
  TouchableOpacity,
  ToastAndroid,
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

  const handleStudentInfoPress = () => {
    navigation.navigate('StudentInfoScreen');
  };
  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };
  const handleCourseHistoryPress = () => {
    navigation.navigate('CourseHistory');
  };
  const handleFavoritePress = () => {
    navigation.navigate('Favorite');
  };
  const handleCouponPress = () => {
    navigation.navigate('CouponListScreen');
  };
  const handleCourseCartPress = () => {
    navigation.navigate('CourseCartScreen');
  };
  const handleGivePositiveReviewPress = () => {
    ToastAndroid.show('ᕦ(･ㅂ･)ᕤ 我们将会变得更好！', ToastAndroid.SHORT);
  };

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
      {/* 用户信息 */}
      <View style={styles.userProfile}>
        <Image
          source={avatarUri || defaultAvatar}
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            overflow: 'hidden',
          }}
        />
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: buttonBackgroundColor},
          styles.specialMarginButtonGroup,
        ]}
        onPress={handleStudentInfoPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/icon/my/id-card-h.png')}
            style={styles.myIcon}
          />
          <Text style={[styles.buttonText, {color: buttonTextBackgroundColor}]}>
            我的信息
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.upButton,
          {backgroundColor: buttonBackgroundColor},
          styles.specialMarginButtonGroup,
        ]}
        onPress={handleCourseCartPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/icon/my/arithmetic-buttons.png')}
            style={styles.myIcon}
          />
          <Text style={[styles.buttonText, {color: buttonTextBackgroundColor}]}>
            选课单
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.midButton,
          {backgroundColor: buttonBackgroundColor},
          styles.specialMarginButtonGroup,
        ]}
        onPress={handleCourseHistoryPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/icon/my/history.png')}
            style={styles.myIcon}
          />
          <Text style={[styles.buttonText, {color: buttonTextBackgroundColor}]}>
            课程历史
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.midButton,
          {backgroundColor: buttonBackgroundColor},
          styles.specialMarginButtonGroup,
        ]}
        onPress={handleFavoritePress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/icon/my/like.png')}
            style={styles.myIcon}
          />
          <Text style={[styles.buttonText, {color: buttonTextBackgroundColor}]}>
            收藏
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.downButton,
          {backgroundColor: buttonBackgroundColor},
          styles.specialMarginButtonGroup,
        ]}
        onPress={handleCouponPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/icon/my/ticket.png')}
            style={styles.myIcon}
          />
          <Text style={[styles.buttonText, {color: buttonTextBackgroundColor}]}>
            优惠券
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.upButton, {backgroundColor: buttonBackgroundColor}]}
        onPress={handleSettingsPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/icon/my/setting-one.png')}
            style={styles.myIcon}
          />
          <Text style={[styles.buttonText, {color: buttonTextBackgroundColor}]}>
            设置
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.downButton, {backgroundColor: buttonBackgroundColor}]}
        onPress={handleGivePositiveReviewPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/icon/my/thumbs-up.png')}
            style={styles.myIcon}
          />
          <Text style={[styles.buttonText, {color: buttonTextBackgroundColor}]}>
            给我们好评
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    alignItems: 'center',
    backgroundColor: '#F8F9FD',
  },
  userProfile: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 90,
  },
  userName: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'NotoSerifSC-Regular',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 26,
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
  upButton: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    marginVertical: 0,
    width: '93%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    marginTop: 12,
  },
  midButton: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    marginVertical: 8,
    width: '93%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  downButton: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    marginVertical: 0,
    width: '93%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  specialMarginButtonGroup: {
    marginVertical: 0,
  },
  buttonText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'NotoSerifSC-Regular',
    marginLeft: 14,
  },
  myIcon: {
    width: 24,
    height: 24,
    marginLeft: 4,
  },
});

export default My;
