import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.css']
})
export class PatientRecordComponent implements OnInit {
  registerForm: FormGroup;
    submitted = false;


    patient_data: any;
    patient_details: any = [];
    Medical_history: any = ['Diabetes', 'Hypertension', 'Heart disease', 'Asthma', 'High Cholesterol',
      'Thyroid', 'Cancer', 'Jaundice']

    constructor(private formBuilder: FormBuilder, private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            age: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
            weight: [''],
            mdeicalhistory: ['', Validators.required],
            gender: ['male', Validators.required],
            mobile: ['', [Validators.required,Validators.maxLength(10),Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
            file: [null]
        });
    }

    /*########################## File Upload ########################*/
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registerForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    changeWebsite(e) {
      console.log(e.target.value);
    }

    onSubmit() {
      console.log(this.registerForm.controls);
     console.log(this.registerForm.invalid);
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        alert('SUCCESS!! :-)\n\n')
        // this.patient_data = JSON.stringify(this.registerForm.value);
        this.patient_data = (JSON.stringify(this.registerForm.value));
        console.log(JSON.parse(this.patient_data));
        this.patient_details.push(JSON.parse(this.patient_data));
        console.log(this.patient_details);
    }
}
