import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SectionList, SafeAreaView, TextInput, TouchableOpacity, Modal, Button } from "react-native";
import HeaderWithTitle from "@/components/headers/Header";
import addCar from "@/service/hooks/addCar";
import getCars from "@/service/hooks/getCars";
import deleteCars from "@/service/hooks/deleteCar";
import organizeCarsIntoSections from "@/service/carsService";
import { FontAwesome, AntDesign  } from '@expo/vector-icons';
import FormInput from "@/components/form/FormInput";
import FormButton from "@/components/form/FormButton";
import FormButtonCancel from "@/components/form/FormButtonCancel";
import FormButtonCreate from "@/components/form/FormButtonCreate";


export default function index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cars, setCars] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newCar, setNewCar] = useState<Omit<Cars, 'id'>>({ brand: '', price: '', model: '', year: '' });

  const onChangeSearch = (query: any) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await getCars();
        setCars(carsData);
      } catch (error) {
        console.error("Failed to fetch cars data:", error);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteCars(id);
      setCars(cars.filter((car) => car.id !== id));
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  const handleAddCar = async () => {
    try {
      await addCar(newCar);
      setModalVisible(false);
      setNewCar({ brand: '', price: '', model: '', year: '' });
      const carsData = await getCars();
      setCars(carsData);
    } catch (error) {
      console.error("Failed to add car:", error);
    }
  };

  return (
    <View style={styles.view}>
      <HeaderWithTitle title="TopCar" actionSheetOptions={['Cancel', 'About', 'Logout']} HideThisPage={false} />

      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Cade..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          placeholderTextColor="black"
        />

        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <AntDesign name="pluscircle" size={50} color="green" />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <FormInput
              label="Marca"
              value={newCar.brand}
              onChangeText={(text) => setNewCar({ ...newCar, brand: text })}
            />
            <FormInput
              label="Modelo"
              value={newCar.model}
              onChangeText={(text) => setNewCar({ ...newCar, model: text })}
            />
            <FormInput
              label="Preço (Mil / BRL)"
              value={newCar.price}
              onChangeText={(text) => setNewCar({ ...newCar, price: text })}
            />
            <FormInput
              label="Ano fabricação"
              value={newCar.year.toString()}
              onChangeText={(text) => setNewCar({ ...newCar, year: text })}
              keyboardType="numeric"
            />

            <FormButtonCreate title="Add Car" onPress={handleAddCar} />
            <FormButtonCancel title="Cancel" onPress={() => setModalVisible(false)} />

          </View>
        </Modal>

        <SectionList
          sections={organizeCarsIntoSections(cars).filter((data) => data.title.toUpperCase().includes(searchQuery.toUpperCase()))}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.model}>{item.model}</Text>
              <Text style={styles.carPrice}>{item.price},000R$</Text>
              <Text style={styles.year}>{item.year}</Text>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <FontAwesome name="trash" size={15} color="red" />
              </TouchableOpacity>
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
    backgroundColor: 'white',
  },
  view: {
    backgroundColor: 'white',
  },
  searchBar: {
    padding: 10,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 5,
    color: "black",
    borderWidth: 1,
    borderColor: "gray",
  },
  item: {
    alignItems: "center"
  },
  header: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    padding: 20
  },
  model: {
    fontSize: 30,
    textAlign: "center",
  },
  carPrice: {
    fontSize: 20,
    textAlign: "center",
    color: "lightgreen",
    fontWeight: "bold"
  },
  year: {
    fontSize: 12,
    textAlign: "center",
    color: "gray",
  },
  carId: {
    fontSize: 10,
    textAlign: "center",
    color: "lightgray",
  },
  deleteButton: {
    color: 'red',
  },
  addButton: {
    marginTop: 15,
    alignSelf: "center"
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'white',
    padding: 35,
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});
