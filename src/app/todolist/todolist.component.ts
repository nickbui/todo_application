import { Component, signal, model, ElementRef, ViewChild, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoItem } from './todoItem';
import { MatCardModule } from '@angular/material/card';
import { NewTodoDialogComponent } from '../new_todolist_dialog/new-todo-dialog/new-todo-dialog.component';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [MatInputModule, MatIconModule, MatButtonModule, MatListModule, FormsModule, CommonModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {
  todoTaskList = signal<TodoItem[]>([]);
  currentDate = new Date();
  
  todoItem = signal<TodoItem>({
    todoTitle: "",
    todoDueDate: new Date,
    todoDescription: ""
  })

  readonly newTodoDialog = inject(MatDialog);

  constructor(){
    this.todoTaskList.update(newTodoItem => [...newTodoItem, { todoTitle: "Remove Subsriptions", todoDueDate: new Date, todoDescription: "Need to remove subscription for netflix"}]);
  }


  addToTodoTask(): void {
    console.log("Adding Todo item to List!");
    this.todoTaskList.update(newTodoItem => [...newTodoItem, { todoTitle: this.todoItem().todoTitle, todoDueDate: this.todoItem().todoDueDate, todoDescription: this.todoItem().todoDescription}]);
    this.todoItem.set({todoTitle: "", todoDueDate: new Date, todoDescription:""})
  }

  openDialog(): void{
    const dialogRef = this.newTodoDialog.open(NewTodoDialogComponent, {
      data: {todoTitle: this.todoItem().todoTitle, todoDueDate: this.todoItem().todoDueDate, todoDescription: this.todoItem().todoDescription},
      height: '400px',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      if (result !== undefined){
        this.todoItem.set(result)
        this.addToTodoTask();
      }
    });
  }

}
