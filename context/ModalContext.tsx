import React, { createContext, ReactNode, useState } from "react";
import { Modal, View, Button } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/types/themeTypes";
import AppIcon from "@/components/AppIcon";
interface ModalContextProps {
  isModalOpen: boolean;
  modalContent: ReactNode;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const theme = useTheme() as AppTheme;

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, modalContent, openModal, closeModal }}>
      {children}
      {isModalOpen && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalOpen}
          onRequestClose={closeModal}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              paddingVertical: 40,
              alignItems: "center",
              backgroundColor: theme.colors.modalBackground,
            }}>
            <View
              style={{
                width: "auto",
                alignSelf: "flex-end",
                paddingEnd: 10,
              }}>
              <AppIcon size={36} name="close" onPress={closeModal} />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                paddingVertical: 40,
                alignItems: "center",
                width: "100%",
              }}>
              {modalContent}
            </View>
          </View>
        </Modal>
      )}
    </ModalContext.Provider>
  );
};
