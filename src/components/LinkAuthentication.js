import { TouchableHighlight, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import globalStyle from "../../global/styles";

export default function LinkAuthentication(props) {
    const navigation = useNavigation();

    return(
        <View>
            <TouchableHighlight onPress={() => navigation.navigate(props.targetScreen)}>
                <Text style={styles.linkButton}>{props.customText}</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    linkButton: {
        backgroundColor: 'transparent',
        textDecorationLine: 'underline',
        fontSize: 12,
        color: globalStyle.grayLink,
        fontFamily: globalStyle.mavenMedium,
        textAlign: "center",
        marginTop: 20
    }
})