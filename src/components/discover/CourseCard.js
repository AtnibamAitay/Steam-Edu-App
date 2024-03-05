import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const CourseCard = ({
  courseId,
  courseType,
  name,
  distanceFromUser,
  schoolTime,
  teacher,
  price,
}) => {
  const navigation = useNavigation();
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

  const handleCoursePress = () => {
    navigation.navigate('CourseDetail', {courseId: courseId});
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handleCoursePress}>
      <View style={styles.courseInfoRow}>
        <View style={styles.courseTypeWrapper}>
          <Text style={styles.courseTypeText}>
            {getCourseTypeText(courseType)}
          </Text>
        </View>
        <Text style={[styles.courseTitle, styles.courseTitleWithType]}>
          {`${name}`}
        </Text>
      </View>

      <View style={styles.priceTag}>
        <Text style={styles.priceText}>￥{price}</Text>
      </View>

      <Text
        style={
          styles.courseSubInfo
        }>{`${distanceFromUser} · ${schoolTime}`}</Text>
      <View style={styles.teacherList}>
        {teacher.map((t, index) => (
          <View key={`teacher-${index}`} style={styles.teacherItem}>
            <Image source={{uri: t.userAvatar}} style={styles.avatar} />
            <Text style={styles.teacherName}>{t.userName}</Text>
          </View>
        ))}
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
  },
  courseTypeWrapper: {
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  courseTypeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  courseInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseTitleWithType: {
    marginLeft: 8,
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseSubInfo: {
    marginTop: 4,
    fontSize: 14,
    color: '#666666',
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
