import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const BottomBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>提交订单</Text>
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
    height: 56,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  button: {
    paddingVertical: 12,
    paddingRight: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#00bfff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#00bfff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BottomBar;
