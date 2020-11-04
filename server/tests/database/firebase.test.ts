import sinon from 'sinon';
import FirebaseAuth from '../../src/services/FirebaseAuth';
import firebase from 'firebase-admin';
import firebaseTest = require('firebase-functions-test');
import Sinon = require('sinon');
import {assert} from 'chai';


describe('FirebaseAuth singleton instance', () => {
   it('Should return the same instance', () => {

       
      const sandbox:Sinon.SinonSandbox = sinon.createSandbox();
      sandbox.stub(firebase, 'initializeApp');
      sandbox.stub(firebase.credential, 'cert')

      sinon.stub(firebase, 'auth').get(() => () => ({
         getUserByEmail: true
       }));


      const instance1 = FirebaseAuth.getInstance();
      const instance2 = FirebaseAuth.getInstance();

      assert.deepEqual(instance1, instance2);

      // Restore stubs
      sandbox.restore();
      firebaseTest().cleanup();
   });
});