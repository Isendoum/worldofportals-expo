import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TimerContextProps {
  timeLeft: number;
  startTimer: () => void;
  resetTimer: () => void;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);
interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const storedTime = await AsyncStorage.getItem("timer");
      if (storedTime) {
        setTimeLeft(Number(storedTime));
      }
    })();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          AsyncStorage.setItem("timer", String(newTime));
          return newTime;
        });
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      AsyncStorage.removeItem("timer");
    }
  }, [timeLeft]);

  const startTimer = () => {
    setTimeLeft(600); // 10 minutes
  };

  const resetTimer = () => {
    setTimeLeft(0);
    AsyncStorage.removeItem("timer");
  };

  return (
    <TimerContext.Provider value={{ timeLeft, startTimer, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};
