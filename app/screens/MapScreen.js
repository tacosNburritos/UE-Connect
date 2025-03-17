import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Svg, { Line } from 'react-native-svg';

function MapScreen({ route, navigation }) {
  const { path, buildingCoordinates } = route.params || { path: [], buildingCoordinates: {} };

  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });

  const handleGoBack = () => {
    navigation.goBack();
  };

  // Function to scale coordinates relative to the actual image size
  const getScaledCoordinates = (point) => {
    return {
      x: point.x * imageSize.width,  // Directly scale using percentage-based values
      y: point.y * imageSize.height,
    };
  };

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
            const start = getScaledCoordinates(buildingCoordinates[path[index]]);
            const end = getScaledCoordinates(buildingCoordinates[path[index + 1]]);
            if (!start || !end) return null;

            return (
              <Line
                key={index}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="red"
                strokeWidth="4"
              />
            );
          })}
        </Svg>

        {/* Render path nodes on the map */}
        {path.map((location, index) => {
          const point = getScaledCoordinates(buildingCoordinates[location]);
          if (!point) return null;

          return (
            <View
              key={index}
              style={[
                styles.point,
                { left: point.x - 5, top: point.y - 5 },
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
  mapContainer: {
    width: '90%',
    height: '90%', // Make it flexible for different screens
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
    fontSize: 10, // Adjusted for better visibility
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
    opacity: 0.8,
  },
  buttonText1: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MapScreen;
