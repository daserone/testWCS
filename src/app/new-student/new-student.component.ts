import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HarryPotterService } from '../shared/services/harry-potter.service';
@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss'],
})
export class NewStudentComponent implements OnInit {
  newStudent: FormGroup;
  base64textString: String;
  constructor(
    private fb: FormBuilder,
    private hpService: HarryPotterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newStudent = this.fb.group({
      name: ['', Validators.required],
      patronus: ['', Validators.required],
      age: ['', Validators.required],
      image: ['', Validators.required],
    });
  }
  /**
   * @name uploadImg
   * @author Daniel Ramirez
   * @description change event on file upload
   */
  uploadImg(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }
  /**
   * @name _handleReaderLoaded
   * @author Daniel Ramirez
   * @description we took the reader onload event and convert the binary string to base64
   */
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }
  /**
   * @name onSubmit
   * @author Daniel Ramirez
   * @description create new studen with form values
   */
  onSubmit(f) {
    let newStudent: any = [];
    newStudent = {};
    this.hpService.newStudent.push({
      name: this.newStudent.get('name').value,
      patronus: this.newStudent.get('patronus').value,
      age: this.newStudent.get('age').value,
      image: 'data:image/jpeg;base64,' + this.base64textString,
    });
    this.base64textString = '';
    this.newStudent.reset();

    this.newStudent.markAsPristine();
    this.newStudent.markAsUntouched();
    this.router.navigate(['home']);
  }
}
