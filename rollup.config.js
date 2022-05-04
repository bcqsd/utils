import nodeResolve from "@rollup/plugin-node-resolve";

export default {
    input:'plot/echart.js',
    output:{
        file:'build/index.js'
    },
    plugins:[nodeResolve()]
}

/**
 * to add to the bundled file
  var process={
    env:{
        NODE_ENV:'development'
    }
}

 */