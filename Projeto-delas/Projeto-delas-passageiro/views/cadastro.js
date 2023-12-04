import React, { useState, useEffect } from "react";
import {
  Button,
  TextInput,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import axios from "axios";
// import { DadosScreen } from "./profile/dados";

export default function CadScreen({ navigation }) {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

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

  const handleCadastroPress = () => {
    const data = {
      nome: nomeCompleto,
      cpf,
      email,
      senha,
    };

    navigation.navigate("Home");

    axios
      .post("http://192.168.0.43:3001/cadPas", {
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        senha: data.senha,
      })
      .then((response) => {
        console.log("Dados de cadastro de passageira enviados com sucesso:", response.data);

        // Supondo que você quer navegar para 'DadosScreen' após o cadastro bem-sucedido
        // navigation.navigate("DadosScreen", {
        //   data: {
        //     nome: data.nome,
        //     cpf: data.cpf,
        //     email: data.email,
        //   },
        // });
      })
      .catch((error) => {
        console.error("Erro ao enviar dados:", error);

        // Lidar com o erro da requisição, se necessário
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.icone}>
        <Image
          source={require("../assets/icone-delas.png")}
          style={{ width: 500, height: 200 }}
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
      <TouchableOpacity
        style={styles.cadButton}
        onPress={handleCadastroPress}
      >
        <Text style={styles.cadButtonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 20,
  },

  button: {
    padding: 20,
    width: 320,
    borderRadius: 5,
  },

  cadastro: {
    fontSize: 30,
    color: "#5E17EB",
    paddingBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    padding: 1,
  },
  inputField: {
    flex: 1,
    marginLeft: 10,
    color: "#666",
    padding: 5,
  },
  cadButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  cadButton: {
    backgroundColor: "#5E17EB",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 80,
  },
});
