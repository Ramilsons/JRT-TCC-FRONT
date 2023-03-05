import { View, Text, StyleSheet } from 'react-native';
import globalStyle from './../../global/styles/index';

export default function TitleAuthentication(props){
    return(
        <View>
            <Text style={styles.text}>{props.customTitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 29,
        marginTop: 15,
        fontFamily: globalStyle.mavenMedium,
        color: '#3A3A3A',
        marginBottom: 40,
    }
})