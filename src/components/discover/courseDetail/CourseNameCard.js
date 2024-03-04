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
    borderRadius: 8,
    marginBottom: 16,
  },
  courseName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
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
    color: '#999999',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default CourseNameCard;
