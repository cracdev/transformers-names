export default {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '18',
        },
        modules: 'auto',
      },
    ],
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
      ],
    },
  },
}
