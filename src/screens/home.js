
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import WeekCalendar from 'react-native-weekly-calendar';

const App: React.FC = () => {
  const [date
  ] = useState(new Date());

  return (
    <SafeAreaView style={styles.safe}>
      <WeekCalendar  date={date} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
   marginTop: 50,
    flex: 1,
    backgroundColor: '#f0f',
    
  },
});

export default App;