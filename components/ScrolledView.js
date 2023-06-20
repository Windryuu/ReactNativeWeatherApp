import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

function getDay(timecode){
    date = new Date(timecode*1000)
    let ddd = date.toString();
    return ddd.slice(0,10);
  }

export default function ScrolledView(props){
    return(
    <ScrollView horizontal={true}>
    {props.datas.list.map(
        t => 
        <View style={styles.swview}>
            <Text style={styles.daytext}>{getDay(t.dt)}</Text>
            <Text>{t.dt_txt.slice(11,13)}h</Text>
            <Image
            style={styles.swimage}
            source={{uri:'https://openweathermap.org/img/wn/'+ t.weather[0].icon + '.png'}}
            />
            <Text>{t.main.temp}°C</Text>
        </View>
        )}
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    swview: {
      alignItems: 'center',
      marginHorizontal: 15,
      height: 135,
      backgroundColor: '#FFFFFF44',
      marginBottom: 20,
      borderRadius: 30,
      width: 80
    },
    swimage: {
      height: 50,
      width: 50
    },
    daytext: {
        paddingTop: 15
    }
});