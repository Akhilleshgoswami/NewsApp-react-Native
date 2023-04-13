import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";

const NewsOverview = (props:any) => {
  const pramasData = props.route.params
  return (
    
    
    <ScrollView style={styles.chipItem}>

        {/* <Card.Cover source={{ uri: pramasData.urlToImage }} /> */}
      
      <Text variant="bodyMedium">{pramasData?.description}</Text>
    </ScrollView>


  );
};

export default NewsOverview;

const styles = StyleSheet.create({
  chipItem: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  container: {
    flex: 1,
  },
});
