import { View, Text, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import globalStyle from "../../global/styles";
import { useNavigation } from "@react-navigation/native";

const slides = [
    {
        key: '1',
        title: 'a',
        text: 'Preencha as informações referente ao medicamento.',
        image: require('./../../assets/medicament.png'),
    },
    {
        key: '2',
        title: 'a',
        text: 'Pronto! Após isso, você será notificado via SMS nos horários corretos.',
        image: require('./../../assets/sms.png'),
    }
]

export default function Tutorial() {
    const navigate = useNavigation();

    return (
        <AppIntroSlider
            style={{flex: 1, paddingBottom: 30}}
            renderItem={renderSlides}
            data={slides}
            activeDotStyle={{
                backgroundColor: `${globalStyle.colorSecondary}`,
                width: 30
            }}
            renderDoneButton={ () => <Image source={require('./../../assets/proximo.png')} style={{width: 55, height: 55, paddingRight: 15}} />}
            onDone={() => navigate.navigate('Home') }
        />
    )
    
    function renderSlides({ item }){
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Image 
                    source={item.image}
                    style={{resizeMode: 'contain', height: '75%', width: 150, marginBottom: 40}}
                />
                <Text style={{color: 'rgb(159, 159, 159)', fontFamily: globalStyle.mavenRegular, fontSize: 18, textAlign: 'center', maxWidth: globalStyle.maxWidth}}>{item.text}</Text>
            </View>
        )
    }
}
