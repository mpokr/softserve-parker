<template>
  <v-card>
    <v-card-title>
      <span class="headline">Edit user</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="user.firstName" label="First name" :error="!user.firstName"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="user.lastName" label="Last name" :error="!user.lastName"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="user.phone" type="number" label="Phone number" :error="!user.phone"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="user.plate" label="Plate number" :error="!user.plate"></v-text-field>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="this.roles"
              label="User Role">
            </v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text @click="$emit('close')">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click="onSubmit">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'

@Component
export default class UserForm extends Vue {
  @Prop({ type: Object, required: true }) userProp: any
  @Watch('userProp')
  onPropertyChanged (value: object) {
    this.user = value
  }

  user = this.userProp

  roles = ['Regular', 'Vip', 'Admin']

  onSubmit () {
    if (this.isFormFilledUp()) {
      const user = this.user
      this.$emit('onSubmit', user)
    }
  }

  isFormFilledUp (): boolean {
    return Boolean(
      this.user.firstName &&
      this.user.lastName &&
      this.user.plate &&
      this.user.phone &&
      this.roles
    )
  }
}
</script>
