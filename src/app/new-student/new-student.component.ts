import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HarryPotterService } from '../shared/services/harry-potter.service';
@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {
  newStudent: FormGroup;

  constructor(
    private fb: FormBuilder,
    private hpService:HarryPotterService,
    private router : Router
) { }

  ngOnInit(): void {
    this.newStudent = this.fb.group({
      name: ['', Validators.required],
      patronus: ['', Validators.required],
      age: ['', Validators.required],
    });
  }
    /**
   * @name onSubmit
   * @author Daniel Ramirez
   * @description create new studen with form values
   */
     onSubmit(f) {
      let newStudent: any = [];
      newStudent = {
    
      };
      this.hpService.newStudent.push({    name: this.newStudent.get('name').value,
      patronus: this.newStudent.get('patronus').value,
      age: this.newStudent.get('age').value,
      image: '',});
      
      this.newStudent.reset();
      
      this.newStudent.markAsPristine();
      this.newStudent.markAsUntouched();
      this.router.navigate(['home'])
  }
}