import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const StudentInfoCard = ({studentName, contact}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('StudentInfoScreen');
  };

  return (
    <TouchableOpacity style={styles.studentInfoContainer} onPress={handlePress}>
      <View>
        <Text style={styles.studentName}>{studentName}</Text>
        <Text style={styles.contact}>{contact}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  studentInfoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
  },
  studentName: {
    fontSize: 18,
    fontFamily: 'NotoSerifSC-Bold',
    includeFontPadding: false,
    color: '#000',
  },
  contact: {
    marginTop: 4,
    fontSize: 16,
    color: '#000',
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
});

export default StudentInfoCard;
