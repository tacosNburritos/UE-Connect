import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Modal,
  Dimensions,
  ScrollView,
} from "react-native";

function WelcomeScreen({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [showOutlines, setShowOutlines] = useState(true); // toggle for button visibility

  const buildings = [
    {
      id: 1,
      name: "Tan Yan Kee Academic Building",
      top: "34%",
      left: "3%",
      width: "22%",
      height: "28%",
      description: "Houses classrooms and laboratories for various programs.",
  
    },
    {
      id: 2,
      name: "College of Engineering",
      top: "78%",
      left: "10%",
      width: "80%",
      height: "10%",
      description:
        "Main building for engineering students, containing classrooms and laboratories.",

    },
    {
      id: 3,
      name: "Dr. Lucio C. Tan Building",
      top: "50%",
      right: "2%",
      width: "19%",
      height: "25%",
      description: "Academic building used by business and IT students.",

    },
    {
      id: 4,
      name: "Old Academic Building",
      top: "31%",
      right: "3%",
      width: "12%",
      height: "16%",
      description:
        "One of the oldest structures on campus, used for various classes.",
    },
    {
      id: 5,
      name: "HRM MOCK HOTEL",
      top: "63%",
      left: "3%",
      width: "13%",
      height: "10%",
      description:
        "One of the oldest structures on campus, used for various classes.",
    },
    {
      id: 6,
      name: "GYM",
      top: "14%",
      left: "15%",
      width: "30%",
      height: "5%",
      description:
        "One of the oldest structures on campus, used for various classes.",
    },
      {
      id: 7,
      name: "Administration Building",
      top: "24%",
      left: "16%",
      width: "25%",
      height: "10%",
      description:
        "One of the oldest structures on campus, used for various classes.\nrewrbniwebr",
    },
  ];

  const handleBuildingPress = (building) => {
    setSelectedBuilding(building);
  };

  const handleCloseModal = () => {
    setSelectedBuilding(null);
  };

  const handlePathPress = () => {
    navigation.navigate("PathFind");
  };

  const handleToggle3DPress = () => {
    navigation.navigate("WelcomeScreen3D");
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
     <View style={styles.mapContainer}>
  {/* Background map image */}
  <Image
    source={require("../images/background v2.png")}
    style={styles.mapImage}
    resizeMode="cover"
  />

  {/* Building buttons overlay */}
  {buildings.map((building) => (
    <TouchableOpacity
      key={building.id}
      style={[
        styles.buildingButton,
        {
          top: building.top,
          left: building.left,
          right: building.right,
          width: building.width,
          height: building.height,
          backgroundColor: showOutlines
            ? "rgba(255, 0, 0, 0.3)"
            : "transparent",
          borderWidth: showOutlines ? 1 : 0,
          borderColor: showOutlines ? "red" : "transparent",
        },
      ]}
      onPress={() => handleBuildingPress(building)}
    />
  ))}
</View>

      <View style={styles.imageContainer}>
        <Image
          source={require("../images/background v2.png")}
          style={styles.placeholder}
          resizeMode="cover"
        />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/LOGO 2 white no text.png")}
          style={styles.logo_header}
        />
        <Text style={styles.text}>Kadima</Text>
      </View>

      {/* Toggle outlines for testing */}
      <TouchableOpacity
        onPress={() => setShowOutlines(!showOutlines)}
        style={styles.toggleOutlineButton}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {showOutlines ? "Hide" : "Show"} Buttons
        </Text>
      </TouchableOpacity>

      {/* Building buttons */}
      {buildings.map((building) => (
        <TouchableOpacity
          key={building.id}
          style={[
            styles.buildingButton,
            {
              top: building.top,
              left: building.left,
              right: building.right,
              width: building.width,
              height: building.height,
              backgroundColor: showOutlines
                ? "rgba(255, 0, 0, 0.3)"
                : "transparent",
              borderWidth: showOutlines ? 1 : 0,
              borderColor: showOutlines ? "red" : "transparent",
            },
          ]}
          onPress={() => handleBuildingPress(building)}
        />
      ))}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button1} onPress={handlePathPress}>
          <Text style={styles.buttonText}>Find Path</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button1} onPress={handleToggle3DPress}>
          <Text style={styles.buttonText}>Toggle 3D</Text>
        </TouchableOpacity>
      </View>

      {/* Building Modal */}
      <Modal
        visible={!!selectedBuilding}
        transparent={true}
        animationType="none"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
              {selectedBuilding && (
                <>
                  <Text style={styles.modalTitle}>{selectedBuilding.name}</Text>
                  <Image
                    source={selectedBuilding.image}
                    style={styles.modalImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.modalDescription}>
                    {selectedBuilding.description}
                  </Text>
                </>
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  placeholder: {
    width: "100%",
    height: "100%",
  },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 120,
    backgroundColor: "#b51509",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "row",
    paddingStart: 20,
    paddingBottom: 10,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  logo_header: {
    width: 50,
    height: 50,
    marginEnd: 10,
  },
  text: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "left",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 50,
    width: "90%",
    alignSelf: "center",
  },
  button1: {
    width: "47%",
    height: 60,
    backgroundColor: "#b51509",
    borderRadius: 30,
    left: 7,
    elevation: 5,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  toggleOutlineButton: {
    position: "absolute",
    top: 130,
    right: 15,
    backgroundColor: "#b51509",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    zIndex: 10,
  },
  buildingButton: {
    position: "absolute",
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#b51509",
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: "#b51509",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  mapContainer: {
  position: "absolute",
  top: 120, // right below header
  left: 0,
  right: 0,
  bottom: 0,
},
mapImage: {
  width: "100%",
  height: "100%",
  position: "absolute",
},

});

export default WelcomeScreen;
