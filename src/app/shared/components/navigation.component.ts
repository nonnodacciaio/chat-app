import { Component } from "@angular/core";

@Component({ selector: "navigation", template: `<mat-drawer-container>
  <mat-drawer #drawer [mode]="'over'">Drawer</mat-drawer>
  <mat-drawer-content>
    <button mat-button (click)="drawer.toggle()">Hamburger menu icon</button>
  </mat-drawer-content>
</mat-drawer-container>` })
export class NavigationComponent {}
