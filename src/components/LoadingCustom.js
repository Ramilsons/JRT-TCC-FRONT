import { View, Image, StyleSheet, Text } from 'react-native';

export default function LoadingCustom(){
    return(
        <View style={styles.container}>
            <Image 
                source={require('../../assets/images/load-green-2.gif')}
                style={styles.image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    image: {
        height: 60,
        width: 60,
    }
})
