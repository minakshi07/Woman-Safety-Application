import { Component, OnInit } from '@angular/core';
import { RouterEvent, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages = [
    {
      title: 'Home',
      url: '/menu/first',
      icon: 'home'
    },
    {
      title: 'Protect',
      url: '/menu/second',
      icon: 'information-circle'
    },
    
  ];

  selectedPath = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
   }

  ngOnInit() {
  }
}
