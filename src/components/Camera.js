import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function CameraComp() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const [change,setChange] =useState(true)
  const [images , setImages]=useState([])
  
  if (!permission) {
    requestPermission()
  }

  if (!permission?.granted) {
    return <Text>You didn't allow Camera</Text>
  }

  function toggleCameraFacing() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePicture = async () => {
      if (cameraRef.current) {
        try {
          const photo = await cameraRef.current.takePictureAsync();
          console.log(photo, 'photo');
          setImages(prevImages => [...prevImages, photo.uri]);
          setChange(false)
        } catch (error) {
          console.error('Error taking picture:', error);
        }
      } else {
        console.log('Camera reference is null');
      }
  };
  // console.log(images,"IMAGS");
  
    
  return (
  
    <View style={styles.container}>
      {change ?
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>

             <MaterialCommunityIcons name="camera-iris" size={60} color="red" />
          </TouchableOpacity>
        </View>
      </Camera>
      :
      
      <View>
       <View >
      {images.map((uri, index) => (
        <View key={index} >
          <View>
            <Image source={{ uri }}  width={100} height={100}/>
            
          </View>
          <View>
            <Text>Image {index + 1}</Text> 
          </View>
        </View>
      ))}
    </View>
                <View>
        <TouchableOpacity  onPress={()=> setChange(true)}>
  
          <MaterialIcons name="add" size={40} color="white" />
<Text>BACK TO CAM</Text>          
        </TouchableOpacity>
        </View>
        </View>
   
}
    </View>
  );
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1
    },
    camera: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 100,
        height: 100
    }
 }); 



