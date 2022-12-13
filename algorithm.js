convertBinaryToBinaryCodedDecimal('101010011101101000');

function convertBinaryToBinaryCodedDecimal(binary) {
  let register = [];
  let decNum = convertBinaryToDecimal(binary);
  let decLength = decNum.toString().length;
  for (let i = 0; i < decLength; i++) {
    register[i] = ['0', '0', '0', '0'];
  }
  register[decLength] = binary.split('');
  for (let i = 0; i < binary.toString().length; i++) {
    register = preventOverflow(register);
    register = shiftToLeft(register);
  }
  let result = '';
  for (let i = 0; i < decLength; i++) {
    result = result + register[i].join('') + ' ';
  }
  console.log(result);
  console.log(decNum);
}

function shiftToLeft(register) {
  let ram = '0';
  for (let i = register.length - 1; i >= 0; i--) {
    for (let j = register[i].length - 1; j >= 0; j--) {
      let cacheHelper = register[i][j];
      register[i][j] = ram;
      ram = cacheHelper;
    }
  }
  return register;
}

function preventOverflow(register) {
  for (let i = 0; i < register.length - 1; i++) {
    let binary = register[i].join('');
    let decimal = convertBinaryToDecimal(binary);
    decimal = decimal >= 5 ? decimal + 3 : decimal;
    let newBinary = convertDecimalTo4DigitBinary(decimal);
    register[i] = newBinary.split('');
  }
  return register;
}

function convertBinaryToDecimal(binary) {
  //alternativ parseInt(x, 2)
  let length = binary.length;
  let result = 0;
  for (let i = 0; i < length; i++) {
    result += binary[length - 1 - i] * Math.pow(2, i);
  }
  return result;
}

function convertDecimalTo4DigitBinary(decimal) {
  let result = '';
  while (decimal > 0) {
    if (decimal & 1) {
      result = '1' + result;
    } else {
      result = '0' + result;
    }
    decimal = decimal >> 1;
  }
  while (result.toString().length < 4) {
    result = '0' + result;
  }
  return result;
}
