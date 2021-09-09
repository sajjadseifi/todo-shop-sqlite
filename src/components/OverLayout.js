import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
const {width} = Dimensions.get("window");
const OverLayout = ({children}) => {
    return(
        <View style={styles.overLayout}>
           {children}
        </View>
    )
}
const styles = StyleSheet.create({
   overLayout:{
      position:"absolute",
      width:width,
      height:"100%",
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#00000022"
   }
});
export default OverLayout; 