<template>
  <q-page>
    <page-header>{{ $t('browser-history-report.title') }}</page-header>
    <div class="row q-col-gutter-x-md q-col-gutter-y-md">
      <div class="col-12">
        <div class="row q-col-gutter-x-md q-col-gutter-y-md">
          <div class="col-12">
            <traffic-overview />
          </div>
          <div class="col-12">
            <traffic-line-chart />
          </div>
          <div class="col-md-6 col-12">
            <browser-pie-chart />
          </div>
          <div class="col-md-6 col-12">
            <device-type-pie-chart />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import TrafficOverview from './components/TrafficOverview.vue'
import TrafficLineChart from './components/TrafficLineChart.vue'
import BrowserPieChart from './components/BrowserPieChart.vue'
import DeviceTypePieChart from './components/DeviceTypePieChart.vue'
import { defineComponent } from 'vue-demi'

export default defineComponent({
  components: {
    TrafficOverview,
    TrafficLineChart,
    BrowserPieChart,
    DeviceTypePieChart,
  },
  setup () {
    return {
    }
  },
})
</script>

<style lang="postcss" scoped></style>
