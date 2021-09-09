
import React, { useEffect, useState } from 'react';
import {StyleSheet,View} from 'react-native';
import ListShop  from './ListShop';
import FormShop from './FormShop';
import HeaderShop from './HeaderShop';
import { pattles } from '../constants/colors';
import * as shopDb from "../db"
import { useQuery } from 'react-query';
const Shop = () => {
  const [bagId,setBagId]= useState(null);
  const[totalPrice,setTotalPrice]= useState(0);
  const query = useQuery('shoping-bags', getBagShops)
  
  async function getBagShops (){
    try{
      const data = await shopDb.getListofShopping();
      return data;
    }catch(err){
      return [];
    }
  };
  useEffect(()=>{
    if(query.data instanceof Array){
      const price = query.data.reduce((total,current)=> total + current.price,0);
      setTotalPrice(price);
    }
  },[query.data])

  const selectHandler = (id)=>setBagId( prev => id == prev ?  null : id );
  return (
    <View style={styles.container}>
       <HeaderShop totalPrice={totalPrice} />
      <FormShop bagId={bagId} onChanged={()=>query.refetch()}  />
      <ListShop
        onChanged={()=>query.refetch()}
        onSelect={selectHandler}
        loading={query.isLoading || query.isFetching}
        listShop={query.data}
        {...{bagId}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:pattles.primary
  },
  loadingContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
});

export default Shop;
