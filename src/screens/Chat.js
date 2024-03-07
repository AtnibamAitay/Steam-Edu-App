import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {api} from '../../config';
import LinearGradient from 'react-native-linear-gradient';

const ChatHeader = () => (
  <>
    <Image
      source={require('../../assets/icon/chat/polarbear.png')}
      style={styles.circleImage}
    />
    <Text style={styles.title}>欢迎使用万象课堂</Text>
    <Text style={styles.description}>
      基于人工智能与苏格拉底哲学理论的强大教师，能够解答疑问、题目，引导学习。
    </Text>
    <View style={styles.separator} />
  </>
);

const ChatBubble = ({item}) => (
  <View
    style={[
      styles.chatBubble,
      item.isUser ? styles.chatBubbleUser : styles.chatBubbleBot,
      {alignSelf: item.isUser ? 'flex-end' : 'flex-start'},
    ]}>
    <Text
      style={[
        styles.chatBubbleText,
        item.isUser ? styles.chatBubbleTextUser : styles.chatBubbleTextBot,
      ]}>
      {item.content}
    </Text>
  </View>
);

const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'header',
    },
    {
      id: 1,
      content: '有什么可以帮助你吗？',
      isUser: false,
    },
  ]);
  const flatListRef = useRef();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        // 根据键盘的高度动态调整bottom padding
        if (Platform.OS === 'android') {
          let keyboardHeight = e.endCoordinates.height;
          flatListRef.current.setNativeProps({
            contentInset: {bottom: keyboardHeight},
          });
        }
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // 键盘隐藏时恢复原状
        if (Platform.OS === 'android') {
          flatListRef.current.setNativeProps({contentInset: {bottom: 0}});
        }
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [flatListRef]);

  const handleSend = async () => {
    if (inputText) {
      const newUserMessage = {
        id: chatMessages.length,
        content: inputText,
        isUser: true,
      };
      // 更新消息不直接改变状态，防止旧状态影响后续操作
      setChatMessages(chatMessages => [...chatMessages, newUserMessage]);

      try {
        const response = await api.post('/ai/interact-with-gpt', [
          {content: inputText, role: 'user'},
        ]);

        const newBotMessage = {
          id: chatMessages.length + 1,
          content:
            response.status === 200 && response.data.code === 200
              ? response.data.data
              : '请重试',
          isUser: false,
        };

        // 再次更新消息列表，加入从接口获取的回复或错误消息
        setChatMessages(chatMessages => [...chatMessages, newBotMessage]);
      } catch (error) {
        // 加入错误消息
        setChatMessages(chatMessages => [
          ...chatMessages,
          {id: chatMessages.length + 1, content: '请重试', isUser: false},
        ]);
      }

      setInputText('');
    }
  };

  const renderItem = ({item}) => {
    if (item.type === 'header') {
      return (
        <View style={styles.headerContainer}>
          <ChatHeader />
        </View>
      );
    }
    return <ChatBubble item={item} />;
  };

  return (
    <View style={styles.container}>
      {/* 渐变背景 */}
      <LinearGradient
        style={styles.gradientBackground}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#FEF5FF', '#DFE4EE', '#D6E4FF']}
      />

      {/* 添加一个包裹整个内容区域的外层View，用于监听键盘显示/隐藏事件 */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null} // 在Android上取消高度行为
        style={styles.keyboardAwareContent}>
        <FlatList
          ref={flatListRef}
          data={chatMessages}
          renderItem={renderItem}
          keyExtractor={item =>
            item.type === 'header'
              ? `header-${Math.random().toString(36).substring(2, 8)}`
              : chatMessages.indexOf(item).toString()
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({animated: true})
          }
          onLayout={() => flatListRef.current.scrollToEnd({animated: true})}
        />
      </KeyboardAvoidingView>

      {/* 输入区域包括文本输入框和发送按钮 */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.inputBox}
          placeholder="在此输入..."
          placeholderTextColor="#0623CD"
          underlineColorAndroid="transparent"
          selectionColor="#007AFF"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>发送</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardAwareContent: {
    flex: 1,
    paddingBottom: Platform.select({ios: 0, android: 0}), // android上的底部距离，以便留出足够的空间给键盘
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `linear-gradient(to right, ${'#FEF5FF'}, ${'#DFE4EE'}, ${'#D6E4FF'})`, // 使用提供的渐变颜色
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  inputArea: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 55,
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
    alignSelf: 'center',
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
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#0623CD',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginRight: 12,
  },
  chatBubbleLeft: {
    backgroundColor: '#fff',
    maxWidth: '75%',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  chatBubbleText: {
    fontSize: 16,
    color: '#000000',
    lineHeight: 24,
    textAlign: 'left',
  },
  chatListContainer: {
    flex: 1,
    paddingBottom: 150,
  },
  flatListContent: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  chatBubble: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginVertical: 5,
  },
  chatBubbleUser: {
    backgroundColor: '#0623CD',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  chatBubbleBot: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  chatBubbleTextUser: {
    color: '#FFFFFF',
  },
  chatBubbleTextBot: {
    color: '#000000',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sendButton: {
    width: 70,
    height: 48,
    backgroundColor: '#0623CD',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  chatBubbleRight: {
    backgroundColor: '#E0F7FA',
    maxWidth: '75%',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  flatList: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 150,
  },
});

export default Chat;
