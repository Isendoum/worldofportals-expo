import React, { createContext, useContext, useState } from "react";
import { Creature } from "@/game/classes/classes";

const MapBattleContext = createContext<
  [Creature | null, (monster: Creature | null) => void]
>([null, () => {}]);

export const usePickedMonster = () => {
  return useContext(MapBattleContext);
};

export const MapBattleProvider: React.FC<any> = ({ children }) => {
  const [monster, setMonster] = useState<Creature | null>(null);

  // Load the saved PlayerCharacter from AsyncStorage when the app starts

  return (
    <MapBattleContext.Provider value={[monster, setMonster]}>
      {children}
    </MapBattleContext.Provider>
  );
};
