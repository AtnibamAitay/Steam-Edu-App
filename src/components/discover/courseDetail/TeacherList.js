import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const TeacherList = ({teacher}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>授课教师</Text>
      <View style={styles.teacherRow}>
        {teacher.slice(0, 3).map((t, index) => (
          <View key={`teacher-${index}`} style={styles.teacherItem}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={{uri: t.userAvatar}} style={styles.avatar} />
              <View style={styles.teacherInfoRightAligned}>
                <Text style={styles.role}>{t.teacherRole}</Text>
                <Text style={styles.teacherName}>{t.userName}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
    color: '#000000',
    marginBottom: 16,
  },
  teacherRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  teacherInfoRightAligned: {
    flexDirection: 'column',
    marginLeft: 8,
  },
  teacherName: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
  role: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'NotoSerifSC-Regular',
    includeFontPadding: false,
  },
  teacherItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TeacherList;
