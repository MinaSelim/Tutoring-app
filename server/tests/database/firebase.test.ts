import {assert} from 'chai';
import Sinon from 'sinon';
import sinon from 'sinon';
import * as dotenv from 'dotenv';
import FirebaseAuth from '../../src/services/FirebaseAuth';

describe('FirebaseAuth singleton instance', () => {
   it.skip('Should return the same instance', () => {
      dotenv.config(); // fix this test

      const spy: Sinon.SinonSpy = sinon.spy(FirebaseAuth, 'getInstance');

      const instance1 = FirebaseAuth.getInstance();
      const instance2 = FirebaseAuth.getInstance();

      assert(spy.calledTwice);
      assert.deepEqual(instance1, instance2);
      spy.restore();
   });
});
