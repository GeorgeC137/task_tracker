<template>
    <!-- AddTask component  -->
    <AddTask v-show="showAddTask" @add-task="addTask" />
    
    <!-- Tasks component  -->
    <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks" />
</template>


<script>
// Import AddTask & Tasks components 
import Tasks from '../components/Tasks'
import AddTask from '../components/AddTask'

export default {
    name: 'Home',
    components: {
        Tasks,
        AddTask,
    },
    props:{
        showAddTask: Boolean,
    },
    data() {
        return {
            tasks: [],
        }
    },
    methods: {
        async addTask(task) {
            const res = await fetch('api/tasks', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(task)
            })
            const data = await res.json()

            this.tasks = [...this.tasks, data]
        },
        async deleteTask(id) {
            if (confirm('Are you sure?')) {
                const res = await fetch(`api/tasks/${id}`, {
                    method: 'delete',
                })

                res.status === 200 ? (this.tasks = this.tasks.filter((task) => task.id !== id)) : alert('Error deleting task')
            }
        },
        async toggleReminder(id) {
            const taskToToggle = await this.fetchTask(id)

            const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

            const res = await fetch(`api/tasks/${id}`, {
                method: 'put',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            })

            const data = await res.json()

            this.tasks = this.tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task)
        },
        async fetchTasks() {
            const res = await fetch('api/tasks')

            const data = await res.json()

            return data
        },
        async fetchTask(id) {
            const res = await fetch(`api/tasks/${id}`)

            const data = await res.json()

            return data
        },
    },

    async created() {
        this.tasks = await this.fetchTasks()
    },
}

</script>