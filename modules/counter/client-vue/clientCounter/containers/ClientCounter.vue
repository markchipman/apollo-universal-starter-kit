<template>
  <CounterSection>
    <p>
      The current counter value is {{ clientCounter.amount }}. It's stored on the client with Apollo Link State.
    </p>
    <IncrementCounter />
  </CounterSection>
</template>

<script>
import { COUNTER_QUERY_CLIENT } from '@gqlapp/counter-common';
import IncrementCounter from '../components/IncrementCounter.vue';
import CounterSection from '../../containers/CounterSection.vue';

export default {
  name: 'ClientCounter',
  components: {
    IncrementCounter,
    CounterSection,
  },
  data: () => ({
    clientCounter: {
      amount: 0,
    },
  }),
  apollo: {
    clientCounter: {
      query: COUNTER_QUERY_CLIENT,
    },
  },
};
</script>
