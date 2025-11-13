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
        if (selectedBuilding && [1, 2, 7].includes(selectedBuilding.id)) {
          if (gestureState.dx < -20) {
            // swipe left → next page
            setModalPage((prev) => Math.min(prev + 1, 3));
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
      description:
        "The Tan Yan Kee Academic Building primarily accommodates Business Administration and Fine Arts students. It also hosts several General Education classes and lecture halls, making it one of the most frequently used academic buildings on campus.",
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
      description:
        "The Dr. Lucio C. Tan Building is where most Senior High School (K–12) classes are held. It offers a well-equipped environment tailored for academic preparation and extracurricular learning among younger students.",
      image: require("../images/LCT.jpg"),
    },
    {
      id: 4,
      name: "Old Academic Building",
      top: "31%",
      right: "3%",
      width: "12%",
      height: "16%",
      description: "One of the oldest structures on campus, used for various classes.",
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
      description:'',
       
      image: require("../images/OJT.jpg"),
    },
    {
      id: 8,
      name: "Old Elementary Building",
      top: "18%",
      right: "10%",
      width: "19%",
      height: "7%",
      description: "What was once a building dedicated for elementary students is now an old building used for various administrative purposes.",
      image: require("../images/ELEM.jpg"),
    },
  ];

  const handleBuildingPress = (building) => {
    setSelectedBuilding(building);
    if ([1, 2, 7].includes(building.id)) setModalPage(1); // reset to first page
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
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View style={styles.mapContainer}>
        <Image source={require("../images/background v2.png")} style={styles.mapImage} resizeMode="cover" />
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
                backgroundColor: "rgba(255,255,255,0.3)",
                borderWidth: showOutlines ? 1 : 0,
                borderColor: showOutlines ? "white" : "transparent",
                opacity: fadeAnim,
              },
            ]}
          >
            <TouchableOpacity style={{ flex: 1 }} onPress={() => handleBuildingPress(building)} />
          </Animated.View>
        ))}
      </View>

      <View style={styles.imageContainer}>
        <Image source={require("../images/background v2.png")} style={styles.placeholder} resizeMode="cover" />
      </View>

      <View style={styles.header}>
        <Image source={require("../assets/LOGO 2 white no text.png")} style={styles.logo_header} />
        <Text style={styles.text}>Kadima</Text>
      </View>

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
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderColor: showOutlines ? "white" : "transparent",
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableOpacity style={{ flex: 1 }} onPress={() => handleBuildingPress(building)} />
        </Animated.View>
      ))}

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
          onPress={handleCloseModal}
          {...panResponder.panHandlers}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
              {selectedBuilding && (
                <>
                  {/* MULTI-PAGE MODALS */}
                  {selectedBuilding.id === 7 && (
                    <>
                    {/* PANG ADMIN TOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO */}
                      {/* Logic*/}
                      {modalPage === 1 && (
                        <>
                          <Text style={styles.modalTitle}>{selectedBuilding.name}</Text>
                          <Image
                            source={require("../images/ADMIN.jpg")}
                            style={[styles.modalImage, { marginTop: 10 }]}
                            resizeMode="cover"
                          />
                          <Text style={styles.modalDescription}>
                            Here lies the cashier office that handles tuition and fee payments. Manages student records and enrollment.
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
                          <Text style={styles.modalTitle}>Admissions Office</Text>
                          <Text style={styles.modalDescription}>
                            
                            Oversees the application and admission process for new students.
                          </Text>
                          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalPage(1)}>
                              <Text style={styles.closeButtonText}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalPage(3)}>
                              <Text style={styles.closeButtonText}>Next</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                      {modalPage === 3 && (
                        <>
                          <Image
                            source={require("../images/DRRM Office.jpg")}
                            style={[styles.modalImage, { marginTop: 0 }]}
                            resizeMode="cover"
                          />
                          <Text style={styles.modalTitle}>DRRM Office</Text>
                          <Text style={styles.modalDescription}>
                            Holds the records of students' diplomas and certificates.
                          </Text>
                          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalPage(2)}>
                              <Text style={styles.closeButtonText}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalPage(4)}>
                              <Text style={styles.closeButtonText}>Next</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                       {modalPage === 4 && (
                        <>
                          <Image
                            source={require("../images/COMP.jpg")}
                            style={[styles.modalImage, { marginTop: 0 }]}
                            resizeMode="cover"
                          />
                          <Text style={styles.modalTitle}>Comptroller's Department</Text>
                          <Text style={styles.modalDescription}>
                            Manages the university's financial operations and budgeting.
                          </Text>
                          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalPage(3)}>
                              <Text style={styles.closeButtonText}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalPage(5)}>
                              <Text style={styles.closeButtonText}>Next</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                      {modalPage === 5 && (
                        <>
                          <Image
                            source={require("../images/OJT.jpg")}
                            style={[styles.modalImage, { marginTop: 10 }]}
                            resizeMode="cover"
                          />
                          <Text style={styles.modalTitle}>OJT & Job Placement Office</Text>
                          <Text style={styles.modalDescription}>
                            Coordinates on-the-job training programs for students.
                          </Text>
                          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalPage(4)}>
                              <Text style={styles.closeButtonText}>Back</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                    </>
                  )}
                   {selectedBuilding.id === 4 && (
                    <>
                    {/* PANG OLD ACAD*/}
                      {/* Logic*/}
                      {modalPage === 1 && (
                        <>
                          <Text style={styles.modalTitle}>{selectedBuilding.name}</Text>
                          <Image
                            source={require("../images/OLDACAD.jpg")}
                            style={[styles.modalImage, { marginTop: 10 }]}
                            resizeMode="cover"
                          />
                          <Text style={styles.modalDescription}>
                            Here lies the cashier office that handles tuition and fee payments. Manages student records and enrollment.
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
                            source={require("../images/SAO.jpg")}
                            style={[styles.modalImage, { marginTop: 10 }]}
                            resizeMode="cover"
                          />
                          <Text style={styles.modalTitle}>Student Affair Office</Text>
                          <Text style={styles.modalDescription}>
                            This office is responsible for student welfare, activities, and support services.
                          </Text>
                          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalPage(1)}>
                              <Text style={styles.closeButtonText}>Back</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                    </>
                  )}

                  {/* TAN YAN KEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */}
                  {selectedBuilding.id === 1 && (
                    <>
                      {modalPage === 1 && (
                        <>
                          <Text style={styles.modalTitle}>{selectedBuilding.name}</Text>
                          <Image
                            source={require("../images/tyk.jpg")}
                            style={styles.modalImage}
                            resizeMode="cover"
                          />
                          <Text style={styles.modalDescription}>
                            The Tan Yan Kee Building features lecture halls, art related class, and classrooms used for general education.
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
                            source={require("../images/CAS FACULTY.jpg")}
                            style={styles.modalImage}
                            resizeMode="cover"
                          />
                          <Text style={styles.modalTitle}>CAS Faculty</Text>
                          <Text style={styles.modalDescription}>
                            Located in TYK 4TH FLOOR, where all the College of Arts and Sciences faculty professors are located and have their offices.
                          </Text>
                         <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalPage(1)}>
                              <Text style={styles.closeButtonText}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalPage(3)}>
                              <Text style={styles.closeButtonText}>Next</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                       {modalPage === 3 && (
                        <>
                          <Image
                            source={require("../images/ART GALLERY.jpg")}
                            style={styles.modalImage}
                            resizeMode="cover"
                          />
                          <Text style={styles.modalTitle}>TYK Art Gallery</Text>
                          <Text style={styles.modalDescription}>
                            Located in TYK 5TH FLOOR, where students' artworks are displayed and exhibited.
                          </Text>
                         <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalPage(2)}>
                              <Text style={styles.closeButtonText}>Back</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                    </>
                  )}

                  {/* ENGINEERINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG */}
                  {selectedBuilding.id === 2 && (
                    <>
                      {modalPage === 1 && (
                        <>
                          <Text style={styles.modalTitle}>{selectedBuilding.name}</Text>
                          <Image
                            source={require("../images/EN.jpg")}
                            style={styles.modalImage}
                            resizeMode="cover"
                          />
                          <Text style={styles.modalDescription}>
                            The College of Engineering building hosts laboratories and classrooms for all Engineering programs.
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
                            source={require("../images/CLR.jpg")}
                            style={styles.modalImage}
                            resizeMode="cover"
                          />
                          <Text style={styles.modalTitle}>Computer Laboratories</Text>
                          <Text style={styles.modalDescription}>
                            Includes advanced facilities for computer, electrical, and mechanical engineering students.
                          </Text>
                         <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalPage(1)}>
                              <Text style={styles.closeButtonText}>Back</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                    </>
                  )}

                  {/* DEFAULT SINGLE PAGE */}
                  {[3, 5, 6, 8].includes(selectedBuilding.id) && (
                    <>
                      <Text style={styles.modalTitle}>{selectedBuilding.name}</Text>
                      <Image
                        source={selectedBuilding.image}
                        style={styles.modalImage}
                        resizeMode="cover"
                      />
                      <Text style={styles.modalDescription}>{selectedBuilding.description}</Text>
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
  background: { flex: 1 },
  imageContainer: { flex: 1 },
  placeholder: { width: "100%", height: "100%" },
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
  logo_header: { width: 50, height: 50, marginEnd: 10 },
  text: { color: "white", fontSize: 40, fontWeight: "bold", textAlign: "left" },
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
  buttonText: { color: "white", fontSize: 25, fontWeight: "bold", textAlign: "center" },
  buildingButton: { position: "absolute", borderRadius: 10 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: { backgroundColor: "white", borderRadius: 20, padding: 20, width: "90%", alignItems: "center" },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10, color: "#b51509" },
  modalImage: { width: "100%", height: 200, borderRadius: 10, marginBottom: 15 },
  modalDescription: { fontSize: 16, textAlign: "justify", marginBottom: 15 },
  closeButton: { backgroundColor: "#b51509", borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20 },
  closeButtonText: { color: "white", fontWeight: "bold" },
  mapContainer: { position: "absolute", top: 120, left: 0, right: 0, bottom: 0 },
  mapImage: { width: "100%", height: "100%", position: "absolute" },
});

export default WelcomeScreen;
