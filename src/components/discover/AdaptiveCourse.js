import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AdaptiveCourse = ({courseId, name, userName, salesVolume}) => (
  <View style={styles.AdaptiveCourse}>
    <Text style={styles.courseName}>{name}</Text>
    <Text style={styles.userName}>{userName}</Text>
    <View style={styles.salesVolumeWrapper}>
      <Text style={styles.salesVolume}>{salesVolume}人已上课</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  AdaptiveCourse: {
    backgroundColor: '#3656FC',
    borderRadius: 12,
    padding: 16,
    margin: 6,
    height: 170,
    width: 120,
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
    fontSize: 10,
    color: '#3656FC',
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
  salesVolumeWrapper: {
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
});

export default AdaptiveCourse;
