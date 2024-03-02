import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const UserInfo = ({userInfo}) => {
  const {userAvatar, userName, userLocationRegion} = userInfo;

  return (
    <View style={styles.userInfoContainer}>
      <View style={styles.avatarAndTextContainer}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.location}>{userLocationRegion}</Text>
      </View>

      <TouchableOpacity activeOpacity={0.8}>
        <Image
          source={{uri: userAvatar}}
          style={[
            styles.avatar,
            {borderTopRightRadius: 0, borderBottomRightRadius: 0},
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarAndTextContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 10,
  },
  userName: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    color: '#000000',
    fontSize: 14,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
};

export default UserInfo;
