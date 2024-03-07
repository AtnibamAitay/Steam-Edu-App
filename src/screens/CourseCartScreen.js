import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import CourseCard from '../components/discover/CourseCard';
import {api} from '../../config';

const CourseCartScreen = () => {
  const [courseList, setCourseList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function fetchCourseCart() {
      try {
        const response = await api.get('/course/cart');
        if (response.status === 200 && response.data.code === 200) {
          setCourseList(response.data.data);
          setTotalPrice(
            response.data.data.reduce((acc, curr) => acc + curr.price, 0),
          );
        }
      } catch (error) {
        console.error('Error fetching course cart:', error);
      }
    }

    fetchCourseCart();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {courseList.map((course, index) => (
          <CourseCard
            key={`course-${index}`}
            courseId={course.courseId}
            courseType={course.courseType}
            name={course.name}
            schoolTime={course.schoolTime}
            teacher={course.teacher}
            price={course.price}
            distanceFromUser={course.distanceFromUser}
          />
        ))}
      </ScrollView>

      {/* 底部栏 */}
      <View style={[styles.bottomBar, {width: Dimensions.get('window').width}]}>
        <Text style={styles.totalPrice}>￥{totalPrice}</Text>
        <View style={styles.actionButton}>
          {/* 暂时无功能的预约按钮，后续可添加点击事件 */}
          <Text style={styles.actionButtonText}>全部预约</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  totalPrice: {
    fontSize: 24,
    color: '#000000',
    marginBottom: 8,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    backgroundColor: '#0623CD',
    width: 150,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
    textAlign: 'center',
  },
});

export default CourseCartScreen;
