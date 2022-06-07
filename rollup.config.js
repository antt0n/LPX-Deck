import typescript from '@rollup/plugin-typescript';
import { terser } from "rollup-plugin-terser";
import filesize from 'rollup-plugin-filesize';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import progress from 'rollup-plugin-progress';
import { visualizer } from "rollup-plugin-visualizer";
import banner from 'rollup-plugin-banner'
import cleanup from 'rollup-plugin-cleanup';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import dts from "rollup-plugin-dts";
import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-copy';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        entryFileNames: "launchpadcore-min.js",
        dir: 'lib',
        format: 'cjs',
        plugins: [
          terser()
        ]
      }
    ],
    plugins: [
      del({
        targets: 'lib'
      }),
      typescript({
        module: 'esnext'
      }),
      compiler(),

      // After build
      cleanup({
        comments: "none"
      }),
      banner('<%= pkg.name %> v<%= pkg.version %> by <%= pkg.author.name %>'),

      // Visual & analytics 
      filesize({
        showMinifiedSize: false,
        showGzippedSize: false
      }),
      progress(), 
      visualizer({
        title: "Lib build stats",
      })
    ] 
  },
  {
    input: "lib/ts/index.d.ts",
    output: [
      { 
        file: "lib/launchpadcore.d.ts", 
        format: "es" 
      }],
    plugins: [
      dts(),
      del({
        targets: 'lib/ts',
        hook: 'buildEnd'
      })
    ],
  },
]
