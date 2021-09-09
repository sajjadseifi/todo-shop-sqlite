import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator  } from "react-native";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as shopDb from "../db"
import { pattles } from "../constants/colors";
import { OverLayout } from "../components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Toast from 'react-native-toast-message';

const inputs =[
    {
        icon:"title", 
        Icon:MaterialIcons,
        placeholder:"عنوان",
        filed:"title",
        returnKeyType:"next",
        returnKeyLabel:"بعدی",
    },
    {
        icon:"dollar-sign", 
        placeholder:"قیمت (به تومان)",
        filed:"price",
        returnKeyType:"next",
        returnKeyLabel:"بعدی",
    },
    {
        icon:"calendar", 
        placeholder:"تاریخ",
        filed:"date",
        returnKeyType:"go",
        returnKeyLabel:"ثبت"
    }
]
const ShopSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'حداقل سه حرف وارد کنید')
      .max(16, 'حد اکثر 16 حرف وارد کنید')
      .required('این فیلد اجباری است'),
    price: Yup.number().required("قیمت را وارد نمایید"),
    date: Yup.date().required("تاریخ را وارد نمایید"),
  });
  
const FormShop = ({bagId=null}) => {
    const query = useQuery('bagform', laodingBag);
    const queryClient = useQueryClient();
    const mutation = useMutation(formSubmitBag, {
        onSuccess: () => {
            if(!bagId)
                resetForm();
            queryClient.invalidateQueries('shoping-bags');
        }
    });
    const {
        errors,touched,values,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue,
        setFieldTouched,
        resetForm
    } =useFormik({
            initialValues:{
                title:"",
                price:"",
                date:"",
            },
        validationSchema:ShopSchema,
        onSubmit:(values)=>mutation.mutate(values)
    });    
    useEffect(()=>{ 
        query.refetch()
    },[bagId]);
    
    async function laodingBag(){
        if(!bagId) return;
        const data = await shopDb.getShoppingById(bagId);
        setValues(data);
    }
    async function formSubmitBag(){
        try{
            if(bagId)
                await shopDb.updateShopping(bagId,values.title,values.price,values.date);
            else 
                await shopDb.insertShopping(values.title,values.price,values.date);
            
              toastOpen("success","bottom",
              bagId
                  ? "ویرایش با موفقیت انجام شد"
                  : "با موفقیت افزوده شد"
              );  
        }catch{
            toastOpen("error","bottom",
            bagId
                ? "ویرایش اعمال نشد"
                : "مشکل در افزودن پیش امده"
            );  
        }        
    }
    const toastOpen =(type,position,text)=>{
        Toast.show({
            type,
            position,
            text1:text,
            visibilityTime: 2000,
            autoHide: true,
            bottomOffset: 40,
        });
    };
    return(
        <View style={styles.form}>
            <View>
                {inputs.map((item)=>(
                    <TextInput 
                    key={item.filed}
                    onChangeText={handleChange(item.filed)}
                    onBlur={handleBlur(item.filed)}
                    error={errors[item.filed]}
                    touched={touched[item.filed]}
                    autoCapitalize="none"
                    value={`${values[item.filed]}`}
                    onReset={()=>{
                        setFieldValue(item.filed,"",false)
                        setFieldTouched(item.filed,false,false);
                    }}
                    {...item}
                    />
                ))}
            </View>
            <View style={{
                justifyContent:"center",
                 alignItems:"center",
                 paddingVertical:20
            }}>
                <Button 
                    onPress={()=>handleSubmit()} 
                    title={bagId? "ویرایش":"افزودن"} 
                    color={bagId?pattles.dodgerblue:pattles.secondary}
                    loading={mutation.isLoading}
                />
            </View>
            {query.isFetching && (
                <OverLayout>
                    <ActivityIndicator color={pattles.lisght} size={25}/>
                </OverLayout>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    form:{
        paddingHorizontal:20,
        paddingVertical:5,
    },
})

export default FormShop;