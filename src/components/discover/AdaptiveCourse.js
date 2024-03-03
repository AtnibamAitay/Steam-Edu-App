import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AdaptiveCourse = ({courseId, name, userName, salesVolume}) => (
  <View style={styles.AdaptiveCourse}>
    <Text style={styles.courseName}>{name}</Text>
    <Text style={styles.userName}>{userName}</Text>
    <Text style={styles.salesVolume}>{salesVolume}人已上课</Text>
  </View>
);

const styles = StyleSheet.create({
  AdaptiveCourse: {
    backgroundColor: '#3656FC',
    borderRadius: 8,
    padding: 16,
    margin: 8,
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
    fontSize: 14,
    color: '#3656FC',
    backgroundColor: '#fff',
  },
});

export default AdaptiveCourse;
