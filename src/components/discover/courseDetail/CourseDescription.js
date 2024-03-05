import React from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';

const CourseDescription = ({images}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>课程描述</Text>
      <View style={styles.imageContainer}>
        {images.map((item, index) => (
          <Image
            key={index}
            source={{uri: item}}
            style={styles.image}
            resizeMode="contain"
            PlaceholderContent={<ActivityIndicator />}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});

export default CourseDescription;
