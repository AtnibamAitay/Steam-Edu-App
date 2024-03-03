import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {format} from 'date-fns';
import {zhCN} from 'date-fns/locale';

const CouponItem = ({
  couponId,
  couponName,
  startDate,
  expireDate,
  minOrderAmount,
  discountAmount,
}) => {
  const formattedExpireDate = format(new Date(expireDate), 'yyyy年MM月dd日', {
    locale: zhCN,
  });

  return (
    <View style={styles.container}>
      {/* 左侧金额部分 */}
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{discountAmount}元</Text>
        <Text style={styles.threshold}>满{minOrderAmount}元可用</Text>
      </View>

      {/* 中间名称与有效期部分 */}
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{couponName}</Text>
        <Text style={styles.expiration}>有效期至：{formattedExpireDate}</Text>
      </View>

      {/* 右侧使用按钮 */}
      <TouchableOpacity style={styles.useButton}>
        <Text style={styles.buttonText}>使用</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountContainer: {
    width: '30%',
    justifyContent: 'center',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  threshold: {
    marginTop: 4,
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  expiration: {
    fontSize: 14,
    color: '#999',
  },
  // 右侧使用按钮样式
  useButton: {
    width: '20%',
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontSize: 16, fontWeight: '500'},
});

export default CouponItem;
