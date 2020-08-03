import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImporterService } from './services/importer/importer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayButton: boolean;
  private code: string;
  emailList: Array<any>;
  constructor(
    private route: ActivatedRoute,
    private cimporter: ImporterService
  ) {
    this.displayButton = true;
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      console.log('code query param', this.code);
    });
    this.emailList = [];
  }

  ngOnInit(): void {
    if (this.code !== undefined) {
      this.displayButton = false;
      this.cimporter.sendToken(this.code).then((res: any) => {
        console.log(res);
        res.data.otherContacts.forEach((arr) => {
          this.emailList.push({
            emailaddress: arr.emailAddresses[0].value
          });
        });
      }).catch((e) => {
        console.log(e);
      });
    }
  }

  auth() {
    this.cimporter.getAuthUrl().then((res: any) => {
      window.open(res.data.authurl, 'Authentication', 'width=800,height=600');
    });
  }
}
