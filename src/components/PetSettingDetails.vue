// 
// структура элементов для отражения и настройки информации о выбранном питомце для админа
<template>
  <v-form>
    <v-container fluid>

      <v-flex xs12 sm12 md12 >
        <v-card elevation="0">
          <v-card-title class="blue-grey--text text-md-h4 text-sm-h5 text-xs-h6 font-weight-bold ">
            Редактировать данные питомца
          </v-card-title>
        </v-card>
      </v-flex>

      <handy-uploader
        :documentAttachment.sync="handyAttachments"
        :fileUploaderType="'thumbnail'"
        :fileAccept="'image/png,image/gif,image/jpeg,image/webp'"
        :maxFileSize="3000"
        :imageCompressor="true"
        :imageCompressLevel="0.5"
        :maxFileCount="1"
        :badgeCounter="false"
        :thumb="false"
        :changeFileName="true"
        :addFileDescription="true"
        :addFileTag="false"
      >
      </handy-uploader>

      <!-- <v-container fluid>
        <v-img 
          :src="url" 
          max-height="500"           
          contain>
        </v-img>
      </v-container>

      <v-file-input 
        @change="Preview_image"
        v-model="image"
        filled
        prepend-icon="mdi-camera"
        clear-icon="mdi-close-circle"
        show-size
        accept="image/*"
        label="Загрузить фото"
      ></v-file-input> -->

      <v-container fluid class="mb-3">
        <v-img :src="image" max-height="500" contain></v-img>
      </v-container>

      <v-text-field
        v-model="nickname"
        filled
        clearable
        clear-icon="mdi-close-circle"
        counter="15"
        hint="Не более 15 символов"
        label="Кличка"
        type="text"
      ></v-text-field>

      <v-textarea
        v-model="description"
        rows="4"
        filled
        counter="500"
        hint="Не более 500 символов"
        clearable
        auto-grow
        clear-icon="mdi-close-circle"
        label="Дополнительная информация"
        type="text"
      ></v-textarea>
      <!-- :rules="rulesAge" -->
      <v-text-field
        v-model="age"
        counter="15"
        hint="Не более 15 символов"
        filled
        clearable
        clear-icon="mdi-close-circle"
        label="Возраст"
        type="text"
      ></v-text-field>

      <v-row no-gutters justify="space-between">


        <v-radio-group :value="`${animal}`" row v-model="animal">
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
        

        <v-radio-group :value="`${gender}`" row v-model="gender">
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
      </v-row>

       <v-progress-linear
        class="my-2"
        v-if="progress > 0"
        v-model="progress"
        height="25"
      >
      <strong>{{ Math.ceil(progress) }}%</strong>
      </v-progress-linear>  

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
          @click="loadNewImage"
          class="mx-4 mt-3 pr-2  text-subtitle-1"
          color="success"
          width="152px"
          dark
          >Сохранить<v-icon size="25" class="ml-2 pb-1">mdi mdi-check</v-icon>
        </v-btn>
      </v-row>
    </v-container>

    <!-- <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="message"
            :append-icon="marker ? 'mdi-map-marker' : 'mdi-map-marker-off'"
            :append-outer-icon="message ? 'mdi-send' : 'mdi-microphone'"
            :prepend-icon="icon"
            filled
            clear-icon="mdi-close-circle"
            clearable
            label="Message"
            type="text"
            @click:append="toggleMarker"
            @click:append-outer="sendMessage"
            @click:prepend="changeIcon"
            @click:clear="clearMessage"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container> -->
  </v-form>
</template>

