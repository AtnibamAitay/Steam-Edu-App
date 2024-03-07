import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const BottomBar = ({courseId, onReservationPress}) => {
  const handleReservationPress = () => {
    onReservationPress(courseId);
  };

  return (
    <View style={styles.container}>
      {/* 将“加入选课单”按钮样式调整并移动到前面 */}
      <TouchableOpacity style={styles.addToCourseListButton}>
        <View style={styles.buttonShapeNoFill}>
          <Text style={[styles.buttonText, {color: '#0623CD'}]}>
            加入选课单
          </Text>
        </View>
      </TouchableOpacity>

      {/* 调整“预约”按钮的宽度，并保持原有样式不变 */}
      <TouchableOpacity style={[styles.button, {flexGrow: 2}]}>
        <View style={styles.reservationButtonShape}>
          <Text style={styles.buttonText}>预约</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    height: 72,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // “加入选课单”按钮的新样式
  addToCourseListButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // “加入选课单”按钮形状无填充样式
  buttonShapeNoFill: {
    width: 140,
    height: 48,
    borderRadius: 24,
    borderWidth: 1, // 添加边框
    borderColor: '#0623CD', // 边框颜色
    justifyContent: 'center',
    alignItems: 'center',
  },
  // “预约”按钮形状样式保持不变
  reservationButtonShape: {
    width: 190, // 增加宽度
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0623CD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
});

export default BottomBar;
