<template>
  <div class="loading-spinner">
    <div class="loader">
      <div class="group">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="group">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="group">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="group">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="group">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="group">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class LoadingSpinner extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';

$color1: $primary-color;
$color2: $highlight-color;
$color3: $primary-color;
$color4: $highlight-color;
$color5: $primary-color;
$color6: $highlight-color;

.group {
  position: relative;
}
.dot {
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}
.loader > .group:nth-child(1) {
  -webkit-animation: spin 1.75s ease infinite;
  -moz-animation: spin 1.75s ease infinite;
  -o-animation: spin 1.75s ease infinite;
  -ms-animation: spin 1.75s ease infinite;
  animation: spin 1.75s ease infinite;
  -webkit-transform-origin: 0.25rem 0.25rem;
  -moz-transform-origin: 0.25rem 0.25rem;
  -o-transform-origin: 0.25rem 0.25rem;
  -ms-transform-origin: 0.25rem 0.25rem;
  transform-origin: 0.25rem 0.25rem;
}
.loader > .group:nth-child(1) > .dot {
  background-color: $color1;
}
.loader > .group:nth-child(1) > .dot:nth-child(1) {
  -webkit-transform: translate3d(2.25rem, 2.25rem, 0);
  -moz-transform: translate3d(2.25rem, 2.25rem, 0);
  -o-transform: translate3d(2.25rem, 2.25rem, 0);
  -ms-transform: translate3d(2.25rem, 2.25rem, 0);
  transform: translate3d(2.25rem, 2.25rem, 0);
}
.loader > .group:nth-child(1) > .dot:nth-child(2) {
  -webkit-transform: translate3d(-2.25rem, -2.25rem, 0);
  -moz-transform: translate3d(-2.25rem, -2.25rem, 0);
  -o-transform: translate3d(-2.25rem, -2.25rem, 0);
  -ms-transform: translate3d(-2.25rem, -2.25rem, 0);
  transform: translate3d(-2.25rem, -2.25rem, 0);
}
.loader > .group:nth-child(1) > .dot:nth-child(3) {
  -webkit-transform: translate3d(-2.25rem, 2.25rem, 0);
  -moz-transform: translate3d(-2.25rem, 2.25rem, 0);
  -o-transform: translate3d(-2.25rem, 2.25rem, 0);
  -ms-transform: translate3d(-2.25rem, 2.25rem, 0);
  transform: translate3d(-2.25rem, 2.25rem, 0);
}
.loader > .group:nth-child(1) > .dot:nth-child(4) {
  -webkit-transform: translate3d(2.25rem, -2.25rem, 0);
  -moz-transform: translate3d(2.25rem, -2.25rem, 0);
  -o-transform: translate3d(2.25rem, -2.25rem, 0);
  -ms-transform: translate3d(2.25rem, -2.25rem, 0);
  transform: translate3d(2.25rem, -2.25rem, 0);
}
.loader > .group:nth-child(2) {
  -webkit-animation: spin 2.5s ease infinite;
  -moz-animation: spin 2.5s ease infinite;
  -o-animation: spin 2.5s ease infinite;
  -ms-animation: spin 2.5s ease infinite;
  animation: spin 2.5s ease infinite;
  -webkit-transform-origin: 0.25rem 0.25rem;
  -moz-transform-origin: 0.25rem 0.25rem;
  -o-transform-origin: 0.25rem 0.25rem;
  -ms-transform-origin: 0.25rem 0.25rem;
  transform-origin: 0.25rem 0.25rem;
}
.loader > .group:nth-child(2) > .dot {
  background-color: $color2;
}
.loader > .group:nth-child(2) > .dot:nth-child(1) {
  -webkit-transform: translate3d(3.25rem, 3.25rem, 0);
  -moz-transform: translate3d(3.25rem, 3.25rem, 0);
  -o-transform: translate3d(3.25rem, 3.25rem, 0);
  -ms-transform: translate3d(3.25rem, 3.25rem, 0);
  transform: translate3d(3.25rem, 3.25rem, 0);
}
.loader > .group:nth-child(2) > .dot:nth-child(2) {
  -webkit-transform: translate3d(-3.25rem, -3.25rem, 0);
  -moz-transform: translate3d(-3.25rem, -3.25rem, 0);
  -o-transform: translate3d(-3.25rem, -3.25rem, 0);
  -ms-transform: translate3d(-3.25rem, -3.25rem, 0);
  transform: translate3d(-3.25rem, -3.25rem, 0);
}
.loader > .group:nth-child(2) > .dot:nth-child(3) {
  -webkit-transform: translate3d(-3.25rem, 3.25rem, 0);
  -moz-transform: translate3d(-3.25rem, 3.25rem, 0);
  -o-transform: translate3d(-3.25rem, 3.25rem, 0);
  -ms-transform: translate3d(-3.25rem, 3.25rem, 0);
  transform: translate3d(-3.25rem, 3.25rem, 0);
}
.loader > .group:nth-child(2) > .dot:nth-child(4) {
  -webkit-transform: translate3d(3.25rem, -3.25rem, 0);
  -moz-transform: translate3d(3.25rem, -3.25rem, 0);
  -o-transform: translate3d(3.25rem, -3.25rem, 0);
  -ms-transform: translate3d(3.25rem, -3.25rem, 0);
  transform: translate3d(3.25rem, -3.25rem, 0);
}
.loader > .group:nth-child(3) {
  -webkit-animation: spin 3.25s ease infinite;
  -moz-animation: spin 3.25s ease infinite;
  -o-animation: spin 3.25s ease infinite;
  -ms-animation: spin 3.25s ease infinite;
  animation: spin 3.25s ease infinite;
  -webkit-transform-origin: 0.25rem 0.25rem;
  -moz-transform-origin: 0.25rem 0.25rem;
  -o-transform-origin: 0.25rem 0.25rem;
  -ms-transform-origin: 0.25rem 0.25rem;
  transform-origin: 0.25rem 0.25rem;
}
.loader > .group:nth-child(3) > .dot {
  background-color: $color3;
}
.loader > .group:nth-child(3) > .dot:nth-child(1) {
  -webkit-transform: translate3d(4.25rem, 4.25rem, 0);
  -moz-transform: translate3d(4.25rem, 4.25rem, 0);
  -o-transform: translate3d(4.25rem, 4.25rem, 0);
  -ms-transform: translate3d(4.25rem, 4.25rem, 0);
  transform: translate3d(4.25rem, 4.25rem, 0);
}
.loader > .group:nth-child(3) > .dot:nth-child(2) {
  -webkit-transform: translate3d(-4.25rem, -4.25rem, 0);
  -moz-transform: translate3d(-4.25rem, -4.25rem, 0);
  -o-transform: translate3d(-4.25rem, -4.25rem, 0);
  -ms-transform: translate3d(-4.25rem, -4.25rem, 0);
  transform: translate3d(-4.25rem, -4.25rem, 0);
}
.loader > .group:nth-child(3) > .dot:nth-child(3) {
  -webkit-transform: translate3d(-4.25rem, 4.25rem, 0);
  -moz-transform: translate3d(-4.25rem, 4.25rem, 0);
  -o-transform: translate3d(-4.25rem, 4.25rem, 0);
  -ms-transform: translate3d(-4.25rem, 4.25rem, 0);
  transform: translate3d(-4.25rem, 4.25rem, 0);
}
.loader > .group:nth-child(3) > .dot:nth-child(4) {
  -webkit-transform: translate3d(4.25rem, -4.25rem, 0);
  -moz-transform: translate3d(4.25rem, -4.25rem, 0);
  -o-transform: translate3d(4.25rem, -4.25rem, 0);
  -ms-transform: translate3d(4.25rem, -4.25rem, 0);
  transform: translate3d(4.25rem, -4.25rem, 0);
}
.loader > .group:nth-child(4) {
  -webkit-animation: spin 4s ease infinite;
  -moz-animation: spin 4s ease infinite;
  -o-animation: spin 4s ease infinite;
  -ms-animation: spin 4s ease infinite;
  animation: spin 4s ease infinite;
  -webkit-transform-origin: 0.25rem 0.25rem;
  -moz-transform-origin: 0.25rem 0.25rem;
  -o-transform-origin: 0.25rem 0.25rem;
  -ms-transform-origin: 0.25rem 0.25rem;
  transform-origin: 0.25rem 0.25rem;
}
.loader > .group:nth-child(4) > .dot {
  background-color: $color4;
}
.loader > .group:nth-child(4) > .dot:nth-child(1) {
  -webkit-transform: translate3d(5.25rem, 5.25rem, 0);
  -moz-transform: translate3d(5.25rem, 5.25rem, 0);
  -o-transform: translate3d(5.25rem, 5.25rem, 0);
  -ms-transform: translate3d(5.25rem, 5.25rem, 0);
  transform: translate3d(5.25rem, 5.25rem, 0);
}
.loader > .group:nth-child(4) > .dot:nth-child(2) {
  -webkit-transform: translate3d(-5.25rem, -5.25rem, 0);
  -moz-transform: translate3d(-5.25rem, -5.25rem, 0);
  -o-transform: translate3d(-5.25rem, -5.25rem, 0);
  -ms-transform: translate3d(-5.25rem, -5.25rem, 0);
  transform: translate3d(-5.25rem, -5.25rem, 0);
}
.loader > .group:nth-child(4) > .dot:nth-child(3) {
  -webkit-transform: translate3d(-5.25rem, 5.25rem, 0);
  -moz-transform: translate3d(-5.25rem, 5.25rem, 0);
  -o-transform: translate3d(-5.25rem, 5.25rem, 0);
  -ms-transform: translate3d(-5.25rem, 5.25rem, 0);
  transform: translate3d(-5.25rem, 5.25rem, 0);
}
.loader > .group:nth-child(4) > .dot:nth-child(4) {
  -webkit-transform: translate3d(5.25rem, -5.25rem, 0);
  -moz-transform: translate3d(5.25rem, -5.25rem, 0);
  -o-transform: translate3d(5.25rem, -5.25rem, 0);
  -ms-transform: translate3d(5.25rem, -5.25rem, 0);
  transform: translate3d(5.25rem, -5.25rem, 0);
}
.loader > .group:nth-child(5) {
  -webkit-animation: spin 4.75s ease infinite;
  -moz-animation: spin 4.75s ease infinite;
  -o-animation: spin 4.75s ease infinite;
  -ms-animation: spin 4.75s ease infinite;
  animation: spin 4.75s ease infinite;
  -webkit-transform-origin: 0.25rem 0.25rem;
  -moz-transform-origin: 0.25rem 0.25rem;
  -o-transform-origin: 0.25rem 0.25rem;
  -ms-transform-origin: 0.25rem 0.25rem;
  transform-origin: 0.25rem 0.25rem;
}
.loader > .group:nth-child(5) > .dot {
  background-color: $color5;
}
.loader > .group:nth-child(5) > .dot:nth-child(1) {
  -webkit-transform: translate3d(6.25rem, 6.25rem, 0);
  -moz-transform: translate3d(6.25rem, 6.25rem, 0);
  -o-transform: translate3d(6.25rem, 6.25rem, 0);
  -ms-transform: translate3d(6.25rem, 6.25rem, 0);
  transform: translate3d(6.25rem, 6.25rem, 0);
}
.loader > .group:nth-child(5) > .dot:nth-child(2) {
  -webkit-transform: translate3d(-6.25rem, -6.25rem, 0);
  -moz-transform: translate3d(-6.25rem, -6.25rem, 0);
  -o-transform: translate3d(-6.25rem, -6.25rem, 0);
  -ms-transform: translate3d(-6.25rem, -6.25rem, 0);
  transform: translate3d(-6.25rem, -6.25rem, 0);
}
.loader > .group:nth-child(5) > .dot:nth-child(3) {
  -webkit-transform: translate3d(-6.25rem, 6.25rem, 0);
  -moz-transform: translate3d(-6.25rem, 6.25rem, 0);
  -o-transform: translate3d(-6.25rem, 6.25rem, 0);
  -ms-transform: translate3d(-6.25rem, 6.25rem, 0);
  transform: translate3d(-6.25rem, 6.25rem, 0);
}
.loader > .group:nth-child(5) > .dot:nth-child(4) {
  -webkit-transform: translate3d(6.25rem, -6.25rem, 0);
  -moz-transform: translate3d(6.25rem, -6.25rem, 0);
  -o-transform: translate3d(6.25rem, -6.25rem, 0);
  -ms-transform: translate3d(6.25rem, -6.25rem, 0);
  transform: translate3d(6.25rem, -6.25rem, 0);
}
.loader > .group:nth-child(6) {
  -webkit-animation: spin 5.5s ease infinite;
  -moz-animation: spin 5.5s ease infinite;
  -o-animation: spin 5.5s ease infinite;
  -ms-animation: spin 5.5s ease infinite;
  animation: spin 5.5s ease infinite;
  -webkit-transform-origin: 0.25rem 0.25rem;
  -moz-transform-origin: 0.25rem 0.25rem;
  -o-transform-origin: 0.25rem 0.25rem;
  -ms-transform-origin: 0.25rem 0.25rem;
  transform-origin: 0.25rem 0.25rem;
}
.loader > .group:nth-child(6) > .dot {
  background-color: $color6;
}
.loader > .group:nth-child(6) > .dot:nth-child(1) {
  -webkit-transform: translate3d(7.25rem, 7.25rem, 0);
  -moz-transform: translate3d(7.25rem, 7.25rem, 0);
  -o-transform: translate3d(7.25rem, 7.25rem, 0);
  -ms-transform: translate3d(7.25rem, 7.25rem, 0);
  transform: translate3d(7.25rem, 7.25rem, 0);
}
.loader > .group:nth-child(6) > .dot:nth-child(2) {
  -webkit-transform: translate3d(-7.25rem, -7.25rem, 0);
  -moz-transform: translate3d(-7.25rem, -7.25rem, 0);
  -o-transform: translate3d(-7.25rem, -7.25rem, 0);
  -ms-transform: translate3d(-7.25rem, -7.25rem, 0);
  transform: translate3d(-7.25rem, -7.25rem, 0);
}
.loader > .group:nth-child(6) > .dot:nth-child(3) {
  -webkit-transform: translate3d(-7.25rem, 7.25rem, 0);
  -moz-transform: translate3d(-7.25rem, 7.25rem, 0);
  -o-transform: translate3d(-7.25rem, 7.25rem, 0);
  -ms-transform: translate3d(-7.25rem, 7.25rem, 0);
  transform: translate3d(-7.25rem, 7.25rem, 0);
}
.loader > .group:nth-child(6) > .dot:nth-child(4) {
  -webkit-transform: translate3d(7.25rem, -7.25rem, 0);
  -moz-transform: translate3d(7.25rem, -7.25rem, 0);
  -o-transform: translate3d(7.25rem, -7.25rem, 0);
  -ms-transform: translate3d(7.25rem, -7.25rem, 0);
  transform: translate3d(7.25rem, -7.25rem, 0);
}
@-moz-keyframes spin {
  0% {
    -webkit-transform: rotateZ(0) scale(1);
    -moz-transform: rotateZ(0) scale(1);
    -o-transform: rotateZ(0) scale(1);
    -ms-transform: rotateZ(0) scale(1);
    transform: rotateZ(0) scale(1);
    opacity: 0;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
    filter: alpha(opacity=0);
  }
  50% {
    -webkit-transform: rotateZ(180deg) scale(2);
    -moz-transform: rotateZ(180deg) scale(2);
    -o-transform: rotateZ(180deg) scale(2);
    -ms-transform: rotateZ(180deg) scale(2);
    transform: rotateZ(180deg) scale(2);
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    -webkit-transform: rotateZ(360deg) scale(1);
    -moz-transform: rotateZ(360deg) scale(1);
    -o-transform: rotateZ(360deg) scale(1);
    -ms-transform: rotateZ(360deg) scale(1);
    transform: rotateZ(360deg) scale(1);
    opacity: 0;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
    filter: alpha(opacity=0);
  }
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotateZ(0) scale(1);
    -moz-transform: rotateZ(0) scale(1);
    -o-transform: rotateZ(0) scale(1);
    -ms-transform: rotateZ(0) scale(1);
    transform: rotateZ(0) scale(1);
    opacity: 0;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
    filter: alpha(opacity=0);
  }
  50% {
    -webkit-transform: rotateZ(180deg) scale(2);
    -moz-transform: rotateZ(180deg) scale(2);
    -o-transform: rotateZ(180deg) scale(2);
    -ms-transform: rotateZ(180deg) scale(2);
    transform: rotateZ(180deg) scale(2);
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    -webkit-transform: rotateZ(360deg) scale(1);
    -moz-transform: rotateZ(360deg) scale(1);
    -o-transform: rotateZ(360deg) scale(1);
    -ms-transform: rotateZ(360deg) scale(1);
    transform: rotateZ(360deg) scale(1);
    opacity: 0;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
    filter: alpha(opacity=0);
  }
}
@-o-keyframes spin {
  0% {
    -webkit-transform: rotateZ(0) scale(1);
    -moz-transform: rotateZ(0) scale(1);
    -o-transform: rotateZ(0) scale(1);
    -ms-transform: rotateZ(0) scale(1);
    transform: rotateZ(0) scale(1);
    opacity: 0;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
    filter: alpha(opacity=0);
  }
  50% {
    -webkit-transform: rotateZ(180deg) scale(2);
    -moz-transform: rotateZ(180deg) scale(2);
    -o-transform: rotateZ(180deg) scale(2);
    -ms-transform: rotateZ(180deg) scale(2);
    transform: rotateZ(180deg) scale(2);
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    -webkit-transform: rotateZ(360deg) scale(1);
    -moz-transform: rotateZ(360deg) scale(1);
    -o-transform: rotateZ(360deg) scale(1);
    -ms-transform: rotateZ(360deg) scale(1);
    transform: rotateZ(360deg) scale(1);
    opacity: 0;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
    filter: alpha(opacity=0);
  }
}
@keyframes spin {
  0% {
    -webkit-transform: rotateZ(0) scale(1);
    -moz-transform: rotateZ(0) scale(1);
    -o-transform: rotateZ(0) scale(1);
    -ms-transform: rotateZ(0) scale(1);
    transform: rotateZ(0) scale(1);
    opacity: 0;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
    filter: alpha(opacity=0);
  }
  50% {
    -webkit-transform: rotateZ(180deg) scale(2);
    -moz-transform: rotateZ(180deg) scale(2);
    -o-transform: rotateZ(180deg) scale(2);
    -ms-transform: rotateZ(180deg) scale(2);
    transform: rotateZ(180deg) scale(2);
    opacity: 1;
    -ms-filter: none;
    filter: none;
  }
  100% {
    -webkit-transform: rotateZ(360deg) scale(1);
    -moz-transform: rotateZ(360deg) scale(1);
    -o-transform: rotateZ(360deg) scale(1);
    -ms-transform: rotateZ(360deg) scale(1);
    transform: rotateZ(360deg) scale(1);
    opacity: 0;
    -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
    filter: alpha(opacity=0);
  }
}
</style>
