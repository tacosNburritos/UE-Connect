import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Svg, { Line } from 'react-native-svg';

function MapScreen({ route, navigation }) {
  const { path, buildingCoordinates } = route.params || { path: [], buildingCoordinates: {} };

  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });

  const handleGoBack = () => {
    navigation.goBack();
  };

  // Reference dimensions (original image size used for coordinates)
  const referenceWidth = 800;  // Example width of the original image
  const referenceHeight = 800; // Example height of the original image

  // Scale coordinates to match the actual displayed image size
  const scaleX = imageSize.width / referenceWidth;
  const scaleY = imageSize.height / referenceHeight;

  return (
    <View style={styles.container}>

      <View
        style={styles.mapContainer}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setImageSize({ width, height });
        }}
      >
        {/* Campus Map Image */}
        <Image source={require('../images/EN1STFLR.png')} style={styles.map} />

        {/* SVG Overlay for Drawing Paths */}
        <Svg style={StyleSheet.absoluteFill}>
          {path.map((location, index) => {
            if (index === path.length - 1) return null;
            const start = buildingCoordinates[path[index]];
            const end = buildingCoordinates[path[index + 1]];

            return (
              <Line
                key={index}
                x1={start.x * scaleX}
                y1={start.y * scaleY}
                x2={end.x * scaleX}
                y2={end.y * scaleY}
                stroke="red"
                strokeWidth="4"
              />
            );
          })}
        </Svg>

        {/* Render path nodes on the map */}
        {path.map((location, index) => {
          const point = buildingCoordinates[location];
          return (
            <View
              key={index}
              style={[
                styles.point,
                { left: point.x * scaleX - 5, top: point.y * scaleY - 5 },
              ]}
            >
              <Text style={styles.pointLabel}>{location}</Text>
            </View>
          );
        })}
      </View>

      {/* Go Back Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button1} onPress={handleGoBack}>
          <Text style={styles.buttonText1}>Go Back</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mapContainer: {
    width: '90%',
    height: 700,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  point: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 15,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointLabel: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 25,
    width: '50%',
  },
  button1: {
    width: '47%',
    height: 50,
    backgroundColor: '#DF4242',
    borderRadius: 30,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText1: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MapScreen;
