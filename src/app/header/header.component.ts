import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart.service';
import { I18nConfigService } from 'src/app/i18n-config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //Newly Added
  i18nConf: I18nConfigService;

  message: any = {};
  subscription: Subscription;
 
 
  constructor(private cartService: CartService,i18nConf: I18nConfigService) {
     // subscribe to app component messages
     this.subscription = this.cartService.getMessage().subscribe(message => { this.message = message; });

     this.i18nConf = i18nConf;
     this.i18nConf.setUpConf();
   }
  
  
  ngOnInit() {
  
  }

}
