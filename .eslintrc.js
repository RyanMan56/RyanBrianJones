module.exports = {
  extends: 'airbnb-base',
  rules: {
    'linebreak-style': 0,
    'class-methods-use-this': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  },
  env: {
    'browser': true,
  },
};
