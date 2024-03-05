import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AccountInput from '../screens/AccountInput';
import VerificationCode from '../screens/VerificationCode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import SettingsScreen from '../screens/SettingsScreen';
import {Image, TouchableOpacity, useColorScheme} from 'react-native';
import AttendClass from '../screens/AttendClass';
import Discover from '../screens/Discover';
import My from '../screens/My';
import Chat from '../screens/Chat';
import CouponListScreen from '../screens/CouponListScreen';
import CourseCartScreen from '../screens/CourseCartScreen';
import CourseDetail from '../screens/CourseDetail';
import StudentInfoScreen from '../screens/StudentInfoScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState('AccountInput');
  const navigation = useNavigation();
  const scheme = useColorScheme();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('Authorization');
    if (token) {
      setInitialRoute('Discover');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkAuth();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const redirectIfNeeded = async () => {
      const currentRouteName = navigation.getCurrentRoute().name;
      const token = await AsyncStorage.getItem('Authorization');

      if (
        !token &&
        currentRouteName !== 'AccountInput' &&
        currentRouteName !== 'VerificationCode'
      ) {
        navigation.navigate('AccountInput');
      } else if (
        token &&
        (currentRouteName === 'AccountInput' ||
          currentRouteName === 'VerificationCode')
      ) {
        navigation.navigate('Discover');
      }
    };

    redirectIfNeeded();
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F2F2F2',
        },
        headerTintColor: '#000',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'NotoSerifSC-Regular',
        },
      }}>
      <Stack.Screen
        name="AccountInput"
        component={AccountInput}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VerificationCode"
        component={VerificationCode}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AttendClass"
        component={AttendClass}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Discover"
        component={Discover}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen name="My" component={My} options={{headerShown: false}} />
      <Stack.Screen
        name="StudentInfoScreen"
        component={StudentInfoScreen}
        options={({navigation}) => ({
          title: '学生信息',
          headerStyle: {
            backgroundColor: scheme === 'dark' ? '#1C1C1C' : '#F2F2F2',
            shadowOpacity: 0, // iOS
            shadowOffset: {height: 0, width: 0}, // iOS
            shadowRadius: 0, // iOS
            elevation: 0, // Android
          },
          headerTintColor: scheme === 'dark' ? '#FFFFFF' : 'black',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 12}}>
              <Image
                source={require('../../assets/icon/common/left.png')}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: scheme === 'dark' ? '#FFFFFF' : 'black',
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="CourseCartScreen"
        component={CourseCartScreen}
        options={({navigation}) => ({
          title: '选课单页',
          headerStyle: {
            backgroundColor: scheme === 'dark' ? '#1C1C1C' : '#F2F2F2',
            shadowOpacity: 0, // iOS
            shadowOffset: {height: 0, width: 0}, // iOS
            shadowRadius: 0, // iOS
            elevation: 0, // Android
          },
          headerTintColor: scheme === 'dark' ? '#FFFFFF' : 'black',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 12}}>
              <Image
                source={require('../../assets/icon/common/left.png')}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: scheme === 'dark' ? '#FFFFFF' : 'black',
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="CouponListScreen"
        component={CouponListScreen}
        options={({navigation}) => ({
          title: '优惠券',
          headerStyle: {
            backgroundColor: scheme === 'dark' ? '#1C1C1C' : '#F2F2F2',
            shadowOpacity: 0, // iOS
            shadowOffset: {height: 0, width: 0}, // iOS
            shadowRadius: 0, // iOS
            elevation: 0, // Android
          },
          headerTintColor: scheme === 'dark' ? '#FFFFFF' : 'black',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 12}}>
              <Image
                source={require('../../assets/icon/common/left.png')}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: scheme === 'dark' ? '#FFFFFF' : 'black',
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={({navigation}) => ({
          title: '设置',
          headerStyle: {
            backgroundColor: scheme === 'dark' ? '#1C1C1C' : '#F2F2F2',
            shadowOpacity: 0, // iOS
            shadowOffset: {height: 0, width: 0}, // iOS
            shadowRadius: 0, // iOS
            elevation: 0, // Android
          },
          headerTintColor: scheme === 'dark' ? '#FFFFFF' : 'black',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 12}}>
              <Image
                source={require('../../assets/icon/common/left.png')}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: scheme === 'dark' ? '#FFFFFF' : 'black',
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
