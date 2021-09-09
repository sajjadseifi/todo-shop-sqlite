//default
import React from "react";
import { StyleSheet, View } from "react-native";
import { Title } from "../components";
import Card from "../components/Card";
import { pattles } from "../constants/colors";
import {fonts} from "../constants/fonts"

const HeaderShop = ({totalPrice = 0}) => {
    return(
        <View style={styles.header}>
            <Card>
                <Title title="مجموع هزینه ها" />
                <Title title=":" style={{marginHorizontal:2}}/>
                <Title title={`${totalPrice} تومان`} />
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    header:{
        alignItems:"center",
        justifyContent:"center",
        paddingTop:20,
    }
});
export default HeaderShop;