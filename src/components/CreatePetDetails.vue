// структура элементов для добавления информации о новом питомце для админа
<template>
  <v-form>
    <v-container fluid>

      <v-flex xs12 sm12 md12 >
        <v-card elevation="0">
          <v-card-title class="blue-grey--text text-md-h4 text-sm-h5 text-xs-h6 font-weight-bold ">
            Добавить нового питомца
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
        v-if="progress > 0"
        v-model="progress"
        height="25"
        class="my-2"
      >
      <strong>{{ Math.ceil(progress) }}%</strong>
      </v-progress-linear>      

   

      <v-row>
        <v-btn 
          :to="{name:'dogs'}"
          class="mx-4 mt-3 pr-2 text-subtitle-1"
          color="error"
          width="152px"
          dark
        >Отменить<v-icon size="25" class="ml-2 ">mdi mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn 
          @click="createID"
          class="mx-4 mt-3 pr-2  text-subtitle-1"
          color="success"
          width="152px"
          dark
          >Добавить<v-icon size="25" class="ml-2 pb-1">mdi mdi-check</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import handyUploader from "handy-uploader/src/components/handyUploader";
import firebase from "firebase/app";
import Vue from "vue";
export default {
  data() {
    return {
      id: '',
      imageName: '',
      // oldImageName: "",
      image: '',
      nickname: '',
      description: '',
      age: '',
      animal: '',
      gender: '',
      genders: ["мальчик", "девочка"],
      animals: ["кот", "собака"],
      handyAttachments: [],
      imgfile: [],
      newImageURL: "",
      progress: 0,

    };
  },

  computed: {},

  methods: {
    // загрузка нового изображения в БД
    loadNewImage() {
      // let progress = 0;
      let me = this;
      // let imgfile = [];
      let arr = [];
      let imgObject;
      let newImageName = "";
      arr = this.handyAttachments;
      this.imgfile = arr[0];

      // проверка на изменение фото
      if (this.imgfile != undefined) {
        // this.oldImageName = this.imageName; // сохраняем название предыдущей фото
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
            me.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                // console.log("File available at", downloadURL);
                // var myJSON = JSON.stringify(downloadURL);
                // console.log(myJSON);
                me.newImageURL = downloadURL;
              })
              .then(function () {
                me.loadNewInfo();
              });
          }
        );
      } else {
        me.loadNewInfo();
      }
    },
    
    // create new id
    createID () {
      // Add a new document with a generated id in the "pets" collection 
      let db = Vue.$db.collection("pets");
      db.add({})
      .then((docRef) => {
        this.id = docRef.id;
        // console.log("Document written with ID: ", this.id);
      })
      .then(() => {
          // Upload image to Storage
          this.loadNewImage()
        })
    },

  

    // загрузка нового описания в БД
    loadNewInfo() {
      // Add a new document with a generated id in the "pets" collection 
      let db = Vue.$db.collection("pets");
      let newGenderIcon = "";
      let newImageName = '';
      // Определение иконки пола
      if (this.gender == "мальчик") {
        newGenderIcon = "mdi mdi-gender-male";
      } else if (this.gender == "девочка") {
        newGenderIcon = "mdi mdi-gender-female";
      }

      // Определение добавлена ли картинка
      if (this.newImageURL != '') {
        newImageName = this.imageName + this.id;
      } else {
        newImageName = '';
      }

      // проверка обновилось ли картинка
        db.doc(this.id).update({
          nickname: this.nickname,
          description: this.description,
          age: this.age,
          image: this.newImageURL,
          // imageName: this.imageName + this.id,
          imageName: newImageName,
          gender: this.gender,
          animal: this.animal,
          genderIcon: newGenderIcon,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          // console.error("Новый питомец добавлен в базу!");
          // переход на страницку с питомцами
          this.$router.push("/dogs").catch(()=>{});
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    },

  },
  components: {
    handyUploader,
  },
  // props: {
  //   dog: {
  //     type: Object,
  //     required: true,
  //   },
  // },
};
</script>

<style>
</style>