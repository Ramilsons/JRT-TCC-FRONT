
import {View} from 'react-native';
import {Agenda} from 'react-native-calendars';

function Home() {
  return (
    <View style={{flex: 1}}>
      <Agenda
        style={{width: 360}}
        selected={'2023-05-23'}
      />
    </View>
  );
}

export default Home;