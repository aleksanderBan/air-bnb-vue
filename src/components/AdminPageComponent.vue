<template>
  <div>
    <h1>Admin Page</h1>
    <h2>Camping Spots</h2>
    <ul>
      <li v-for="spot in spots" :key="spot.id">
        {{ "Name: " }} {{ spot.name }} - 
        {{ "Location: " }} {{ spot.location }} - 
        {{ "Description: " }} {{ spot.description }}
        <button @click="toggleAvailability(spot)">
          {{ spot.isAvailable ? 'Mark as Unavailable' : 'Mark as Available' }}
        </button>
      </li>
    </ul>

    <h2>Create New Camping Spot</h2>
    <div class="move">
    <input v-model="newSpot.name" placeholder="Name" />
    <input v-model="newSpot.location" placeholder="Location" />
    <input v-model="newSpot.description" placeholder="Description" />
    <button @click="createSpot">Create Spot</button>
    </div>

    <br><br><br>

    <div>
      <button @click="goToLogin">Logoff</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      spots: [],
      newSpot: {
        name: '',
        location: '',
        description: '',
      },
    };
  },
  async created() {
    await this.fetchSpots();
  },
  methods: {
    async fetchSpots() {
      try {
        const response = await axios.get('https://localhost:7299/admin/spots');
        this.spots = response.data;
      } catch (error) {
        console.error('Failed to fetch spots', error);
        alert('Failed to fetch spots');
      }
    },
    async createSpot() {
      try {
        await axios.post('https://localhost:7299/admin/spots', this.newSpot);
        alert('Spot created successfully');
        this.newSpot.name = '';
        this.newSpot.location = '';
        this.newSpot.description = '';
        await this.fetchSpots();
      } catch (error) {
        console.error('Failed to create spot', error);
        alert('Failed to create spot');
      }
    },
    async toggleAvailability(spot) {
      try {
        const newAvailability = { isAvailable: !spot.isAvailable };
        await axios.post(`https://localhost:7299/admin/spots/${spot.id}/availability`, newAvailability);
        spot.isAvailable = !spot.isAvailable;
        alert(`Spot marked as ${newAvailability.isAvailable ? 'available' : 'unavailable'}`);
      } catch (error) {
        console.error('Failed to update availability', error);
        alert('Failed to update availability');
      }
    },

    goToLogin() {
      this.$emit('goToLogin');
    },
  },
};
</script>
