import React, { useState } from "react";
import { View, Text, StyleSheet, SectionList, SafeAreaView, TextInput } from "react-native";
import { Colors } from "@/consts/colors";
import HeaderWithTitle from "@/components/headers/Header";
import DATA, { organizeCarsIntoSections } from "@/services/data";

export default function index() {
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: any) => {
    setSearchQuery(query);
  };

  return (
    <View>
      <HeaderWithTitle title="TopCar" actionSheetOptions={['Cancel', 'About', 'Logout']} HideThisPage={false} />

      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Cade..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          placeholderTextColor="black"
        />

        <SectionList
          sections={organizeCarsIntoSections(DATA).filter((data) => data.title.toUpperCase().includes(searchQuery.toUpperCase()))}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.model}>{item.model}</Text>
              <Text style={styles.year}>{item.year}</Text>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  searchBar: {
    padding: 10,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 5,
    color: "black",
    borderWidth: 1, // Add border width
    borderColor: "gray", // Add border color
  },
  item: {
    padding: 30,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
  },
  model: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  year: {
    fontSize: 12,
    textAlign: "center",
    color: "gray",
  },
});
