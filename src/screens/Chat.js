import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TextInput} from 'react-native';
import BottomNavigation from '../components/common/BottomNavigation';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const Chat = () => {
  const navigation = useNavigation();

  useEffect(() => {}, []);
  const gradientStyles = StyleSheet.create({
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: -1,
      paddingHorizontal: 20,
    },
    gradient: {
      start: {x: 0, y: 0},
      end: {x: 1, y: 1},
      colors: ['#FEF5FF', '#DFE4EE', '#D6E4FF'],
    },
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        style={gradientStyles.background}
        colors={gradientStyles.gradient.colors}
        start={gradientStyles.gradient.start}
        end={gradientStyles.gradient.end}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/icon/chat/polarbear.png')}
            style={[styles.circleImage, {resizeMode: 'contain'}]}
          />
        </View>

        <Text style={styles.title}>欢迎使用万象课堂</Text>

        <Text style={styles.description}>
          基于人工智能与苏格拉底哲学理论的强大教
        </Text>

        <Text style={styles.description}>
          师，能够解答疑问、题目，引导学习。
        </Text>

        {/* 水平分隔线 */}
        <View style={styles.separator} />

        {/* 默认消息 */}
        <View style={styles.chatBubbleLeft}>
          <Text style={styles.chatBubbleText}>有什么可以帮助你吗？</Text>
        </View>

        {/* 文本输入框 */}
        <TextInput
          style={styles.inputBox}
          placeholder="在此输入..."
          placeholderTextColor="#007AFF"
          underlineColorAndroid="transparent"
          selectionColor="#007AFF"
        />

        {/* 底部导航栏 */}
        <BottomNavigation currentRoute="Chat" navigation={navigation} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  circleImage: {
    width: 70,
    height: 70,
    borderRadius: 40,
    overflow: 'hidden',
    borderColor: '#ffffff',
    borderWidth: 2,
  },
  title: {
    fontSize: 21,
    fontFamily: 'NotoSerifSC-Bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000000',
  },
  description: {
    fontSize: 17,
    textAlign: 'center',
    marginVertical: 2,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
  separator: {
    width: '90%',
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: '5%',
    marginTop: 20,
    marginBottom: 20,
  },
  inputBox: {
    position: 'absolute',
    bottom: 70,
    height: 48,
    width: '100%',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: '#fff',
    zIndex: 1,
    borderRadius: 24,
  },
  chatBubbleLeft: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    maxWidth: '75%',
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginTop: 10,
  },
  chatBubbleText: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
    textAlign: 'left',
  },
});

export default Chat;
