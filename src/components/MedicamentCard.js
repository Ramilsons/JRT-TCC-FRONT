import { View, Pressable, Text, StyleSheet } from 'react-native';
import globalStyle from './../../global/styles/index.js';
import EditMedicamentStyle from "../../global/styles/inputWithIcon";

import { useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";

export default function MedicamentCard(props){
    const navigation = useNavigation();

    function redirectToSpecificMedicament(){
        navigation.navigate('Editar Medicamento', { medicamentId: props.id })
    }

    return(
        <View style={styles.container}>
            <View style={styles.containersInfos}>
                <Text style={styles.name}>{props.name}</Text>
                <Pressable>
                    <Text onPress={redirectToSpecificMedicament} style={EditMedicamentStyle.editButton}>Editar</Text>
                </Pressable>
            </View>
            <View style={styles.containersInfos}>
                <Text style={styles.dosage}>{props.dosage}</Text>
                <Text style={styles.time}>{props.time}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: globalStyle.maxWidth,
        borderRadius: 8,
        marginTop: 20,
        paddingTop: 14,
        paddingBottom: 14,
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 90,
    },

    containersInfos: {
        flex: 1,
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch'
    },

    name: {
        fontSize: 16,
        color: globalStyle.colorPrimary,
        fontFamily: globalStyle.mavenBold
    },

    dosage: {
        fontSize: 13,
        color: '#9F9F9F',
        fontFamily: globalStyle.mavenRegular
    },

    time: {
        fontSize: 20,
        color: '#9F9F9F',
        fontWeight: '300',
        fontFamily: globalStyle.mavenRegular
    }
})