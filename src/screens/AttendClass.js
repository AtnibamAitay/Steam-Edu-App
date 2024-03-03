import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BottomNavigation from '../components/common/BottomNavigation';
import {useNavigation} from '@react-navigation/native';
import UserAdaptiveCourse from '../components/attendClass/UserAdaptiveCourse';
import {api} from '../../config';

const AttendClass = () => {
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchAdaptiveCourses() {
      try {
        const response = await api.get('/user/course/adaptive');
        if (response.status === 200 && response.data.code === 200) {
          setCourses(response.data.data);
        } else {
          console.error('Failed to fetch adaptive courses:', response.data.msg);
        }
      } catch (error) {
        console.error('Error during fetching adaptive courses:', error);
      }
    }

    fetchAdaptiveCourses();
  }, []);

  // 将课程列表分组，每组最多三个元素
  const groupedCourses = [];
  for (let i = 0; i < courses.length; i += 3) {
    groupedCourses.push(courses.slice(i, i + 3));
  }

  return (
    <View style={styles.container}>
      {/* 渲染用户自适应课程列表 */}
      {groupedCourses.map((courseGroup, indexGroup) => (
        <View key={`course-group-${indexGroup}`} style={styles.courseGroup}>
          {courseGroup.map(({courseId, name, userName}, index) => (
            <UserAdaptiveCourse
              key={`course-${index}`}
              courseId={courseId}
              name={name}
              userName={userName}
            />
          ))}
        </View>
      ))}

      <BottomNavigation currentRoute="AttendClass" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 56,
  },
  courseGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'NotoSerifSC-Regular',
  },
});

export default AttendClass;
