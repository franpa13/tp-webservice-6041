import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideFilm,
  lucideCar,
  lucideArrowLeftRight,
  lucideMusic,
  lucideGlobe,
  lucideMenu,
  lucideX,
  lucideLayoutGrid,
} from '@ng-icons/lucide';
import { HlmButton } from '../../libs/button/src/lib/hlm-button';
import { HlmIcon } from '../../libs/icon/src/lib/hlm-icon';

export const NAV_LINKS = [
  { label: 'Peliculas', path: '/peliculas', icon: 'lucideFilm' },
  { label: 'Autos', path: '/autos', icon: 'lucideCar' },
  { label: 'Conversor', path: '/conversor', icon: 'lucideArrowLeftRight' },
  { label: 'Audio', path: '/audio', icon: 'lucideMusic' },
  { label: 'Otra Api', path: '/otra-api', icon: 'lucideGlobe' },
] as const;

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgIcon, HlmButton, HlmIcon],
  providers: [
    provideIcons({ lucideFilm, lucideCar, lucideArrowLeftRight, lucideMusic, lucideGlobe, lucideMenu, lucideX, lucideLayoutGrid }),
  ],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  readonly links = NAV_LINKS;
  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
