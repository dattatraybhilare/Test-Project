import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from './types';
import { take, map } from 'rxjs/operators';
import { Observable,Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {



  TotalCount = 0;
  TotalAmount = 0;
  FinalAmount = 0;
  oldAmount = 0;

  private subject = new Subject<any>();
 
    sendMessage(message: number) {
        this.subject.next({ text: message });
    }
 
    clearMessage() {
        this.subject.next();
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
  

  constructor() {
    let existingCartItems = JSON.parse(localStorage.getItem('products'));
    if (!existingCartItems) {
      existingCartItems = [];
    }
    this.itemsSubject.next(existingCartItems);
  }

  private itemsSubject = new BehaviorSubject<Product[]>([]);
  items$ = this.itemsSubject.asObservable();

  addToCart(product: Product) {  
    
    console.log(this.TotalCount);
    this.TotalCount += 1; 
    console.log(this.TotalCount);
    var count = this.TotalCount;
  
    this.items$.pipe(
      take(1),
      map((products) => {
        products.push(product);
        console.log('hello');
         console.log(sessionStorage);
        console.log(products);
        var lastElement = products[products.length-1];
        console.log(lastElement);
        console.log(lastElement.price);
         var obj = JSON.stringify(products);
         console.log(obj);
       
      }),
    ).subscribe();
  }



}