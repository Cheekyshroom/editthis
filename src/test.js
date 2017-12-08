import React from 'react';
import {renderToString} from 'react-dom/server';
import express from 'express';
import fs from 'fs';
import Store from './stores/index';
import Routes from './routes';
import Db from './helpers/db';
import BodyParser from 'body-parser';
import {find} from 'lodash';
import assert from 'assert';

const DataBase = Db.initialize(false);

const context = {
  db: DataBase
};

const ApiRoutes = Routes.filter(route => {
  return route.isApi;
});

const tests = [];

const test = (name, fn) => {
  tests.push({name, fn});
};

const spy = fn => (...args) => {
  try {
    fn(...args);
    console.log('  succeeded');
  } catch (e) {
    console.log(`  failed because of ${e}`);
    process.exit(1);
  }
};

// Test group creation:
test("Creating a group from an obfuscated id should return the id and success", () => {
  const createGroup = find(ApiRoutes, {path: '/api/createGroup/:obId'});
  const req = {
    params: {obId: '1234'}
  };
  const res = {
    send: spy((data) => {
      assert(data.success);
      assert(data.obId == '1234');
    })
  };
  createGroup.handler(context, req, res);
});

// Test image upload
test("Uploading an image, even an ascii one, should return the new id of the image", () => {
  const uploadImage = find(ApiRoutes, {path: '/api/images/upload'});
  const req = {
    body: {image: 'This is an image ;)'}
  };
  const res = {
    end: spy((data) => {
      assert(data.id != null);
    })
  };
  uploadImage.handler(context, req, res);
});

const runTests = i => {
  if (i < tests.length) {
    console.log(tests[i].name);
    tests[i].fn();
    setTimeout(() => runTests(i + 1), 1000);
  } else {
    setTimeout(() => process.exit(0), 5000);
  }
};

runTests(0);
