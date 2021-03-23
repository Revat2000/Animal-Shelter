<template>
  <div @click="sendwallpost('Мой текст сообщения');">отправить</div>
</template>
<script>
// import VK from '??????????';
export default {
  data() {
    return {
      loading: false,
      walls: null,
      error: null,
    };
  },
  // created() {
  //   this.initVK();
  // },

  // methods: {
  //   initVK() {
  //     VK.init({
  //       apiId: 	7798778 // id созданного вами приложения вконтакте 
  //     });
  //   }, 

  //    sendwallpost(mydata) {
  //       VK.api("wall.post", {
  //           owner_id: '553591004',
  //           message: mydata
  //       }, function (data) {
  //         console.log(data);
  //       });
  //    }
  // }
}
</script>