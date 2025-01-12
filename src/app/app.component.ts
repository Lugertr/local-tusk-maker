import { TUI_DARK_MODE, TuiRoot } from "@taiga-ui/core";
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { LoadingBarService } from "./services/loading-bar.service";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: 'app-root',
    imports: [AsyncPipe, RouterOutlet, TuiRoot, FooterComponent, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly darkMode = inject(TUI_DARK_MODE);
  
  readonly isProgressBarShown$ = this.loadingBarService.show$;
  
  constructor(
    private readonly loadingBarService: LoadingBarService,
  ) {}}
