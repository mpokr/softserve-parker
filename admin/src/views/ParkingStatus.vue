<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Parking status for {{ date }}; Places 68/70
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-filter"
          label="Search"
          single-line
          hide-details />
      </v-card-title>
      <v-data-table class="elevation-1"
        :headers="headers"
        :items="drivers"
        :search="search"
        disable-pagination
        hide-default-footer
      >
        <template v-slot:item.phone="{ item }">
          {{ getValue(item.phone) }}
        </template>
        <template v-slot:item.role="{ item }">
          {{ getValue(item.role) }}
        </template>
        <template v-slot:item.state="{ item }">
          {{ getValue(item.state) }}
        </template>
      </v-data-table>
    </v-card>
    <Information ref="info" />
  </v-container>
</template>

<script lang="ts">
import moment from 'moment'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { User } from '@/domain/User'
import Information from '@/components/Information.vue'

@Component({
  components: {
    Information
  }
})
export default class ParkingStatus extends Vue {
  headers = [
    { text: 'First Name', align: 'left', sortable: true, value: 'firstName' },
    { text: 'Last Name', align: 'left', sortable: true, value: 'lastName' },
    { text: 'Phone number', align: 'left', sortable: true, value: 'phone' },
    { text: 'Plate number', align: 'left', sortable: true, value: 'plate' },
    { text: 'Role', align: 'left', value: 'role' },
    { text: 'State', align: 'left', value: 'state' },
    { text: 'Ranking', align: 'left', value: 'rank' }
  ]

  drivers = []

  search = ''

  async mounted () {
    try {
      const drivers = await User.getAll()
      this.drivers = drivers
    } catch (e) {
      this.drivers = []
      // @ts-ignore
      this.$refs.info.showError(e.message as string)
    }
  }

  get date () {
    return moment(new Date()).format('YYYY-MM-DD')
  }

  getValue (data: string): string {
    return !data ? '-' : data
  }
}
</script>
