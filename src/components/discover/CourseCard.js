import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const CourseCard = ({
  courseType,
  name,
  distanceFromUser,
  schoolTime,
  teacher,
  price,
}) => {
  const getCourseTypeText = type => {
    switch (type) {
      case 1:
        return '线下课';
      case 2:
        return '线上课';
      default:
        return '';
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.priceTag}>
        <Text style={styles.priceText}>￥{price}</Text>
      </View>

      <Text style={styles.courseTitle}>{`${getCourseTypeText(
        courseType,
      )} ${name}`}</Text>
      <Text
        style={styles.courseInfo}>{`${distanceFromUser} · ${schoolTime}`}</Text>
      <View style={styles.teacherList}>
        {teacher.map((t, index) => (
          <View key={`teacher-${index}`} style={styles.teacherItem}>
            <Image source={{uri: t.userAvatar}} style={styles.avatar} />
            <Text style={styles.teacherName}>{t.userName}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 16,
    marginBottom: 12,
    width: '93%',
  },
  courseTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseInfo: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  teacherList: {
    flexDirection: 'row',
    marginTop: 8,
  },
  teacherItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  teacherName: {
    color: '#000000',
    marginLeft: 4,
    fontSize: 14,
  },
  priceTag: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  priceText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CourseCard;
