import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {api} from '../../config';
import CoverCarousel from '../components/discover/courseDetail/CoverCarousel';

const CourseDetail = ({route}) => {
  const [courseDetail, setCourseDetail] = useState(null);
  const courseId = route.params.courseId;
  const [courseCover, setCourseCover] = useState(null); // 新增：用于存储轮播图数据

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await api.get(`/spu/${courseId}/detail`);
        if (response.data.code === 200) {
          setCourseDetail(response.data.data);
          setCourseCover(response.data.data.cover);
        }
      } catch (error) {
        console.error('Failed to fetch course detail:', error);
      }
    };

    fetchCourseDetail();
  }, [courseId]);

  return (
    <ScrollView style={styles.container}>
      {courseCover && (
        <View style={styles.carouselContainer}>
          <CoverCarousel covers={courseCover} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
  carouselContainer: {
    height: 200,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  coursePrice: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  courseStock: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  courseStartTime: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
});

export default CourseDetail;
