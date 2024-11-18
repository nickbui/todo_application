import { Component, inject, model, signal } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { TodoItem } from '../../todolist/todoItem';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-todo-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
    CommonModule,
  MatButtonModule],
  templateUrl: './new-todo-dialog.component.html',
  styleUrl: './new-todo-dialog.component.css'
})
export class NewTodoDialogComponent {
  readonly dialogRef = inject(MatDialogRef<NewTodoDialogComponent>);
  readonly data = inject<TodoItem>(MAT_DIALOG_DATA);
  readonly newTodoTitle = model(this.data.todoTitle);
  readonly newTodoDesc = model(this.data.todoDescription);
  readonly newTodoDueDate = model(this.data.todoDueDate);

  isFieldsEmpty = signal(false);

  onNoClick(): void{
    this.dialogRef.close();
  }
}
