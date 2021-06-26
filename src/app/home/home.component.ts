import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HarryPotterService } from '../shared/services/harry-potter.service';
import { Character } from '../shared/models/characters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  characterList: Character[] = [];
  img:string;
  houses:any[]=[
    {
      class:'gryf',
      imgUrl:'https://i.pinimg.com/originals/4b/bb/81/4bbb816e7a69c34c45a0faf452f10b06.gif',
      name:'Gryffindor'
    },
    {
      class:'slyt',
      imgUrl:'https://www.pngkit.com/png/full/106-1068382_hogwarts-sorting-quiz-harry-potter-slytherin-logo.png',
      name:'Slytherin'
    },
    {
      class:'huff',
      imgUrl:'https://i.pinimg.com/originals/b9/cf/a4/b9cfa4d2461073c122d53a959d1fcb1e.png',
      name:'Hufflepuff'
    },
    {
      class:'rav',
      imgUrl:'https://i2.wp.com/www.vippng.com/png/full/511-5111239_freetoedit-ravenclaw-hogwarts-harrypotterforever-ravenclaw-house-ravenclaw-logo.png',
      name:'Ravenclaw'
    },
  ]
  title: string = 'characters';
  loading: boolean = false;
  currentYear: number;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private hpService: HarryPotterService
  ) {}

  ngOnInit(): void {
    //Currentyear para calcular edad de los personajes
    this.currentYear = new Date().getFullYear();
  }
  /**
   * @name changeTable
   * @author Daniel Ramirez
   * @description call to get function on hpService and subscribe to modify characterList array,
   */
  changeTable(from, house?) {
    this.loading = true;
    this.hpService.getCharacters(from, house).subscribe((res: any) => {
      this.loading = false;
      this.title = house ? house : from;
      this.characterList = [];
      res.forEach((character) => {
        this.characterList.push({
          name: character.name,
          patronus: character.patronus ? character.patronus : 'unknown',
          age: character.yearOfBirth
            ? this.currentYear - character.yearOfBirth
            : 'unknown',
          image: character.image,
        });
      });
    });
  }
  filterImg(houseName){
    console.log(houseName);
    for (let index = 0; index < this.houses.length; index++) {
     if(this.houses[index].name === houseName){
      return this.houses[index].imgUrl
     }
      
    }
  }
}
