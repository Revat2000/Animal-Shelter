// У автора Books.vue
<template>
  <div>
      <vk-comment></vk-comment>
  </div>
</template>

<script>
import VkComment from '../components/VkComment.vue'
export default {
  components: {
    VkComment
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