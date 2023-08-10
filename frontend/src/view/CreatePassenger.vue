<script setup lang="ts">
import { inject, reactive } from 'vue';
import { PassengerBuilder } from '../domain/passenger/Passenger';
import PassengerGateway from '../infra/gateway/PassengerGateway';



const passengerBuilder = reactive(new PassengerBuilder())
const passenger = reactive({ passengerId: "" })
const error = reactive({ message: "" })

const passengerGateway = inject("passengerGateway") as PassengerGateway;
async function createPassenger() {
  try {
    error.message = ""
    passenger.passengerId = await passengerGateway.create(passengerBuilder.build())
  } catch (e: any) {
    error.message = e.message
  }

}
</script>
<template>
  <div>
    <input class="passenger-name" v-model="passengerBuilder.name" type="text"
      placeholder="Name" />
    <input class="passenger-email" v-model="passengerBuilder.email" type="text"
      placeholder="Email" />
    <input class="passenger-documents" v-model="passengerBuilder.document"
      type="text" placeholder="Documents" />
    <button class="passenger-submit" @click="createPassenger()">create
      passenger</button>
    <div class="error">{{ error.message }}</div>
    <div v-if="passenger">
      <div class="passenger-id">{{ passenger.passengerId }}</div>
    </div>
  </div>
</template>
