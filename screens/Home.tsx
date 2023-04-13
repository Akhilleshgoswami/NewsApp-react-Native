import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Appbar, Chip } from "react-native-paper";
import CardBox from "../componenets/Card";
// https://newsdata.io/api/1/news?apikey=pub_20444d73aade1c6a87a505f1a5b735c41151c
const categories = [
  "Business",
  "Entertainment",
  "General",
  "Health",
  "Science",
  "Sports",
  "Technology",
];
const APIKEY = "cbc0b24852b34d4996cf1ebf4f0a52e2";
export default function Home(props:any) {
  const [selectedCategories, setselectedCategories] = useState("Technology");
  const [newsData, setNewsData] = useState();
  const [loading, setLoading] = useState(false);
  const handleSelcet = async (categorie: string) => {
    await getNews(categorie);
    setselectedCategories(categorie);
  };

  const getNews = async (categorie: string) => {
    setLoading(true)
    try {
      fetch(
        `https://newsapi.org/v2/top-headlines?country=in&category=${categorie }&apiKey=${APIKEY}&pageSize=${"50"}`
      )
        .then((response) => response.json())
        .then((data) => {
          setNewsData(data?.articles);
          setLoading(false)
        })
        .catch((error) => {
          setLoading(false)
          console.error(error);
        });

    } catch (error) {
      setLoading(false)
      console.log(error);
    }

  };
useEffect(() => {
  getNews(selectedCategories)
}, [])

  const handleSelceted = (categorie: string) => {
    return selectedCategories === categorie ? true : false;
 
  };
  return (

    <View style={styles.container}>
  
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Home" />
        <Appbar.Action icon="calendar" onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <View style={styles.filtersContainer}>
        {categories.map((categorie) => (
          <Chip
            key={categorie}
            mode="outlined"
            style={styles.chipItem}
            textStyle={{ fontWeight: "400", color: "white", padding: 1 }}
            showSelectedOverlay
            selected={handleSelceted(categorie)}
            onPress={() => handleSelcet(categorie)}
          >
            {categorie}
          </Chip>
        ))}
          
      </View>
      {
              loading ? 
               <ActivityIndicator style={styles.center} size="learge" color="black" /> :  <ScrollView>{newsData?.map((news:Object) => 
                <CardBox 
                navigation= {props.navigation}
                props={news}/>
          
                
                )}</ScrollView>
            }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  chipItem: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  center:{
    alignItems:"center"
  }
});
