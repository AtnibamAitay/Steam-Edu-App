import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {api} from '../../../../../config';

const BottomBar = () => {
  const appId = 1;
  const id = 1;
  const price = 100;
  const title = '面向初中生的C语言基础语法';
  const userId = 2;

  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState(null);

  const handleOrderSubmit = async () => {
    try {
      const response = await api.post('/order/wx-pay/native', {
        appId,
        id,
        price,
        title,
        userId,
      });

      if (response.status === 200) {
        const codeUrl = response.data.data.codeUrl;

        // 获取二维码图片
        const qrCodeImageUrl = `https://newzuo.com/core/qrcode.php?string=${codeUrl}`;
        setQrCodeImage(qrCodeImageUrl);

        // 显示提示框
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Failed to submit order:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setQrCodeImage(null);
  };

  const handleConfirmPayment = () => {
    navigation.navigate('HomeTabs'); // Navigate to the Discover page
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleOrderSubmit}>
        <Text style={styles.buttonText}>提交订单</Text>
      </TouchableOpacity>

      {/* 提示框 */}
      <Modal
        transparent
        visible={isModalVisible}
        onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBackground} />

          <View style={styles.modalContent}>
            {qrCodeImage ? (
              <Image
                source={{uri: qrCodeImage}}
                style={styles.qrCodeImage}
                resizeMode="contain"
              />
            ) : (
              <ActivityIndicator size="large" color="#000000" />
            )}

            {/* 新增确认完成支付按钮 */}
            <TouchableOpacity
              style={[styles.button, styles.confirmPaymentButton]}
              onPress={handleConfirmPayment}>
              <Text style={styles.confirmPaymentButtonText}>确认完成支付</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
  button: {
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

  // 提示框样式
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    elevation: 4,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    justifyContent: 'center',
  },
  qrCodeImage: {
    height: 200,
    width: 200,
  },
  confirmPaymentButton: {
    width: 200,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e8e8e8',
    marginTop: 16,
  },
  confirmPaymentButtonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
});

export default BottomBar;
