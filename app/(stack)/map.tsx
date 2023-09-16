import { useFocusEffect, useRouter } from "expo-router";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";

import { useEffect, useState, useCallback } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import mapStyle from "../../assets/mapStyle.json";
import { usePlayerCharacter } from "@/context/PlayerContext";
import { getDistance } from "@/game/utils/mapUtils";
import { generateRandomCoordinates } from "@/utils/mapUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTimer } from "@/context/TimerContext";
import { formatTime } from "@/utils/generalUtils";

import { usePickedMonster } from "@/context/MapBattleContext";
import { Creature } from "@/game/classes/Creature";

const MapScreen = () => {
  const { startTimer, timeLeft } = useTimer();
  const router = useRouter();
  const [location, setLocation] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const [playerCharacter, setPlayerCharacter] = usePlayerCharacter();
  const [previousLocation, setPreviousLocation] = useState<any>(null);
  const [distanceTraveled, setDistanceTraveled] = useState<number>(0);
  const [randomMonsters, setRandomMonsters] = useState<Creature[]>([]);
  const [trigger, setTrigger] = useState(false);
  const [currentlyShowingUserLocation, setCurrentlyShowingUserLocation] =
    useState(true);
  // const mapRef = useRef<MapView>(null);

  const [, setMonster] = usePickedMonster();

  // loads monsters or creates a new batch of them
  const loadMonsters = useCallback(async () => {
    try {
      const storedMonsters = await AsyncStorage.getItem("randomMonsters");
      if (storedMonsters) {
        setRandomMonsters(JSON.parse(storedMonsters));
      } else {
        const monsters = [];
        for (let i = 0; i < 5; i++) {
          let mon = Creature.generateMonster(playerCharacter?.level!);
          mon.location = generateRandomCoordinates(
            location.coords.latitude,
            location.coords.longitude
          );
          monsters.push(mon);
        }
        setRandomMonsters(monsters);

        await AsyncStorage.setItem("randomMonsters", JSON.stringify(monsters));
      }
    } catch (error) {
      console.log(error);
    }
  }, [playerCharacter, location]);

  useFocusEffect(
    useCallback(() => {
      setCurrentlyShowingUserLocation(true);
      loadMonsters();

      return () => {};
    }, [loadMonsters]) // Add loadMonsters to the dependency array to ensure the latest version of the function is used
  );

  const getAndSetLocation = async () => {
    const location = await Location.getLastKnownPositionAsync();
    setLocation(location);
  };

  useEffect(() => {
    (async () => {
      try {
        await getAndSetLocation();
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      setLocation(null);
      setRandomMonsters([]);
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (
        //timeLeft === 0 &&
        location?.coords?.latitude &&
        location?.coords?.longitude
      ) {
        startTimer();
        const monsters = [];
        for (let i = 0; i < 5; i++) {
          let mon = Creature.generateMonster(playerCharacter?.level!);
          mon.location = generateRandomCoordinates(
            location?.coords?.latitude,
            location?.coords?.longitude
          );
          monsters.push(mon);
        }
        setRandomMonsters(monsters);
        try {
          await AsyncStorage.setItem(
            "randomMonsters",
            JSON.stringify(monsters)
          );
        } catch (e) {
          console.error(e);
        }
      }
    })();
  }, [trigger]);

  const showHpMessage = () => {
    Alert.alert("You are weak. Heal to resume battles.");
  };

  const showFarAwayMessage = () => {
    Alert.alert("You are too far away. Walk closer to start a fight!");
  };

  const setCarreer = (d: number) => {
    if (playerCharacter) {
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
      <View style={{ position: "absolute", zIndex: 2, bottom: 25, right: 20 }}>
        <Text>Time left: {formatTime(timeLeft)}</Text>
        <Button onPress={() => setTrigger(!trigger)} title="Reset" />
      </View>

      {
        <MapView
          // ref={mapRef}
          provider="google"
          style={styles.map}
          initialRegion={{
            latitude: location?.coords.latitude || 0,
            longitude: location?.coords.longitude || 0,
            latitudeDelta: 0.000034,
            longitudeDelta: 0.000043,
          }}
          showsMyLocationButton={false}
          region={{
            latitude: location?.coords.latitude || 0,
            longitude: location?.coords.longitude || 0,
            latitudeDelta: 0.000034,
            longitudeDelta: 0.000043,
          }}
          customMapStyle={mapStyle}
          // onRegionChange={(e) => {
          //   mapRef?.current?.state
          //     ? mapRef?.current?.animateToRegion(location?.coords)
          //     : null;
          // }}
          minZoomLevel={17}
          maxZoomLevel={17}
          onUserLocationChange={(a) => {
            console.log("changed");
            // if (previousLocation && a.nativeEvent?.coordinate) {
            //   const distance = getDistance(
            //     previousLocation.coords.latitude,
            //     previousLocation.coords.longitude,
            //     a.nativeEvent?.coordinate.latitude,
            //     a.nativeEvent?.coordinate.longitude
            //   );
            //   setDistanceTraveled((prevDistance) => prevDistance + distance);
            // }
            // setPreviousLocation({ coords: a.nativeEvent.coordinate });
            setLocation({ coords: a.nativeEvent.coordinate });
          }}
          userLocationUpdateInterval={20000}
          showsUserLocation={currentlyShowingUserLocation}>
          {randomMonsters?.map((monster, index) => (
            <Marker
              key={index}
              coordinate={monster.location!}
              onPress={() => {
                if (playerCharacter?.currentHp === 0) {
                  showHpMessage();
                  return;
                }
                if (
                  getDistance(
                    location?.coords?.latitude,
                    location?.coords?.longitude,
                    monster?.location?.latitude!,
                    monster?.location?.longitude!
                  ) > 100
                ) {
                  console.log(
                    getDistance(
                      location?.coords?.latitude,
                      location?.coords?.longitude,
                      monster?.location?.latitude!,
                      monster?.location?.longitude!
                    )
                  );
                  showFarAwayMessage();
                  return;
                }
                setMonster(monster);
                setCurrentlyShowingUserLocation(false);
                setRandomMonsters([]);
                router.push("(stack)/battle");
              }}>
              <Image
                source={monster?.asset!}
                style={{ width: 30, height: 50 }}
                resizeMode="contain"
              />
            </Marker>
          ))}
        </MapView>
      }
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

export default MapScreen;
