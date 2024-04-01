import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject, Observable, ReplaySubject } from "rxjs";
import * as moment from "moment";
import { Router } from "@angular/router";
// import {
//   GoogleLoginProvider,
//   FacebookLoginProvider,
//   AuthService
// } from "angular-6-social-login";

@Injectable({
  providedIn: "root"
})
export class MiddlewareService {
  private cartSubject = new ReplaySubject<any>();
  CartState = this.cartSubject.asObservable();
  Products = [];
  tickets = [];

  isSocialLogin;
  loggedInUser = new ReplaySubject<any>();
  loggedState = this.loggedInUser.asObservable();
  isOpen = false;

  refreshTokenExpired = true;
  // baseUrl = "http://ec2-13-234-238-28.ap-south-1.compute.amazonaws.com:3000";

  baseUrl = "http://ec2-65-0-185-102.ap-south-1.compute.amazonaws.com:3001";

  adminBaseUrl ="http://ec2-65-0-185-102.ap-south-1.compute.amazonaws.com:3001";
  constructor(
    private http: HttpClient,
    private router: Router,
    // public OAuth: AuthService
  ) {}

  ngOnInit() {
    // this.loaderService.show();
  }

  getGame() {
    return this.http.get(
      this.adminBaseUrl + "/common/current-week-game"
      // { headers: headers }
    );
  }
  createAuthrorizationHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem("access_token");
    headers = headers.set("access_token", token);
    return headers;
  }

  addProduct(_product: any) {
    let headers = this.createAuthrorizationHeader();

    let product = this.Products.filter(
      _item => _item.car_id == _product.car_id
    );
    let body;
    if (product[0]) {
      body = {
        number_of_tickets: product[0].number_of_tickets + 1,
        car_id: product[0].car_id
      };
    } else {
      body = {
        number_of_tickets: 1,
        car_id: _product.car_id
      };
    }
    let items = this.http.post(this.baseUrl + "/carts", body, {
      headers: headers
    });

    items.subscribe(res => {
      this.getData();
    });
  }

  getData() {
    const headers = this.createAuthrorizationHeader();
    let cartData = this.http.get(this.baseUrl + "/carts", {
      headers
    });

    cartData.subscribe(res => {
      this.Products = res["tickets"];
      this.getTickets();
      this.cartSubject.next({
        loaded: true,
        products: this.Products,
        tickets: this.tickets,
        total_tickets: res["total_tickets"]
      });
    });
  }

  addQuantity(id) {
    let headers = this.createAuthrorizationHeader();
    let product = this.Products.filter(_item => _item.car_id == id);
    let body = {
      number_of_tickets: product[0].number_of_tickets + 1,
      car_id: product[0].car_id
    };

    let items = this.http.post(this.baseUrl + "/carts", body, {
      headers: headers
    });

    items.subscribe(res => {
      this.getData();
    });
  }

  subtractQuantity(id) {
    let headers = this.createAuthrorizationHeader();
    let product = this.Products.filter(_item => _item.car_id == id);
    let count;
    product[0].number_of_tickets === 1
      ? (count = 0)
      : (count = product[0].number_of_tickets - 1);
    let body = {
      number_of_tickets: count,
      car_id: product[0].car_id
    };

    let items = this.http.post(this.baseUrl + "/carts", body, {
      headers: headers
    });

    items.subscribe(res => {
      this.getData();
    });
  }

  getTotalItems() {
    let totalItems = this.Products.reduce(
      (sum, item) => sum + item.number_of_tickets,
      0
    );
    return totalItems;
  }

  getTickets() {
    this.tickets = [];
    this.Products.forEach(ele => {
      let tickets = ele.number_of_tickets;
      let counter = 0;
      while (tickets--) {
        let element = { ...ele, index: ++counter };
        this.tickets.push(element);
      }
    });
  }

  addPoint(p) {
    try {
      // Make a request object
      const body = {
        cart_id: p.cart_id,
        ticket_id: p.ticket_id,
        index: p.carIndex,
        x_coord: p.x,
        y_coord: p.y
      };
      const headers = this.createAuthrorizationHeader();
      const result = this.http.post(this.baseUrl + "/game/coordinate", body, {
        headers
      });
      result.subscribe(res => {
        if (res["statusCode"] && res["statusCode"] === 200) {
          this.getData();
        }
      });
    } catch (error) {
      console.log("Error in adding point");
    }
  }

  /**
   * @todo
   */
  removePoint(ticketId, i) {
    const requestObject = {
      ticket_id: ticketId,
      index: i
    };
    const headers = this.createAuthrorizationHeader();
    const result = this.http.post(
      `${this.baseUrl}/game/coordinate`,
      requestObject,
      {
        headers
      }
    );
    result.subscribe(res => {
      console.log("res", res);
      if (res["statusCode"] && res["statusCode"] === 200) {
        this.getData();
      }
    });
  }

  removeProduct(id: number) {
    let headers = this.createAuthrorizationHeader();
    let product = this.Products.filter(_item => _item.car_id == id);

    let body = {
      number_of_tickets: 0,
      car_id: product[0].car_id
    };

    let items = this.http.post(this.baseUrl + "/carts", body, {
      headers: headers
    });

    items.subscribe(res => {
      this.getData();
    });
  }

  getCartState(): Observable<any> {
    return this.CartState;
  }

  register(value): Observable<any> {
    this.clearLocalStorage();
    let body;
    if (this.isSocialLogin) {
      let name = value.name.split(" ");
      body = {
        first_name: name[0],
        last_name: name[1],
        email_id: value.email,
        phone1: "123456789",
        phone2: "123456789",
        country: "India",
        age_consent: true,
        terms_and_conditions: true
      };
      localStorage.setItem("userImage", value.image);
    } else {
      body = {
        first_name: value.firstname,
        last_name: value.lastname,
        email_id: value.email,
        phone1: value.phone1,
        phone2: value.phone2,
        country: value.country,
        age_consent: true,
        terms_and_conditions: true,
        password: value.password
      };
    }

    return this.http.post(this.baseUrl + "/user/register", body);
  }

  // refreshToken(): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders()
  //   };
  //   this.clearLocalStorage();
  //   return this.http.post<Observable<any>>(
  //     this.baseUrl + "",
  //     null,
  //     httpOptions
  //   );
  // }

  setToken(res) {
    localStorage.setItem("access_token", res.access_token);
    localStorage.setItem("refresh_token", res.refresh_token);
    localStorage.setItem("user", JSON.stringify(res));
    // const expiresAt = moment().add(res.expires_in, "second");
    // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    this.refreshTokenExpired = false;
    this.loggedInUser.next(JSON.parse(localStorage.getItem("user")));
  }

  public logout() {
    let headers = this.createAuthrorizationHeader();
    this.refreshTokenExpired = true;
    this.clearLocalStorage();
    this.Products = [];
    this.cartSubject.next({ loaded: true, products: this.Products });
    return this.http.post(this.baseUrl + "/user/logout", null, {
      headers: headers
    });
  }

  public clearLocalStorage() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    // localStorage.removeItem("expires_at");
    localStorage.removeItem("user");
    localStorage.removeItem("userImage");
    this.refreshTokenExpired = true;
    this.loggedInUser.next(null);
  }

  public getToken(): string {
    return localStorage.getItem("access_token");
  }

  public getRefreshToken(): string {
    return localStorage.getItem("refresh_token");
  }

  login(value) {
    // const headers = new HttpHeaders();
    let body = {
      email_id: value.email,
      password: value.password
    };
    this.clearLocalStorage();

    return this.http.post(this.baseUrl + "/user/login", body);
  }

  socialLogin(value) {
    let body = {
      email_id: value.email
    };

    this.clearLocalStorage();
    localStorage.setItem("userImage", value.image);
    return this.http.post(this.baseUrl + "/user/login/social", body);
  }
  homeData() {
    return this.http.get(
      this.baseUrl + "/home"
      // { headers: headers }
    );
  }

  carData() {
    return this.http.get(
      this.baseUrl + "/cars"
      // { headers: headers }
    );
  }

  getUserDetails(): Observable<any> {
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      this.loggedInUser.next(user);
      if (user.image) {
        this.isSocialLogin = true;
      }
      this.refreshTokenExpired = false;
    }
    return this.loggedState;
  }

  socialLogout() {
    // this.OAuth.signOut();
    this.isSocialLogin = false;
    this.refreshTokenExpired = true;
    this.Products = [];
    this.cartSubject.next({ loaded: true, products: this.Products });
  }
  // addProduct(item) {
  //   this.productAdded.emit(item);
  // }

  togglemodel() {
    this.isOpen = !this.isOpen;
  }

  createOrder(token) {
    let headers = this.createAuthrorizationHeader();
    let user = JSON.parse(localStorage.getItem("user"));
    let body = {
      name: user.first_name + " " + user.last_name,
      email_id: user.email_id,
      source: "tok_visa"
    };

    return this.http.post(this.baseUrl + "/order", body, {
      headers
    });
  }

  searchEmail(email) {
    let headers = new HttpHeaders();
    headers = headers.set("email_id", email);
    return this.http.get(this.baseUrl + "/user/lookup", {
      headers
    });
  }

  resetPassword(email, password, confpassword) {
    let body = {
      email_id: email,
      new_password: password,
      confirm_password: confpassword
    };

    return this.http.post(this.baseUrl + "/user/forgot_password", body);
  }
}
