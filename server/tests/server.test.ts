import 'mocha';
import express from 'express';
import {expect} from 'chai';
import sinon from 'sinon';
import admin from 'firebase-admin';
import App from '../src/config/app'
const test = require('firebase-functions-test')();

describe.skip('Server initialization', () => {
  let server: express.Application;
  let adminInitStub: sinon.SinonStub;
  let credentialsStub: sinon.SinonStub;

  before(() => {
    // Stub all functions called by admin from firebase
    adminInitStub = sinon.stub(admin, 'initializeApp');
    credentialsStub = sinon.stub(admin.credential, 'cert')
    server = new App().app;
  });

  it('Server instance should exist', () => {
    expect(server).to.exist;
  });

  // Clean up your test
  after(() => {
    // Restore admin.initializeApp() to its original method.
    adminInitStub.restore();
    credentialsStub.restore();
    // Do other cleanup tasks.
    test.cleanup();
  });
});
