<template>
  <q-page class="justify-center">
    <google-map
      :markers="markers"/>
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
      markers: []
    }
  },
  methods: {
    updateBatteryStatus (status) {
      this.batteryStatus = status.level
    },
    findLocations () {
      this.$axios
        .get('https://background-geolocation-quasar.herokuapp.com/geolocalizacao/')
        .then(res => {
          res.data.forEach(el => {
            this.markers.push({
              position: {
                lat: Number(el.latitude),
                lng: Number(el.longitude)
              }
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    if (window.cordova) {
      document.addEventListener('deviceready', this.onDeviceReady, false)
    }
  },
  mounted () {
    this.findLocations()
  },
  beforeDestroy () {
    document.removeEventListener('deviceready')
  }
}
</script>
