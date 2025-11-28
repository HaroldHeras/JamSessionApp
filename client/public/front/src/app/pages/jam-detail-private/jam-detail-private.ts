import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Jam } from '../../interfaces/Jam.interface';
import { Jams } from '../../services/jams/jams';
import {MatTabsModule} from '@angular/material/tabs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { RouterLink} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { MatDivider } from "@angular/material/divider";
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-jam-detail-private',
  imports: [MatTabsModule, MatIcon, RouterLink, MatButton, MatDivider ],
  templateUrl: './jam-detail-private.html',
  styleUrl: './jam-detail-private.css'
})
export class JamDetailPrivate implements OnInit {

  jam:WritableSignal<Partial<Jam>>;
  iframe:WritableSignal<SafeResourceUrl>;
  mensaje:string = "";
  ok:boolean = true;


  constructor(private route:ActivatedRoute, private jams:Jams, private sanitizer:DomSanitizer, private dialog:MatDialog){
    this.jam = signal({});
    this.iframe = signal(this.sanitizer.bypassSecurityTrustResourceUrl(""));
  }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get("id") || "";
    this.jams.getJam(id).subscribe({
      next:(data)=>{
          this.jam.set(data)
          this.iframe.set(this.sanitizer.bypassSecurityTrustResourceUrl(data.ubicacion.url))
          return;

        }
    })
  }


  agregarCanciones(){

    import("../modal-add-canciones/modal-add-canciones")
      .then(({ModalAddCanciones})=>{

        const dialogRef = this.dialog.open(ModalAddCanciones, {
              width: "300px",
              data: this.jam().canciones
        });
      
        dialogRef.afterClosed().subscribe(
          result => {
              if(result!==undefined){
                const cancionesActualizadas = [...this.jam().canciones!, ...result]
                this.jams.updateJam(this.jam()._id!, {canciones:cancionesActualizadas}).subscribe({
                  next: (response:HttpResponse<Jam>)=>{
                    if(response.status===214){
                      this.jam.set(response.body!)
                      this.ok = true;
                      this.mensaje = "Canciones agregadas correctamente"
                      setTimeout(() => {
                        this.mensaje = "";
                      }, 2000);
                    }
                  },
                  error: (err)=>{
                    this.ok = false;
                    this.mensaje = err.error.message;
                    setTimeout(() => {
                      this.mensaje = "";
                    }, 2000);
                  } 
                })
              }
               
          }
        );


      }).catch(err=>{
        this.ok = false;
        this.mensaje = "Error al abrir 'ModalAddCanciones'"
        setTimeout(() => {
          this.mensaje = "";
        }, 2000);
        console.error(err);
      })



  }



}
