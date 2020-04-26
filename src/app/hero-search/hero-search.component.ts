import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>; // The $ is a convention that indicates heroes$ is an Observable, not an array
  private searchTerms = new Subject<string>(); // is an RxJS Subject

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  /* A Subject is both a source of observable values & an Observable itself. 
  You can subscribe to a Subject as you would any Observable.
  You can also push values into that Observable by calling its next(value) method as the search() method does. */
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait until the flow of new string events pauses for 300ms before passing along the latest string
      // You'll never make requests more frequently than 300ms
      debounceTime(300),

      // ensures that a request is sent only if the filter text changed
      distinctUntilChanged(),

      /* switchMap() calls the search service for each search term that makes it through debounce() and distinctUntilChanged(). 
      It cancels & discards previous search observables, 
      returning only the latest search service observable */
      // https://www.learnrxjs.io/learn-rxjs/operators/transformation/switchmap
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
  
}
