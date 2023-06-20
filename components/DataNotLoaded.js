import { Button, Text } from "react-native"

export default function DataNotLoaded(props){
    return(
        <>
            <Text>Quel temps il fait ?</Text>
            <Button
                title='Mais Théo ?!'
                onPress={props.method}
            />
        </>
    )
}