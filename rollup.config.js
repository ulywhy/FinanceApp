/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import summary from 'rollup-plugin-summary';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'dashboard-element.js',
  output: {
    file: 'bundle.js',
    format: 'es',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    nodeResolve(),
    summary(),
  ],
};
