import React, { useEffect, useRef } from "react";
import { View,TextInput as RNTextInput, StyleSheet, Pressable, Text, Animated } from "react-native";
import { pattles } from "../constants/colors";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { fonts } from "../constants/fonts";

const timing = (to,toValue,duration)=>Animated.timing(to,{
   toValue,
   duration,
   useNativeDriver:true
 }).start();    

const TextInput = ({
   onReset=()=>{},
   onPress=()=>{},
   icon,
   Icon=Feather,
   touched,
   error,
   ...props
}) => {
   const ref = useRef(null);
   const transition = useRef(new Animated.Value(0)).current;
   const existValueTrans = useRef(new Animated.Value(0)).current;
   const notValue = useRef(new Animated.Value(1)).current;
   
   useEffect(()=>{
      timing(existValueTrans,!!props.value ? 1 :0,100);
      timing(notValue,!props.value ? 1 :0,100);
   },[props.value]);

   useEffect(()=>{
      timing(transition,touched ? 1 :0,300);
   },[touched,error]);
   
    return(
       <Pressable onPress={()=>{
         ref.current.focus();
         if(onPress) onPress();
       }}>
         <View style={styles.textContainer}>
         <View 
            style={{marginHorizontal:15}} 
         >
               {icon && (
                  <Animated.View style={{opacity:notValue}}>
                     <Icon 
                        name={icon}
                        color={pattles.lisght} 
                        size={20} 
                     />
                  </Animated.View>
               )}
               <Animated.View
                  style={{
                       position:"absolute",
                       opacity:existValueTrans
                  }}
               >               
                  <MaterialIcons 
                     name="close"
                     color={pattles.lisght} 
                     size={20} 
                     onPress={onReset}
                  />
               </Animated.View>
            </View>
            <RNTextInput
                  ref={ref}
                  style={styles.textInput}
                  placeholderTextColor={pattles.lisght}
                  {...props}
            />
        </View>
        {error && (   
            <Animated.View style={{opacity:transition}}>
               {(touched) && (
                  <Text style={styles.errorText}>
                  {error}
               </Text>
               )}
            </Animated.View>
         )}
   </Pressable>
    )
}
const styles = StyleSheet.create({
   textContainer:{
      margin:5,
      backgroundColor:pattles.primaryLight,
      borderRadius:10,
      flexDirection:"row",
      alignItems:"center"
   },
   textInput:{
      height:50,
      paddingHorizontal:15,
      textAlign:"right",
      color:pattles.lisght,
      flex:1,
      fontFamily:fonts.AnjomanSemiBold,
   },
   errorText:{
      color:pattles.danger,
      fontSize:12,
      textAlign:"right",
      paddingHorizontal:15,
      paddingVertical:2,
      fontWeight:"bold"
   },
})
export default TextInput;