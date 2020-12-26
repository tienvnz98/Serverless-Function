// This process will import function and check syntax.
const functionPath = process.env.FUNCTION_NAME || './none-function';
require(functionPath);

