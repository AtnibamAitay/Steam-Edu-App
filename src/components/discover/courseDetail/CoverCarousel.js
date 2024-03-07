import React, {useState} from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const CoverCarousel = ({covers}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePress = index => {
    setActiveIndex(index);
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => handlePress(index)}
      style={styles.imageContainer}>
      <Image source={{uri: item}} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.carousel}>
      <FlatList
        data={covers}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onMomentumScrollEnd={({nativeEvent}) => {
          const offsetX = nativeEvent.contentOffset.x;
          const itemWidth = nativeEvent.layoutMeasurement.width;
          setActiveIndex(Math.round(offsetX / itemWidth));
        }}
        scrollEnabled={covers.length > 1}
        // 增加的部分开始
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        // 增加的部分结束
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    height: 300,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default CoverCarousel;
