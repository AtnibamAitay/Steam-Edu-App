import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {api} from '../../config';
import OrderCourseCard from '../components/discover/courseDetail/OrderConfirmation/OrderCourseCard';
import StudentInfoCard from '../components/discover/courseDetail/OrderConfirmation/OrderStudentInfoCard';

const OrderConfirmation = ({route}) => {
  const [orderInfo, setOrderInfo] = useState(null);
  const courseId = route.params.courseId;

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        // 调用后端接口时传入整个数组，这里应该是多个courseIds，而不是单个 courseId
        const response = await api.post('/order', [courseId]); // 这里如果是多个课程ID，应改为实际的课程ID数组
        if (response.data.code === 200) {
          setOrderInfo(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch order info:', error);
      }
    };

    fetchOrderInfo();
  }, [courseId]);

  return (
    <ScrollView style={styles.container}>
      {/* 学生信息 */}
      {orderInfo && (
        <StudentInfoCard
          studentName={orderInfo.studentInfo.studentName}
          contact={orderInfo.studentInfo.contact}
        />
      )}

      {/* 课程列表 */}
      {orderInfo?.courseInfo?.map(
        (
          course, // 修改为 orderInfo?.courseInfo
        ) => (
          <OrderCourseCard
            key={course.courseId}
            courseId={course.courseId}
            courseType={course.courseType}
            name={course.name}
            schoolTime={course.schoolTime}
            price={course.price}
          />
        ),
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
  studentInfoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contact: {
    marginTop: 4,
    fontSize: 16,
  },
});

export default OrderConfirmation;
