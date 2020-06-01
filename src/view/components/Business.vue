<template>
  <div class="business">
    <div>
      <div>{{ count }}x</div>
      <div><img :src="icon" width="50" /></div>
      <div>{{ item.name }}</div>
      <div>{{ item.time }}</div>
      <div>{{ item.capacity * count }} kWh</div>
      <div><button type="button" @click="$emit('work', item)" :class="{disabled: !ready}">GO!</button></div>
    </div>
    <div class="meter">
      <span :style="{width: progress * 100 + '%'}"></span>
    </div>
    <div>
      <div><button type="button" @click="$emit('buy', item)" :class="{disabled: !buyable}">1x Buy {{ item.cost }} kW</button></div>
      <div><button type="button" @click="$emit('hire', item)" :class="{disabled: !hirable}">Automate ({{ hireCost }} kW)</button></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// eslint-disable-next-line no-unused-vars
import { Business } from '../../model/data/Business';

@Component
export default class BusinessItem extends Vue {
  @Prop() private item!: Business;
  @Prop() private time!: number;
  @Prop() private count!: number;
  @Prop() private ready!: boolean;
  @Prop() private buyable!: boolean;
  @Prop() private hirable!: boolean;
  @Prop() private production!: number;
  @Prop() private progress!: number;
  @Prop() private hireCost!: number;

  get icon() {
    return require(`@static/images/${this.item.icon}`);
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

.meter {
	height: 20px;  /* Can be anything */
	position: relative;
	background: #555;
	-moz-border-radius: 25px;
	-webkit-border-radius: 25px;
	border-radius: 25px;
	padding: 4px;
	box-shadow: inset 0 -1px 1px rgba(255,255,255,0.3);
}

.meter > span {
  display: block;
  height: 100%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: rgb(43,194,83);
  background-image: linear-gradient(
    center bottom,
    rgb(43,194,83) 37%,
    rgb(84,240,84) 69%
  );
  box-shadow:
    inset 0 2px 9px  rgba(255,255,255,0.3),
    inset 0 -2px 6px rgba(0,0,0,0.4);
  position: relative;
  overflow: hidden;
}
</style>
