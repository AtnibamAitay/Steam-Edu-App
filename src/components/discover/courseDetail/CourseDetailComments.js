import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import {api} from '../../../../config';

const CommentItem = ({comment}) => (
  <View style={styles.commentItem}>
    <Image
      source={{uri: comment.userInfo.userAvatar}}
      style={styles.avatar}
      resizeMode="cover"
    />
    <View style={styles.commentContent}>
      <Text style={styles.userName}>{comment.userInfo.userName}</Text>
      <Text style={styles.content}>{comment.content}</Text>
    </View>
  </View>
);

const CourseDetailComments = ({spuId}) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/spu/comments?spuId=${spuId}`);
        if (response.data.code === 200) {
          setComments(response.data.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };

    fetchComments();
  }, [spuId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>评论</Text>
      <FlatList
        data={comments}
        renderItem={({item}) => <CommentItem comment={item} />}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={styles.commentsList}
        ListEmptyComponent={<Text style={styles.emptyList}>暂无评论</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
    color: '#000000',
    marginBottom: 16,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
    color: '#333333',
  },
  commentsList: {
    paddingHorizontal: 0,
  },
  emptyList: {
    textAlign: 'center',
    color: '#999999',
  },
  content: {
    fontSize: 14,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
    color: '#000000',
  },
});

export default CourseDetailComments;
