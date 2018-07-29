export default {
  data () {
    return {
      configuration: this.setConfiguration()
    }
  },
  methods: {
    setConfiguration () {
      if (window.cordova) {
        return {
          locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
          desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
          stationaryRadius: 10,
          distanceFilter: 10,
          notificationTitle: 'Localização',
          notificationText: 'Este aplicativo necessita da sua localização',
          debug: false,
          interval: 5000,
          fastestInterval: 5000,
          activitiesInterval: 1000,
          stopOnTerminate: false,
          startForeground: true,
          startOnBoot: true,
          stopOnStillActivity: false,
          url: 'https://background-geolocation-quasar.herokuapp.com/geolocalizacao/',
          syncUrl: 'https://background-geolocation-quasar.herokuapp.com/geolocalizacao/',
          httpHeaders: {
            'X-FOO': 'bar'
          },
          postTemplate: {
            latitude: '@latitude',
            longitude: '@longitude',
            horario: new Date()
          }
        }
      }
      return {}
    },
    onDeviceReady () {
      BackgroundGeolocation.configure(this.configuration)

      BackgroundGeolocation.on('location', location => {
        // handle your locations here
        // to perform long running operation on iOS
        // you need to create background task
        console.log('entrei no location', location)
        BackgroundGeolocation.startTask(function (taskKey) {
          console.log(location)
          console.log(taskKey)
          if (this.markers) {
            this.markers.push(taskKey)
          }
          // execute long running task
          // eg. ajax post location
          // IMPORTANT: task has to be ended by endTask
          BackgroundGeolocation.endTask(taskKey)
        })
      })

      BackgroundGeolocation.on('stationary', stationaryLocation => {
        // handle stationary locations here
        console.log('stationaryLocation', stationaryLocation)
      })

      BackgroundGeolocation.on('error', function (error) {
        console.log('[ERROR] BackgroundGeolocation error:', error.code, error.message)
      })

      BackgroundGeolocation.on('start', function () {
        console.log('[INFO] BackgroundGeolocation service has been started')
      })

      BackgroundGeolocation.getLocations(locations => {
        console.log('entrei aqui')
        console.log(locations)
      })

      BackgroundGeolocation.on('stop', () => {
        console.log('[INFO] BackgroundGeolocation service has been stopped')
      })

      BackgroundGeolocation.on('authorization', function (status) {
        console.log('[INFO] BackgroundGeolocation authorization status: ' + status)
        if (status !== BackgroundGeolocation.AUTHORIZED) {
          // we need to set delay or otherwise alert may not be shown
          setTimeout(function () {
            var showSettings = confirm('App requires location tracking permission. Would you like to open app settings?')
            if (showSetting) {
              return BackgroundGeolocation.showAppSettings()
            }
          }, 1000)
        }
      })

      BackgroundGeolocation.on('background', function () {
        console.log('[INFO] App is in background')
        // you can also reconfigure service (changes will be applied immediately)
        BackgroundGeolocation.configure({ debug: true })
      })

      BackgroundGeolocation.on('foreground', function () {
        console.log('[INFO] App is in foreground')
        BackgroundGeolocation.configure({ debug: false })
      })

      BackgroundGeolocation.checkStatus(status => {
        console.log(status)
        console.log('[INFO] BackgroundGeolocation service is running', status.isRunning)
        console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled)
        console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization)

        // you don't need to check status before start (this is just the example)
        if (!status.isRunning) {
          BackgroundGeolocation.start() // triggers start on start event
        }
      })

      // Don't forget to remove listeners at some point!
      BackgroundGeolocation.events.forEach(function (event) {
        return BackgroundGeolocation.removeAllListeners(event)
      })
    }
  }
}
