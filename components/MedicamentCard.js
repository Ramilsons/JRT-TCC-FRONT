import { View, Pressable, Text, StyleSheet } from 'react-native';
import globalStyle from '../global/styles/index'

export default function MedicamentCard(props){
    return(
        <View style={styles.container}>
            <View style={styles.containersInfos}>
                <Text style={styles.name}>{props.name}</Text>
                <Pressable>
                    <Text style={styles.editButton}>Editar</Text>
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
        height: 90
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
    },

    editButton: {
        backgroundColor: 'transparent',
        textDecorationLine: 'underline',
        fontSize: 13,
        color: globalStyle.colorSecondary,
        fontFamily: globalStyle.mavenRegular
    }
})