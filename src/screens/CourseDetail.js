import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {api} from '../../config';
import CoverCarousel from '../components/discover/courseDetail/CoverCarousel';
import StockAndCountdown from '../components/discover/courseDetail/StockAndCountdown';
import CourseNameCard from '../components/discover/courseDetail/CourseNameCard';
import ScoreAndSales from '../components/discover/courseDetail/ScoreAndSales';
import TeacherList from '../components/discover/courseDetail/TeacherList';
import CourseDetailComments from '../components/discover/courseDetail/CourseDetailComments';
import MerchantInfoCard from '../components/discover/courseDetail/MerchantInfoCard';

const CourseDetail = ({route}) => {
  const [courseDetail, setCourseDetail] = useState(null);
  const courseId = route.params.courseId;
  const [courseCover, setCourseCover] = useState(null);

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

      {courseDetail && (
        <View style={styles.courseInfoContainer}>
          {/* 显示价格、剩余名额及倒计时组件 */}
          <StockAndCountdown
            price={courseDetail.price}
            stock={courseDetail.stock}
            totalStock={courseDetail.totalStock}
            startTime={courseDetail.startTime}
          />
          {/* 显示课程名称卡片 */}
          <CourseNameCard name={courseDetail.name} />
          {/* 显示评分与销量统计组件 */}
          <ScoreAndSales
            totalComprehensiveScore={courseDetail.totalComprehensiveScore}
            salesVolume={courseDetail.salesVolume}
            totalClasses={courseDetail.totalClasses}
          />
          {/* 显示教师列表组件 */}
          <View style={styles.courseInfoContainer}>
            <TeacherList teacher={courseDetail.teacher} />
          </View>
          <CourseDetailComments spuId={courseDetail.courseId} />
          {/* 显示商户信息卡片 */}
          <MerchantInfoCard merchant={courseDetail.merchant} />
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
  courseInfoContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default CourseDetail;
