import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";

import { defaultStyles } from "@/styles";
import type { GeoListingItem } from "@/types";
import { useRouter } from "expo-router";

interface ListingsMapProps {
  listings: GeoListingItem[];
}

const ListingsMap: React.FC<ListingsMapProps> = ({ listings }) => {
  const router = useRouter();
  const onMarkerSelected = (item: GeoListingItem) => {
    router.push(`/listing/${item.properties.id}`);
  };

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
      >
        <View style={styles.marker}>
          <Text style={styles.clusterText}>
            {points}
          </Text>
        </View>
      </Marker>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        style={styles.map}
        animationEnabled={false}
        showsUserLocation
        showsMyLocationButton
        initialRegion={{
          latitude: 52.52,
          longitude: 13.405,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        clusterColor="#fff"
        clusterTextColor="#000"
        clusterFontFamily="mon-sb"
        provider="google"
        renderCluster={renderCluster}
      >
        {listings.map((item) => (
          <Marker
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude,
            }}
          >
            <View style={styles.marker}>
              <Text style={defaultStyles.medium}>
                € {item.properties.price}
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default ListingsMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  marker: {
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  clusterText: {
    color: "#000",
    textAlign: "center",
    fontFamily: "mon-sb",
  },
});
