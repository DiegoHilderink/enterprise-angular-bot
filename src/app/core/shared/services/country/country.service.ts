import { Injectable } from '@angular/core';
import { CountryModel } from '../../../models/country-model'
import country from '../../../../../assets/prefix.json';

@Injectable({
  providedIn: 'root'
})

export class CountryService {
  countries = [];
  country = country;
  constructor() { }

  findOne(code) {
    for (let i = 0; i <= country.length; i++) {
      if (country[i]['dial_code'] === code) {
        return new CountryModel(
          country[i]['name'],
          country[i]['dial_code'],
          country[i]['code']
        );
      }
    }
  }

  getJSON() {
    return country;
  }
}
