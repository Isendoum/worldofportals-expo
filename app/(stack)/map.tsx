import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

import { createRef, useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import mapStyle from "../../assets/mapStyle.json";
const Screen1 = () => {
  const router = useRouter();
  const [location, setLocation] = useState<any>({});
  const [errorMsg, setErrorMsg] = useState("");
  const ref = createRef<MapView>();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5,
      });
      console.log("Loc:", location);
      setLocation(location);
    })();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <MapView
        ref={ref}
        provider="google"
        style={styles.map}
        initialRegion={location?.coords}
        region={location?.coords}
        // mapType="terrain"
        customMapStyle={mapStyle}
        onRegionChange={(e) => {
          ref?.current ? ref?.current?.animateToRegion(location.coords) : null;
        }}
        minZoomLevel={17}
        maxZoomLevel={17}
        onUserLocationChange={(a) =>
          setLocation({ coords: a.nativeEvent.coordinate })
        }
        showsUserLocation>
        {location?.coords && (
          <Marker
            coordinate={{
              latitude: location?.coords?.latitude,
              longitude: location?.coords?.longitude,
            }}
            style={{ width: 30, height: 50 }}
            onPress={() => router.push("(stack)/battle")}
            children={
              <View>
                <Image
                  source={require("../../assets/creatures/skeletonWarrior.png")}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              </View>
            }
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Screen1;
