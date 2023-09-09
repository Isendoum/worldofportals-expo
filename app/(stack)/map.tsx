import { useFocusEffect, useRouter } from "expo-router";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";

import { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import mapStyle from "../../assets/mapStyle.json";
import { usePlayerCharacter } from "@/context/PlayerContext";
import { getDistance } from "@/game/utils/maoUtils";
const Screen1 = () => {
  const router = useRouter();
  const [location, setLocation] = useState<any>({});
  const [message, setMessage] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState("");
  const [playerCharacter, setPlayerCharacter] = usePlayerCharacter();
  const [previousLocation, setPreviousLocation] = useState<any>(null);
  const [distanceTraveled, setDistanceTraveled] = useState<number>(0);
  const mapRef = useRef<MapView>(null);
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
      //  console.log("Loc:", location);
      setLocation(location);
    })();
  }, []);

  const showHpMessage = () => {
    Alert.alert("You are weak. Heal to resume battles.");
    // setTimeout(() => setMessage(""), 2000);
  };

  const setCarreer = (d: number) => {
    if (playerCharacter) {
      //   console.log(d);
      const upPlayer = playerCharacter?.clone();
      upPlayer.career.distanceTraveled = d;
      setPlayerCharacter(upPlayer);
    }
  };

  // useEffect(() => {
  //   const intervalId = setInterval(() => setCarreer(distanceTraveled), 5000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [distanceTraveled]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}>
      <View style={{ position: "absolute", zIndex: 2, top: 0, left: 0 }}>
        <Text>{message}</Text>
        <Button onPress={() => router.back()} title="Menu" />
      </View>
      {location && (
        <MapView
          ref={mapRef}
          provider="google"
          style={styles.map}
          initialRegion={location?.coords}
          region={location?.coords}
          // mapType="terrain"
          customMapStyle={mapStyle}
          onRegionChange={(e) => {
            mapRef?.current
              ? mapRef?.current?.animateToRegion(location.coords)
              : null;
          }}
          minZoomLevel={17}
          maxZoomLevel={17}
          onUserLocationChange={(a) => {
            if (previousLocation && a.nativeEvent?.coordinate) {
              const distance = getDistance(
                previousLocation.coords.latitude,
                previousLocation.coords.longitude,
                a.nativeEvent?.coordinate.latitude,
                a.nativeEvent?.coordinate.longitude
              );
              setDistanceTraveled((prevDistance) => prevDistance + distance);
            }
            setPreviousLocation({ coords: a.nativeEvent.coordinate });
            setLocation({ coords: a.nativeEvent.coordinate });
          }}
          showsUserLocation>
          {location?.coords && (
            <Marker
              coordinate={location.coords}
              onPress={() => {
                if (playerCharacter?.currentHp === 0) {
                  showHpMessage();
                } else {
                  router.push("(stack)/battle");
                }
              }}>
              <Image
                source={require("../../assets/creatures/skeletonWarrior.png")}
                style={{ width: 30, height: 50 }}
                resizeMode="contain"
              />
            </Marker>
          )}
        </MapView>
      )}
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
