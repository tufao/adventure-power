<template>
  <div class="business">
    <div>
      <div><img :src="icon" width="50" /></div>
      <div>{{ item.name }}</div>
      <div>{{ item.time }}</div>
      <div>{{ production }} kWh</div>
      <div><button type="button" @click="start" :class="{disabled: !item.isReady(time)}">GO!</button></div>
    </div>
    <div>
      <div><button type="button" @click="$emit('buy', item)">1x Buy {{ item.capacity }} kW</button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
// eslint-disable-next-line no-unused-vars
import { Business } from '../../model/data/Business';

@Component
export default class BusinessItem extends Vue {
  @Prop() private item!: Business;
  @Prop() private time!: number;

  private production: number = 0;

  get icon() {
    return require(`@static/${this.item.icon}`);
  }

  mounted() {
    this.production = this.item.getProduction(this.time);
  }

  start() {
    if (!this.item.isReady(this.time)) {
      return;
    }
    this.item.work(this.time);
  }

  @Watch("time", { immediate: true })
  onTimeUpdate(){
    this.production = this.item.getProduction(this.time);
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.business {
  display: flex;
  width: 500px;
  flex-direction: column;
  border: 1px solid grey;
  margin: 10px;
  padding: 10px;
}

.business > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  border: blue;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  background: green;
}

button.disabled {
  background: grey;
}
</style>
