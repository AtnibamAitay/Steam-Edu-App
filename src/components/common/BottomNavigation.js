import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import AttendClassPitchOn from '../../../assets/icon/common/bottom_navigation/AttendClass-PitchOn.png';
import AttendClass from '../../../assets/icon/common/bottom_navigation/AttendClass.png';
import Chat from '../../../assets/icon/common/bottom_navigation/Chat.png';
import ChatPitchOn from '../../../assets/icon/common/bottom_navigation/Chat-PitchOn.png';
import Discover from '../../../assets/icon/common/bottom_navigation/Discover.png';
import DiscoverPitchOn from '../../../assets/icon/common/bottom_navigation/Discover-PitchOn.png';
import My from '../../../assets/icon/common/bottom_navigation/My.png';
import MyPitchOn from '../../../assets/icon/common/bottom_navigation/My-PitchOn.png';

const BottomNavigation = ({currentRoute, navigation}) => {
  const handleNavigation = routeName => {
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleNavigation('AttendClass')}
        style={[
          styles.iconWrapper,
          currentRoute === 'AttendClass' ? styles.active : {},
        ]}>
        <Image
          source={
            currentRoute === 'AttendClass' ? AttendClassPitchOn : AttendClass
          }
          style={[styles.icon]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigation('Discover')}
        style={[
          styles.iconWrapper,
          currentRoute === 'Discover' ? styles.active : {},
        ]}>
        <Image
          source={currentRoute === 'Discover' ? DiscoverPitchOn : Discover}
          style={[styles.icon]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigation('Chat')}
        style={[
          styles.iconWrapper,
          currentRoute === 'Chat' ? styles.active : {},
        ]}>
        <Image
          source={currentRoute === 'Chat' ? ChatPitchOn : Chat}
          style={[styles.icon]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigation('My')}
        style={[
          styles.iconWrapper,
          currentRoute === 'My' ? styles.active : {},
        ]}>
        <Image
          source={currentRoute === 'My' ? MyPitchOn : My}
          style={[styles.icon]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-around',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 28,
    height: 28,
  },
  active: {
    borderRadius: 8,
  },
});

export default BottomNavigation;
