import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import {Alert, Linking, Pressable, StyleSheet, View } from "react-native";
import AppNavigator from '../navigation/Navigator';



export default function CardBox(props:any) {

    const newData = props.props
    const handlePress = async()=>{
            // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(newData.url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(newData.url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${newData.url}`);
    }
    }
  return (
    <Pressable onPress={handlePress}>


<View  style={styles.chipItem} >
<Card  >
  <Card.Cover source={{ uri: newData?.urlToImage }} />
  <Card.Content>
    <Text variant="titleMedium">{newData?.title}</Text>
    <Text variant="bodyMedium">{newData?.description?.substring(0,300)}...</Text>
  </Card.Content>
</Card>

</View>
</Pressable>
  )
}


const styles = StyleSheet.create({
    chipItem: {
      marginHorizontal: 5,
      marginVertical: 5,
    },
  });
