import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, Alert, StyleSheet} from 'react-native';
import {api} from '../../config';
import CouponItem from '../components/my/coupon/CouponItem';

const CouponListScreen = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await api.get('/coupon/user');
        if (response.status === 200 && response.data.code === 200) {
          setCoupons(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch coupons:', error);
        Alert.alert('获取优惠券失败', error.message || '获取过程中发生错误');
      }
    };

    fetchCoupons();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={coupons}
        renderItem={({item}) => (
          <CouponItem
            couponId={item.couponId}
            couponName={item.couponName}
            startDate={item.startDate}
            expireDate={item.expireDate}
            minOrderAmount={item.minSpendThresholds.minOrderAmount}
            discountAmount={item.minSpendThresholds.discountAmount}
          />
        )}
        keyExtractor={item => String(item.couponId)}
        ListEmptyComponent={
          <View style={styles.emptyTextContainer}>
            <Text style={{textAlign: 'center'}}>暂无可用优惠券</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    paddingHorizontal: 16,
  },
  emptyTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CouponListScreen;
