import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { Title } from "../components";
import Card from "../components/Card";
import { pattles } from "../constants/colors";
import ListItemShop from "./ListItemShop";
import * as shopDb from "../db"
import { useQueryClient } from "react-query";
import Toast from "react-native-toast-message"
const ListShop = ({
    listShop=[],
    loading,
    onSelect=(id)=>{},
    bagId=null,
}) => {
    const [list,setList]=useState(listShop);
    const queryClient = useQueryClient()
    const [deletableIds,setDeletableIds] = useState([]);
    
    useEffect(()=>{
        if(listShop != list) setList(listShop)
    },[listShop])

    const addToIds  =(id)=>{
        setDeletableIds(prev=>{
            if(prev.findIndex(x=>x == id) >=0)
            return prev;
            return [...prev,id];
        });
    }
    
    const removeFromIds=(id)=>setDeletableIds(prev=>prev.filter(x=>x != id));
    
    const deleteHandler = async (id)=>{
        addToIds(id);
        shopDb.deleteShopping(id)
            .then(()=>{
                const index = list.findIndex(it=>it.id ==id);
                deleteToast("success",`ایتم ${list[index].title} با موفقیت پاک شد`)
                setList(prev=>prev.filter(x=>x.id != id));
            }).
            catch(()=>{
                deleteToast("error",`پاک شدن ایتم ${list[id]} به مشکل برخورد`)
            })
            .finally(()=>{removeFromIds(id)});
    };
    
    const deleteToast=(type,text)=>{
        Toast.show({
            type,
            position:"bottom",
            text1:text,
            visibilityTime: 2000,
            autoHide: true,
            bottomOffset: 40,
        });
    };
    return(
        <View style={{flex:1}}>
            <View style={{alignItems:"center"}}>
                <Card onPress={()=>!loading && queryClient.invalidateQueries('shoping-bags')}>
                    <Title title="خرید ها" />
                </Card>
            </View>
            <ScrollView 
                style={styles.list}
                showsVerticalScrollIndicator={false}
            >
                {loading ? (
                    <ActivityIndicator
                        color={pattles.lisght}
                        size={40}
                    />
                ):(
                    <ListItemShop 
                        listItem={list} 
                        onDeleting={deleteHandler} 
                        onPressItem={onSelect}
                        bagId={bagId}
                        deletableIds={deletableIds}
                    />
                )}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    list:{
        flex:1,
        paddingHorizontal:10,
        marginTop:20,
    }
})

export default ListShop;