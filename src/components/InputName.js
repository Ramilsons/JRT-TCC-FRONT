import { StyleSheet, Image, TextInput, View } from 'react-native';
import inputWithIcon from './../../global/styles/inputWithIcon';

export default function InputName(props){

    return(
        <View style={styles.container}>
            <TextInput
                value={props.variable}
                onChangeText={text => {
                    props.valueToSet(text);
                }}
                style={styles.input}
                placeholder="Digite seu nome"
            />
            <Image 
                source={require('../../assets/images/name.png')}
                style={styles.icon}
            />
        </View>
    )
}


const styles = StyleSheet.create(inputWithIcon)