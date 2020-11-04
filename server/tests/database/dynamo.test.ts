import {assert} from 'chai';
import Sinon from 'sinon';
import sinon from 'sinon';
import Dynamo from '../../src/database/dynamo';

describe('Dynamo singleton instance', () => {
   it('Should return the same instance', () => {
      const spy: Sinon.SinonSpy = sinon.spy(Dynamo, 'getInstance');

      const instance1 = Dynamo.getInstance();
      const instance2 = Dynamo.getInstance();

      assert(spy.calledTwice);
      assert.deepEqual(instance1, instance2);
      spy.restore();
   });
});
