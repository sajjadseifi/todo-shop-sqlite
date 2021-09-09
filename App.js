import React from 'react';
import {  Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {QueryClient,QueryClientProvider,} from 'react-query';
import { init } from './src/db';
import { Shop } from './src/Shop';
import Toast from 'react-native-toast-message';

init()
.then(()=>{
  console.log("DataBase Connected.")
})
.catch(()=>{
  console.log("DataBase Error")
});
// const {width} = Dimensions.get("window");
const queryClient = new QueryClient();
// const toastConfig = {
//   success: ({ text1, props, ...rest }) => (
//     <View style={{ height: 60, width:"100%" }}>
//       <View style={{flex:1,marginHorizontal:20,backgroundColor:"red"}}>
//       <Text style={{color:"white"}}>{text1}</Text>
//       <Text>{props.guid}</Text>
//       </View>
//     </View>
//   ),
//   error: () => {},
//   info: () => {},
//   any_custom_type: () => {}
// };

const App = () => {
  
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView  style={styles.container}>
          <StatusBar barStyle="light-content"/>
          <Shop/>
          <Toast config={{}} ref={(ref) => Toast.setRef(ref)} />
      </SafeAreaView>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});

export default App;
