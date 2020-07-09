process.env.NODE_ENV = 'test';

require('@babel/register')({
  extensions: ['.ts', '.tsx', '.js', '.jsx']
});