<script>
import handyUploader from "handy-uploader/src/components/handyUploader";
import firebase from "firebase/app";
import Vue from "vue";
export default {
  data() {
    return {
      id: this.dog.id,
      imageName: this.dog.imageName,
      oldImageName: '',
      image: this.dog.image,
      nickname: this.dog.nickname,
      description: this.dog.description,
      age: this.dog.age,
      animal: this.dog.animal,
      gender: this.dog.gender,
      genders: ["мальчик", "девочка"],
      animals: ["кот", "собака"],
      handyAttachments: [],
      imgfile: [],
      newImageURL: "",
      progress: 0,

      // url: null,
      // image: null,

      // rules: [
      //   // v => !!v || '',
      //   v => v.length <= 15 || 'Не более 15 символов!'
      // ],
      // rulesDescription: [
      //   // v => !!v || '',
      //   v => v.length <= 500 || 'Не более 500 символов!'
      // ],
      // rulesAge: [
      //   // v => !!v || '',
      //   v => v.length <= 15 || 'Не более 15 символов!'
      // ]
    };
  },

  computed: {},

  methods: {
    // загрузка нового изображения в БД
    loadNewImage() {
      let me = this;
      // let imgfile = [];
      let arr = [];
      let imgObject;
      let newImageName = "";
      arr = this.handyAttachments;
      this.imgfile = arr[0];

      // проверка на изменение фото
      if (this.imgfile != undefined) {
        this.oldImageName = this.imageName; // сохраняем название предыдущей фото
        // console.log(this.oldImageName);
        Object.keys(this.imgfile).forEach((element) => {
          imgObject = this.imgfile[element].base64;
          // имя нового изображения
          newImageName = this.imgfile[element].name;
          this.imageName = newImageName;
          // console.log(this.id);
        });
        
        // Create the file metadata
        var metadata = {
          contentType: "image/jpeg",
        };

        // Base64 formatted string
        var message = imgObject;
        var ref = Vue.$storageRef.child("images/" + newImageName + this.id);
        // Upload file and metadata to the object ''images/' + newImageName'
        var uploadTask = ref.putString(message, "base64", metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            me.progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log("Upload is " + me.progress + "% done");
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                // console.log("Upload is paused");
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                // console.log("Upload is running");
                break;
            }
          },
          function (error) {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;

              case "storage/canceled":
                // User canceled the upload
                break;

              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              // console.log("File available at", downloadURL);
              // var myJSON = JSON.stringify(downloadURL);
              // console.log(myJSON);
              me.newImageURL = downloadURL;
            }).then(function () {
                me.loadNewInfo()
            });
          }
        );
      } else {
        me.loadNewInfo()
      }
    },

    // загрузка нового описания в БД
    loadNewInfo() {
      // Rewrite existing document in collection "pets"
      let db = Vue.$db.collection("pets").doc(this.id);
      let newGenderIcon = '';
      // Определение иконки пола
      if (this.gender == 'мальчик') {
        newGenderIcon = 'mdi mdi-gender-male';
      } else if (this.gender == 'девочка') {
        newGenderIcon = 'mdi mdi-gender-female';
      }
      // проверка обновилось ли картинка
      if (this.imgfile != undefined) {
        
        // удаление старой фото из базы при изменении картинки питомца
        if (this.oldImageName != '') {
          this.deletePetPhoto();
        }
        
        // обновление БД по текущему ID
        db.update({
          nickname: this.nickname,
          description: this.description,
          age: this.age,
          image: this.newImageURL,
          imageName: this.imageName + this.id,
          gender: this.gender,
          animal: this.animal,
          genderIcon: newGenderIcon,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
      } else {
        db.update({
          nickname: this.nickname,
          description: this.description,
          age: this.age,
          gender: this.gender,
          animal: this.animal,
          genderIcon: newGenderIcon,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
      }
      // переход на страницку с питомцами
      this.$router.push("/dogs")
      .catch(()=>{}); 
      
    },

    // удаление старой фото из базы
    deletePetPhoto () {
      // console.log(this.oldImageName);
      let ref = Vue.$storageRef.child("images/" + this.oldImageName);
      // Delete the file
      ref.delete().then(() => {
        // console.log('File deleted successfully'); 
      }).catch((error) => {
        console.log(error);
      });
    },

     // return to the previous scroll location
    goBack() {
      window.history.back()
    }

    // // check single value of gender
    // csSingleValue (gen) {
    //   if (gen == 'boy') {
    //     this.gender = 'мальчик';
    //   } else if (gen == 'girl') {
    //     this.gender = 'девочка';
    //   } else if (gen == 'dog') {
    //     this.animal = 'собака';
    //   } else if (gen == 'kat') {
    //     this.animal = 'кот';
    //   }
    // },

    // Preview_image() {
    //   this.url= URL.createObjectURL(this.image)
    // }
  },
  components: {
    handyUploader,
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