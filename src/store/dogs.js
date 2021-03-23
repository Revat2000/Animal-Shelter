// у автора это books.js
import Vue from 'vue'

export default {
  state: {
    pets: [],
  },
  mutations: {
    SET_DOGS(state, payload){
      state.pets = payload
    }
  },
  actions: {
    // загрузка питомцев из БД
    LOAD_PETS({commit}) {
      // Vue.$db.collection("pets").get()
      Vue.$db.collection("pets").orderBy("timestamp", "desc").get()
      .then((querySnapshot) => {
        let pets = []
        querySnapshot.forEach(s=> {
          const data = s.data()
          let pet = {
            id: s.id,
            imageName: data.imageName,
            image: data.image,
            nickname: data.nickname,
            description: data.description,
            age: data.age,
            genderIcon: data.genderIcon,
            gender: data.gender.slice(),
            animal: data.animal.slice(),
          }

          pets.push(pet)
        });

        commit('SET_DOGS', pets)
      })
      .catch(error => console.log(error))
    }
  },
  getters: {
    getDogs: (state) => state.pets
  }
}