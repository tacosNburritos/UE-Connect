import React, { useRef, useEffect, useState } from "react";
import {
  View,
  PanResponder,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator, // ✅ loader spinner
} from "react-native";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import * as THREE from "three";
import { Asset } from "expo-asset";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function WelcomeScreen3D({ navigation }) {
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);

  const lastPan = useRef({ x: 0, y: 0 });
  const rotation = useRef({ yaw: 0, pitch: 0 });
  const boundsRef = useRef(null);
  const collidablesRef = useRef([]);
  const cloudsRef = useRef([]);

  // loading state
  const [isLoading, setIsLoading] = useState(true);

  const HEIGHT_OFFSET = 150;
  const ZOOM_BACK = 0;

  const ROT_SPEED = 0.0003;
  const MOVE_STEP = 2;
  const BOUNDS_PADDING = 10;

  useEffect(() => {
    lastPan.current = { x: 0, y: 0 };
  }, []);

  const clampCameraToBounds = (camera) => {
    if (!boundsRef.current) return;
    const { min, max } = boundsRef.current;

    camera.position.x = Math.max(min.x, Math.min(max.x, camera.position.x));
    camera.position.y = Math.max(min.y, Math.min(max.y, camera.position.y));
    camera.position.z = Math.max(min.z, Math.min(max.z, camera.position.z));
  };

  const checkCollision = (camera, direction, distance = 2) => {
    if (!collidablesRef.current.length) return false;
    const raycaster = new THREE.Raycaster();
    raycaster.set(camera.position, direction.normalize());
    const intersects = raycaster.intersectObjects(collidablesRef.current, true);
    return intersects.length > 0 && intersects[0].distance < distance;
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const camera = cameraRef.current;
        if (!camera) return;

        const touches = gestureState.numberActiveTouches;

        if (touches === 1) {
          rotation.current.yaw -= gestureState.dx * ROT_SPEED;
          rotation.current.pitch -= gestureState.dy * ROT_SPEED;

          rotation.current.pitch = Math.max(
            -Math.PI / 2,
            Math.min(Math.PI / 2, rotation.current.pitch)
          );

          camera.rotation.order = "YXZ";
          camera.rotation.y = rotation.current.yaw;
          camera.rotation.x = rotation.current.pitch;
        } else if (touches === 2) {
          const forward = new THREE.Vector3();
          camera.getWorldDirection(forward).normalize();
          if (!checkCollision(camera, forward, MOVE_STEP + 2)) {
            camera.position.addScaledVector(forward, MOVE_STEP);
            clampCameraToBounds(camera);
          }
        }
      },
      onPanResponderRelease: () => {
        lastPan.current = { x: 0, y: 0 };
      },
    })
  ).current;

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000);
    cameraRef.current = camera;

    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const sun = new THREE.DirectionalLight(0xffffff, 0.8);
    sun.position.set(2000, 3000, 1500);
    scene.add(sun);

    // Sky
    const skyGeo = new THREE.SphereGeometry(5000, 32, 32);
    const skyMat = new THREE.MeshBasicMaterial({ color: 0x87ceeb, side: THREE.BackSide });
    scene.add(new THREE.Mesh(skyGeo, skyMat));

    // Clouds (omitted here for brevity but same as before)

    // Load GLB
    const asset = Asset.fromModule(require("../assets/models/new campus.glb"));
    await asset.downloadAsync();

    const loader = new GLTFLoader();
    loader.load(
      asset.localUri || asset.uri,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(2, 2, 2);
        scene.add(model);

        model.updateWorldMatrix(true, true);

        const collidableMeshes = [];
        model.traverse((child) => {
          if (child.isMesh) {
            collidableMeshes.push(child);
            child.material.side = THREE.DoubleSide;
          }
        });
        collidablesRef.current = collidableMeshes;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const paddedMin = box.min.clone().addScalar(-BOUNDS_PADDING);
        const paddedMax = box.max.clone().addScalar(BOUNDS_PADDING);
        boundsRef.current = { min: paddedMin, max: paddedMax };

        // ✅ Force initial camera placement + render
        camera.position.set(center.x, center.y + HEIGHT_OFFSET, center.z);
        camera.lookAt(center.x, box.min.y, center.z);
        renderer.render(scene, camera);
        gl.endFrameEXP();

        // ✅ Remove loading screen
        setIsLoading(false);
      },
      undefined,
      (error) => console.error(error)
    );

    const clock = new THREE.Clock();

    const render = () => {
      requestAnimationFrame(render);

      const t = clock.getElapsedTime();

      // Animate clouds
      cloudsRef.current.forEach((group) => {
        const { speed, wobblePhase, baseY } = group.userData;
        group.position.x += speed;
        if (group.position.x > 5000) group.position.x = -5000;
        group.position.y = baseY + Math.sin(t * 0.4 + wobblePhase) * 12;
        group.rotation.y += 0.00035;
      });

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
    
  };

  const handlePathPress = () => {
    navigation.navigate("PathFind");
  };

  const handleRoamPress = () => {
    navigation.navigate("LoginScreen");
  };

  const handleToggle2DPress = () => {
    navigation.navigate("Main");
  };

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />

      {/* === 3D Background === */}
      <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />

      {/* ✅ Loading overlay */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#b51509" />
          <Text style={{ color: "#b51509", marginTop: 10, fontWeight: "bold" }}>Loading Campus...</Text>
        </View>
      )}

      {/* === Overlay UI === */}
      <View style={styles.header}>
        <Image
          source={require("../assets/ue_logo.png")}
          style={styles.logo_header}
        />
        <Text style={styles.text}>UE Connect</Text>
      </View>

      {/* === Toggle 2D Bar === */}
      <View style={styles.toggleBar}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={handleToggle2DPress}
        >
          <Text style={styles.toggleButtonText}>Toggle 2D</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button1} onPress={handlePathPress}>
          <Text style={styles.buttonText}>Find Path</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button1} onPress={handleRoamPress}>
          <Text style={styles.buttonText}>Admin Panel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button1: {
    width: "47%",
    height: 60,
    backgroundColor: "#b51509",
    borderRadius: 30,
    left: 7,
    elevation: 6,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.55)",
  },
  text: {
    color: "white",
    fontSize: 30,
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
  buttonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 14,
  },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 123,
    backgroundColor: "#b51509",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "row",
    paddingStart: 20,
    paddingBottom: 10,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    elevation: 6,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.55)",
  },
  logo_header: {
    width: 50,
    height: 50,
    marginEnd: 10,
  },
  toggleBar: {
    position: "absolute",
    top: 120,
    right: 0,
    width: "100%",
    paddingVertical: 10,
    alignItems: "flex-end",
    paddingRight: 15,
  },
  toggleButton: {
    backgroundColor: "white",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  toggleButtonText: {
    color: "#b51509",
    fontWeight: "bold",
    fontSize: 14,
  },

  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  }
});

export default WelcomeScreen3D;