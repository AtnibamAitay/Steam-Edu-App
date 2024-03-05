import {View, Text, StyleSheet} from 'react-native';

const StudentInfoCard = ({studentName, contact}) => (
  <View style={styles.studentInfoContainer}>
    <Text style={styles.studentName}>{studentName}</Text>
    <Text style={styles.contact}>{contact}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
  studentInfoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contact: {
    marginTop: 4,
    fontSize: 16,
  },
});

export default StudentInfoCard;
