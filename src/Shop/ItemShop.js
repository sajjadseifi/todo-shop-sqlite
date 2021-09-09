import moment from "moment";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Card, Title } from "../components";
import { pattles } from "../constants/colors";
import Icon from "react-native-vector-icons/Feather";
import {fonts} from "../constants/fonts"
const ItemShop = ({
    deleting,
    active=false,
    title,
    price,
    date = new Date(),
    onDelete=()=>{},
    onPress=()=>{}
}) => {
    let style =active?styles.active:{};
    return(
        <Card onPress={onPress} style={[styles.container,style]}>
            <Icon name="shopping-bag" color={pattles.lisght} size={24} style={{marginLeft:10}} />
            <View style={styles.item}>
                <View style={[styles.side,{alignItems:"flex-end"}]}>
                    <Title title={title}  />
                    <Text  style={styles.price}>{`${price} تومان`}</Text>
                </View>
                <View style={[styles.side,{alignItems:"flex-start"}]}>
                    <Text style={styles.date}>{moment(date).format("YYYY/MM/DD")}</Text>
                    {deleting ?
                        <ActivityIndicator color={pattles.danger} size={24} />
                    :
                        <Text onPress={onDelete} style={styles.delete}>حذف</Text>
                    }
                </View>
            </View>
        </Card>
    )
};

const styles = StyleSheet.create({
    container:{
        flexDirection:"row-reverse",
        alignItems:"center",
        marginVertical:5,
        paddingHorizontal:20,
        paddingVertical:20,
        borderWidth:1,
        borderColor:pattles.primaryLight
    },
    active:{
        borderColor:pattles.lisght
    },
    item:{
        flexDirection:"row-reverse",
        justifyContent:"space-between",
        flex:1,
        paddingHorizontal:5,
    },
    title:{
        color:pattles.lisght,
    },
    price:{
        color:pattles.lisght,
        fontSize:17,
        color:pattles.success,
        fontFamily:fonts.AnjomanBlack
    },
    date:{
        fontSize:15,
        color:pattles.gray,
        fontFamily:fonts.AnjomanThin,
        fontWeight:"bold"
    },  
    delete:{
        color:pattles.danger,
        fontSize:20,
        fontFamily:fonts.AnjomanSemiBold
    },
    side:{
        justifyContent:"space-between",
    }
})

export default ItemShop;