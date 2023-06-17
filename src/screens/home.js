import { React, useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MedicamentCard from '../components/MedicamentCard';

import { useNavigation } from "@react-navigation/native";
import { IsLogged } from './../contexts/IsLoggedContext';

import globalStyle from './../../global/styles/index';
import axios from 'axios';

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

  const [dayPress, setDayPress] = useState(new Date().getDate());
  const [monthPress, setMonthPress] = useState(6);
  const { userInfos } = useContext(IsLogged);
  const [allMedicamentsActiveByDate, setAllMedicamentsActiveByDate] = useState([]);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const navigation = useNavigation();

  useEffect(function(){
    let actualHours = new Date().getHours();
    if(actualHours >= 18 || actualHours <= 4){
      setWelcomeMessage(`Boa noite, ${userInfos.name}.`);
    }else if(actualHours > 4 && actualHours <= 11){
      setWelcomeMessage(`Bom dia, ${userInfos.name}.`);    
    }else{
      setWelcomeMessage(`Boa tarde, ${userInfos.name}.`);    
    }
  }, [userInfos]);

  useEffect(function(){
    navigation.addListener('focus', () => {
      getMedicamentByDayPress();
    })
  }, [navigation]);

  useEffect(function(){
    getMedicamentByDayPress();
  }, [dayPress]);

  function getMedicamentByDayPress() {
    axios.get(`https://jrt-medicamentos.onrender.com/medicaments/historic/${userInfos.id}`)
    .then((response) => {
      let medicaments = [];
      response.data.forEach((item, index) => {
        let completationDateFormatted = item.completionDate.replace('00:00:00.000+00:00', '03:00:00.000+00:00');
        let dayCompletation = new Date(completationDateFormatted).getDate();
        let monthCompletation = new Date(completationDateFormatted).getMonth() + 1;

        let initializeDateFormatted = item.dateInsert;
        let dayInitialize = new Date(initializeDateFormatted).getDate() + 1;
        let monthInitialize = new Date(initializeDateFormatted).getMonth() + 1;

        if(monthInitialize < 10){
          monthInitialize = `0${monthInitialize}`;
        }

        if(dayInitialize < 10){
          dayInitialize = `0${dayInitialize}`;
        }

        if(monthCompletation < 10){
          monthCompletation = `0${monthCompletation}`;
        }

        if(dayCompletation < 10){
          dayCompletation = `0${dayCompletation}`;
        }

        let modelMonthPress = dayPress;
        let modelDayPress = dayPress;

        if(monthPress < 10){
          modelMonthPress = `0${monthPress}`;
        }

        if(dayPress < 10){
          modelDayPress = `0${dayPress}`;
        }

        if(new Date(`2023-${monthInitialize}-${dayInitialize-1}`) <= new Date(`2023-${modelMonthPress}-${modelDayPress}`)){
          if(new Date(`2023-${monthCompletation}-${dayCompletation+1}`) >= new Date(`2023-${modelMonthPress}-${modelDayPress}`)){
            medicaments.push(item);
          }
        }
      })

      setAllMedicamentsActiveByDate(medicaments);
    })
    .catch((e) => {
        console.log('houve um erro 1: '+e);
    })
  }

  const renderDay = ({ item }) => {
    const { dayOfMonth, dayOfWeek, isToday } = item;
    const dayOfMonthStyle = dayPress == dayOfMonth ? styles.today : styles.dayOfMonth;

    return (
      <TouchableOpacity  onPress={() => {setDayPress(dayOfMonth)}} style={[styles.circle, dayPress == dayOfMonth ? {backgroundColor: '#ED4A88'} : null]}>
        <View>
          <Text style={[styles.dayOfWeek, dayPress == dayOfMonth ? styles.selectedDayOfWeek : null]}>{dayOfWeek[0]}</Text>
          <View>
            <Text style={[dayOfMonthStyle, dayPress == dayOfMonth ? styles.selectedDayOfMonth : null]}>{dayOfMonth}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
      days.push({ dayOfMonth: i, dayOfWeek, isToday, key: i});
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
      <Text style={styles.welcome}>{welcomeMessage}</Text>
      <View style={styles.calendar}>
        <Text style={styles.monthName}>{getCurrentMonthYear().monthName}</Text>
        <FlatList
          data={renderDays()}
          horizontal
          renderItem={renderDay}
          keyExtractor={(item, index) => index.toString()}
          style={{maxHeight: 100}}
          getItemLayout={(data, index) => (
            {length: 50, offset: 50 * (index - 1), index}
          )}
          initialScrollIndex={dayPress}
        />
        <View style={styles.containerMedicamentCard}>
          {
            allMedicamentsActiveByDate.length != 0 ? (
              allMedicamentsActiveByDate.map((eachMedicament, index) => {
                return <MedicamentCard key={eachMedicament._id} name={eachMedicament.name} id={index} dosage={eachMedicament.dosage} time={eachMedicament.allTimes[0]} />
              })
            ) : (
              <View style={{ marginTop: 120 }}>
                <Text style={styles.text}>Nenhum medicamento para o dia selecionado.</Text>
              </View>
            )
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMedicamentCard: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    alignContent: 'flex-start',
    justifyContent: 'flex-start'
  },

  selectedDayOfWeek: {
    color: '#fff',
  },

  selectedDayOfMonth: {
    fontFamily: globalStyle.mavenBold,
    fontSize: 19,
    color: '#302F2F'
  },
  
  welcome:{
    marginTop: 40,
    marginBottom: 20,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: globalStyle.maxWidth,
    maxWidth: globalStyle.maxWidth,
  },

  container:{
   backgroundColor: '#4BB991',
  },

  calendar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#F7F7F7',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    
  },

  monthName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 15,
  },

  dayOfMonth: {
    fontSize: 19,
    fontWeight: globalStyle.mavenRegular,
  },

  today: {
    color: 'white',
  },

  circle: {
    alignItems: 'center',
    marginHorizontal: 10,
    width: 40,
    height: 64,
    borderRadius: 12,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dayOfWeek: {
    fontSize: 16,
    color: '#CCCACA',
    textAlign: 'center'
  },

  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
    color: globalStyle.greenPrimary,
    fontFamily: globalStyle.mavenMedium,
  }
});

export default Calendar;