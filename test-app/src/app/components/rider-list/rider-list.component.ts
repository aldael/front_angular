import { Component, OnInit } from '@angular/core';
import { Rider } from 'src/app/models/rider';
import { RiderService } from 'src/app/services/rider.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Programa } from 'src/app/models/programa';
import { ProgramaService } from 'src/app/services/programa.service';

@Component({
  selector: 'app-rider-list',
  templateUrl: './rider-list.component.html',
  styleUrls: ['./rider-list.component.css']
})
export class RiderListComponent implements OnInit{
 
  riderList = new Array<Rider>()
  programaList = new Array<Programa>()

  id2: number
  rider2: string
  identidad2: string
  
  r = new Rider()

  riderForm: FormGroup
  
  constructor(private riderService: RiderService, private modalService: NgbModal, private programaService: ProgramaService){}

  ngOnInit() {
      this.r.rider = ''
      this.r.identidad = ''
      this.riderForm = new FormGroup({
        'rider': new FormControl(this.r.rider, Validators.required),
        'identidad': new FormControl(this.r.identidad, Validators.required),
        'programa': new FormControl(this.r.apariciones)
      })

      this.riderService.getAll().subscribe((totalResponse: any) => {
        this.riderList = totalResponse
      }, (error: any) => {
        console.error(error)
      })

      this.programaService.getAll().subscribe((totalResponse: any) => {
        this.programaList = totalResponse
      })

      
      
  }

  get rider() {return this.riderForm.get('rider')}
  get identidad() {return this.riderForm.get('identidad')}
  get programa() {return this.riderForm.get('programa')}

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
    let shows = []
    rider.identidad = this.identidad?.value
    rider.rider = this.rider?.value
    shows.push(this.programa?.value)
    rider.apariciones = shows

 /* guardar en array de programs que esta dentro de rider el objeto que seleccionas de la lista */
    this.riderService.add(rider).subscribe(() =>{
      location.reload()
      alert('New Rider')
    }, (error: any) => {
      console.error()
    })
  }

  view(ver: any, r: Rider){
    this.id2 = r.id
    this.rider2 = r.rider
    this.identidad2 = r.identidad

    this.modalService.open(ver).result.then(() => {

      let raidaa = new Rider()
      raidaa.id = this.id2
      raidaa.identidad = this.identidad2
      raidaa.rider = this.rider2
      this.riderService.update(raidaa).subscribe(() =>{
        location.reload()
      },(error: any) => {
        console.error(error)})
    })
  }
}