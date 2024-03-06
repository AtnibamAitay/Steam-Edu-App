import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import BottomNavigation from '../components/common/BottomNavigation';
import {useNavigation} from '@react-navigation/native';
import UserAdaptiveCourse from '../components/attendClass/UserAdaptiveCourse';
import {api} from '../../config';
import UserCourseCard from '../components/attendClass/UserCourseCard';

const AttendClass = () => {
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]);
  const [adaptiveCourses, setAdaptiveCourses] = useState([]);
  const [offlineOnlineCourses, setOfflineOnlineCourses] = useState([]);

  useEffect(() => {
    async function fetchAdaptiveCourses() {
      try {
        const response = await api.get('/user/course/adaptive');
        if (response.status === 200 && response.data.code === 200) {
          setAdaptiveCourses(response.data.data);
        } else {
          console.error('Failed to fetch adaptive courses:', response.data.msg);
        }
      } catch (error) {
        console.error('Error during fetching adaptive courses:', error);
      }
    }

    async function fetchOfflineOnlineCourses() {
      try {
        const response = await api.get('/user/course');
        if (response.status === 200 && response.data.code === 200) {
          setOfflineOnlineCourses(response.data.data);
        } else {
          console.error(
            'Failed to fetch offline and online courses:',
            response.data.msg,
          );
        }
      } catch (error) {
        console.error(
          'Error during fetching offline and online courses:',
          error,
        );
      }
    }

    fetchAdaptiveCourses();
    fetchOfflineOnlineCourses();
  }, []);

  // 将自适应课程列表分组，每组最多三个元素（假设也需要分组）
  const groupedAdaptiveCourses = [];
  for (let i = 0; i < adaptiveCourses.length; i += 3) {
    groupedAdaptiveCourses.push(adaptiveCourses.slice(i, i + 3));
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.titleWrapper}>
          <Text style={[styles.myClassTitleText]}>我的课程</Text>
        </View>
        <View style={styles.titleWrapper}>
          <Text style={[styles.textTitle]}>个性化课程</Text>
        </View>
        {/* 渲染用户自适应课程列表 */}
        {groupedAdaptiveCourses.map((courseGroup, indexGroup) => (
          <View
            key={`adaptive-course-group-${indexGroup}`}
            style={styles.courseGroup}>
            {courseGroup.map(({courseId, name, userName}, index) => (
              <UserAdaptiveCourse
                key={`adaptive-course-${index}`}
                courseId={courseId}
                name={name}
                userName={userName}
              />
            ))}
          </View>
        ))}

        <View style={styles.titleWrapper}>
          <Text style={[styles.textTitle]}>正在进行的线下课</Text>
        </View>
        {/* 渲染用户线下课、线上课课程列表 */}
        {offlineOnlineCourses.map((course, index) => (
          <UserCourseCard
            key={`course-${index}`}
            courseType={course.courseType}
            name={course.name}
            schoolTime={course.schoolTime}
            teacher={course.teacher}
            location={course.location}
            classDuration={course.classDuration}
          />
        ))}
      </ScrollView>
      <BottomNavigation currentRoute="AttendClass" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FD',
    paddingBottom: 56,
    paddingHorizontal: 16,
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
  titleWrapper: {
    paddingVertical: 16,
    alignSelf: 'flex-start',
  },
  textTitle: {
    fontSize: 16,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
    color: '#333',
  },
  myClassTitleText: {
    fontSize: 27,
    fontFamily: 'NotoSerifSC-Bold',
    includeFontPadding: false,
    color: '#333',
    paddingTop: 80,
  },
});

export default AttendClass;
