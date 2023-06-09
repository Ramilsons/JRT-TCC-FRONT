import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Calendar = () => {
  const getCurrentMonthYear = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthName = getMonthName(month);

    return { year, month, monthName };
  };


  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const getWeekdays = () => {
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    return weekdays;
  };

  const getMonthName = (month) => {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    return months[month - 1];
  };

  const renderDay = ({ item }) => {
    const { dayOfMonth, dayOfWeek, isToday } = item;
    const dayOfMonthStyle = isToday ? styles.today : styles.dayOfMonth;
    const circleStyle = isToday ? styles.todayCircle : null;

    return (
      <View style={styles.dayItem}>
        <View style={[styles.circle, circleStyle]}>
          <Text style={dayOfMonthStyle}>{dayOfMonth}</Text>
        </View>
        <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
      </View>
    );
  };

  const renderDays = () => {
    const { year, month } = getCurrentMonthYear();
    const daysInMonth = getDaysInMonth(year, month);

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month - 1, i);
      const dayOfWeek = getWeekdays()[date.getDay()];
      const isToday = isCurrentDate(year, month, i);
      days.push({ dayOfMonth: i, dayOfWeek, isToday });
    }

    return days;
  };

  const isCurrentDate = (year, month, day) => {
    const currentDate = new Date();
    return (
      year === currentDate.getFullYear() &&
      month === currentDate.getMonth() + 1 &&
      day === currentDate.getDate()
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem Vindo!</Text>
    <View style={styles.calendar}>
      <Text style={styles.monthName}>{getCurrentMonthYear().monthName}</Text>
      <FlatList
        data={renderDays()}
        horizontal
        renderItem={renderDay}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  welcome:{
  marginTop: 20,
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
  marginLeft: 30,
 
  },
  container:
  {
   backgroundColor: '#4BB991',
  },
  calendar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#FFFAFA',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    
  },
  monthName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  dayItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  dayOfMonth: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  today: {
    color: 'white',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE4E1',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayCircle: {
    backgroundColor: '#FF1493',
  },
  dayOfWeek: {
    fontSize: 12,
  },
});

export default Calendar;
