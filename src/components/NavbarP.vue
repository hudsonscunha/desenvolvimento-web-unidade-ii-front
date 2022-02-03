<template>
    <div>
        <v-app-bar app dark class="primary">
            <v-toolbar-title>SIGA</v-toolbar-title>
            <v-spacer/>
            <v-btn text to="/professor/courses">Meus cursos</v-btn>
            <v-menu offset-y>
                <template v-slot:activator="{ attrs, on }">
                    <v-btn text v-bind="attrs" v-on="on">{{ p_name }}</v-btn>
                </template>
                <v-list dark class="primary">
                    <v-list-item to="/profile">
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>PERFIL</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="SignOut()">
                        <v-list-item-icon>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>SAIR</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    methods: {
        SignOut() {
            sessionStorage.clear()
            this.$router.push('/')
        }
    },
    props: ['p_name']
}
</script>
