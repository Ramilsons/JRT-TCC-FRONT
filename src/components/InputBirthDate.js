import { TextInputMask } from 'react-native-masked-text';

import { StyleSheet, Image, View } from 'react-native';
import inputWithIcon from './../../global/styles/inputWithIcon';

export default function InputBirthDate(props){
    if(props.icon){
        return(
            <View style={styles.container}>
                <TextInputMask
                    type={'datetime'}
                    value={props.variable}
                    onChangeText={text => {
                        props.valueToSet(text);
                    }}
                    style={styles.input}
                    placeholder={props.placeholder}
                />
                <Image 
                    source={require('../../assets/images/calendar.png')}
                    style={styles.iconCalendar}
                />
            </View>
        )
    }else {
        return(
            <View style={styles.container}>
                <TextInputMask
                    type={'datetime'}
                    value={props.variable}
                    onChangeText={text => {
                        props.valueToSet(text);
                    }}
                    style={[styles.input, {paddingLeft: 11}]}
                    placeholder={props.placeholder}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create(inputWithIcon);