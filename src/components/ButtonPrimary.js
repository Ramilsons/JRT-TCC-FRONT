import { Text, StyleSheet, Image, Pressable } from 'react-native';
import globalStyle from './../../global/styles/index'

export default function ButtonPrimary(props){
    return(
        <Pressable style={[styles.button]} onPress={() => {props.callBackFunction()}}>
            { props.stateIsLoad ? <Image source={require('./../../assets/images/load-white.gif')} style={styles.loadGif}  /> : <Text style={styles.text}>{props.cta}</Text>}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: globalStyle.colorSecondary,
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: globalStyle.maxWidth,
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
        fontFamily: globalStyle.mavenBold,
        lineHeight: 15,
        color: '#ffffff'
    },

    loadGif: {
        textAlignVertical: 'center',
        width: 25,
        height: 25,
        alignSelf: 'center'
    }
})