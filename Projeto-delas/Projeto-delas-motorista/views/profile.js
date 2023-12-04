import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


export function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            
      <Text style={styles.headerText}>Perfil do Usuário</Text>
      </View>
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Dados')}>
        <AntDesign name="idcard" size={24} color="#8c43ff" />
        <Text style={styles.optionText}>Dados Pessoais</Text>
        
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('History')}>
        <Fontisto name="history" size={24} color="#8c43ff" />
        <Text style={styles.optionText}>Histórico</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Chat')}>
        <Entypo name="chat" size={24} color="#8c43ff" />
        <Text style={styles.optionText}>Chat</Text>
      </TouchableOpacity>

      
    </View>
  );
}


export default ProfileScreen;

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
      padding: 20,
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
      marginBottom: 122
      
    },
    addOptionText: {
      fontSize: 16,
      marginLeft: 20,
      color: '#5E17EB',
    },
    
  
     
  });