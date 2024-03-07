import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const BottomBar = ({courseId, onReservationPress}) => {
  const navigation = useNavigation();

  const handleReservationPress = () => {
    onReservationPress(courseId);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleReservationPress}>
        <View style={styles.buttonShape} />
        <Text style={styles.buttonText}>预约</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <View style={styles.buttonShape} />
        <Text style={styles.buttonText}>加入选课单</Text>
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
  },
  button: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonShape: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    marginRight: 8,
  },
  buttonText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default BottomBar;
