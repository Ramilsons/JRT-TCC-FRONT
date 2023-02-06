import { Text, StyleSheet  } from 'react-native';
import globalStyle from '../global/styles';

export default function TitleAccount(props){
    return(
        <Text style={styles.text}>{props.title}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        alignSelf: 'left',
        fontSize: 29,
        marginTop: 15,
        fontFamily: globalStyle.mavenMedium,
        color: '#3A3A3A',
        marginBottom: 40,
    }
})