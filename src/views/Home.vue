<template>
  <v-container>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>SIGA</v-toolbar-title>
    </v-app-bar>
    <v-alert text v-model="alert.show" :type="alert.type" dismissible>{{ alert.message }}</v-alert>
    <v-row justify="center">
      <v-col class="text-center" md="2" sm="2">
        <v-btn class="primary" @click="suForm=true">inscrever-se</v-btn>
      </v-col>
      <v-col class="text-center" md="2" sm="2">
        <v-btn class="success" @click="suForm=false">entrar</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col md="6" sm="6">
        <v-card v-if="suForm">
          <v-card-title>Inscrever-se</v-card-title>
          <v-card-text>
            <v-form class="ma-3" @submit.prevent="signup()" ref="signupForm">
              <v-text-field label="Nome" prepend-icon="mdi-account" :rules="nameRules" v-model="user.name"/>
              <v-text-field label="E-mail" prepend-icon="mdi-email" :rules="emailRules" v-model="user.email"/>
              <v-text-field label="Senha" prepend-icon="mdi-lock" type="password" :rules="passwordRules" v-model="user.password"/>
              <v-radio-group row v-model="user.role" class="ma-3" :rules="[(v) => !!v || 'Selecione o papel que você ocupa']">
                <v-radio label="Professor" value="professor"/>
                <v-radio label="Aluno" value="student"/>
              </v-radio-group>
              <v-btn block class="primary mt-3" type="submit">inscrever-se</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        <v-card v-else>
          <v-card-title>Entrar</v-card-title>
          <v-card-text>
            <v-form class="ma-3" @submit.prevent="signin()" ref="signinForm">
              <v-text-field label="E-mail" prepend-icon="mdi-email" :rules="emailRules" v-model="user.email"/>
              <v-text-field label="Senha" prepend-icon="mdi-lock" type="password" :rules="passwordRules" v-model="user.password"/>
              <v-radio-group row v-model="user.role" class="ma-3" :rules="[(v) => !!v || 'Selecione o papel que você ocupa']">
                <v-radio label="Professor" value="professor"/>
                <v-radio label="Aluno" value="student"/>
              </v-radio-group>
              <v-btn block class="success mt-3" type="submit">entrar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      alert: { show: false, message: '' },
      nameRules: [
        value => !!value || 'O nome é obrigatório',
        value => (value && value.length >= 5 || 'O nome deve ter mais de 5 caracteres')
      ],
      emailRules: [
        value => !!value || 'O e-mail é obrigatório',
        value => /.+@.+\..+/.test(value) || 'E-mail deve ser válido'
      ],
      passwordRules: [
        value => !!value || 'Senha requerida',
        value => (value && value.length > 1 || 'A senha deve ter mais de 1 caractere')
      ],
      user: { name: '', email: '', password: '' },
      suForm: true
    }),
    methods: {
      async signup() {
        let valid = this.$refs['signupForm']['validate']() // diferente: aula VIII
        if (valid) {
          try {
            const res = await this.axios.post('/signup', this.user)
            this.$refs['signupForm']['reset']()
            console.log(res)

            this.alert = {
              show: true,
              type: 'success',
              message: res.data.message
            }
          } catch (error) {
            this.alert = {
              show: true,
              type: 'error',
              message: error.response.data.message
            }
          }
        }
      },
      async signin() {
        let valid = this.$refs['signinForm']['validate']()
        if (valid) {
          try {
            const res = await this.axios.post('/signin', this.user)
            if (res.data.NotFound) {
              this.alert = {
                show: true,
                type: 'error',
                message: res.data.message
              }
            } else {
              sessionStorage.setItem('session', JSON.stringify(res.data))
              this.$router.push('/profile')
            }
          } catch (error) {
            this.alert = {
              show: true,
              type: 'error',
              message: error.response.data.message
            }
          }
        }
      }
    }
  }
</script>
