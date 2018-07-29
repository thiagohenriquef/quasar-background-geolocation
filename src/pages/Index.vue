<template>
  <q-page class="justify-center">
    <google-map />
  </q-page>
</template>

<style>
</style>

<script>
import GoogleMap from '../components/GoogleMap'
import { QPage } from 'quasar'
import backgroundGeolocation from '../mixins/background-geolocation'

export default {
  name: 'PageIndex',
  mixins: [backgroundGeolocation],
  components: {
    QPage,
    GoogleMap
  },
  data () {
    return {
      batteryStatus: null,
      markers: []
    }
  },
  methods: {
    updateBatteryStatus (status) {
      this.batteryStatus = status.level
    }
  },
  created () {
    document.addEventListener('batterystatus', this.updateBatteryStatus, false)
    document.addEventListener('deviceready', this.onDeviceReady, false)
  },
  beforeDestroy () {
    document.removeEventListener('batterystatus')
    document.removeEventListener('deviceready')
  }
}
</script>
