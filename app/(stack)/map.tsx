import { useFocusEffect, useRouter } from "expo-router";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";

import { useEffect, useState, useCallback, useRef } from "react";
import * as Location from "expo-location";
import MapView, { UserLocationChangeEvent } from "react-native-maps";
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
  const mapRef = useRef<MapView>(null);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
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

  const checkForBattle = (monster: Creature) => {
    return () => {
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
        ) > 50
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
    };
  };

  const onLocationChange = (a: UserLocationChangeEvent) => {
    console.log("changed");
    // this is to calculate total distance traveled
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
    if (mapRef.current && a.nativeEvent.coordinate) {
      mapRef.current?.animateCamera({
        center: {
          latitude: a.nativeEvent.coordinate.latitude,
          longitude: a.nativeEvent.coordinate.longitude,
        },
        pitch: 45, // Adjust this value for desired 3D effect
        heading: 0,
        altitude: 300, // Adjust altitude as needed
        zoom: 20,
      });
    }

    setLocation({ coords: a.nativeEvent.coordinate });
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
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading...</Text>
          {/* <ProgressBar progress={0.5} width={200} />{" "} */}
          {/* Change progress value based on your loading progress */}
        </View>
      ) : (
        <>
          <View style={{ position: "absolute", zIndex: 2, top: 0, left: 0 }}>
            <Text>{message}</Text>
            <Button onPress={() => router.back()} title="Menu" />
          </View>
          <View
            style={{ position: "absolute", zIndex: 2, bottom: 25, right: 20 }}>
            <Text>Time left: {formatTime(timeLeft)}</Text>
            <Button onPress={() => setTrigger(!trigger)} title="Reset" />
          </View>

          <MapView
            ref={mapRef}
            provider="google"
            style={styles.map}
            camera={{
              center: {
                latitude: location?.coords.latitude || 0,
                longitude: location?.coords.longitude || 0,
              },
              pitch: 45, // Adjust this value for desired 3D effect
              heading: 0,
              altitude: 300, // Adjust altitude as needed
              zoom: 20,
            }}
            showsMyLocationButton={false}
            customMapStyle={mapStyle}
            minZoomLevel={20}
            maxZoomLevel={20}
            onUserLocationChange={onLocationChange}
            userLocationUpdateInterval={20000}
            showsUserLocation={currentlyShowingUserLocation}>
            {randomMonsters?.map((monster, index) => (
              <Marker
                key={index}
                coordinate={monster.location!}
                onPress={checkForBattle(monster)}>
                <Image
                  source={monster?.asset!}
                  style={{ width: 30, height: 50 }}
                  resizeMode="contain"
                />
              </Marker>
            ))}
          </MapView>
        </>
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

export default MapScreen;
