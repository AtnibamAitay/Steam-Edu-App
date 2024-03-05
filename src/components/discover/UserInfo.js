import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';

const UserInfo = ({userInfo}) => {
  const {userAvatar, userName, userLocationRegion} = userInfo;

  // 获取当前时间
  const currentTime = moment().hours();

  let greeting = '';

  // 根据时间判断问候语
  if (currentTime >= 6 && currentTime < 11) {
    greeting = '早上好, ';
  } else if (currentTime >= 11 && currentTime < 13) {
    greeting = '中午好, ';
  } else if (currentTime >= 13 && currentTime < 17) {
    greeting = '下午好, ';
  } else {
    greeting = '晚上好, ';
  }

  return (
    <View style={styles.userInfoContainer}>
      {/* 调整 userInfoContainer 的 justifyContent */}
      <View style={[styles.textContainer, {marginVertical: 5}]}>
        {/* 在用户名前添加问候语 */}
        <Text style={styles.userName}>{`${greeting}${userName}`}</Text>
        <Text style={styles.location}>{userLocationRegion}</Text>
      </View>

      {/* 调整 avatarWrapper 并保持其在右边，但水平居中对齐 */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.avatarWrapper, {alignSelf: 'center'}]}>
        <Image source={{uri: userAvatar}} style={styles.avatar} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  userInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 2,
  },
  userName: {
    color: '#000000',
    fontSize: 26,
    fontFamily: 'SmileySans-Oblique',
  },
  location: {
    color: '#333333',
    fontSize: 14,
    fontFamily: 'NotoSerifSC-Regular',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  avatarWrapper: {
    marginRight: 10,
  },
};

export default UserInfo;
