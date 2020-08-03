import { Component, OnInit } from '@angular/core';
import { ImporterService } from './../../services/importer/importer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private cimporter: ImporterService
  ) { }

  ngOnInit(): void {
  }

  auth() {
    this.cimporter.getAuthUrl().then((res: any) => {
      window.open(res.data.authurl, 'Authentication', 'width=800,height=600');
    });
  }
}
