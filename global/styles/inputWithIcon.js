import globalStyle from './index';

export default {
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#B7B7B7',
        borderRadius: 5,
        width: globalStyle.maxWidth,
        paddingRight: 11,
        marginBottom: 16
    },
    input: {
        width: globalStyle.maxWidth - 24,
        height: 38,
        fontFamily: globalStyle.mavenMedium,
        fontSize: 15,
        color: '#8C8C8C',
        focusedTextInput: {
            borderColor: '#B7B7B7',
        },
        paddingLeft: 17,
    },
    icon: {
        height: 24,
        width: 24,
    }
}