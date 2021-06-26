import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HarryPotterService } from '../shared/services/harry-potter.service';
import { Character } from '../shared/models/characters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  characterList:Character[] = []
  title:string = 'Characters';
  loading:boolean = false;
  currentYear:number;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private hpService:HarryPotterService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.currentYear=new Date().getFullYear();
    
  }
  changeTable(from,house?){
    this.loading=true;
    this.hpService.getCharacters(from,house).subscribe((res:any)=>{
      this.loading=false;
      this.title=house?house:from;
      this.characterList=[]
      res.forEach(character => {
        this.characterList.push(
          {
            name:character.name,
            patronus:character.patronus?character.patronus:'undefined',
            age:character.yearOfBirth?this.currentYear-character.yearOfBirth:'undefined',
            image:character.image
          }
        )
      });

    })
  }
}
