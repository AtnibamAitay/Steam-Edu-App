import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const UserAdaptiveCourse = ({courseId, name, userName}) => (
  <View style={styles.AdaptiveCourse}>
    <Text style={styles.courseName}>{name}</Text>
    <Text style={styles.userName}>{userName}</Text>
  </View>
);

const styles = StyleSheet.create({
  AdaptiveCourse: {
    backgroundColor: '#3656FC',
    borderRadius: 12,
    padding: 16,
    margin: 6,
    height: 170,
    width: 110,
  },
  courseName: {
    fontSize: 20,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
    color: '#fff',
    marginBottom: 6,
  },
  userName: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
    marginBottom: 12,
  },
  salesVolume: {
    fontSize: 14,
    color: '#3656FC',
    backgroundColor: '#fff',
  },
});

export default UserAdaptiveCourse;
