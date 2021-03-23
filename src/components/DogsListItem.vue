// у автора BookListItem
// информация для карточек с животными
<template>
  <v-lazy
    v-model="isActive"
    :options="{threshold: .5}"
    min-height="220"
    transition="fade-transition"
  >

    <v-card
      :to="{ name: 'pets', params: { id: dog.id } }"
      id="animalCard"
      height="100%"
      width="auto"
      elevation="3"
    >
      <v-img class="ml-1" :src="dog.image" height="250" width="auto"></v-img>

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

      <v-card-subtitle id="subtitleText">
        <v-label>
          {{ dog.description }}
        </v-label>
      </v-card-subtitle>

      <v-divider class="mx-3" ></v-divider>

      <v-card-text >
        <v-row class="ml-1">
          <v-label class="age_label" > Возраст: {{ dog.age }} </v-label>
        </v-row>
      </v-card-text>

      <v-btn
        v-if="isUserAuthentificated"
        :to="{ name: 'petsettings', params: { id: dog.id } }"
        class="ml-3 mb-3"
        fab
        dark
        small
        color="green"
      >
        <v-icon dark>mdi mdi-pencil</v-icon>
      </v-btn>

      <v-btn
        v-if="isUserAuthentificated"
        :to="{ name: 'deletepet', params: { id: dog.id } }"
        class="ml-2 mb-3"
        fab
        dark
        small
        color="red"
      >
        <v-icon dark>mdi mdi-trash-can-outline</v-icon>
      </v-btn>

    </v-card>
  </v-lazy>
</template>

<script>
export default {
  data: () => ({
      isActive: false,
    }),
  props: {
    dog: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isUserAuthentificated() {
      return this.$store.getters.isUserAuthentificated;
    },
  },
};
</script>

<style scoped>
#animalCard {
  /* min-height: 350px; */
  color: royalblue;
}

/* кнопка на карточке на весь контейнер */
.v-card__actions {
  padding: 0px;
}

/* отступ слева от фото */
.v-application .ml-1 {
  margin-left: -1px !important;
}

/* отображение текста в карточке не шире 3-х строк + ... */
#subtitleText {
  height: calc(
    24px * 2
  ); /* не стал писать 75px, чтобы показать, что максимум по высоте на 3 строки выделяю блок */
  padding-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  line-height: 20px; /* каждая строка будет по высоте 25px, чтобы я точно мог установить высоту блока (это чисто визуально, ни на что не влияет) */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* #nicknameText {
    font-size: 100vh;
    line-height: 100vh;
} */
</style>