import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, PanResponder, Dimensions } from 'react-native';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { useGLTF } from '@react-three/drei';
// import * as THREE from 'three';
// import { Asset } from 'expo-asset';

// Joystick Component
function Joystick({ onMove }) {
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const maxDelta = 75;
      const x = Math.max(-maxDelta, Math.min(maxDelta, gestureState.dx));
      const y = Math.max(-maxDelta, Math.min(maxDelta, gestureState.dy));
      onMove({ x, y });
    },
    onPanResponderRelease: () => {
      onMove({ x: 0, y: 0 });
    },
  });

  return (
    <View style={styles.joystickContainer} {...panResponder.panHandlers}>
      <View style={styles.joystick} />
    </View>
  );
}

// FPV Camera Controls
function FPVControls({ velocity, rotation }) {
  const { camera } = useThree();
  const speed = 3;
  const damping = 0.97;
  const maxVelocity = 0.6;
  const groundLevel = 1.5;

  useFrame(() => {
    velocity.current.x *= damping;
    velocity.current.z *= damping;

    if (Math.abs(velocity.current.x) < 0.001) velocity.current.x = 0;
    if (Math.abs(velocity.current.z) < 0.001) velocity.current.z = 0;

    velocity.current.x = Math.max(-maxVelocity, Math.min(maxVelocity, velocity.current.x));
    velocity.current.z = Math.max(-maxVelocity, Math.min(maxVelocity, velocity.current.z));

    const forward = new THREE.Vector3();
    const sideways = new THREE.Vector3();

    camera.getWorldDirection(forward);
    sideways.copy(forward).cross(camera.up);

    forward.multiplyScalar(velocity.current.z * speed);
    sideways.multiplyScalar(velocity.current.x * speed);

    camera.position.add(forward);
    camera.position.add(sideways);

    camera.position.y = groundLevel;

    const yaw = rotation.current.yaw || 0;
    const pitch = rotation.current.pitch || 0;

    const quaternion = new THREE.Quaternion();
    const yawQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
    const pitchQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), pitch);

    quaternion.multiplyQuaternions(yawQuaternion, pitchQuaternion);
    camera.quaternion.multiply(quaternion);

    camera.up.set(0, 1, 0);
    camera.lookAt(new THREE.Vector3().addVectors(camera.position, camera.getWorldDirection(new THREE.Vector3())));
  });

  return null;
}

// Model Component (Offline support using expo-asset)
function Model({ file }) {
  const [uri, setUri] = useState(null);

  useEffect(() => {
    const asset = Asset.fromModule(file);
    if (asset.localUri) {
      setUri(asset.localUri);
    } else {
      asset.downloadAsync().then(() => {
        setUri(asset.localUri);
      });
    }
  }, [file]);

  if (!uri) return null;

  const { scene } = useGLTF(uri);
  scene.scale.set(0.5, 0.5, 0.5);
  return <primitive object={scene} />;
}

// Camera Rotation Controls
function CameraRotationControls({ onRotate }) {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, gestureState) => {
        const screenHeight = Dimensions.get('window').height;
        const screenWidth = Dimensions.get('window').width;

        const cameraBounds = {
          left: 0,
          right: screenWidth,
          bottom: screenHeight / 3,
          top: 0,
        };

        return (
          gestureState.x0 >= cameraBounds.left &&
          gestureState.x0 <= cameraBounds.right &&
          gestureState.y0 >= cameraBounds.top &&
          gestureState.y0 <= cameraBounds.bottom
        );
      },
      onPanResponderGrant: () => {
        onRotate({ yaw: 0, pitch: 0 });
      },
      onPanResponderMove: (_, gestureState) => {
        const sensitivity = 0.001;
        const deltaX = gestureState.dx * sensitivity;
        const deltaY = gestureState.dy * sensitivity;

        const movementThreshold = 0.005;
        const clampedYaw = Math.abs(deltaX) > movementThreshold ? deltaX : 0;
        const clampedPitch = Math.abs(deltaY) > movementThreshold ? deltaY : 0;

        const clampedPitchValue = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, clampedPitch));

        onRotate({ yaw: clampedYaw, pitch: clampedPitchValue });
      },
      onPanResponderRelease: () => {
        onRotate({ yaw: 0, pitch: 0 });
      },
    })
  ).current;

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: Dimensions.get('window').height / 3,
      }}
      {...panResponder.panHandlers}
    />
  );
}

// Main Screen
export default function HomeScreen() {
  const velocity = useRef({ x: 0, z: 0 });
  const rotation = useRef({ yaw: 0, pitch: 0 });

  const handleJoystickMove = ({ x, y }) => {
    const maxDelta = 75;
    velocity.current.x = Math.max(-1, Math.min(1, x / maxDelta));
    velocity.current.z = Math.max(-1, Math.min(1, -y / maxDelta));
  };

  const handleCameraRotation = ({ yaw, pitch }) => {
    rotation.current.yaw = yaw;
    rotation.current.pitch = pitch;
  };

  return (
    <View style={{ flex: 1 }}>
      <Canvas camera={{ position: [0, 1.5, 5] }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />

        {/* Offline-loaded model */}
        <Model file={require('../assets/models/text_test2.glb')} />

        {/* Controls */}
        <FPVControls velocity={velocity} rotation={rotation} />
      </Canvas>

      <Joystick onMove={handleJoystickMove} />
      <CameraRotationControls onRotate={handleCameraRotation} />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  joystickContainer: {
    width: 150,
    height: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -75 }],
  },
  joystick: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
  },
});
