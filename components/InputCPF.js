import { TextInputMask } from 'react-native-masked-text'
import { useState } from 'react'
import { StyleSheet } from 'react-native';
import globalStyle from '../global/styles';

export default function InputCPF(){
    const [cpf, setCpf] = useState('');

    return(
        <TextInputMask
            type={'cpf'}
            value={cpf}
            onChangeText={text => {
                setCpf(text);
            }}
            style={styles.input}
            placeholder='Digite seu CPF'
        />
    )
}


const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: '#B7B7B7',
        width: globalStyle.maxWidth,
        height: 38,
        borderRadius: 5,
        fontFamily: globalStyle.mavenMedium,
        fontSize: 15,
        paddingLeft: 11,
        paddingRight: 11,
        color: '#8C8C8C',
        focusedTextInput: {
            borderColor: '#B7B7B7',
        }
    }
})