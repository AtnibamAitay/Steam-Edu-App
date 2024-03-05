import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const PriceSummaryCard = ({orderInfo}) => {
  const totalCoursePrice = orderInfo?.courseInfo?.reduce(
    (total, course) => total + course.price,
    0,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>价格明细</Text>

      <View style={styles.row}>
        <Text style={[styles.textLeft, styles.subTitle]}>商品总价</Text>
        <Text style={[styles.textRight, styles.value]}>
          ￥{totalCoursePrice.toFixed(2)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.textLeft, styles.subTitle]}>优惠券</Text>
        <Text style={[styles.textRight, styles.value]}>未使用</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.textLeft, styles.subTitle, styles.totalLabel]}>
          合计
        </Text>
        <Text style={[styles.textRight, styles.value, styles.totalValue]}>
          ￥{totalCoursePrice.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  textLeft: {
    flex: 1,
    textAlign: 'left',
  },
  textRight: {
    flex: 1,
    textAlign: 'right',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default PriceSummaryCard;
