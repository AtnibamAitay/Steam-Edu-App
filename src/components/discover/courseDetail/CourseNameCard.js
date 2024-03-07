import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const CourseNameCard = ({name}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.courseName}>{name}</Text>
      <View style={styles.separator} />
      <Text style={styles.infoText}>服务 15分钟内免费取消 · 7天无理由退课</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  courseName: {
    fontSize: 18,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
    marginBottom: 8,
    color: '#000000',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CCCCCC',
    opacity: 0.5,
    marginTop: 8,
    marginBottom: 8,
  },
  infoText: {
    color: '#6e6e6e',
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
    marginTop: 4,
  },
});

export default CourseNameCard;
