import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const MerchantInfoCard = ({merchant}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>开课机构</Text>
      <View style={styles.infoRow}>
        <Image
          source={{uri: merchant.userAvatar}}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={styles.userName}>{merchant.userName}</Text>
          <Text style={styles.userIntroduction}>
            {merchant.userIntroduction}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
    color: '#000000',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 35,
    height: 35,
    marginRight: 16,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
    color: '#333333',
  },
  userIntroduction: {
    fontSize: 14,
    color: '#707070',
    marginTop: 4,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
});

export default MerchantInfoCard;
