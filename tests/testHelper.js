import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai);
chai.use(chaiAsPromised);

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();

/**
 * 创建spy对象，不会影响原始对象行为
 * @param obj
 * @returns {{}}
 */
function spyObject(obj) {
  const sinonObj = {};

  const keys = Object.getOwnPropertyNames(obj);
  for (const key of keys) {
    sinonObj[key] = sinon.spy(obj, key);
  }

  return sinonObj;
}

/**
 * 创建stub对象，可以控制原始对象行为
 * @param obj
 * @returns {{}}
 */
function stubObject(obj) {
  const sinonObj = {};

  const keys = Object.getOwnPropertyNames(obj);
  for (const key of keys) {
    sinonObj[key] = sinon.stub(obj, key);
  }

  return sinonObj;
}

/**
 * 恢复sinon对象，对spy和stub对象均有效
 * @param sinonObj
 */
function restoreSinonObject(sinonObj) {
  const keys = Object.getOwnPropertyNames(sinonObj);
  for (const key of keys) {
    sinonObj[key].restore();
  }
}

export {
  spyObject,
  stubObject,
  restoreSinonObject,
};
