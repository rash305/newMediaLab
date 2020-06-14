import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sign-router',
  templateUrl: './sign-router.component.html',
  styleUrls: ['./sign-router.component.css']
})
export class SignRouterComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.routeAfterUpdate(id);
  }

  routeAfterUpdate(id) {
    this.router.navigate(['/dictionary'], {
      queryParams: {id, type: 'sign-details'},
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // do not trigger navigation
    });
  }
}
