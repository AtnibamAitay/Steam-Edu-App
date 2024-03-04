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
                {/* 调整顺序：先显示角色，后显示名字 */}
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
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 8,
  },
  teacherRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8, // 添加间距以分隔头像和文字
  },
  teacherInfoRightAligned: {
    // 新增样式
    flexDirection: 'column',
    marginLeft: 8,
  },
  teacherName: {
    fontSize: 14,
    color: '#000000',
  },
  role: {
    fontSize: 12,
    color: '#666666',
  },
});

export default TeacherList;
