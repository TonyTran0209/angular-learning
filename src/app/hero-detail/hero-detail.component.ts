import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute, // holds parameter information of URL
    private heroService: HeroService, // gets hero data from the remote server & this component will use it to get the hero-to-display
    private location: Location, // service for interacting with the browser; to navigate back to the view that navigated here
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // route parameters are always strings
    // (+) operator converts the string to a number (which is what a hero id should be)
    // route.snapshot is a static image of the route information shortly after the component was created
    // paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id of the hero to fetch

    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
