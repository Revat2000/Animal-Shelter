// У автора Books.vue
<template>
  <div>
      <dogs-list></dogs-list>
  </div>
</template>

<script>
import DogsList from '../components/DogsList.vue'
export default {
  components: {
    DogsList
  },
  // computed: {
  //   reload() {
  //     window.location.reload();
  //     return null;
  //   }
  // }
}
</script>

<style>

</style>