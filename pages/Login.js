import { View, Image } from 'react-native';
import globalStyle from '../global/styles';
import InputCPF from '../components/InputCPF';
import TitleAuthentication from '../components/TitleAuthentication';

export default function Login(){
    return(
        <View>
            <Image
                source={require('../assets/images/login-banner.png')}
                style={{width: globalStyle.maxWidth, height: 230}}
            />
            <TitleAuthentication customTitle="Entrar na conta" />
            <InputCPF />
        </View>
    )
}