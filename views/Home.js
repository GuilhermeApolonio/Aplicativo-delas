import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // Adicione PROVIDER_GOOGLE
import * as Location from 'expo-location';
import config from '../config';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import { MaterialIcons } from '@expo/vector-icons';

export default function Home(props) {
  const mapEl = useRef(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync(); // Atualizado
        if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
          setOrigin({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.000922,
            longitudeDelta: 0.000421
          });
        } else {
          throw new Error('Location permission not granted');
        }
      } catch (error) {
        console.error('Error:', error);
        // Trate o erro de acordo com a necessidade
      }
    })();
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
        provider={PROVIDER_GOOGLE} // Adicione PROVIDER_GOOGLE
      >
        {destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={config.googleApi}
            strokeWidth={3}
            onReady={result => {
              setDistance(result.distance);
              setPrice(result.distance * 3);
              mapEl.current.fitToCoordinates(
                result.coordinates,
                {
                  edgePadding: {
                    top: 50,
                    bottom: 50,
                    left: 50,
                    right: 50
                  }
                }
              );
            }}
          />
        )}
      </MapView>

      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder='Para onde vamos?'
          onPress={(data, details = null) => {
            setDestination({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.000922,
              longitudeDelta: 0.000421
            });
          }}
          query={{
            key: config.googleApi,
            language: 'pt-br',
          }}
          enablePoweredByContainer={false}
          fetchDetails={true}
          styles={{
            listView: { backgroundColor: '#fff', zIndex: 10 },
            container: { position: 'absolute', width: '100%' }
          }}
        />
      </View>

      {distance && (
        <View style={styles.distance}>
          <Text style={styles.distance__text}>
            Distância: R${distance.toFixed(2).replace('.', ',')} km
          </Text>
          <TouchableOpacity
            style={styles.price}
            onPress={() => props.navigation.navigate('Checkout', { price: price.toFixed(2) })}
          >
            <Text style={styles.price__text}>
              <MaterialIcons name="payment" size={24} color="white" /> Pagar R${price.toFixed(2).replace('.', ',')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    height: '40%',
    marginTop: 20,
  },
  distance: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 50, // Ajuste conforme necessário
  },
  distance__text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    backgroundColor: '#000',
    padding: 7,
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price__text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
