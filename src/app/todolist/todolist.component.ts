import { Component, signal, model, ElementRef, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoItem } from './todoItem';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [MatInputModule, MatIconModule, MatButtonModule, MatListModule, FormsModule, CommonModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {
  todoTaskList = signal<TodoItem[]>([]);
  isFieldsEmpty = signal(false);

  inputTodoTitle = new FormControl('');
  inputTodoDueDate = new FormControl(null);
  inputTodoDescription = new FormControl('');

  addToTodoTask(): void {
    if (this.inputTodoTitle.value === '' || this.inputTodoDueDate === null || this.inputTodoDescription.value === '') {
      this.isFieldsEmpty.set(true);
      return;
    }
    console.log("Adding Todo item to List!");
    this.todoTaskList.update(newTodoItem => [...newTodoItem, { todoTitle: this.inputTodoTitle.value!, todoDueDate: this.inputTodoDueDate.value!, todoDescription: this.inputTodoDescription.value! }]);
    this.clearInputFields();
    this.isFieldsEmpty.set(false);
  }

  clearInputFields(): void {
    this.inputTodoTitle.setValue('');
    this.inputTodoDueDate.setValue(null);
    this.inputTodoDescription.setValue('');
  }

}
