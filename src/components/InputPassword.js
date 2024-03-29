import { StyleSheet, Image, TextInput, View } from 'react-native';
import inputWithIcon from './../../global/styles/inputWithIcon';

export default function InputPassword(props){

    return(
        <View style={styles.container}>
            <TextInput
                value={props.variable}
                onChangeText={text => {
                    props.valueToSet(text);
                }}
                style={styles.input}
                placeholder={props.customPlaceholder ? props.customPlaceholder : 'Digite sua senha'}
                secureTextEntry={true}
            />
            <Image 
                source={require('../../assets/images/lock.png')}
                style={[styles.icon, {height: 27, width: 21}]}
            />
        </View>
    )
}


const styles = StyleSheet.create(inputWithIcon)