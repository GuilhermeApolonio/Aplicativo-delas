import { Text, View, StyleSheet, FlatList,  TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export function PayScreen({navigation}) {


    const[pay, setpay] = useState([
      {forma: 'Cartão', key: 1, icon: 'card-outline', screen: 'Cartao'},
      {forma: 'Pix', key: 2, icon: 'cash-outline', screen: 'Pix'},
      {forma: 'Dinheiro', key: 3, icon: 'wallet-outline', screen: 'Money'},
    ]);

    const[add, setAdd] = useState([
      {adicionar: 'Adicionar forma de pagamento', key: 4},
      
  
    ])

    const handlePaymentOption = (screen) => {
      navigation.navigate(screen);
    };
    


    return (
      
       
          <View style={styles.container}>
          <View style={styles.header}>
          <Text style={styles.headerText}>Opções de Pagamento</Text>
          </View>
        
      
          <FlatList 
          numColumns={1}
          keyExtractor={(item) => item.key}
          data={pay}
          renderItem= {({item}) => (
            <TouchableOpacity style={styles.item} onPress={() => handlePaymentOption(item.screen)}>
              <View style={styles.option}>
              <Ionicons name={item.icon} size={24} color="#8c43ff" />
              <Text style={styles.optionText}>{item.forma}</Text>
              </View>
            </TouchableOpacity>
            
  
          )}
          />
           
        </View>
        
        
    );
  }
 
  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#fff', 
    },
    header: {
      height: 100,
      backgroundColor: '#5E17EB',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 21,
      borderBottomWidth: 2,
      borderBottomColor: '#9D94FF',
      width: '100%',
    },
    optionText: {
      fontSize: 16,
      marginLeft: 20,
    },
    addOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: '#9D94FF',
      width: '100%',
      marginBottom: 500
      
    },
    addOptionText: {
      fontSize: 16,
      marginLeft: 20,
      color: '#5E17EB',
      
    },
    
  
     
  });