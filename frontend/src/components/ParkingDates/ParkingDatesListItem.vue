<template>
  <div class="reservation">
    <span class="reservation__background">
      <img
        class="reservation__cancel-icon"
        v-bind:class="{'reservation__cancel-icon--active': cancelIconActive}"
        src="/img/close.png"
      />
    </span>
    <p
      v-on:touchstart="handleTouchStart"
      v-on:touchmove="handleSwipe"
      v-on:touchend="handleTouchEnd"
      v-bind:style="{left: leftPosition + positionUnit}"
      class="reservation__date"
      v-bind:class="{'reservation__date--animeted-movement': animetedMovementActive}"
    >
      {{ formattedDate }}
    </p>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator'
import moment from 'moment'
import {
  ReservationRequestsAction
} from '@/store/reservationRequests'

var initialX = 0
const CANCELABLE_POSITION = -125

@Component()
export default class ParkingDatesListItem extends Vue {
  @Prop({ type: Object, required: true }) request
  @ReservationRequestsAction cancelRequest
  leftPosition = 0
  positionUnit = 'px'
  animetedMovementActive = false
  cancelIconActive = false

  get formattedDate () {
    return moment(this.request.date)
      .format('DD.MM.YYYY')
      .toString()
  }

  handleTouchStart (event) {
    const { clientX } = event.touches[0]
    initialX = clientX
  }

  handleSwipe (event) {
    const { clientX } = event.touches[0]
    this.leftPosition = (initialX - clientX) * -1 > 0 ? 0 : (initialX - clientX) * -1
    this.cancelIconActive = this.leftPosition < CANCELABLE_POSITION
  }

  handleTouchEnd (event) {
    this.animetedMovementActive = true
    if (this.leftPosition > CANCELABLE_POSITION) {
      this.leftPosition = 0
      setTimeout(() => {
        this.animetedMovementActive = false
      }, 1000)
    } else {
      this.removeItem()
    }
  }

  removeItem () {
    this.positionUnit = '%'
    this.leftPosition = -100
    setTimeout(() => {
      this.cancelRequest(this.request.id)
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.reservation {
  background-color: $darkHotPink;
  position: relative;

  &__background {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    text-align: end;
    height: 47px;
  }

  &__cancel-icon {
    margin-right: 12px;
    width: 4%;
    transition: width 100ms;

    &--active {
      width: 6%;
    }
  }

  &__date {
    box-sizing: border-box;
    border-bottom: 1px solid rgb(216, 216, 216);
    margin: 0;
    padding: 12px 0 12px 20px;
    width: 100%;
    height: 47px;
    background-color: white;
    position: absolute;
    top: 0;

    &--animeted-movement {
      transition: left 400ms ease;
    }
  }
}
</style>