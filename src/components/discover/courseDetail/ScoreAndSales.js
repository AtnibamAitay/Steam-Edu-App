import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ScoreAndSales = ({
  totalComprehensiveScore,
  salesVolume,
  totalClasses,
}) => {
  return (
    <View style={styles.cardContainer}>
      {/* 第一列 */}
      <View style={styles.column}>
        <Text style={styles.count}>{totalComprehensiveScore}</Text>
        <Text style={styles.label}>综合评分</Text>
      </View>

      {/* 分割线（已修改为等宽）*/}
      <View style={styles.verticalSeparator} />

      {/* 第二列 */}
      <View style={styles.column}>
        <Text style={styles.count}>{salesVolume}</Text>
        <Text style={styles.label}>累计上课人数</Text>
      </View>

      {/* 分割线（已修改为等宽）*/}
      <View style={styles.verticalSeparator} />

      {/* 第三列 */}
      <View style={styles.column}>
        <Text style={styles.count}>{totalClasses}</Text>
        <Text style={styles.label}>课时</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  verticalSeparator: {
    borderRightWidth: 1,
    borderRightColor: '#e7e7e7',
    height: '70%',
    alignSelf: 'center',
  },
  horizontalSeparatorContainer: {
    width: 1,
    backgroundColor: '#CCCCCC',
    alignSelf: 'stretch',
    marginVertical: 8,
  },
  count: {
    fontSize: 18,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
    color: '#000000',
  },
  label: {
    fontSize: 13,
    color: '#9B9B9B',
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
});

export default ScoreAndSales;
