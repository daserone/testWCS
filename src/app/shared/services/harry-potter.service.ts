import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../models/characters';

@Injectable({
  providedIn: 'root'
})
export class HarryPotterService {
  newStudent:any = [];
  constructor(private http:HttpClient) { }

  /**
   * @name getCharacters
   * @author Daniel Ramirez
   * @description request data on Harry Potter characters
   */
  getCharacters(from,house?){
    if(from === 'all'){
      return this.http.get<Character>('http://hp-api.herokuapp.com/api/characters/house/'+ house)
    }else if(from ==='students'){
      return this.http.get<Character>('http://hp-api.herokuapp.com/api/characters/students')
    }else if(from === 'staff'){
      return this.http.get<Character>('http://hp-api.herokuapp.com/api/characters/staff')
    }
  }
}
