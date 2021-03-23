<template>
    <div>
        <v-navigation-drawer absolute temporary v-model="drawer" class="hidden-md-and-up">
            <v-list>
                <v-list-item v-for="(item, i) in menuItems" :key="`navdrawer${i}`" :to="item.route">
                    <v-list-item-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-item-action>
                    <v-list-item-action>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
            <v-list-item  v-if="isUserAuthentificated">
              <v-list-item-action>
                <v-icon >mdi mdi-door-closed-lock</v-icon>
              </v-list-item-action>
              <v-list-item-action>
                  <v-list-item-title  @click="signout">Выйти</v-list-item-title>
              </v-list-item-action>
                
            </v-list-item>
            
        </v-navigation-drawer>
        
        <v-app-bar app dark class="teal lighten-1">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>   
            <router-link to="/" style="cursor:pointer" tag="span">
                <v-toolbar-title v-text="'The right to LIVE'"></v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn 
                    v-for="(item, i) in menuItems" 
                    :key="`menuitem${i}`" 
                    :to="item.route"
                    elevation="0"
                    class="teal lighten-1" 
                    >
                    <v-icon size="1.5em" left v-html="item.icon"></v-icon>
                    {{ item.title }}
                </v-btn>
                <v-btn text elevation="0" class="teal lighten-1" @click="signout" v-if="isUserAuthentificated">
                    <v-icon size="1.5em" left>mdi mdi-door-closed-lock</v-icon>
                    Выйти
                </v-btn>
            </v-toolbar-items>
            
            
        </v-app-bar>


        
    </div>
</template>

<script>
export default {
    data() {
        return {
            drawer: false
        }
    },
    computed: {
        isUserAuthentificated(){
            return this.$store.getters.isUserAuthentificated
        },
        menuItems(){
            return this.isUserAuthentificated 
                ? [
                {
                    icon: 'mdi mdi-paw',
                    title: 'Питомцы',
                    route: '/dogs'
                },
                // {
                //     icon: 'mdi mdi-cat',
                //     title: 'Мяу-мяу!',
                //     route: '/cats'
                // },
                {
                    icon: 'mdi mdi-heart-multiple',
                    title: 'Милосердие',
                    route: '/mercy'
                },
                {
                    icon: 'mdi mdi-monitor-star',
                    title: 'Кабинет',
                    route: '/profile'
                }
            ] :
            [
                {
                    icon: 'mdi mdi-paw',
                    title: 'Питомцы',
                    route: '/dogs'
                },
                // {
                //     icon: 'mdi mdi-cat',
                //     title: 'Мяу-мяу!',
                //     route: '/cats'
                // },
                {
                    icon: 'mdi mdi-heart-multiple',
                    title: 'Милосердие',
                    route: '/mercy'
                },
                {
                    icon: 'mdi mdi-door-open',
                    title: 'Вход',
                    route: '/signin'
                },
                {
                    icon: 'mdi mdi-account-plus',
                    title: 'Регистрация',
                    route: '/signup'
                }
            ]
        }
    },
    methods: {
        signout(){
          this.$router.push("/").catch(()=>{});
          this.$store.dispatch('SIGNOUT')
        }
    }
    
}
</script>

<style scoped>

</style>
