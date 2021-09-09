//default
import React from "react";
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { pattles } from "../constants/colors";
import { fonts } from "../constants/fonts";
const Button = ({title,loading,disabled,onPress=()=>{},color=pattles.gray,...props}) => {
   const gost = loading || disabled;
   const opacity= gost ? 0.6 : 1
   const handler = ()=> !gost && onPress();
    return(
         <TouchableOpacity 
            activeOpacity={opacity}
            style={{ opacity }}
            onPress={handler}
            style={{flexDirection:"row"}}
         >
            <View style={[styles.buttonContainer,{backgroundColor:color}]}>
               {loading?
                  <ActivityIndicator size={24} color={pattles.lisght}/>
                  :
                  <Text  style={styles.button}>{title}</Text>
               }
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
   buttonContainer:{
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:pattles.secondary,
      borderRadius:100,
      height:46,
      flex:1,
   },
   button:{
      color:pattles.lisght,
      fontFamily:fonts.AnjomanUltraBold,
   }
})
export default Button;