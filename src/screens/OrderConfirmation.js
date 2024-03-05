import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {api} from '../../config';
import OrderCourseCard from '../components/discover/courseDetail/OrderConfirmation/OrderCourseCard';
import StudentInfoCard from '../components/discover/courseDetail/OrderConfirmation/OrderStudentInfoCard';
import PriceSummaryCard from '../components/discover/courseDetail/OrderConfirmation/PriceSummaryCard';
import BottomBar from '../components/discover/courseDetail/OrderConfirmation/BottomBar';

const PaymentButton = ({title, onPress, selected, color}) => {
  const [active, setActive] = useState(selected);

  return (
    <TouchableOpacity
      style={[
        styles.paymentButton,
        {
          borderColor: active ? color : '#ddd',
          backgroundColor: active ? color : '#fff',
        },
      ]}
      onPress={() => {
        setActive(!active);
        onPress();
      }}>
      <Text style={[styles.buttonText, {color: active ? '#fff' : '#333'}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const OrderConfirmation = ({route}) => {
  const [orderInfo, setOrderInfo] = useState(null);
  const courseId = route.params.courseId;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentSelection = paymentMethod => {
    setSelectedPaymentMethod(paymentMethod);
  };

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
    <>
      <ScrollView style={styles.container}>
        {/* 学生信息 */}
        {orderInfo && (
          <StudentInfoCard
            studentName={orderInfo.studentInfo.studentName}
            contact={orderInfo.studentInfo.contact}
          />
        )}

        {/* 课程列表 */}
        {orderInfo?.courseInfo?.map(course => (
          <OrderCourseCard
            key={course.courseId}
            courseId={course.courseId}
            courseType={course.courseType}
            name={course.name}
            schoolTime={course.schoolTime}
            price={course.price}
          />
        ))}

        {/* 价格明细 */}
        {orderInfo && <PriceSummaryCard orderInfo={orderInfo} />}

        {/* 支付方式 */}
        <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
          <Text style={{fontSize: 16}}>支付方式</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <PaymentButton
              title="支付宝支付"
              onPress={() => handlePaymentSelection('alipay')}
              selected={selectedPaymentMethod === 'alipay'}
              color="#00bfff"
            />
            <PaymentButton
              title="微信支付"
              onPress={() => handlePaymentSelection('wechat')}
              selected={selectedPaymentMethod === 'wechat'}
              color="#00c853"
            />
          </View>
        </View>
      </ScrollView>
      <BottomBar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    paddingHorizontal: 16,
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
  paymentButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderConfirmation;
