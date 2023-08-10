<script setup lang="ts">
import { inject, reactive } from 'vue';
import { DriverBuilder } from '../domain/driver/Driver';
import DriverGateway from '../infra/gateway/DriverGateway';

const driverBuilder = reactive(new DriverBuilder())
const driverGateway = inject("driverGateway") as DriverGateway;
const driver = reactive({ driverId: "" })
const error = reactive({ message: "" })

async function createDriver() {
  try {
    error.message = ""
    driver.driverId = await driverGateway.create(driverBuilder.build())
  } catch (e: any) {
    error.message = e.message
  }
}
</script>

<template>
  <div>
    <input class="driver-name" v-model="driverBuilder.name" type="text"
      placeholder="Name" />
    <input class="driver-email" v-model="driverBuilder.email" type="text"
      placeholder="Email" />
    <input class="driver-documents" v-model="driverBuilder.document" type="text"
      placeholder="Documents" />
    <input class="driver-car-plate" v-model="driverBuilder.carPlate" type="text"
      placeholder="Car Plate" />
    <button class="driver-submit" @click="createDriver()">create
      driver</button>
    <div class="error">{{ error.message }}</div>
    <div class="driver-id">{{ driver.driverId }}</div>
  </div>
</template>

<style scoped></style>
./domain/driver/Driver