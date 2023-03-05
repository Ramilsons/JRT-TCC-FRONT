import { Text, StyleSheet } from 'react-native';
import globalStyle from './../../global/styles/index';

export default function TitlePage(props){
    return(
        <Text style={styles.Text}>{props.title}</Text>
    )
}

const styles = StyleSheet.create({
    Text: {
        fontSize: 23,
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 60,
        color: globalStyle.colorPrimary,
        fontFamily: globalStyle.mavenMedium
    }
})