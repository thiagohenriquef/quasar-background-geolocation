<template>
    <div>
      <!-- <div>
        <h2>Search and add a pin</h2>
        <label>
          <gmap-autocomplete
            @place_changed="setPlace">
          </gmap-autocomplete>
          <button @click="addMarker">Add</button>
        </label>
        <br/>
  
      </div>
      <br> -->
      <gmap-map
        :center="center"
        :zoom="15"
        style="width:100%; height: 500px;"
      >
        <gmap-marker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          @click="center=m.position"
        ></gmap-marker>
      </gmap-map>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GoogleMap',
    props: {
      type: Array,
      default: () => [{ position: { lat: -18.930763, lng: -48.235862 }}]
    },
    data () {
      return {
        center: { lat: -18.930763, lng: -48.235862 },
        markers: [{ position: { lat: -18.930763, lng: -48.235862 }}],
        places: [],
        currentPlace: null
      }
    },
  
    mounted () {
      this.geolocate()
    },
  
    methods: {
      setPlace (place) {
        this.currentPlace = place
      },
      addMarker () {
        if (this.currentPlace) {
          const marker = {
            lat: this.currentPlace.geometry.location.lat(),
            lng: this.currentPlace.geometry.location.lng()
          }
          // this.markers.push({ position: marker })
          this.places.push(this.currentPlace)
          this.center = marker
          this.currentPlace = null
        }
      },
      geolocate () {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      }
    }
  }
  </script>