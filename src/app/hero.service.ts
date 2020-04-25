import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // Define the heroesUrl of the form :base/:collectionName with the address of the heroes resource on the server. 
  // Here base is the resource to which requests are made,
  // and collectionName is the heroes data object in the in-memory-data-service.ts.
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl)
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`); // backticks ( ` ) that define a JavaScript template literal for embedding the id: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    return of(HEROES.find(hero => hero.id === id));
  }
}