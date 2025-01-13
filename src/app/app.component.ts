import { TuiRoot } from "@taiga-ui/core";
import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { LoadingBarService } from "./services/loading-bar.service";
import { AsyncPipe } from "@angular/common";
import { ThemeService } from "./services/theme.service";
import { Theme } from "@shared/types";
import { DestroyService } from "./services/destroy.service";
import { takeUntil } from "rxjs";

@Component({
    selector: 'app-root',
    imports: [AsyncPipe, RouterOutlet, TuiRoot, FooterComponent, HeaderComponent],
    providers: [DestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  theme: Theme = null;
  protected readonly loadingBarService = inject(LoadingBarService);
  private destroy$ = inject(DestroyService);
  private themeService = inject(ThemeService);

  readonly isProgressBarShown$ = this.loadingBarService.show$;

  ngAfterViewInit(): void {
    this.themeService.theme$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (theme) => {
        this.theme = theme;
      }
    });
  }

}
