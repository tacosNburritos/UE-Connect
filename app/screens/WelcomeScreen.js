import React, { useState, useEffect, useRef } from "react";
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
  Animated,
  PanResponder,
} from "react-native";

function WelcomeScreen({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [showOutlines, setShowOutlines] = useState(true); // toggle for button visibility
  const [modalPage, setModalPage] = useState(1); // For multi-page modal (ID 7)

  // Blinking animation
  const fadeAnim = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  // PanResponder for swipe gesture (for two-page modal)
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (selectedBuilding && selectedBuilding.id === 7) {
          if (gestureState.dx < -20) {
            // swipe left → next page
            setModalPage((prev) => Math.min(prev + 1, 2));
          } else if (gestureState.dx > 20) {
            // swipe right → previous page
            setModalPage((prev) => Math.max(prev - 1, 1));
          }
        }
      },
    })
  ).current;

  const buildings = [
    {
      id: 1,
      name: "Tan Yan Kee Building",
      top: "34%",
      left: "3%",
      width: "22%",
      height: "28%",
      description: "The Tan Yan Kee Academic Building primarily accommodates Business Administration and Fine Arts students. It also hosts several General Education classes and lecture halls, making it one of the most frequently used academic buildings on campus.",
      image: require("../images/tyk.jpg"),
    },
    {
      id: 2,
      name: "College of Engineering",
      top: "78%",
      left: "10%",
      width: "80%",
      height: "10%",
      description:
        "This building serves as the central hub for all Engineering programs and computer-related courses. It features multiple laboratories, classrooms, and project spaces designed to support technical learning and hands-on innovation.",
        image: require("../images/EN.jpg"),
    },
    {
      id: 3,
      name: "Dr. Lucio C. Tan Building",
      top: "50%",
      right: "2%",
      width: "19%",
      height: "25%",
      description: "The Dr. Lucio C. Tan Building is where most Senior High School (K–12) classes are held. It offers a well-equipped environment tailored for academic preparation and extracurricular learning among younger students.",
      image: require("../images/LCT.jpg"),
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
        image: require("../images/OLDACAD.jpg"),
    },
    {
      id: 5,
      name: "HRM MOCK HOTEL",
      top: "63%",
      left: "3%",
      width: "13%",
      height: "10%",
      description:
        "This building caters to Hospitality Management students, featuring specialized rooms and facilities for culinary arts and Home Economics. It also includes the Mock Hotel, where students gain hands-on experience in hotel and restaurant operations",
        image: require("../images/HRM.jpg"),
    },
    {
      id: 6,
      name: "GYM",
      top: "14%",
      left: "15%",
      width: "30%",
      height: "5%",
      description:
        "The University Gymnasium serves as a venue for Physical Education classes, sports practices, and major school events. It provides space for both academic and recreational activities, fostering health and wellness within the student community.",
        image: require("../images/GYM.jpg"),
    },
    {
      id: 7,
      name: "Administration Building",
      top: "24%",
      left: "16%",
      width: "25%",
      height: "10%",
      description:
        "The Administration Building houses is the main point of contact for inquiries, containing the following offices:\n\nCASHIER: Handles tuition and fee payments. Manages student records and enrollment.\n\nADMISSIONS: Oversees the application and admission process for new students.\n\nOJT OFFICE: Coordinates on-the-job training programs for students.",
        image: require("../images/OJT.jpg"),
    },
  ];

  const handleBuildingPress = (building) => {
    setSelectedBuilding(building);
    if (building.id === 7) setModalPage(1); // reset to first page
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
    <Animated.View
      key={building.id}
      style={[
        styles.buildingButton,
        {
          top: building.top,
          left: building.left,
          right: building.right,
          width: building.width,
          height: building.height,
          backgroundColor: "rgba(255,255,255,0.3)", // transparent white
          borderWidth: showOutlines ? 1 : 0,
          borderColor: showOutlines ? "white" : "transparent",
          opacity: fadeAnim, // blinking
        },
      ]}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => handleBuildingPress(building)}
      />
    </Animated.View>
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

  

      {/* Building buttons */}
      {buildings.map((building) => (
        <Animated.View
          key={building.id + "_duplicate"}
          style={[
            styles.buildingButton,
            {
              top: building.top,
              left: building.left,
              right: building.right,
              width: building.width,
              height: building.height,
              backgroundColor: "rgba(255, 255, 255, 0.21)", // transparent white
              borderColor: showOutlines ? "white" : "transparent",
              opacity: fadeAnim, // blinking
            },
          ]}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => handleBuildingPress(building)}
          />
        </Animated.View>
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
  animationType="fade"
  onRequestClose={handleCloseModal}
>
  <TouchableOpacity
    activeOpacity={1}
    style={styles.modalOverlay}
    onPress={handleCloseModal} //  tap outside to close
    {...panResponder.panHandlers}
  >
    <TouchableOpacity
      activeOpacity={1}
      style={styles.modalContent}
      onPress={(e) => e.stopPropagation()} // prevent closing when tapping inside modal
    >
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {selectedBuilding && (
          <>
            {selectedBuilding.id === 7 ? (
              <>
                {modalPage === 1 && (
                  <>
                    <Text style={styles.modalTitle}>{selectedBuilding.name}</Text>
                    <Image
                      source={require("../images/ADMIN.jpg")}
                      style={[styles.modalImage, { marginTop: 10 }]}
                      resizeMode="cover"
                    />
                    <Text style={styles.modalDescription}>
                      The Administration Building houses is the main point of contact for inquiries, containing different sorts of offices.
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", width: "80%" }}>
                      <TouchableOpacity
                        style={[styles.closeButton, { marginTop: 10 }]}
                        onPress={() => setModalPage(2)}
                      >
                        <Text style={styles.closeButtonText}>Next</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                {modalPage === 2 && (
                  <>
                    <Image
                      source={require("../images/ADMISSION.jpg")}
                      style={[styles.modalImage, { marginTop: 0 }]}
                      resizeMode="cover"
                    />
                    <Text style={styles.modalTitle}>{selectedBuilding.name}</Text>
                    <Text style={styles.modalDescription}>
                      CASHIER: Handles tuition and fee payments. Manages student records and enrollment.
                      {"\n\n"}
                      ADMISSIONS: Oversees the application and admission process for new students.
                    </Text>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalPage(1)}
                      >
                        <Text style={styles.closeButtonText}>Back</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalPage(3)}
                      >
                        <Text style={styles.closeButtonText}>Next</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                {modalPage === 3 && (
                  <>
                    <Image
                      source={require("../images/OJT.jpg")}
                      style={[styles.modalImage, { marginTop: 10 }]}
                      resizeMode="cover"
                    />
                    <Text style={styles.modalTitle}>{selectedBuilding.name}</Text>
                    <Text style={styles.modalDescription}>
                      OJT OFFICE: Coordinates on-the-job training programs for students.
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalPage(2)}
                      >
                        <Text style={styles.closeButtonText}>Back</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </>
            ) : (
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
          </>
        )}
      </ScrollView>
    </TouchableOpacity>
  </TouchableOpacity>
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
    textAlign: "justify",
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
