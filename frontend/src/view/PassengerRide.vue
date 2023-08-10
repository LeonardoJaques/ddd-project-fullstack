<script setup lang="ts">
import { inject, onMounted, reactive } from 'vue';
import { RideBuilder } from '../domain/ride/Ride';
import RideGateway from '../infra/gateway/RideGateway';
import GeoLocation from '../infra/geoLocation/GeoLocation';

const rideBuilder = reactive(new RideBuilder())
const ride = reactive({ price: 0, rideId: "" })
const error = reactive({ message: "" })

const rideGateway = inject("rideGateway") as RideGateway
const geoLocation = inject("geoLocation") as GeoLocation

async function calculatePrice() {
  try {
    error.message = ""
    ride.price = await rideGateway.create(rideBuilder.build());
  } catch (e: any) {
    error.message = e.message
  }
}
async function requestRide() {
  try {
    error.message = ""
    ride.rideId = await rideGateway.request(rideBuilder.build());
  } catch (e: any) {
    error.message = e.message
  }
}
onMounted(async () => {
  const coord = await geoLocation.getCoord()
  console.log(coord)
  rideBuilder.fromLat = coord.lat
  rideBuilder.fromLong = coord.long
})

</script>
<template>
  <div>
    <input class="ride-passenger-id" type="text" v-model="rideBuilder.passengerId"
      placeHolder="Passenger ID" />
    <input class="ride-from-lat" type="text" v-model="rideBuilder.fromLat" />
    <input class="ride-from-long" type="text" v-model="rideBuilder.fromLong" />
    <input class="ride-to-lat" type="text" v-model="rideBuilder.toLat" />
    <input class="ride-to-long" type="text" v-model="rideBuilder.toLong" />
    <button class="calculate-ride-button" @click="calculatePrice()">calculate
      ride</button>
    <div v-if="ride.price > 0">
      <div class="ride-price">{{ ride.price }} </div>
      <div class="ride-id">{{ ride.rideId }} </div>
      <button class="request-ride-button" @click="requestRide()">request
        ride</button>
    </div>
    <div class="error">{{ error.message }}</div>
  </div>
</template>