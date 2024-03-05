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
    margin: 8,
    height: 160,
    width: 130,
  },
  courseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 14,
    color: '#fff',
  },
  salesVolume: {
    fontSize: 12,
    color: '#3656FC',
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
