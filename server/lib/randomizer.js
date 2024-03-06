module.exports = function randomizer() {
  const allSymbols = 'QWERTYUIOPLKJHGFDSAZXCVBNM1234567890';
  let result = '';
  let count = 0;
  while (count < 5) {
    result += allSymbols.charAt(Math.floor(Math.random() * allSymbols.length));
    count += 1;
  }
  return result;
};
