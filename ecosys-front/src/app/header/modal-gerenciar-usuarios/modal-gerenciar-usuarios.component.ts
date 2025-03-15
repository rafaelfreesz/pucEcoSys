import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-modal-gerenciar-usuarios',
  templateUrl: './modal-gerenciar-usuarios.component.html',
  styleUrls: ['./modal-gerenciar-usuarios.component.css']
})
export class ModalGerenciarUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  constructor() {
    for(let i=0; i<10;i++){
      this.usuarios.push(new Usuario('aaa',String(i),'Gerência','1',new Date()))
    }
  }

  ngOnInit(): void {
  }

  fechar(){

  }

}
