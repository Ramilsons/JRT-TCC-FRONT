import { TextInputMask } from 'react-native-masked-text'
import { useState } from 'react'
import { StyleSheet, Image, View } from 'react-native';
import inputWithIcon from './../../global/styles/inputWithIcon';

export default function InputCPF(props){
    return(
        <View style={styles.container}>
            <TextInputMask
                type={'cpf'}
                value={props.variable}
                onChangeText={(text) => {
                    props.valueToSet(text);
                }}
                style={styles.input}
                placeholder='Digite seu CPF'
            />
            <Image 
                source={require('../../assets/images/key.png')}
                style={styles.icon}
            />
        </View>
    )
}


const styles = StyleSheet.create(inputWithIcon);