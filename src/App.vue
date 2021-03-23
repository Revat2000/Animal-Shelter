<template>
  <v-app>
    <app-header></app-header>
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- <transition name="fade" mode="out-in"> -->
          <router-view/>
        <!-- </transition> -->
      </v-container>
    </v-main>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>



