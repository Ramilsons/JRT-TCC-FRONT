import { TextInputMask } from 'react-native-masked-text';

import { StyleSheet, Image, View } from 'react-native';
import inputWithIcon from './../../global/styles/inputWithIcon';

export default function InputBirthDate(props){
    return(
        <View style={styles.container}>
            <TextInputMask
                type={'datetime'}
                value={props.variable}
                onChangeText={text => {
                    props.valueToSet(text);
                }}
                style={styles.input}
                placeholder='Digite sua data de nascimento'
            />
            <Image 
                source={require('../../assets/images/calendar.png')}
                style={styles.iconCalendar}
            />
        </View>
    )
}


const styles = StyleSheet.create(inputWithIcon);