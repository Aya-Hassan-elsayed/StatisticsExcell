import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { gsap, Power1, Elastic, Bounce, Linear } from 'gsap';
import { HttpClient } from '@angular/common/http';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{
  FileUploadUrl = "http://10.100.102.84:5000/api/Filter/Filter";
  file: any;
  flag = true;
  success: boolean = false;
  error: boolean = false;
  errorMessage: string = "";
  alertType: string = "";

  constructor(
    private http: HttpClient,
    private toaster: ToastrService,
    private dialog: MatDialog,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}


  ngOnInit(): void {
    
  }
  selectfile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  upload() {
    if (!this.file) {
      this.toaster.error("No file selected!");
      return;
    }
  
    let formData = new FormData();
    formData.append('file', this.file);
    this.flag = false;
  
    this.http.post(this.FileUploadUrl, formData)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.flag = true;
          this.toaster.success("Update is Done"); // Show "Update is Done" message
          this.showStyledAlert(data); // Show data received
        },
        (error) => {
          const errorMessage = error.message || "An error occurred during update.";
          this.errorMessage = errorMessage;
          this.error = true;
          this.toaster.error("Error during upload:", errorMessage);
          this.flag = true;
        }
      );
  }
  
  private formatDataToHTML(data: any): string {
    let message = '';
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        message += `<strong>${key}:</strong> ${data[key]}<br>`;
      }
    }
    return message;
  }
  
  private showStyledAlert(data: any) {
    const alertMessage = this.formatDataToHTML(data);
    const config: Partial<IndividualConfig> = {
      closeButton: true, // Show close button
      progressBar: true, // Show progress bar
      toastClass: 'ngx-toastr custom-toast', // Apply custom CSS class for the toaster message
      positionClass: 'toast-top-center', // Set position of the toastr message
      enableHtml: true, // Enable HTML content in the toastr message
      disableTimeOut: true // Do not automatically close
    };
    this.toaster.show(alertMessage, 'Data Received', config); // Display the toastr message
  }

}
