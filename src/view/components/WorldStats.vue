<template>
  <div class="popup">
      <h2>World Stats!</h2>
      <div>
        Total energy: {{format(balance)}} kW<br />
      </div>
      <button type="button" @click="$emit('close')">OK</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ServerProxy } from '../../model/proxies/ServerProxy';

@Component({
})
export default class CatalogList extends Vue {
  private balance:number = 0;

  private nick:string = '';

  async beforeMount() {
    const balance = await ServerProxy.getWorldBalance();
    if (balance) {
        this.balance = balance;
    }
  }

  format(x:number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 300px;
    background-color: white;
    border-radius: 20px;
    border: 5px solid #f6af33;
    z-index: 10;
    padding: 20px;
    font-size: 22px;

    display: flex;
    flex-direction: column;
    justify-content:space-evenly;
    align-content: center;
    align-items: center;
}

button {
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: bold;
  margin: 4px 2px;
  cursor: pointer;
  background:  #8aaad9;
  border-color:  #8aaad9;
  border-radius: 10px;
}

</style>
