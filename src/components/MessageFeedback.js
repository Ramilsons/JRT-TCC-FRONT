import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import globalStyle from '../../global/styles';
// props
// type: error || success
// message

export default function MessageFeedback(props){
    const widthScreen = useWindowDimensions().width;

    return(
        <View style={[styles.container, props.visible ? {opacity: 1} : {opacity: 0}]}>
           <Text style={[styles.text, props.type == 'success' ? styles.success : styles.error, {width: widthScreen}]}>{props.message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        flex: 1,
        justifyContent: 'flex-end',
    },

    success: {
        backgroundColor: '#4BB543'
    },

    error: {
        backgroundColor: '#ff3333',
    },

    text: {
        position: 'absolute',
        height: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: globalStyle.mavenMedium,
        alignSelf: 'center',
        lineHeight: 50,
        color: "#fff",
        bottom: 0,
    }
})