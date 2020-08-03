import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImporterService } from './../../services/importer/importer.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  private code: string;
  emailList: Array<any>;
  constructor(
    private route: ActivatedRoute,
    private cimporter: ImporterService
  ) {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      console.log('code query param', this.code);
    });
    this.emailList = [];
  }

  ngOnInit(): void {
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
