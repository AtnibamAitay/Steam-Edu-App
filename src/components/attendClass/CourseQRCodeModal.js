import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
} from 'react-native';

const CourseQRCodeModal = ({visible, onClose, courseId}) => {
  const [copied, setCopied] = useState(false);
  const animatedScale = new Animated.Value(1); // 控制缩放动画的值
  const animatedOpacity = new Animated.Value(visible ? 1 : 0); // 控制透明度动画的值

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedScale, {
        toValue: visible ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(animatedOpacity, {
        toValue: visible ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  const copyToClipboard = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <Animated.View
        style={[
          styles.modalContainer,
          {opacity: animatedOpacity, transform: [{scale: animatedScale}]},
        ]}>
        <View style={styles.modalContainer}>
          <View style={styles.cardContent}>
            <Image
              source={require('../../../assets/img/attendClass/QRcode.png')}
              style={styles.qrCode}
            />
            <Text style={styles.studentCourseCodeTitleText}>学生课程码</Text>
            <Text style={styles.studentCourseCodeText}>252320021</Text>
            {/*<TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>*/}
            {/*  <Text style={styles.copyButtonText}>*/}
            {/*    {copied ? '已复制' : '复制'}*/}
            {/*  </Text>*/}
            {/*</TouchableOpacity>*/}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
      <Pressable style={styles.overlay} onPress={onClose} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    zIndex: 100,
  },
  cardContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '90%',
    alignSelf: 'center',
  },
  qrCode: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
  studentCourseCodeTitleText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
  studentCourseCodeText: {
    fontSize: 24,
    color: '#333',
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
  copyButton: {
    marginLeft: 'auto',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#007AFF',
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  closeButton: {
    margin: 16,
    width: 100,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#e8e8e8',
  },
  closeButtonText: {
    color: '#333',
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
});

export default CourseQRCodeModal;
