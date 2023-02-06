import { View, Text, Image, TextInput } from 'react-native';
import globalStyle from '../global/styles';
import TitleAccount from '../components/TitleAccount';
import InputCPF from '../components/InputCPF';

export default function Login(){
    return(
        <View>
            <Image
                source={require('../assets/images/login-banner.png')}
                style={{width: globalStyle.maxWidth, height: 230}}
            />
            <TitleAccount title="Entrar na conta" />
            <InputCPF />
        </View>
    )
}