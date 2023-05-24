import {View} from 'react-native';
import {Agenda} from 'react-native-calendars';



        
      
  function Calendars () {


  return (
    <View style={{flex: 1}}>
      <Agenda
        
        selected={'2023-05-23'}
      />
    </View>
  );
}


export default Calendars;