/* eslint-disable no-undef */
import '@testing-library/jest-dom';

global.console = {
  ...global.console,
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  error: jest.fn(),
};
