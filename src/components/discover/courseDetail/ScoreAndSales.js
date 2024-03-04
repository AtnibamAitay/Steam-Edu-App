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
        <Text style={styles.score}>{totalComprehensiveScore}</Text>
        <Text style={styles.label}>综合评分</Text>
      </View>

      {/* 分割线 */}
      <View style={styles.verticalSeparator} />

      {/* 第二列 */}
      <View style={styles.column}>
        <Text style={styles.count}>{salesVolume}</Text>
        <Text style={styles.label}>累计上课人数</Text>
      </View>

      {/* 分割线 */}
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
    height: 100,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 16,
  },
  verticalSeparator: {
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
    marginVertical: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginVertical: 8,
    width: '100%',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  count: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#9B9B9B',
  },
});

export default ScoreAndSales;
