//  у автора BookList
<template>
  <v-container class="grey lighten-3" fluid>
    
    <!-- фильтр-поиск -->
    <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
      <v-container fluid>
        <v-row no-gutters justify="space-between">

           <v-flex xs4 md2 >
              <v-row  justify="space-between">
                <v-flex xs5 md5 >
                  <!-- <v-select label="Питомец:" :items="animals" v-model="searchAnimal" multiple></v-select> -->
                  <v-checkbox append-icon="mdi mdi-dog"  v-model="searchAnimal" value="собака" dense></v-checkbox>
                </v-flex>
                <v-flex xs5 md5>
                  <v-checkbox append-icon="mdi mdi-cat" v-model="searchAnimal" value="кот" dense></v-checkbox>
                </v-flex>
              </v-row>
          </v-flex>

          <v-flex xs6 md2>
            <v-select label="Пол:" :items="genders" v-model="searchGender" multiple></v-select>
          </v-flex>

          <v-flex xs12 md7>
            <v-text-field label="Поиск по описанию:" v-model="searchTerm"></v-text-field>
          </v-flex>

          <v-btn 
            v-if="isUserAuthentificated"
            :to="{name:'createpet'}"
            fixed
            top-1
            right
            fab
            dark
            large
            color="purple"
            class="mr-3"
          > 
            <v-icon dark size="40">mdi mdi-plus</v-icon>
          </v-btn>

        </v-row>

         <!-- <v-btn 
            v-if="isUserAuthentificated"
            :to="{name:'createpet'}"
            fixed
            top-20px
            right-120px
            fab
            dark
            large
            color="purple"
          > 
            <v-icon dark>mdi mdi-plus</v-icon>
          </v-btn> -->
          
      </v-container>
    </v-flex>
    
    <!-- Блоки с животными -->
    <v-flex xs12 sm10 md10 offset-sm1 offset-md1>
      <v-row>
        <v-col
          v-for="dog in filteredDogs" 
          :key="dog.id"  
          color="teal lighten-2"
          cols="12"
          md="3"
          xs="12" 
          sm="6"
        >

        <!-- запрос информации из DogListItem.vue  для заполнения  карточек -->
          <dog :dog="dog"></dog>

        </v-col>
      </v-row>
    </v-flex>
  </v-container>
</template>

<script>
import Dog from './DogsListItem' 
export default {
  data() {
    return {
      searchTerm: null,
      searchGender: [],
      genders: ['мальчик', 'девочка'],
      searchAnimal: [],
      animals: ['кот', 'собака']
    }
  },
  computed: {
    dogs() {
      return this.$store.getters.getDogs
    },
    filteredDogs() {
      let dogs = this.dogs
      if (this.searchTerm) 
        dogs = dogs.filter(d => 
          d.nickname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0
          || d.description.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0)

      if (this.searchGender.length) 
        dogs = dogs.filter(d => this.searchGender.filter(val => d.gender.indexOf(val) !== -1).length > 0)

      if (this.searchAnimal.length) 
        dogs = dogs.filter(d => this.searchAnimal.filter(val => d.animal.indexOf(val) !== -1).length > 0)

      
      return dogs
    },
    isUserAuthentificated() {
        return this.$store.getters.isUserAuthentificated
     }
  }, 
  components: {
    // подключение компонента DogListItem.vue для заполнения  карточек 
    Dog
  }
}
</script>

<style scoped>
#animalCard {
  /* min-height: 350px; */
  color: royalblue 
}

/* кнопка на карточке на весь контейнер */
.v-card__actions {
  padding: 0px;
}

/* отступ слева от фото */
.v-application .ml-1 {
  margin-left: -1px!important;
}

/* отображение текста в карточке не шире 3-х строк + ... */
#subtitleText {
  height: calc(24px * 2); /* не стал писать 75px, чтобы показать, что максимум по высоте на 3 строки выделяю блок */
  padding-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  line-height: 20px; /* каждая строка будет по высоте 25px, чтобы я точно мог установить высоту блока (это чисто визуально, ни на что не влияет) */
  display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>
