import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeroService } from './hero.service';

import { Hero } from './hero';

@Component({
  selector: 'my-heroes',
  // templateUrl: './app.component.html',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']

})
export class HeroesComponent implements OnInit {
  @Input() hero: Hero;

  heroes: Hero[] = [];
  selectedHero: Hero;
  constructor(
    private heroService: HeroService,
    private router: Router) { }

  ngOnInit(): void {
    this.heroService.getHeroes().then(heroes => {
      this.heroes = heroes;
    });
  }

  onSelect(hero: Hero): void { this.selectedHero = hero; }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }


}
