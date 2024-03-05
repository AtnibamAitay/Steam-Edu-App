import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, SafeAreaView} from 'react-native';
import {api} from '../../config';
import CourseCard from '../components/discover/CourseCard';
import UserInfo from '../components/discover/UserInfo';
import AdaptiveCourse from '../components/discover/AdaptiveCourse';
import BottomNavigation from '../components/common/BottomNavigation';
import {useNavigation} from '@react-navigation/native';

const Discover = () => {
  const [courses, setCourses] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [adaptiveCourses, setAdaptiveCourses] = useState([]);
  const routeName = 'Discover';
  const navigation = useNavigation();
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

    // 获取用户信息的请求
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

    const fetchAdaptiveCourses = async () => {
      try {
        const response3 = await api.get('/spu');
        if (response3.data.code === 200) {
          setAdaptiveCourses(response3.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch adaptive courses:', error);
      }
    };

    fetchCourses();
    fetchUserInfo();
    fetchAdaptiveCourses();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {userInfo && (
          <View style={styles.componentWrapper}>
            <UserInfo userInfo={userInfo} />
          </View>
        )}

        <View style={styles.componentWrapper}>
          <View style={styles.horizontalScrollContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {adaptiveCourses &&
                adaptiveCourses.map(course => (
                  <AdaptiveCourse
                    key={course.courseId}
                    courseId={course.courseId}
                    name={course.name}
                    userName={course.userName}
                    salesVolume={course.salesVolume}
                  />
                ))}
            </ScrollView>
          </View>
        </View>

        {/* 课程卡片列表 */}
        <View style={styles.componentWrapper}>
          {courses &&
            courses.map(course => (
              <CourseCard key={course.courseId} {...course} />
            ))}
        </View>
      </ScrollView>
      <BottomNavigation currentRoute={routeName} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    paddingHorizontal: 16,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  componentWrapper: {
    width: '100%',
  },
  horizontalScrollContainer: {
    flexGrow: 1,
    width: '100%',
  },

  // 添加一个新的样式用于 BottomNavigation
  bottomNavigation: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default Discover;
