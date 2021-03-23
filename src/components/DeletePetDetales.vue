// удаление выбранного питомца (админ)
<template>
  <v-form>
    <v-container fluid>

      <v-flex xs12 sm12 md12 >
        <v-card elevation="0">
          <v-card-title class="blue-grey--text text-md-h4 text-sm-h5 text-xs-h6 font-weight-bold ">
            Удалить питомца
          </v-card-title>
        </v-card>
      </v-flex>

      <v-container fluid class="mb-3">
        <v-img :src="image" max-height="500" contain></v-img>
      </v-container>

      <v-text-field
        v-model="nickname"
        filled
        label="Кличка"
        type="text"
        disabled
      ></v-text-field>

      <v-textarea
        v-model="description"
        rows="4"
        filled
        auto-grow
        label="Дополнительная информация"
        type="text"
        disabled
      ></v-textarea>

      <v-text-field
        v-model="age"
        filled
        label="Возраст"
        type="text"
        disabled
      ></v-text-field>

      <v-row no-gutters justify="space-between">
        <v-radio-group :value="`${animal}`" row v-model="animal" disabled>
          <v-radio value="собака">
            <template v-slot:label>
              <v-icon>mdi mdi-dog</v-icon>
            </template>
          </v-radio>
          <v-radio value="кот">
            <template v-slot:label>
              <v-icon>mdi mdi-cat</v-icon>
            </template>
          </v-radio>
        </v-radio-group>

        <v-radio-group :value="`${gender}`" row v-model="gender" disabled>
          <v-radio value="мальчик">
            <template v-slot:label>
              <v-icon>mdi mdi-gender-male</v-icon>
            </template>
          </v-radio>
          <v-radio value="девочка">
            <template v-slot:label>
              <v-icon>mdi mdi-gender-female</v-icon>
            </template>
          </v-radio>
        </v-radio-group>

        <!-- <v-btn @click="deletePet"  class="mt-5">Удалить</v-btn> -->
      </v-row>
      <v-row>
        <v-btn 
          @click="goBack"
          class="mx-4 mt-3 pr-2 text-subtitle-1"
          color="error"
          width="152px"
          dark
        >Отменить<v-icon size="25" class="ml-2 ">mdi mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn 
          @click="deletePet"
          class="mx-4 mt-3 pr-2  text-subtitle-1"
          color="success"
          width="152px"
          dark
          >Удалить<v-icon size="25" class="ml-2 pb-1">mdi mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
// import firebase from "firebase/app";
import Vue from "vue";
export default {
  data() {
    return {
      id: this.dog.id,
      imageName: this.dog.imageName,
      image: this.dog.image,
      nickname: this.dog.nickname,
      description: this.dog.description,
      age: this.dog.age,
      animal: this.dog.animal,
      gender: this.dog.gender,
    };
  },

  computed: {},

  methods: {
    // удаление данных из БД
    deletePet() {
      // удаление старой фото из базы
      this.deletePetPhoto()
      // Delete existing document in collection "pets" by ID
      let db = Vue.$db.collection("pets").doc(this.id);
      db.delete().then(() => {
        console.log("Document successfully deleted!");
        // переход на страницку с питомцами
        
        // this.$router.push("/dogs").catch(()=>{});
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
      this.goBack()
    },

    // удаление старой фото из базы
    deletePetPhoto() {
      let ref = Vue.$storageRef.child("images/" + this.imageName);
      // Delete the file
      ref
        .delete()
        .then(() => {
          console.log("File deleted successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // return to the previous scroll location
    goBack() {
      window.history.back()
    }
  },

  props: {
    dog: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>