import { Pressable, StyleSheet, Text } from "react-native"
import { colors } from "../Constant/colors"

const CustomButton = ({ btnText, onpress, bgcolor, style, textColor,showBg }) => {
    return (
        <Pressable onPress={onpress} style={[styles.btn,{ backgroundColor: showBg?colors.gray:colors.white },style]}>
            <Text style={{
                color:showBg?colors.white:colors.black
            }}>{btnText}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    btn:{
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center", 
        paddingVertical: 15,
        borderRadius: 20 
    }
})
export default CustomButton