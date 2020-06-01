<template>
  <div class="welcome">
      <h2>Welcome to the Green Energy game!</h2>
      <div class="name">
          <div><img src="../../../public/img/lamp.jpeg" width="150" /></div>
          <div>
              <label>Please enter your name:</label>
              <br />
              <input type="text" name="nick" v-model="nick" />
              <br />
              <button type="button">OK</button>
          </div>
        </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
})
export default class CatalogList extends Vue {
  private nick:string = '';

  mounted() {
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.welcome {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 400px;
    background-color: white;
    border-radius: 20px;
    border: 5px solid #f6af33;
    z-index: 10;
    padding: 20px;
    font-size: 18px;
}

.name {
    display: flex;
    align-items: center;
    justify-content: center;
}

input {
    border: 3px solid #8aaad9;
    font-size: 18px;
    color: #8aaad9;
    height: 32px;
    text-align: center;
    MARGIN: 10px;
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
