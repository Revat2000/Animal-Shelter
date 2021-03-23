// BookDetails
// структура элементов для отражения подробной информации о выбранном питомце на Pets.vue
<template>
  <v-card id="animalCard" height="auto" width="auto" elevation="3">
    <v-img :src="dog.image" aspect-ratio="1.5" max-height="600" contain></v-img>

    <v-flex xs12 sm12 md12>
      <v-row no-gutters>
        <v-flex xs10 sm10 md10>
          <v-card-title v-text="dog.nickname" class="headline"></v-card-title>
        </v-flex>
        <v-flex xs1 sm2 md2>
          <v-avatar
            class="mt-4"
            size="35"
             :color="dog.gender == 'мальчик' ? 'blue lighten-2' : ''
                    || dog.gender == 'девочка' ? 'pink lighten-3' : ''"
          >
            <v-icon dark size="1.3em" v-html="dog.genderIcon"></v-icon>
          </v-avatar>
        </v-flex>
      </v-row>
    </v-flex>

    <v-card-subtitle class="mx-1 font-weight-bold">
      <v-label>
        {{ dog.description }}
      </v-label>
    </v-card-subtitle>

    <!-- <v-divider role="presentation" class="mx-3"></v-divider> -->

    <v-card-text>
      <v-row class="ml-1">
        <v-label> Возраст: {{ dog.age }} </v-label>
      </v-row>
    </v-card-text>

    <v-divider role="presentation" class="mx-3"></v-divider>

    <v-flex xs12 sm10 md10 offset-sm1>
      <v-card elevation="0" class="headline"
    
    >
        <v-card-title class="pb-1 pt-3 " > Связаться с нами можно по телефонам: </v-card-title>
        <v-divider role="presentation" class="mx-3"></v-divider>
        <v-timeline align-center dense>
          <v-timeline-item
            v-for="(item, i) in items"
            :key="i"
            :color="item.color"
            :icon="item.icon"
          

          >
            <v-card :color="item.color" dark height="100%" width="80%">
              <v-row class="py-0">
                <v-flex xs12 sm10 md4 offset-sm1 offset-md1>
                  <v-card-title class="subtitle-1 py-0">
                    {{ item.name }}
                  </v-card-title>
                </v-flex>
                <v-flex xs12 sm10 md4 offset-sm1 offset-md2>
                  <v-card-title class="subtitle-1 py-0">
                    {{ item.phone }}
                  </v-card-title>
                </v-flex>
              </v-row>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-card>
    </v-flex>

    <v-card-actions class="teal lighten-2">
      <v-row no-gutters justify="space-between">
        <v-spacer></v-spacer>
        <v-btn
          class="teal lighten-2"
          dark
          elevation="0"
          height="40px"
          width="100%"
          @click="goBack"
        >
          <v-icon color="white" large>mdi mdi-arrow-left-bold</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-row>
    </v-card-actions>
  </v-card>
</template>


<script>
export default {
  props: {
    dog: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    items: [
      {
        name: "Вероника",
        color: "red lighten-2",
        icon: "mdi-star",
        phone: "+375 33 646-90-67",
      },
      {
        name: "Наталья Ивановна",
        color: "indigo",
        icon: "mdi-book-variant",
        phone: "+375 33 679-83-10",
      },
      {
        name: "Елена",
        color: "green lighten-1",
        icon: "mdi-airballoon",
        phone: "+375 29 292-40-42",
      },
      // {
      //   name: 'Вероника',
      //   color: 'purple darken-1',
      //   icon: 'mdi-buffer',
      //   phone: '+375 33 646-90-67'
      // },
    ],
  }),

  methods: {
    goBack() {
      window.history.back()
    }
  }
};
</script>

<style scoped>
#animalCard {
  /* min-height: 350px; */
  color: royalblue;
}
</style>