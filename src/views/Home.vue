<template>
  <div class="home">
    <h1>Home</h1>
    <button @click="logout()">Logout</button>
    <div class="marks-container" v-for="(mark, index) in marks" :key="index">
      {{ mark.text }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserService } from './../services/user.service';
import { Getter, Mutation } from 'vuex-class';
import SlideInTransition from './../components/Transitions/SlideInTransition.vue';
import NavBar from './../components/NavBar.vue';
import { MarkerService } from '../services/marker.service';
import { Mark } from '../models/mark';
import { MarksStore } from './../store/marks-store';

@Component({
  components: {
    SlideInTransition,
    NavBar
  }
})
export default class Home extends Vue {
  userService = new UserService();
  markService = new MarkerService();
  @Mutation emitLogout!: () => void;
  show = true;
  marks: Mark[] = [];

  async mounted() {
    this.listenForState();
    this.marks = MarksStore.state.marks;
  }

  listenForState() {
    this.$store.subscribe(state => {
      if (MarksStore.state.marks !== this.marks) {
        this.marks = MarksStore.state.marks;
      }
    });
  }

  async logout() {
    this.emitLogout();
    await this.navigate('/');
  }

  async navigate(route: string) {
    try {
      await this.$router.push(route);
    } catch (error) {
      //
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './../variables.scss';
.home {
  display: flex;
  flex-wrap: wrap;
}

.marks-container {
  width: 100%;
  background: white;
  margin: 5px;
  padding: 5px;
}
</style>
