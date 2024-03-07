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
        <Text style={styles.expiration}>有效期至{formattedExpireDate}</Text>
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
    width: '28%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount: {
    fontSize: 20,
    fontFamily: 'NotoSerifSC-Bold',
    includeFontPadding: false,
    color: '#0623CD',
  },
  threshold: {
    marginTop: 4,
    fontSize: 12,
    color: '#0623CD',
    backgroundColor: '#E2E5FF',
    padding: 4,
    borderRadius: 16,
    width: '95%',
    textAlign: 'center',
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
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
    color: '#000',
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
  expiration: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
  useButton: {
    width: '18%',
    height: 34,
    backgroundColor: '#0623CD',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
});

export default CouponItem;
