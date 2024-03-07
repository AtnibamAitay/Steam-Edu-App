import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';

const StockAndCountdown = ({price, stock, totalStock, startTime}) => {
  const [daysUntilStart, setDaysUntilStart] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const countdownTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const animatedProgressWidth = useRef(
    new Animated.Value(stock / totalStock),
  ).current;
  const interpolatedProgressWidth = animatedProgressWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  useEffect(() => {
    // 计算距离开始时间的天数、小时数、分钟数和秒数
    const calculateTimeUnits = () => {
      const now = new Date();
      const start = new Date(startTime);
      const diff = start.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

        setDaysUntilStart(days);
        setHours(hoursLeft);
        setMinutes(minutesLeft);
        setSeconds(secondsLeft);
      } else {
        // 若已过期，可以将倒计时设为0或其他处理方式
        setDaysUntilStart(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    };

    // 每秒更新一次倒计时时间
    const countdownIntervalId = setInterval(calculateTimeUnits, 1000);

    // 初始化倒计时时间
    calculateTimeUnits();

    // 清除定时器（当组件卸载时）
    return () => clearInterval(countdownIntervalId);
  }, [startTime]);

  return (
    <View style={styles.container}>
      {/* 左侧列 */}
      <View style={styles.leftColumn}>
        {/* 价格 */}
        <Text style={styles.price}>{`￥${price}`}</Text>

        {/* 剩余名额 */}
        <Text style={styles.stock}>
          {'剩余名额 '}
          {stock}/{totalStock}
        </Text>

        {/* 进度条 */}
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {width: interpolatedProgressWidth, backgroundColor: '#ffffff'},
            ]}
          />
          <View style={[styles.progressBar, {backgroundColor: '#051796'}]} />
        </View>
      </View>

      {/* 右侧列 */}
      <View style={styles.rightColumn}>
        {/* 距离开课的天数 */}
        <TouchableOpacity
          onPress={() => console.log('Refresh')}
          style={styles.timeContainer}>
          <Text
            style={styles.startTime}>{`距开课还有${daysUntilStart}天`}</Text>
        </TouchableOpacity>

        {/* 倒计时 */}
        <Text style={styles.countdown}>{countdownTime}</Text>
      </View>
    </View>
  );
};

// 更新样式表以支持两列布局
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    flex: 1,
    backgroundColor: '#3656FC',
    padding: 16,
  },
  rightColumn: {
    flex: 1,
    backgroundColor: '#0521CD',
    padding: 16,
    alignItems: 'center',
  },
  price: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
    marginBottom: 8,
  },
  stock: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  startTime: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
  countdownContainer: {
    marginTop: 8,
  },
  countdown: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#051796',
    marginVertical: 8,
  },
  progressBar: {
    height: '100%',
  },
  circularProgressBar: {
    height: '100%',
    width: '120%',
    borderRadius: 4,
    overflow: 'hidden',
    alignItems: 'center',
  },
});

export default StockAndCountdown;
