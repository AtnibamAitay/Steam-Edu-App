import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import AttendClassScreen from '../screens/AttendClass';
import DiscoverScreen from '../screens/Discover';
import ChatScreen from '../screens/Chat';
import MyScreen from '../screens/My';

const initialLayout = {width: Dimensions.get('window').width};

const HomeTabs = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'attendClass', title: 'Attend Class'},
    {key: 'discover', title: 'Discover'},
    {key: 'chat', title: 'Chat'},
    {key: 'my', title: 'My'},
  ]);

  const icons = {
    attendClass: {
      active: require('../../assets/icon/common/bottom_navigation/AttendClass-PitchOn.png'),
      inactive: require('../../assets/icon/common/bottom_navigation/AttendClass.png'),
    },
    discover: {
      active: require('../../assets/icon/common/bottom_navigation/Discover-PitchOn.png'),
      inactive: require('../../assets/icon/common/bottom_navigation/Discover.png'),
    },
    chat: {
      active: require('../../assets/icon/common/bottom_navigation/Chat-PitchOn.png'),
      inactive: require('../../assets/icon/common/bottom_navigation/Chat.png'),
    },
    my: {
      active: require('../../assets/icon/common/bottom_navigation/My-PitchOn.png'),
      inactive: require('../../assets/icon/common/bottom_navigation/My.png'),
    },
  };

  const renderScene = SceneMap({
    attendClass: AttendClassScreen,
    discover: DiscoverScreen,
    chat: ChatScreen,
    my: MyScreen,
  });

  const renderTabBar = props => {
    const navigateTo = i => {
      const selectedRoute = routes[i];
      if (selectedRoute) {
        setIndex(i);
      }
    };

    return (
      <View style={styles.tabBar}>
        {routes.map((route, i) => (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={() => navigateTo(i)}>
            <Image
              style={styles.icon}
              source={
                index === i
                  ? icons[route.key].active
                  : icons[route.key].inactive
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        swipeEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F2F2F2',
    elevation: 4,
    zIndex: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    width: 28,
    height: 28,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
});

export default HomeTabs;
