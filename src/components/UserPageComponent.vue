<template>
  <div>
    <h2>Find Camping Spots</h2>
    <div class="move">
    <input v-model="location" placeholder="Location" />
    <label>
      <input type="checkbox" v-model="isAvailable" />
      Only Available Spots
    </label>
    <button @click="search">Search</button>
    </div>

    <div v-if="spots.length > 0">
      <h3>Search Results:</h3>
      <ul>
        <li v-for="spot in spots" :key="spot.id">
          {{ "Name: " }} {{ spot.name }} -
          {{ "Location: " }}  {{ spot.location }} -
          {{ "Description: " }} {{ spot.description }} -
          {{ spot.isAvailable ? 'Available' : 'Not Available' }} -
          {{ "Spot ID: " }} {{ spot.id }}
        </li>
      </ul>
    </div>

    <div v-else-if="searched && spots.length === 0" class="move" id="noSpotsMessage">
      No spots found matching the criteria.
    </div>
    
    <h2>Book a Spot</h2>
    <div class="move">
    <input v-model="spotId" placeholder="Spot ID" />
    <button @click="book">Book</button>
    </div>

    <h2>Your Bookings</h2>
    <ul>
      <li v-for="booking in bookings" :key="booking.id">
        Spot ID: {{ booking.spotId }}
        <button @click="removeBooking(booking.id)">Cancel Booking</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['user'],
  data() {
    return {
      location: '',
      isAvailable: false,
      spots: [],
      searched: false,
      spotId: '',
      bookings: [],
    };
  },
  async created() {
    if (this.user) {
      await this.fetchBookings();
    }
  },
  methods: {
    async search() {
      try {
        const params = {};

        if (this.location.trim() !== '') {
          params.location = this.location;
        }

        if (this.isAvailable) {
          params.isAvailable = this.isAvailable.toString();
        }

        console.log('Search params:', params);

        const response = await axios.get('https://localhost:7299/spot', { params });
        this.spots = response.data;
        this.searched = true;
      } catch (error) {
        console.error('Search failed', error);
        alert('Search failed');
      }
    },
    async book() {
      if (this.user) {
        try {
          await axios.post('https://localhost:7299/booking', {
            userId: this.user.id,
            spotId: parseInt(this.spotId),
          });
          alert('Booking successful');
          await this.fetchBookings();
        } catch (error) {
          alert('Booking failed');
        }
      // } else {
      //   alert('Please login first');
      }
    },
    async fetchBookings() {
      try {
        const response = await axios.get(`https://localhost:7299/booking/user/${this.user.id}`);
        this.bookings = response.data;
      } catch (error) {
        console.error('Failed to fetch bookings', error);
        alert('Failed to fetch bookings');
      }
    },
    async removeBooking(bookingId) {
      try {
        const response = await axios.delete(`https://localhost:7299/booking/${bookingId}`);
        console.log(response.data);
        this.bookings = this.bookings.filter(booking => booking.id !== bookingId);
        alert('Booking canceled successfully');
      } catch (error) {
        console.error('Failed to cancel booking', error);
        alert('Failed to cancel booking');
      }
    },
  },
};
</script>
