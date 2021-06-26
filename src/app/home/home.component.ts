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
  title: string = 'Characters';
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
}
