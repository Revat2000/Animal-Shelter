<template>
 <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md5 elevation-6>
              <v-card>
                <v-toolbar class="blue darken-4"> 
                  <v-spacer></v-spacer>
                  <v-toolbar-title class="white--text">Вход</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
              
                <v-card-text>
                  <v-alert
                    :value="error"
                    dense
                    border="top"
                    type="warning"
                  >
                   {{ error }}
                  </v-alert>

                  <v-form
                    ref="form"
                    v-model="valid"
                  >
                    <v-text-field
                      v-model="email"
                      name="login"
                      label="E-mail"
                      type="email"
                      required
                      prepend-icon="mdi mdi-account-outline"
                      :rules="emailRules"
                    ></v-text-field>

                    <v-text-field
                      v-model="password"
                      name="password"
                      label="Пароль"
                      type="password"
                      required
                      prepend-icon="mdi mdi-lock-outline"
                      :rules="passwordRules"
                    ></v-text-field>

                      <v-card-actions>
                        <v-btn
                          color="success"
                          class="mr-4"
                          @click.prevent="signin"
                          :disabled="processing || !valid" 
                        >
                            Войти
                        </v-btn>
                      </v-card-actions>

                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
       </v-container>
</template>

<script>
export default {
    data(){
      return {
        email: null,
        password: null,
        valid: false,
        emailRules: [
          v => !!v || 'Пожалуйста введите E-mail',
          v => /.+@.+\..+/.test(v) || 'Неправильный E-mail',
        ],
        passwordRules: [
          v => !!v || 'Пожалуйста введите пароль',
          v => (v && v.length >= 6) || 'Пароль слишком короткий - минимум 6 символов'
        ]
      }
    },
    computed: {
      
      error() {
        return this.$store.getters.getError
      }, 
      processing() {
        return this.$store.getters.getProcessing
      },
      isUserAuthentificated() {
        return this.$store.getters.isUserAuthentificated
      }
    },
    watch: {
      isUserAuthentificated(val) {
        if (val === true) {
          this.$router.push("/")
        }
      }
    },
    methods: {
      signin(){
        this.$store.dispatch('SIGNIN', {email:this.email, password:this.password})
      }
    },
  }
</script>

<style>

</style>