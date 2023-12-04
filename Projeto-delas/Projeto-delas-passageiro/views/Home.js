import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";
import { MaterialIcons } from "@expo/vector-icons";
import Axios from "axios";
import io from "socket.io-client";
import config from "../config";

const socket = io("http://192.168.0.43:3001");

export default function Home(props) {
  const mapEl = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(null);
  const [isRequestAccepted, setIsRequestAccepted] = useState(false);
  const [isShowingRoute, setIsShowingRoute] = useState(false);
  const [corridaAceita, setCorridaAceita] = useState(false);
  const [corridaFinalizada, setCorridaFinalizada] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
          });

          const reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });

          const streetName =
            reverseGeocode.length > 0
              ? reverseGeocode[0].street
              : "Rua Desconhecida";
          const streetNumber =
            reverseGeocode.length > 0
              ? reverseGeocode[0].streetNumber
              : "Número Desconhecido";
          const district =
            reverseGeocode.length > 0
              ? reverseGeocode[0].district
              : "Distrito Desconhecido";
          const region =
            reverseGeocode.length > 0
              ? reverseGeocode[0].region
              : "Região Desconhecida";

          const localName = `${streetName}, ${streetNumber}, ${district}, ${region}`;

          setUserLocation({
            name: localName,
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

  const fitToMap = () => {
    if (mapEl.current && origin && destination) {
      const coordinates = [origin, destination];
      mapEl.current.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        },
      });
    }
  };

  const enviarParaBancoDeDados = async () => {
    try {
      const horario = new Date().toISOString().slice(0, 19).replace("T", " ");

      await Axios.post("http://192.168.0.43:3001/solicitarCorrida", {
        distancia: distance,
        valor: price,
        origem: userLocation.name,
        destino: destination.name,
        horario: horario,
        idPassageira: null,
        idMotorista: null,
      });

      console.log("Informações enviadas para o banco de dados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar informações para o banco de dados:", error);
    }
  };

  const solicitarCorrida = async () => {
    if (origin && destination && distance && price) {
      await enviarParaBancoDeDados();

      enviarParaSocketIO();

      setIsRequestAccepted(true);
    } else {
      console.error("Preencha todas as informações antes de enviar.");
    }
  };

  const enviarParaSocketIO = () => {
    const horario = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Enviar solicitação de corrida em tempo real para o servidor Socket.IO
    socket.emit("novaCorrida", {
      distancia: distance,
      valor: price,
      origem: userLocation.name,
      destino: destination.name,
      horario: horario,
      idPassageira: null,
      idMotorista: null,
      idCorrida: null,
    });

    console.log("Informações enviadas para o Socket.IO com sucesso!");
  };

  useEffect(() => {
    if (isShowingRoute) {
      fitToMap();
    }
  }, [isShowingRoute]);

  useEffect(() => {
    socket.on("corridaAceita", () => {
      console.log("Corrida aceita pelo motorista!");
      setCorridaAceita(true);
    });

    return () => {
      socket.off("corridaAceita");
    };
  }, []);

  useEffect(() => {
    socket.on("corridaFinalizada", ({ idCorrida }) => {
      console.log("Corrida finalizada!");
      setCorridaFinalizada(true);
    });

    return () => {
      socket.off("corridaFinalizada");
    };
  }, []);

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
        {isShowingRoute && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={config.googleApi}
            strokeWidth={3}
            onReady={(result) => {
              setDistance(result.distance);
              setPrice(result.distance * 3);
            }}
          />
        )}
      </MapView>

      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Para onde vamos?"
          onPress={(data, details = null) => {
            setDestination({
              name: details.name,
              address: details.formatted_address,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.000922,
              longitudeDelta: 0.000421,
            });

            setIsShowingRoute(true);
          }}
          query={{
            key: config.googleApi,
            language: "pt-br",
          }}
          enablePoweredByContainer={false}
          fetchDetails={true}
          styles={{
            listView: { backgroundColor: "#fff", zIndex: 1 },
            container: { position: "absolute", width: "100%" },
          }}
        />
      </View>

      {distance && (
        <View style={styles.distance}>
          <Text style={styles.distance__text}>
            Distância: R${distance.toFixed(2).replace(".", ",")} km
          </Text>
          <TouchableOpacity
            style={styles.price}
            onPress={solicitarCorrida}
            disabled={isRequestAccepted || corridaAceita || corridaFinalizada}
          >
            <View style={styles.priceContainer}>
              <MaterialIcons
                name={corridaFinalizada ? "check-circle" : "payment"}
                size={24}
                color="white"
                style={styles.icon}
              />
              <Text style={styles.price__text}>
                {corridaFinalizada
                  ? "Corrida Finalizada"
                  : corridaAceita
                  ? "Corrida Aceita"
                  : isRequestAccepted
                  ? "Aguardando o motorista aceitar"
                  : `Solicitar Corrida R$${price.toFixed(2).replace(".", ",")}`}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

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
  searchContainer: {
    height: "40%",
    bottom: 0,
  },
  distance: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 70,
    backgroundColor: "#fff",
    borderRadius: 85,
    bottom: 15,
  },
  distance__text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    backgroundColor: "#5E17EB",
    padding: 7,
    borderRadius: 4,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price__text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  icon: {
    marginRight: 5,
  },
});
