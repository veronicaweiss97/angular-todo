import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({opacity: 0})),
      transition('void => *', [

        animate(2000)
      ]),
      //* means default state
      transition('* => void',[
        animate(1000)
      ] )
    ]),
    trigger('slide', [
      transition('void => *', [
        style({transform: 'translateX(20px)'}),
        animate(1000)
      ])
    ]),//s
    trigger('appear', [
      transition('void => *', [
        style({transform: 'translateY(-80px)'}),
        animate(1000)
      ]),
    ])
  ],

})

export class WindowComponent implements OnInit {

  @Output() onRemove = new EventEmitter()

  inputValue: string = ''
  todos: any = [
    {title: 'Buy bread', idx: Date.now(), isChecked: false},

  ]

  myForm : FormGroup = new FormGroup({
    "title": new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit(): void {
  }
  getInputValue(text: any) {
    this.inputValue = text.target.value
  }
  addTodo(event: any) {
    event.preventDefault()
    if(this.inputValue) {
      this.todos.push({title: this.inputValue, idx: Date.now(), isChecked: false})
    this.inputValue = ''
    }

  }
  onRemoveItem(idx: number) {
    const before = this.todos.slice(0, idx)
    const after = this.todos.slice(idx + 1)
    const newArr = [...before, ...after]
    this.todos = newArr

  }
}
