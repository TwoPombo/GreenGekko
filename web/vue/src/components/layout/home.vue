<template>
  <div class="contain">
    <div v-for="exchange in portfolios" style="padding-bottom: 3rem">
      <h3>💱 {{ exchange.exchange.toUpperCase() }}</h3>
      <div v-if="!exchange.balances" class="no-balances">
        🛎️ Eres pobre y no tienes balances aquí
        <h1>😭💸😭💸😭💸</h1>
      </div>
      <table v-else>
        <tr>
          <th>Balance disponible</th>
          <th>Moneda</th>
        </tr>
        <tr v-for="balance in exchange.balances">
          <td style="text-align: right">{{ balance.amount }}</td>
          <td>{{ balance.name }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { get } from '../../tools/ajax';

export default {
  data: () => {
    return {
      portfolios: [],
    }
  },

  mounted() {
    get('exchanges/portfolios', (err, data) => {
      this.portfolios = data;
    });
  }
}
</script>

<style scoped>
.no-balances {
  padding: 0.4rem 1rem;
  font-size: 1.3rem;
}
</style>
