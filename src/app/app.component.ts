import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, PatternValidator } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userForm: FormGroup;
  users: any[] = [];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.pattern(/^[1-9]\d{9}$/), this.validatePhoneNumber]],
      email: ['', [Validators.email]]
    });
  }

  validatePhoneNumber(control: FormControl): { [s: string]: boolean } | null {
    const value = control.value;
    if (value && value.length === 10 && value[0] !== '0' && value[3] !== '0') {
      return null;
    } else {
      return { 'pattern': true };
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.users.push(this.userForm.value);
      this.userForm.reset();
    }
  }
}
