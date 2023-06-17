import {View, Text, StyleSheet} from 'react-native';
import AddButton from './AddButton';

import globalStyle from '../../global/styles';

export default function NoMedicament() {
    return (
        <View style={[styles.wrapper, {height: 600, alignItems: 'center', justifyContent: 'center'}]}>
            <Text style={styles.text}>Você não possui nenhum medicamento ativo.</Text>
            <Text style={styles.text}>Cadastre um agora mesmo!</Text>
            <AddButton styleCustom={styles.button} cta="+" linkRedirect="Novo Medicamento" />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        maxWidth: globalStyle.maxWidth,
    },

    text: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '500',
        color: globalStyle.greenPrimary,
        fontFamily: globalStyle.mavenMedium
    }
})