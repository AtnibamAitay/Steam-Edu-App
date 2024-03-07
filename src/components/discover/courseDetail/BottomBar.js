import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const BottomBar = ({courseId, onReservationPress}) => {
  const handleReservationPress = () => {
    onReservationPress(courseId);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addToCourseListButton}>
        <View style={styles.buttonShapeNoFill}>
          <Text style={[styles.buttonText, {color: '#0623CD'}]}>
            加入选课单
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, {flexGrow: 1.3}]}
        onPress={handleReservationPress}>
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
    paddingHorizontal: 20,
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
  addToCourseListButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonShapeNoFill: {
    width: 140,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#0623CD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reservationButtonShape: {
    width: 190,
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
