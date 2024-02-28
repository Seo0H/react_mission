/* eslint-disable no-undef */
import '@testing-library/jest-dom';

global.console = {
  ...global.console,
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  error: jest.fn(), // react forwardRef prop 미제공으로 인한 오류 메시지 출력 방지
};
