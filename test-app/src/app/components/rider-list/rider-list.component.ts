import { Component, OnInit } from '@angular/core';
import { Rider } from 'src/app/models/rider';
import { RiderService } from 'src/app/services/rider.service';

@Component({
  selector: 'app-rider-list',
  templateUrl: './rider-list.component.html',
  styleUrls: ['./rider-list.component.css']
})
export class RiderListComponent implements OnInit{
 
  riderList = new Array<Rider>()
  rider = ""
  identidad: string
  
  constructor(private riderService: RiderService){}

  ngOnInit() {
      this.riderService.getAll().subscribe((totalResponse: any) => {
        this.riderList = totalResponse
      }, (error: any) => {
        console.error(error)
      })
  }

  delete(id: number) {
    this.riderService.delete(id).subscribe(() => {
      location.reload()
      alert('Purga Exitosa!')
    }, (error: any) => {
      console.error(error)
      if (error.status === 500) {
        alert()
      }
    })
  }

  add(){
    let rider = new Rider()
    rider.identidad = this.identidad
    rider.rider = this.rider
    this.riderService.add(rider).subscribe(() =>{
      location.reload()
      alert('New Rider')
    }, (error: any) => {
      console.error(error)
    })
  }

  view(ver: any, r: Rider){
    /* this.rider = r.rider
    this.identidad = r.identidad

    this.modalService.open(ver).result.then(() => {
      let rider = new Rider()

    }) */
  }
}