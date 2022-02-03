<template>
    <v-container>
        <NavbarS :s_name="student.name"/>
        <h1 class="font-weight-light">Cursos que sou membro</h1>
        <v-row justify="center">
            <v-card class="ma-3" max-width="344" v-for="course in coursesList" :key="course.id_c">
                <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
                    <v-card-title>{{ course.c_name }}</v-card-title>
                    <v-card-subtitle><b>Professor: </b>{{ course.p_name }}</v-card-subtitle>
                </v-img>
                <v-card-text>
                    {{ course.c_description }}
                    <div>
                        <b>E-mail: </b>{{ course.p_email }}
                    </div>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn color="indigo lighten-1" dark text @click="$router.push(`/student/assignments/${course.id_c}`)">tarefas</v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import NavbarS from '@/components/NavbarS'

export default {
    data: () => ({
        student: {},
        coursesList: []
    }),
    created: async function () {
        this.student = JSON.parse(sessionStorage.getItem('session'))
        if (this.student == null) {
            this.$router.push('/')
        } else if (this.student.role != 'student') {
            this.$router.push('/profile')
        } else {
            try {
                const res = await this.axios.post('/student/my-courses', this.student)
                this.coursesList = res.data
            } catch (error) {
                console.log(error)
            }
        }
    },
    components: {
        NavbarS
    }
}
</script>