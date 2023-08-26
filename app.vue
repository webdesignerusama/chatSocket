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
 let users = ref([])
 let selectedUser = ref('')
 const message = ref('')
 const setSelectedUser = user => {
  selectedUser = user
  console.log(selectedUser)
 }
 const loggedUser = ref('')

onMounted(() => {
   users = ['hamza', 'usama', 'ali']
   console.log(users)
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
