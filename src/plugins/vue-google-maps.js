import * as VueGoogleMaps from 'vue2-google-maps'

export default ({ Vue }) => {
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyBBzwCoyyb82r-Sg2HKP4KldcADCOna-OA',
      libraries: 'places'
    }
  })
}
