<template>
  <LookButton variant='primary' size='md' v-on:click='increment()'>
    Increase Apollo Link State counter
  </LookButton>
</template>

<script>
import { ADD_COUNTER, COUNTER_QUERY } from '@gqlapp/counter-common';
import { Button as LookButton } from '@gqlapp/look-client-vue';

export default {
  props: { counter: Object },
  components: {
    LookButton,
  },
  methods: {
    increment: function() {
      this.$apollo.mutate({
        mutation: ADD_COUNTER,
        variables: { amount: 1 },
        update(RoutingCache, { data : { addServerCounter : { amount }}}) {
          RoutingCache.writeQuery({
            query: COUNTER_QUERY,
            data: {
              serverCounter: {
                amount,
                __typename: 'Counter'
              }
            }
          });
        },
        optimisticResponse: {
          __typename: 'Mutation',
          addServerCounter: {
            __typename: 'Counter',
            amount: this.counter.amount + 1
          }
        },
        error(error) {
          console.error(`Error: ${error}`)
        },
      });
    }
  },
};
</script>
