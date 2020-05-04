const types = {
  'length': 'No tiene el tamaño adecuado. Debe estar entre 13 y 9 dígitos con su correspondiente prefijo. En caso de no ponerlo se le asignará el de tu país.',
  'exists': 'Ya esta registrado.',
  'nan': 'Esto no es un número.'
}

export class ConfErrors {
  num;
  errorMsg;

  constructor(num, key) {
    this.num = num;
    this.errorMsg = types[key];
  }

  getValues() {
    return { num: this.num, msg: this.errorMsg };
  }
}
