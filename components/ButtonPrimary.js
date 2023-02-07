import { Text, StyleSheet } from 'react-native';
import globalStyle from '../global/styles/index'

export default function ButtonPrimary(props){
    return(
        <Text style={[styles.button]} onPress={() => {props.callBackFunction()}}>
            <Text style={styles.text}>{props.cta}</Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: globalStyle.colorSecondary,
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: 245,
        height: 40,
        fontSize: 15,
        marginTop: 35,
        borderRadius: 6,
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlignVertical: 'center',
    },

    text: {
        textAlign: 'center',
        fontFamily: globalStyle.mavenBold
    }
})