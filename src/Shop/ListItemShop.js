//default
import React from "react";
import { StyleSheet, View } from "react-native";
import ItemShop from "./ItemShop";
const ListItemShop = ({
   bagId,
   listItem=[],
   deletableIds=[],
   onDeleting=(id)=>{},
   onPressItem=(id)=>{}
}) => (    
   <>
      <View style={styles.space}/>
      {listItem.map((item)=>{
         const deleting = deletableIds.findIndex(x=>x == item.id) > -1;
         return <ItemShop 
            {...item}
            key={item.id}
            onDelete={()=>onDeleting(item.id)}
            onPress={()=>onPressItem(item.id)}
            active={bagId == item.id}
            deleting={deleting}
         />
      })}
      <View style={styles.space}/>
   </>
);

const styles = StyleSheet.create({
   space:{
      height:5,
      width:"100%"
   },
})
export default ListItemShop;