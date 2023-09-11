import { useFocusEffect, useRouter } from "expo-router";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";

import { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import mapStyle from "../../assets/mapStyle.json";
import { usePlayerCharacter } from "@/context/PlayerContext";
import { getDistance } from "@/game/utils/maoUtils";
import { generateRandomCoordinates } from "@/utils/mapUtils";
const Screen1 = () => {
  const router = useRouter();
  const [location, setLocation] = useState<any>({});
  const [message, setMessage] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState("");
  const [playerCharacter, setPlayerCharacter] = usePlayerCharacter();
  const [previousLocation, setPreviousLocation] = useState<any>(null);
  const [distanceTraveled, setDistanceTraveled] = useState<number>(0);
  const [randomMarkers, setRandomMarkers] = useState<any[]>([]);
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
      setLocation(location);

      // Generate 5 random markers (you can change this number)
      const markers = [];
      for (let i = 0; i < 5; i++) {
        markers.push(
          generateRandomCoordinates(
            location.coords.latitude,
            location.coords.longitude,
            1000
          )
        );
      }
      setRandomMarkers(markers);
    })();
  }, []);

  const showHpMessage = () => {
    Alert.alert("You are weak. Heal to resume battles.");
    // setTimeout(() => setMessage(""), 2000);
  };

  const showFarAwayMessage = () => {
    Alert.alert("You are too far away. Walk closer to start a fight!");
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
          customMapStyle={mapStyle}
          onRegionChange={(e) => {
            mapRef?.current
              ? mapRef?.current?.animateToRegion(location.coords)
              : null;
          }}
          minZoomLevel={17}
          maxZoomLevel={17}
          // onUserLocationChange={(a) => {
          //   if (previousLocation && a.nativeEvent?.coordinate) {
          //     const distance = getDistance(
          //       previousLocation.coords.latitude,
          //       previousLocation.coords.longitude,
          //       a.nativeEvent?.coordinate.latitude,
          //       a.nativeEvent?.coordinate.longitude
          //     );
          //     setDistanceTraveled((prevDistance) => prevDistance + distance);
          //   }
          //   setPreviousLocation({ coords: a.nativeEvent.coordinate });
          //   setLocation({ coords: a.nativeEvent.coordinate });
          // }}
          showsUserLocation>
          {/* {location?.coords && (
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
          )} */}
          {randomMarkers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker}
              onPress={() => {
                if (playerCharacter?.currentHp === 0) {
                  showHpMessage();
                  return;
                }
                if (
                  getDistance(
                    location.coords.latitude,
                    location.coords.longitude,
                    marker.latitude,
                    marker.longitude
                  ) > 60
                ) {
                  showFarAwayMessage();
                  return;
                }

                router.push("(stack)/battle");
              }}>
              <Image
                source={require("../../assets/creatures/skeletonWarrior.png")}
                style={{ width: 30, height: 50 }}
                resizeMode="contain"
              />
            </Marker>
          ))}
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
