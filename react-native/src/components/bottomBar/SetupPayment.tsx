import React from 'react';
import {Text, Button} from '@ui-kitten/components';

const SetupPayment: React.FunctionComponent = () => {
  return (
    <>
      <Text>Payment</Text>
      <Text>Payment Method</Text>
      <Button appearance="ghost" status="control" size="giant">
        Set up with Stripe
      </Button>
    </>
  );
};

export default SetupPayment;
