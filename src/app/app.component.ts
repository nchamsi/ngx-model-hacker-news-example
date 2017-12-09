import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators/filter';

import { environment as env } from '@env/environment';
import { HelpComponent } from '@app/help/help.component';

@Component({
  selector: 'nmhne-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menu = [
    { title: 'Top', path: 'posts/top' },
    { title: 'New', path: 'posts/new' },
    { title: 'Show', path: 'posts/show' },
    { title: 'Ask', path: 'posts/ask' },
    { title: 'Job', path: 'posts/job' }
  ];
  year = new Date().getFullYear();
  version = env.version;

  constructor(
    private router: Router,
    private titleService: Title,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof ActivationEnd))
      .subscribe((event: ActivationEnd) => {
        let lastChild = event.snapshot;
        while (lastChild.children.length) {
          lastChild = lastChild.children[0];
        }
        const { title } = lastChild.data;
        this.titleService.setTitle(
          title ? `${title} - ${env.appName}` : env.appName
        );
      });
  }

  onHelpClick() {
    this.dialog.open(HelpComponent);
  }
}
