import { StyleSheet, Image, TextInput, View } from 'react-native';
import inputWithIcon from './../../global/styles/inputWithIcon';

export default function InputCPF(props){

    return(
        <View style={styles.container}>
            <TextInput
                value={props.variable}
                onChangeText={text => {
                    props.valueToSet(text);
                }}
                style={styles.input}
                placeholder='Digite sua senha'
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