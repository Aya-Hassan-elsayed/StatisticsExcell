import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { gsap, Power1, Elastic, Bounce, Linear } from 'gsap';
import { HttpClient } from '@angular/common/http';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  FileUploadUrl = "http://10.100.102.84:5000/api/Filter/Filter";
  file: any;
  flag = true;
  success: boolean = false;
  error: boolean = false;
  errorMessage: string = "";
  alertType: string = "";
  receivedData: any; // Property to store received data

  @ViewChild('btn') btnElement!: ElementRef;


  constructor(
    private http: HttpClient,
    private toaster: ToastrService,
    private dialog: MatDialog,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    const btnElement = this.el.nativeElement.querySelector('#btn');
    if (btnElement) {
      btnElement.addEventListener('mouseleave', () => {
        gsap.to("#btnSVG", .3, { fill: "#e96f8c" });
      });

      btnElement.addEventListener('click', () => {
        const submit = gsap.timeline();
        submit.to("#title, #disclaimer, #btn, #email, #placeholder", { opacity: 0, pointerEvents: "none", ease: Power1.easeInOut });
        submit.to("#inputSVG, #btnSVG", .5, { morphSVG: { shape: "#invisible-heart" }, ease: Power1.easeInOut });
        submit.to("#inputSVG, #btnSVG", .5, { y: -30, ease: Power1.easeInOut });
        submit.to("#success", .5, { delay: -.5, opacity: 1, ease: Power1.easeInOut });

        const mailbox = gsap.timeline();
        mailbox.to({}, 1, {});
        mailbox.to("#mailbox-stick", 3, { rotate: -90, x: 15, transformOrigin: "left", ease: Elastic.easeOut });
        mailbox.to("#cover-closed", 1, { delay: -3, y: -1, rotation: -180, transformOrigin: "bottom", ease: "Bounce.easeOut" });
        mailbox.to("#cover-open-side", .15, { delay: -2, opacity: 0 });
        mailbox.to("#heart", .15, { delay: -3, opacity: 0 });
        mailbox.to("#mail", 0, { delay: -3, opacity: 1, display: "block" });
        mailbox.to("#mail", 1, { delay: -3, scale: 1, x: 0, transformOrigin: "right", ease: "back.out" });

        const wrapper = gsap.timeline({ delay: 3 });
        wrapper.to("#svgWrapper", 1, { scale: .8, ease: Bounce.easeOut });
        wrapper.to("#svgWrapper", 1, { delay: -.6, x: "-200%", rotate: 9, ease: Power1.easeIn });
        wrapper.to("#title, #disclaimer, #btn, #email, #placeholder", 0, { opacity: 1, pointerEvents: "all" });
        wrapper.to("#inputSVG", 0, { morphSVG: { shape: "#inputSVG" }, y: 0 });
        wrapper.to("#btnSVG", 0, { morphSVG: { shape: "#btnSVG" }, y: 0 });
        wrapper.to("#success", 0, { opacity: 0 });
        wrapper.to("#mailbox-stick", 0, { rotate: 0, x: 0, transformOrigin: "left" });
        wrapper.to("#cover-closed", 0, { rotation: 0, y: 0, transformOrigin: "bottom" });
        wrapper.to("#cover-open-side", 0, { opacity: 1 });
        wrapper.to("#heart", 0, { opacity: 1 });
        wrapper.to("#mail", 0, { opacity: 0, scale: 0, x: 0, transformOrigin: "right", display: "none" });
        wrapper.to("#svgWrapper", 0, { x: "200%" });
        wrapper.to("#svgWrapper", 1.5, { x: "0", rotate: -9, ease: "back.out" });
        wrapper.to("#svgWrapper", 1, { delay: -.5, rotate: 0, scale: 1, ease: Bounce.easeOut });
      });
    }
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
          this.toaster.success("Update is Done");
          this.receivedData = data; // Store received data
          this.displayResultTable(); // Display result table
        },
        (error) => {
          const errorMessage = error.error || "An error occurred during update.";
          this.errorMessage = errorMessage;
          this.error = true;
          this.toaster.error("Error during upload:", errorMessage);
          this.flag = true;
        }
      );
  }

  private displayResultTable() {
    // Clear any previous table
    const tableContainer = document.getElementById('tableContainer');
    if (tableContainer) {
      tableContainer.innerHTML = '';
    }

    // Create HTML table from received data
    const table = document.createElement('table');
    const tbody = table.createTBody();

    // Create table rows for key-value pairs
    for (const key in this.receivedData) {
      if (this.receivedData.hasOwnProperty(key)) {
        const row = tbody.insertRow();
        const cell1 = row.insertCell();
        const cell2 = row.insertCell();
        cell1.textContent = key;
        cell2.textContent = this.receivedData[key];
      }
    }

    // Append table to container
    tableContainer?.appendChild(table);
    
    // Apply styles to the table
    table.style.borderCollapse = 'collapse';
    table.style.width = '100%';
    table.style.border = '1px solid #ddd';
    table.style.fontFamily = 'Arial, sans-serif';

    const ths = table.querySelectorAll('th, td');
    ths.forEach((elem: Element, index: number) => {
      (elem as HTMLElement).style.border = '1px solid #ddd';
      (elem as HTMLElement).style.padding = '8px';
      (elem as HTMLElement).style.textAlign = 'left';
      (elem as HTMLElement).style.backgroundColor = index % 2 === 0 ? '#f2f2f2' : ''; // Alternate row background color
    });
  }
}
