import { ReactNode, useEffect, useRef } from "react";
import { Animated, ViewStyle } from "react-native";

interface ParticleProps {
  style: ViewStyle;
  children?: ReactNode;
}

const Particle: React.FC<ParticleProps> = ({ style, children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  // const yValAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.9,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim,
        // transform: [
        //   {
        //     translateY: yValAnim,
        //   },
        // ],
      }}>
      {children}
    </Animated.View>
  );
};

export default Particle;
