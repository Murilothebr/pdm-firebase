import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SectionList, SafeAreaView, TextInput, TouchableOpacity, Modal, FlatList, Image } from "react-native";
import HeaderWithTitle from "@/components/headers/Header";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import FormInput from "@/components/form/FormInput";
import FormButtonCancel from "@/components/form/FormButtonCancel";
import FormButtonCreate from "@/components/form/FormButtonCreate";
import getPets from "@/service_/hooks/getPets";
import deletePets from "@/service_/hooks/deletePet";
import updatePet from "@/service_/hooks/editPet";
import addPet from "@/service_/hooks/addPet";

export default function CarListScreen() {
  const [pets, setPets] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newPet, setNewPet] = useState({ name: '', age: '', gender: '' });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentPet, setCurrentPet] = useState({ id: null, name: '', age: '', gender: ''});

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsData = await getPets();
        setPets(petsData);
      } catch (error) {
        console.error("Failed to fetch pets data:", error);
      }
    };

    fetchPets();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deletePets(id);
      setPets(pets.filter((pet) => pet.id !== id));
    } catch (error) {
      console.error("Failed to delete pet:", error);
    }
  };

  const handleAddPet = async () => {
    try {
      await addPet(newPet);
      setModalVisible(false);
      setNewPet({ name: '', age: '', gender: ''})
      const petsData = await getPets();
      setPets(petsData)
    } catch (error) {
      console.error("Failed to add pet:", error);
    }
  };

  const handleEditPet = async () => {
    try {
      if (currentPet.id) {
        await updatePet(currentPet);
        setModalVisible(false);
        setCurrentPet({ id: null, name: '', age: '', gender: ''});
        const petsData = await getPets();
        setPets(petsData);
      }
    } catch (error) {
      console.error("Failed to edit pet:", error);
    }
  };

  const openAddModal = () => {
    setNewPet({ age: '', name: '', gender: '' });
    setEditMode(false);
    setModalVisible(true);
  };

  const openEditModal = (pet: Pets) => {
    setCurrentPet(pet);
    setEditMode(true);
    setModalVisible(true);
  };

  return (
    <View style={styles.view}>
      <HeaderWithTitle title="Pet Shoppe" actionSheetOptions={['Cancel', 'About', 'Logout']} HideThisPage={false} />

      <Image
            source={{ uri: "https://i.pinimg.com/736x/79/2e/a4/792ea40494b7d47ab0a5692a67123ffc.jpg" }}
            style={styles.logo}
          />

      <SafeAreaView style={styles.container}>
        
        <TouchableOpacity onPress={openAddModal} style={styles.addButton}>
          <AntDesign name="upcircle" size={50} color="blue" />
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

          <Image
            source={{ uri: "https://i.pinimg.com/736x/79/2e/a4/792ea40494b7d47ab0a5692a67123ffc.jpg" }}
            style={styles.logo}
          />
            <FormInput
              label="Nome"
              value={editMode ? currentPet.name : newPet.name}
              onChangeText={(text) => editMode ? setCurrentPet({ ...currentPet, name: text }) : setNewPet({ ...newPet, name: text })}
            />
            <FormInput
              label="Idade"
              value={editMode ? currentPet.age : newPet.age}
              onChangeText={(text) => editMode ? setCurrentPet({ ...currentPet, age: text }) : setNewPet({ ...newPet, age: text })}
            />
            <FormInput
              label="Genero"
              value={editMode ? currentPet.gender : newPet.gender}
              onChangeText={(text) => editMode ? setCurrentPet({ ...currentPet, gender: text }) : setNewPet({ ...newPet, gender: text })}
            />          

            <FormButtonCreate title={editMode ? "Edit Pet" : "Add Car"} onPress={editMode ? handleEditPet : handleAddPet} />
            <FormButtonCancel title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </Modal>

        <FlatList
          data={pets}
          renderItem={({ item }) => 
            item.header ? (
              <Text style={styles.header}>{item.name}</Text>
            ) : (
              <View style={styles.item}>
                <Text style={styles.model}>{item.name} {item.age}</Text>
                <Text style={styles.petAge}>{item.gender}</Text>
                <View style= {styles.icons}>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <FontAwesome name="trash-o" size={15} color="gray" style={{ marginRight: 20 }} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openEditModal(item)} >
                    <FontAwesome name="pencil-square" size={15} color="blue"/>
                  </TouchableOpacity>
                </View>
                
              </View>
            )
          }
          keyExtractor={(item) => item.header ? item.title : item.id.toString()}
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
  logo: {
    width: 200,
    height: 150,
    alignSelf: "center",
  },
  item: {
    alignItems: "center",
  },
  header: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    padding: 20,
  },
  model: {
    fontSize: 30,
    textAlign: "center",
  },
  petAge: {
    fontSize: 20,
    textAlign: "center",
    color: "lightgreen",
    fontWeight: "bold",
  },
  year: {
    fontSize: 12,
    textAlign: "center",
    color: "gray",
  },
  deleteButton: {
    color: 'red',
  },
  addButton: {
    marginTop: 15,
    alignSelf: "center",
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
  },
  editButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  icons:{
    flexDirection: 'row',
    padding: 5,
  }
});