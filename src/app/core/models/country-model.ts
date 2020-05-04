export class CountryModel {
    name;
    dial_code;
    code;

    constructor(name, dial_code, code) {
        this.name = name;
        this.dial_code = dial_code
        this.code = code;
    }

    getValues() {
        return { 
            name: this.name, 
            dial_code: this.dial_code, 
            code: this.code 
        }
    }
}
