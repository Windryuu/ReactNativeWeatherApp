import React, { useState, useEffect } from 'react';
import { Platform, View, StyleSheet, ImageBackground, Button, ActivityIndicator } from 'react-native';

import * as Location from 'expo-location';
import axios from 'axios';
import DataNotLoaded from './components/DataNotLoaded';
import ScrolledView from './components/ScrolledView';
import DataLoaded from './components/DataLoaded';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [data,setData] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'IOS') {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  async function fetchWeatherApi(location){
    weatherUrl='https://api.openweathermap.org/data/2.5/forecast?lat='+location.coords.latitude+'&lon='+location.coords.longitude+'&lang=fr&units=metric&appid=fe15b043f8750eff8eca663f0b86a299'
    setIsLoading(true)
    const {data} = await axios.get(weatherUrl).catch(()=>(console.error(error)));
    setIsLoading(false);
    setData(data);
    return data;
  }
  
  function getDay(timecode){
    date = new Date(timecode*1000);
    let ddd = date.toString();
    return ddd.slice(0,10);
  }

  return (
    <ImageBackground source={require('./assets/defaultbg.jpg')} resizeMode='cover' style={styles.bgimage}>
      <View style={styles.container}>
        {data ?
        <>
          <DataLoaded datas={data}/>
          <ScrolledView datas={data}/>
          <Button
            color="#841584"
            title='Refresh data'
            onPress={()=>{fetchWeatherApi(location)}}
          />
        </>  
        :
        <DataNotLoaded method={()=>fetchWeatherApi(location)}/>
        }
        <ActivityIndicator size="small" color="#0000ff" animating={isLoading}/>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 40,
  },
  bgimage: {
    flex: 1
  },
});

