import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {api} from '../../config';
import CourseCard from '../components/discover/CourseCard';
import UserInfo from '../components/discover/UserInfo';

const Discover = () => {
  const [courses, setCourses] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response1 = await api.get('/spu/nearby', {
          params: {lat: 1.0, lng: 1.0},
        });
        setCourses(response1.data.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    // 新增：获取用户信息的请求
    const fetchUserInfo = async () => {
      try {
        const response2 = await api.get('/user/info');
        if (response2.data.code === 200) {
          setUserInfo({
            userAvatar: response2.data.data.userAvatar,
            userName: response2.data.data.userName,
            userLocationRegion: `您当前所在位置：${response2.data.data.userLocationRegion}`,
          });
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchCourses();
    fetchUserInfo();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {userInfo && <UserInfo userInfo={userInfo} />}

      {courses.map(course => (
        <CourseCard key={course.courseId} {...course} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});

export default Discover;
