import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, Alert} from 'react-native';
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
    <View style={{flex: 1}}>
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
        ListEmptyComponent={<Text>暂无可用优惠券</Text>}
      />
    </View>
  );
};

export default CouponListScreen;
