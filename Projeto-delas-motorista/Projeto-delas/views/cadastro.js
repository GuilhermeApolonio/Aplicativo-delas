import React, { useState, useEffect } from 'react';
import { Button, TextInput, View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

//import axios from 'axios';
//import { DadosScreen } from './profile/dados';

export default function CadScreen({ navigation }) {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [cor, setCor] = useState('');
  const [marca, setMarca] = useState('');

  const handleNomeChange = (texto) => {
    setNomeCompleto(texto);
  };

  const handleCpfChange = (texto) => {
    setCpf(texto);
  };

  const handleEmailChange = (texto) => {
    setEmail(texto);
  };

  const handleSenhaChange = (texto) => {
    setSenha(texto);
  };
  const handlePlacarChange = (texto) => {
    setPlaca(texto);
  };
  const handleModeloChange = (texto) => {
    setModelo(texto);
  };
  const handleCorChange = (texto) => {
    setCor(texto);
  };
  const handleMarcaChange = (texto) => {
    setMarca(texto);
  };

  const handleCadastroPress = () => {
    const data = {
      nome: nomeCompleto,
      cpf,
      email,
      senha,
    };
    navigation.navigate('Home');
    //axios
     // .post('http://192.168.1.11:3001/cad', data)
      //.then((response) => {
      //  console.log('Dados enviados com sucesso:', response.data);
       // navigation.navigate('DadosScreen', { 
       //   data: {
        //    nome: data.nome,
        //    cpf: data.cpf,
        //    email: data.email,
       //   },
      //  });
    //  })
    //  .catch((error) => {

   //   });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.icone}>
        <Image
          source={require('../../Projeto-delas/assets/icone-delas.png')}
          style={{ width: 500, height: 210 }}
        />
      </View>
      <Text style={styles.cadastro}>Cadastro</Text>
      <View style={styles.inputContainer}>
        <MaterialIcons
          style={styles.icon}
          name="drive-file-rename-outline"
          size={20}
          color="grey"
        />
        <TextInput
          placeholder="Digite seu nome completo:"
          style={styles.inputField}

          onChangeText={handleNomeChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <Fontisto style={styles.icon} name="female" size={20} color="#666" />
        <TextInput
          placeholder="Digite seu CPF:"
          style={styles.inputField}
          keyboardType="numeric"
          onChangeText={handleCpfChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <Entypo style={styles.icon} name="email" size={20} color="grey" />
        <TextInput
          placeholder="Digite seu email:"
          style={styles.inputField}
          onChangeText={handleEmailChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons
          style={styles.icon}
          name="vpn-key"
          size={20}
          color="grey"
        />
        <TextInput
          placeholder="Digite uma senha:"
          style={styles.inputField}

          onChangeText={handleSenhaChange}
        />
      </View>
      <AntDesign style={styles.arrow} name="arrowdown" size={50} color="#5E17EB" />
      
      <Text style={styles.titleDois}>Olá, motorista!</Text>
      <Text style={styles.text}>Preparada para começar sua jornada como motorista de aplicativos do Delas? Vamos lá!</Text>



      <View style= {{ display: 'flex', flexDirection: 'row', }}>
      
        <TextInput 
          style={styles.inputCaixa}
          //value={validade}
          //onChangeText={setValidade}
          
          placeholder="CNH"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.inputCaixa}
          //value={cvv}
          //onChangeText={setCvv}
          placeholder="CRLV"
          keyboardType="numeric"
        />
        </View>



      <View style={styles.inputContainer}>
    
        
        <TextInput
          placeholder="Placar do carro:"
          onChangeText={handleSenhaChange}
          style={styles.inputField}

        />
      </View>
      <View style={styles.inputContainer}>
        
      
        <TextInput
          placeholder="Modelo do carro:"
          style={styles.inputField}
          onChangeText={handleSenhaChange}
        />
      </View>
      <View style={styles.inputContainer}>
      

        <TextInput
          placeholder="Cor do carro:"
          style={styles.inputField}
          onChangeText={handleSenhaChange}
        />
      </View>
      <View style={styles.inputContainer}>
      

        <TextInput
          placeholder="Marca do carro:"
          style={styles.inputField}
          onChangeText={handleSenhaChange}
        />
      </View>
   
      <TouchableOpacity style={styles.cadButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.cadButtonText}>Cadastrar</Text>
      </TouchableOpacity>
    
    </ScrollView>
  );
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 5,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
  },
  
  button: {
    padding: 20,
    width: 320,
    borderRadius: 5,
    left: 30
  },
 
  cadastro: {
    fontSize: 30,
    color: '#5E17EB',
    paddingBottom: 30,
    marginHorizontal: 118,
    flexDirection: 'row'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    padding: 1
  },
  inputField: {
    flex: 1,
    marginLeft: 10,
    color: '#666',
    padding: 5
  },
titleDois:{
  fontSize: 30,
    color: '#5E17EB',
    margin:78
},
text:{
  fontSize: 20,
    color: '#5E17EB',
    bottom: 40
}, 
arrow: {
  top:40,
  padding: 100,
  left: 59
},
icone:{
  margin:50,
  right:110
},
inputCaixa:{
  flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 74,
    backgroundColor: '#fff',
    padding: 1
},
cadButtonText: {
  color: '#fff',
  fontSize: 16,
  textAlign: 'center'
},
cadButton: {
  backgroundColor: '#5E17EB',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 5,
  marginTop: 20,
  marginBottom: 80
},

});
