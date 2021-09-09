import React from "react";
import { StyleSheet, Text } from "react-native";
import { pattles } from "../constants/colors";
import { fonts } from "../constants/fonts";

const Title = ({title="",style={}}) => <Text style={[styles.text,style]}>{title}</Text>

const styles = StyleSheet.create({
    text:{
        color:pattles.lisght,
        // fontSize:18,
        fontFamily:fonts.AnjomanHeavy
    }
});

export default Title;