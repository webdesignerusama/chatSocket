<template>
  <div>
   <h1>{{ ' hello '}}</h1>
   <ul>
    <li v-for="(user, i) in users" :key="i" @click="setSelectedUser(user)">
    {{ user }}
    </li>
   </ul>
   <input type="text" v-model="message" placeholder="type...">
   <button @click="sendMessage" class="btn btn-primary">Send Message</button>
  </div>
</template>
<script setup>
 const { $io } = useNuxtApp();
 const users = ref([])
 const selectedUser = ref('')
 const message = ref('')
 const setSelectedUser = user => {
  selectedUser.value = user
 }
 const loggedUser = ref('')

onMounted(() => {
   users.value = ['hamza', 'usama', 'ali']
   loggedUser.value = localStorage.getItem('userName')
   console.log(localStorage.getItem('userName'))

  $io.on('message', (data) => {
    console.log(data)
 
 })
})

const sendMessage = () => {
  const data = {
    room: loggedUser.value + selectedUser.value,
    message: message.value
  }
  $io.emit("message", data);
};
</script>
