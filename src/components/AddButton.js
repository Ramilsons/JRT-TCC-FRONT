import { Linking, Text, StyleSheet } from 'react-native';
import globalStyle from './../../global/styles/index'
import { useNavigation } from '@react-navigation/native';


export default function AddButton(props){
    const navigation = useNavigation();

    return(
        <Text style={[styles.button, props.styleCustom]} onPress={() => {navigation.navigate(props.linkRedirect)}}>
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
        width: 45,
        height: 45,
        fontSize: 30,
        marginTop: 35,
        borderRadius: 6,
        marginLeft: 'auto',
    },

    text: {
        height: '100%',
        textAlign: 'center',
        flex: 1,
        alignSelf: 'center',
    }
})