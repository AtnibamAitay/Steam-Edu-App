import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {api} from '../../config';

const StudentInfoScreen = () => {
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    async function fetchStudentInfo() {
      try {
        const response = await api.get('/student/info');
        if (response.data.code === 200) {
          setStudentInfo(response.data.data);
        } else {
          console.error('Failed to fetch student info:', response.data.msg);
        }
      } catch (error) {
        console.error('Error during fetching student info:', error);
      }
    }

    fetchStudentInfo();
  }, []);

  if (!studentInfo) {
    return <Text>Loading...</Text>;
  }

  const {photo, studentName, gender, school, birthday, contact, grade} =
    studentInfo;

  return (
    <View style={styles.container}>
      {/* 用户头像 */}
      <Image source={{uri: photo}} style={styles.avatar} resizeMode="cover" />
      <Text style={styles.title}>{studentName}</Text>
      <Text style={styles.info}>你的信息，将会在报名课程时提供给机构</Text>

      {/* 右对齐部分 */}
      <View style={styles.rightAlignedContainer}>
        <Text style={styles.label}>性别</Text>
        <Text style={styles.value}>{gender}</Text>
        <Text style={styles.label}>学校</Text>
        <Text style={styles.value}>{school}</Text>
        <Text style={styles.label}>年级</Text>
        <Text style={styles.value}>{grade}</Text>
        <Text style={styles.label}>生日</Text>
        <Text style={styles.value}>{birthday}</Text>
        <Text style={styles.label}>联系方式</Text>
        <Text style={styles.value}>{contact}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 75,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  rightAlignedContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default StudentInfoScreen;
