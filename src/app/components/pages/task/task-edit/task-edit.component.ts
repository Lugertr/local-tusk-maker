import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TuiCheckbox } from "@taiga-ui/kit";
import { TuiAppearance } from "@taiga-ui/core";
import { TuiCardLarge, TuiForm } from "@taiga-ui/layout";

@Component({
  selector: "app-task-edit",
  imports: [
    ReactiveFormsModule,
    TuiCheckbox,
    TuiCardLarge,
    TuiAppearance,
    TuiForm,
  ],
  templateUrl: "./task-edit.component.html",
  styleUrl: "./task-edit.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEditComponent {}
