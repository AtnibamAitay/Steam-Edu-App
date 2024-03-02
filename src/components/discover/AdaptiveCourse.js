import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AdaptiveCourse = ({courseId, name, userName, salesVolume}) => (
  <View style={styles.AdaptiveCourse}>
    <Text style={styles.courseName}>{name}</Text>
    <Text style={styles.userName}>{userName}</Text>
    <Text style={styles.salesVolume}>{salesVolume}</Text>
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 14,
    color: '#fff',
  },
  salesVolume: {
    fontSize: 14,
    color: '#fff',
  },
});

export default AdaptiveCourse;
