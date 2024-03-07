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

  useEffect(() => {
    setActive(selected);
  }, [selected]);

  return (
    <TouchableOpacity
      style={[
        styles.paymentButton,
        {
          borderWidth: active ? 3 : 0,
          borderColor: active ? color : 'transparent',
          backgroundColor: '#fff',
        },
      ]}
      onPress={() => {
        setActive(false);
        onPress(active ? null : title);
      }}>
      <Text style={[styles.buttonText, {color: active ? '#333' : '#000'}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const OrderConfirmation = ({route}) => {
  const [orderInfo, setOrderInfo] = useState(null);
  const courseId = route.params.courseId;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('alipay'); // 默认选中支付宝支付

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
    setActiveForPayment('alipay');
  }, [courseId]);

  const setActiveForPayment = method => {
    if (method === 'alipay') {
      setAlipayActive(true);
      setWechatActive(false);
    } else if (method === 'wechat') {
      setAlipayActive(false);
      setWechatActive(true);
    }
  };

  const [alipayActive, setAlipayActive] = useState(true);
  const [wechatActive, setWechatActive] = useState(false);

  useEffect(() => {
    // 监听selectedPaymentMethod的变化，并相应地更新按钮状态
    if (selectedPaymentMethod === 'alipay') {
      setActiveForPayment('alipay');
    } else if (selectedPaymentMethod === 'wechat') {
      setActiveForPayment('wechat');
    }
  }, [selectedPaymentMethod]);

  return (
    <>
      <ScrollView style={styles.container}>
        {/* 学生信息 */}
        {orderInfo && (
          <View style={styles.sectionContainer}>
            <StudentInfoCard
              studentName={orderInfo.studentInfo.studentName}
              contact={orderInfo.studentInfo.contact}
            />
          </View>
        )}

        {/* 课程列表 */}
        {orderInfo?.courseInfo?.map(course => (
          <View style={styles.sectionContainer}>
            <OrderCourseCard
              key={course.courseId}
              courseId={course.courseId}
              courseType={course.courseType}
              name={course.name}
              schoolTime={course.schoolTime}
              price={course.price}
            />
          </View>
        ))}

        {/* 价格明细 */}
        {orderInfo && <PriceSummaryCard orderInfo={orderInfo} />}

        {/* 支付方式 */}
        <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
          <Text style={styles.paymentTitle}>支付方式</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <PaymentButton
              title="支付宝支付"
              onPress={isActive =>
                handlePaymentSelection(isActive ? 'alipay' : null)
              }
              selected={alipayActive}
              color="#0371ff"
            />
            <PaymentButton
              title="微信支付"
              onPress={isActive =>
                handlePaymentSelection(isActive ? 'wechat' : null)
              }
              selected={wechatActive}
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
  sectionContainer: {
    paddingVertical: 8,
  },
  studentInfoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  contact: {
    marginTop: 4,
    fontSize: 16,
  },
  paymentTitle: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
    marginBottom: 16,
  },
  paymentButton: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    flexBasis: 160,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
});

export default OrderConfirmation;
