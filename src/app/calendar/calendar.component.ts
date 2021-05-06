import { Component, OnInit,ViewChild,Renderer2, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {
  
  @ViewChild("mesh2") mesh2 : ElementRef; 
  @ViewChild("anioh2") anioh2 : ElementRef; 


  dias = [];
  fillDias = []

  meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  diasSemana = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo']

  anioActual = "";
  mesActual = "";
  fechaActual = "";
  horaCorriendo ="";

  constructor( private _render : Renderer2) {
  }

  cambiarMes(direccion){
    
    //Busco en que mes estoy y calculo su numero
    let numeroMes = (this.meses.findIndex(mesnumero => mesnumero == this.mesActual) + 1);

    this.generarAnimacion(this.mesh2);
    

    if(direccion){
      //MES SIGUIENTE AL ACTUAL (NEXT)

      if(numeroMes == 12){

      this.mesActual = this.meses[0];
      this.anioActual = (parseInt(this.anioActual) + 1).toString();
      this.generarAnimacion(this.anioh2);
        
      }else{
        this.mesActual = this.meses[numeroMes];
      }
      
      
      this.calcularDiasDelMes(parseInt(this.anioActual),(numeroMes + 1))

    }
    else{
      //MES ANTERIOR AL ACTUAL (BACK)
      if(numeroMes == 1){

        this.mesActual = this.meses[11];
        this.anioActual = (parseInt(this.anioActual) - 1).toString()
        this.generarAnimacion(this.anioh2);
        
      }else
      {
        this.mesActual = this.meses[numeroMes - 2];
      }

       
      this.calcularDiasDelMes(parseInt(this.anioActual),(numeroMes - 1))
    }

  }

  /**
   * Calcula cuantos dias tiene el mes pasado por parametro (segun el año en el que este)
   * que dia de la semana empieza el mes y rellena los dias restantes
   * 
   * @param año Mes actual
   * @param mes Mes actual
   */
  calcularDiasDelMes(año : number,mes : number) : void
  {

    this.dias = [];
    this.fillDias = [];
    let hoy = (<HTMLDivElement>document.getElementById(moment().format("D")));

    console.log("mes del parametro: " + (mes - 1).toString() + " mes actual: " + moment().format('M'));

    if(mes.toString() != moment().format('M')){
      
      this._render.removeClass(hoy,"hoy");
    }
    else{
      
      this._render.addClass(hoy,"hoy");
    }
    
    

    //Cantidad de dias del mes
    let date = new Date(año,mes,0).getDate();

    //Cantidad de dias del mes pasado
    let mesPasadoDias = new Date(año,(mes-1),0).getDate();

    //Que dia de la semana empieza 
    let diaInicio = new Date(año,(mes- 1),1).getDay();

    //Creo el array de los dias del mes pasado para rellenar el mes actual
    for (let i = (mesPasadoDias - (diaInicio - 1)) + 1; i <= mesPasadoDias; i++) {
      
      this.fillDias.push(i);
      
    }

     //Creo el array de los dias de este mes
     for (let i = 1; i <= date; i++) {
      
      this.dias.push(i);
      
    }

  }

  generarAnimacion(elemento : ElementRef)
  {
    
    this._render.addClass(elemento.nativeElement,"animate__flipInX");

    setTimeout(() => {
      this._render.removeClass(elemento.nativeElement,"animate__flipInX");
    }, 500);
    
  }

  ngOnInit(): void {

    console.log(moment.locale('es'));

    this.anioActual = moment().format('YYYY');
    this.mesActual = moment().format('MMMM');
    this.fechaActual = moment().format('D MMMM YYYY');
    //Cantidad de dias del mes
    let date = new Date(parseInt(this.anioActual),parseInt(moment().format('M')),0).getDate();

    //Cantidad de dias del mes pasado
    let mesPasadoDias = new Date(parseInt(this.anioActual),(parseInt(moment().format('M')) - 1),0).getDate();

    //Que dia de la semana empieza 
    let diaInicio = new Date(parseInt(this.anioActual),(parseInt(moment().format('M')) - 1),1).getDay();


    //Creo el array de los dias del mes pasado para rellenar el mes actual
    for (let i = (mesPasadoDias - (diaInicio - 1)) + 1; i <= mesPasadoDias; i++) {
      
      this.fillDias.push(i);
      
    }

    //Creo el array de los dias de este mes
    for (let i = 1; i <= date; i++) {
      
      this.dias.push(i);
      
    }

    this.crearHora();

  }
  
  crearHora()
  {
    setInterval( () =>{
      this.horaCorriendo = moment().format("h:mm a");
    },1000);
  }
  
  ngAfterViewInit()
  {
    let hoy = (<HTMLDivElement>document.getElementById(moment().format("D")));
    this._render.addClass(hoy,"hoy");
  }
}
