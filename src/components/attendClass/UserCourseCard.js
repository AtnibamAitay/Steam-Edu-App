import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const UserCourseCard = ({
  courseType,
  name,
  schoolTime,
  teacher,
  location,
  classDuration,
  onPress,
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
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <Text style={styles.courseTitle}>{`${getCourseTypeText(
          courseType,
        )} ${name}`}</Text>
        <Text style={styles.courseInfo}>{`${schoolTime}`}</Text>
        <View style={styles.teacherList}>
          {teacher.map((t, index) => (
            <View key={`teacher-${index}`} style={styles.teacherItem}>
              <Image source={{uri: t.userAvatar}} style={styles.avatar} />
              <Text style={styles.teacherName}>{t.userName}</Text>
            </View>
          ))}
        </View>
        <View style={styles.infoSection}>
          <View style={[styles.infoRow, {alignItems: 'flex-start'}]}>
            <Text style={[styles.courseInfo, {textAlign: 'right'}]}>
              上课地点：
            </Text>
            <Text style={styles.courseInfo}>{location}</Text>
          </View>
          <View
            style={[styles.infoRow, {alignItems: 'flex-start', marginTop: 4}]}>
            <Text style={[styles.courseInfo, {textAlign: 'right'}]}>
              课时数：
            </Text>
            <Text style={styles.courseInfo}>{classDuration}分钟</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 16,
    marginBottom: 12,
    width: 350,
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  infoSection: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default UserCourseCard;
