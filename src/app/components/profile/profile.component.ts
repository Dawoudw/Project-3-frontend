import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from 'src/app/services/api-service.service';
import Client from 'src/app/models/Client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private modalService: NgbModal, private api: ApiServiceService, private router: Router) { }

  ngOnInit(): void {
    this.client = this.api.getLoggedClient()
    if (this.client == null || this.client === undefined)
    this.router.navigate(["/"]);
    this.client.role ? this.client.Role="Developer" : this.client.Role="Admin"
    this.getClientPoint()
  }
  bugStatus
  solutionStatus
  points
  client
  closeResult = '';

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  async getClientPoint(){
   this.points = await this.api.getPoints(this.client.cId)
   console.log(this.points)
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
