import React, {useEffect, useState, useRef} from 'react';
import {ScrollView, RefreshControl, StyleSheet, View} from 'react-native';
import {api} from '../../config';
import CoverCarousel from '../components/discover/courseDetail/CoverCarousel';
import StockAndCountdown from '../components/discover/courseDetail/StockAndCountdown';
import CourseNameCard from '../components/discover/courseDetail/CourseNameCard';
import ScoreAndSales from '../components/discover/courseDetail/ScoreAndSales';
import TeacherList from '../components/discover/courseDetail/TeacherList';
import CourseDetailComments from '../components/discover/courseDetail/CourseDetailComments';
import MerchantInfoCard from '../components/discover/courseDetail/MerchantInfoCard';
import CourseDescription from '../components/discover/courseDetail/CourseDescription';
import BottomBar from '../components/discover/courseDetail/BottomBar';
import {useNavigation} from '@react-navigation/native';

const CourseDetail = ({route}) => {
  const [courseDetail, setCourseDetail] = useState(null);
  const courseId = route.params.courseId;
  const [courseCover, setCourseCover] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation();
  const refreshControlRef = useRef();

  useEffect(() => {
    fetchCourseDetail();
  }, [courseId]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchCourseDetail();
    } catch (error) {
      console.error('Failed to refresh course detail:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

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

  const handleReservationPress = () => {
    navigation.navigate('OrderConfirmation', {courseId: courseId});
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor="#FF0000" // 刷新控件的颜色
            colors={['#00FF00', '#0000FF']} // 指示器颜色动画序列
          />
        }>
        {courseCover && (
          <View style={styles.carouselContainer}>
            <CoverCarousel covers={courseCover} />
          </View>
        )}

        {courseDetail && (
          <View style={styles.courseInfoContainer}>
            {/* 价格、剩余名额及倒计时组件 */}
            <StockAndCountdown
              price={courseDetail.price}
              stock={courseDetail.stock}
              totalStock={courseDetail.totalStock}
              startTime={courseDetail.startTime}
            />
            {/* 课程名称卡片 */}
            <CourseNameCard name={courseDetail.name} />
            {/* 评分与销量统计组件 */}
            <ScoreAndSales
              totalComprehensiveScore={courseDetail.totalComprehensiveScore}
              salesVolume={courseDetail.salesVolume}
              totalClasses={courseDetail.totalClasses}
            />
            {/* 教师列表组件 */}
            <View style={styles.courseInfoContainer}>
              <TeacherList teacher={courseDetail.teacher} />
            </View>
            <CourseDetailComments spuId={courseDetail.courseId} />
            {/* 商户信息卡片 */}
            <MerchantInfoCard merchant={courseDetail.merchant} />
            {/* 课程描述 */}
            <CourseDescription images={courseDetail.detail} />
          </View>
        )}
      </ScrollView>
      <BottomBar
        courseId={courseId}
        onReservationPress={handleReservationPress}
      />
    </>
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
