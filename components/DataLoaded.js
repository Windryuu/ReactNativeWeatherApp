import { Image, StyleSheet, Text, View } from "react-native";

export default function DataLoaded(props){
    return(
        <View style={styles.dataloaded}>
            <Text style={styles.citytext}>{props.datas.city.name}</Text> 
            <Text style={styles.datetext}>Aujourd'hui à {props.datas.list[0].dt_txt.slice(11,13)}h</Text>
            
            <Image
              style={styles.image}
              source={{uri:'https://openweathermap.org/img/wn/'+ props.datas.list[0].weather[0].icon + '.png'}}
            />
            <Text style={styles.temperaturetext}>{props.datas.list[0].main.temp} °C </Text>
            <Text style={styles.descriptiontext}>{props.datas.list[0].weather[0].description.charAt(0).toUpperCase() + props.datas.list[0].weather[0].description.slice(1)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    dataloaded: {
        alignItems: 'center'
    },
    image: {
      justifyContent: 'center',
      height:150,
      width:150,
      backgroundColor:'#cac4c4a1',
      borderRadius: 35
    },
    temperaturetext: {
      fontSize: 40,
      fontWeight: 'bold'
    },
    descriptiontext: {
      fontSize: 20,
      paddingBottom: 20
    },
    citytext: {
      fontSize: 40,
      fontWeight: 'bold'
    },
    datetext: {
      fontSize: 18,
    },
    daytext: {
      paddingTop: 15
    }
  });