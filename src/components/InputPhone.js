import { StyleSheet, Image, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import inputWithIcon from './../../global/styles/inputWithIcon';

export default function InputPhone(props){

    return(
        <View style={styles.container}>
            <TextInputMask
                type={'cel-phone'}
                options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                }}
                value={props.variable}
                onChangeText={text => {
                    props.valueToSet(text);
                }}
                style={styles.input}
                placeholder="Digite seu número de telefone"
            />
            <Image 
                source={require('../../assets/images/phone.png')}
                style={styles.icon}
            />
        </View>
    )
}


const styles = StyleSheet.create(inputWithIcon);