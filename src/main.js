import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import firebaseConfig from './config/firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/messaging'



Vue.use(Vuetify)


Vue.config.productionTip = false



const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
db.settings({
  timestampsInSnapshots: true
})

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();
// Create a storage reference from our storage service
var storageRef = storage.ref();

// присваиваем глобальной переменной $storageRef на уровне Vue ссылку на хранилище storage
Vue.$storageRef = storageRef
// присваиваем глобальной переменной $db на уровне Vue ссылку на базу данных db
Vue.$db = db

new Vue({
  vuetify : new Vuetify(),
  router,
  store,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
     this.$store.dispatch('STATE_CHANGED', user)
    });

    // загрузка питомцев из БД
    this.$store.dispatch('LOAD_PETS')

     // слушатель на измененния в БД 
    firebase.firestore().collection("pets").onSnapshot( () => {
      this.$store.dispatch('LOAD_PETS')
      }, (error) => {
      console.log('Error to update data from database: ', error);
    });


  }
}).$mount('#app')


