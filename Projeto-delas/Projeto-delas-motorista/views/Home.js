import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import io from "socket.io-client";

const socket = io("http://192.168.0.43:3001");

export default function MotoristaComponente(props) {
  const mapEl = useRef(null);
  const [origin, setOrigin] = useState(null);
  const [solicitacoesPendentes, setSolicitacoesPendentes] = useState([]);
  const [corridaAceita, setCorridaAceita] = useState(false); 
  const [corridaFinalizada, setCorridaFinalizada] = useState(false);
  const [idCorridaAtual, setIdCorridaAtual] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
          });
          setOrigin({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421,
          });
        } else {
          throw new Error("Location permission not granted");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  }, []);

  useEffect(() => {

    socket.on("novaCorrida", (novaSolicitacao) => {
      // Atualizar o estado com a nova solicitação
      setSolicitacoesPendentes((prevSolicitacoes) => [
        ...prevSolicitacoes,
        novaSolicitacao,
      ]);
    });

    socket.on("corridaAceita", ({ idCorrida }) => {
      setSolicitacoesPendentes((prevSolicitacoes) => prevSolicitacoes.slice(1));
      setCorridaAceita(true);
      setCorridaFinalizada(false);
      setIdCorridaAtual(idCorrida);
    });

    socket.on("corridaFinalizada", ({ idCorrida }) => {
      setCorridaFinalizada(true);
      setCorridaAceita(false);
      setIdCorridaAtual(null); // Resetar o idCorrida quando a corrida é finalizada
    });
  }, []);

  const aceitarSolicitacao = () => {
    const idCorrida = solicitacoesPendentes[0].idCorrida;
    setSolicitacoesPendentes(solicitacoesPendentes.slice(1));
    socket.emit("corridaAceita", { idCorrida });
    console.log("Solicitação de corrida aceita e enviada para o servidor com sucesso!");
  };

  const finalizarCorrida = () => {
    if (idCorridaAtual) {
      socket.emit("finalizarCorrida", { idCorrida: idCorridaAtual });
      setCorridaFinalizada(true);
      console.log("Corrida finalizada e notificada ao servidor!");
    } else {
      console.warn("Nenhuma corrida aceita para finalizar.");
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={origin}
        showsUserLocation={true}
        zoomEnabled={false}
        loadingEnabled={true}
        ref={mapEl}
        provider={PROVIDER_GOOGLE}
      >
        {/* Adicione a renderização de marcadores ou outras informações no mapa, se necessário */}
      </MapView>

      {corridaAceita && !corridaFinalizada && (
        <View style={styles.botaoFinalizarContainer}>
          <TouchableOpacity style={styles.botaoFinalizar} onPress={finalizarCorrida}>
            <Text style={styles.botaoFinalizarTexto}>Finalizar Corrida</Text>
          </TouchableOpacity>
        </View>
      )}

      {!corridaFinalizada && !corridaAceita && solicitacoesPendentes.length > 0 && (
        <View style={styles.botaoAceitarContainer}>
          <TouchableOpacity style={styles.botaoAceitar} onPress={aceitarSolicitacao}>
            <Text style={styles.botaoAceitarTexto}>Aceitar Solicitação</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  botaoAceitarContainer: {
    position: "absolute",
    bottom: windowHeight / 2 - 25,
    alignSelf: "center",
  },
  botaoFinalizarContainer: {
    position: "absolute",
    bottom: windowHeight / 2 - 25,
    alignSelf: "center",
  },
  botaoAceitar: {
    backgroundColor: "#5E17EB",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  botaoAceitarTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  botaoFinalizar: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  botaoFinalizarTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});