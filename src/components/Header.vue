<template>
    <header>
        <h1>{{ title }}</h1>
    </header>
    <Button v-show="homePage" @btn-click="$emit('toggle-add-task')" :text="showAddTask ? 'Close' : 'Add Task'" :color="showAddTask ? 'red' : 'green'" />
    <!-- <Button text="Update Task" color="blue"/>
    <Button text="Delete Task" color="red"/> -->
</template>


<script>
// Import The Button Component 
import Button from './Button'

export default {
    name: 'Header',
    props: {
        title: String,
        showAddTask: Boolean,
    },
    components: {
        Button
    },
    computed: {
        homePage() {
            if(this.$route.path === '/')
            {
                return true
            } else {
                return false
            }
        }
    },
}
</script>


<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
</style>