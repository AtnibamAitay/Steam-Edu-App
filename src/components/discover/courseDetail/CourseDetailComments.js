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
      <Text>{comment.content}</Text>
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
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 8,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  commentContent: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  commentsList: {
    paddingHorizontal: 0,
  },
  emptyList: {
    textAlign: 'center',
    color: '#999999',
  },
});

export default CourseDetailComments;
