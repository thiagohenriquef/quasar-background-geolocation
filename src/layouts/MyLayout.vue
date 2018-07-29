<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-toolbar-title>
          Quasar Background Geolocation
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {
  QLayout,
  QLayoutHeader,
  QToolbar,
  QToolbarTitle,
  QPageContainer
} from 'quasar'

export default {
  name: 'MyLayout',
  components: {
    QLayout,
    QLayoutHeader,
    QToolbar,
    QToolbarTitle,
    QPageContainer
  }
}
</script>
