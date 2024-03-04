import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
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
    <View style={styles.container}>
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
      <View style={styles.bottomBar}>
        <Text style={styles.totalPrice}>总金额：￥{totalPrice}</Text>
        <View style={styles.actionButton}>
          {/* 暂时无功能的预约按钮，后续可添加点击事件 */}
          <Text style={styles.actionButtonText}>预约</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#F5F5F5',
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#007AFF',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CourseCartScreen;
