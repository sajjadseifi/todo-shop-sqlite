import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { pattles } from "../constants/colors";
const Card = ({style,children,onPress=()=>{},...props}) => (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} {...props}>
    <View style={[styles.cardHeader,style]}>
        {children}
    </View>
   </TouchableOpacity>
)

const styles = StyleSheet.create({
    cardHeader:{
        paddingVertical:16,
        paddingHorizontal:34,
        flexDirection:"row-reverse",
        backgroundColor:pattles.primaryLight,
        borderRadius:10,
    }
});
export default Card;