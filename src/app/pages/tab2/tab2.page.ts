import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  GuardianList;
  constructor(private connection:ConnectionService) { 
    this.GuardianList = this.connection.GuardianList;
  }

  ngOnInit() {
  }

}
