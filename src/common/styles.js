import {StyleSheet} from "react-native";

export const styleVariables = {
    backgroundColor: "#FFFFFF",
    headerBackgroundColor: "#25282e",
    headerColor: "#cccccc",
    subTitleColor: "#888888",
    lightBackgroundColor: "#f7f7f7",
    grey: "#cccccc",
    primaryColor: "#ff3300",
    borderColor: "#eeeeee",
    dealColor: "#95C05C",
    couponColor: "#29b6f6",
    saleColor: "#ec407a",
    deliveryColor: "#6e8cd7",
    infoDetailColor: "#455a64",
    clearIconColor: "#86939c",
    rowColor: "#dddddd",
    tabColor: "#3c3c3c",
    mainTextFontSize: 14,
    subtitleFontSize: 12,
    menuIconSize: 25,
    infoTextFontSize: 11,
    loadingIconSize: 40,
    transparent: "rgba(0,0,0,0)",
    hitSlop: {
        top: 5,
        right: 5,
        left: 5,
        bottom: 5,
    },
    iconSize: 20
};


const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: styleVariables.backgroundColor,
    },
    merchantLogo: {
        height: 60,
        width: 80,
    },
    listSubTitleText: {
        fontSize: styleVariables.infoTextFontSize,
        fontWeight: "normal",
        marginTop: 5
    },
    list: {
        flex: 1,
        flexDirection: "row"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    vertical: {
        flexDirection: "column",
        justifyContent: "space-around",
    },
    listContent: {
        flex: 1,
        flexDirection: "column"
    },
    divider: {
        borderTopWidth: 0.5,
        borderColor: styleVariables.borderColor,
        height: 2
    },

    row: {
        flex: 1,
        padding: 42,
        borderWidth: 1,
        alignSelf: "center",
        fontSize: 24,
        borderColor: styleVariables.rowColor
    },

    sectionDivider: {
        alignItems: "center",
        padding: 8,
        backgroundColor: styleVariables.borderColor
    },

    listContainerStyle: {
        marginTop: 0,
        marginBottom: 0,
        paddingHorizontal: 10,
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    buttonStyle: {
        flex: 1
    },
    buttonViewStyle: {
        marginVertical: 10,
        alignContent: "stretch"
    },
    buttonTextStyle: {
        fontSize: styleVariables.mainTextFontSize
    },
});

export default commonStyles;