// Book.vue
// (Родительский элемент) Площадка для отображения подробной информации из PetDetails.vue
<template>
  <v-container grid-list-md >
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1> 
        <create-pet-detales ></create-pet-detales>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1> 
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import DeletePetDetales  from '../components/DeletePetDetales'
import CreatePetDetales from '../components/CreatePetDetails.vue'
export default {
  components: {
    CreatePetDetales
    }
}
</script>

<style>

</style>