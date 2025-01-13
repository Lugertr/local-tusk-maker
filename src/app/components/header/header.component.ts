import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiSwitch } from '@taiga-ui/kit';
import { takeUntil } from 'rxjs';
import { DestroyService } from 'src/app/services/destroy.service';
import { ALT_THEME, DEF_THEME, ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  imports: [ReactiveFormsModule, TuiSwitch],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  protected toggle = false;
  private themeService = inject(ThemeService);
  private destroy$ = inject(DestroyService);
  
  form = new FormGroup({
    themeSwitcherCtr: new FormControl(this.themeService.isDefTheme ? true: false),
  })

  ngOnInit(): void {
    this.form.controls.themeSwitcherCtr.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (isDefTheme) => {
        this.themeService.setTheme(isDefTheme ? DEF_THEME: ALT_THEME)
      } 
    })
  }
}
