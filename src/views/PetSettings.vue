// Book.vue
// (Родительский элемент) Площадка для отображения подробной информации из PetDetails.vue
<template>
  <v-container grid-list-md v-if="dog">
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1> 
        <pet-settings :dog="dog"></pet-settings>
      </v-flex>
      <!-- <v-flex xs12 sm10 offset-sm1> 
      </v-flex> -->
    </v-layout>
  </v-container>
</template>

<script>
import PetSettings from '../components/PetSettingDetails'
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    dog() {
      return this.$store.getters.getDogs.find(d => d.id == this.id)
    }
  },
  components: {
    PetSettings
    }
}
</script>

<style>

</style>