import { View, Image, StatusBar, StyleSheet, TouchableHighlight } from 'react-native';
import globalStyle from '../global/styles';

import { DrawerActions } from '@react-navigation/native';

export default function Header({ functionOpen }){
    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TouchableHighlight   underlayColor='transparent' onPress={() => functionOpen.dispatch(DrawerActions.openDrawer())}>
                    <Image 
                        source={require('../assets/images/menu-hamburguer.png')}
                        style={styles.menu}
                    />
                </TouchableHighlight>
                <Image 
                    source={require('../assets/images/white-logo.png')}
                    style={styles.menu}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyle.greenPrimary,
        paddingBottom: 10,
        paddingTop: 10,
        height: 60,
        marginTop: StatusBar.currentHeight
    },

    wrapper: {
        width: globalStyle.maxWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },  

    menu: {
        height: 40,
        width: 50,
    }
})