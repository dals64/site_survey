import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


interface Client {
  id:string;
  name: string;
  email: string;
  brandwidth: string;
  transmission_support: string;
  telephone: string;
  router_id: string;
  radio_id: string;
  enterprise_type: string;
}


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  displayedColumns: string[] = ['name', 'enterprise_type', 'transmission_support', 'brandwidth', 'email', 'telephone', 'actions'];
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private modalService: NgbModal, private http: HttpClient) {
    this.dataSource = new MatTableDataSource(this.clients);
  }

  formData = {
    name: '',
    email: '',
    brandwidth: '',
    transmission_support: '',
    telephone: '',
    router_id: '',
    radio_id: '',
    enterprise_type: ''
  }

  public element = {
    id: '',
    name: '',
    email: '',
    brandwidth: '',
    transmission_support: '',
    telephone: '',
    router_id: '',
    radio_id: '',
    enterprise_type: ''
  }

  public radios;
  
  public routers;


  public clients;

  iserror = false;

  error = '';

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/client').subscribe(
      data => {
        this.clients = data;
        this.dataSource = new MatTableDataSource(this.clients);
      },
      error => console.log(error)
    )

    this.http.get('http://localhost:8000/api/radio').subscribe(
      data => {
        this.radios = data;
      },
      error => console.log(error)
    )

    this.http.get('http://localhost:8000/api/router').subscribe(
      data => {
        this.routers = data;
      },
      error => console.log(error)
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, scrollable: true });
  }

  openDeleteModal(del, element){
    this.modalService.open(del, { centered: true, scrollable: true });
    this.element = {
      id: element.id,
      name: element.name,
      email: element.email,
      brandwidth: element.brandwidth,
      transmission_support: element.transmission_support,
      telephone: element.telephone,
      router_id: element.router_id,
      radio_id: element.radio_id,
      enterprise_type: element.enterprise_type
    }
  }

  openEditModal(update, element) {
    this.modalService.open(update, { centered: true, scrollable: true });
    this.element = {
      id: element.id,
      name: element.name,
      email: element.email,
      brandwidth: element.brandwidth,
      transmission_support: element.transmission_support,
      telephone: element.telephone,
      router_id: element.router_id,
      radio_id: element.radio_id,
      enterprise_type: element.enterprise_type
    }
  }

  store() {
    this.iserror = false;
    if (this.formData.name === '' || this.formData.enterprise_type === '' || this.formData.transmission_support === '' || this.formData.brandwidth === '') {
      this.error = "Remplissez tous les champs du formulaire suivis d'une étoile (*)";
      this.iserror = true;
    } else {
      this.http.post('http://localhost:8000/api/client', this.formData).subscribe(
        data => {
          this.modalService.dismissAll()
          alert('Client ajouté avec succès');
          this.formData = {
            name: '',
            email: '',
            brandwidth: '',
            transmission_support: '',
            telephone: '',
            router_id: '',
            radio_id: '',
            enterprise_type: ''
          }
          this.ngOnInit();
        },
        error => {
          this.iserror = true;
          this.error = "Erreur lors de l'ajout, vérifiez les informations";
        }
      )
    }
  }

  edit() {
    this.iserror = false;
    if (this.element.name === '' || this.element.enterprise_type === '' || this.element.transmission_support === '' || this.element.brandwidth === '') {
      this.error = "Remplissez tous les champs du formulaire suivis d'une étoile (*)";
      this.iserror = true;
    } else {
      this.http.put('http://localhost:8000/api/client', this.element).subscribe(
        data => {
          this.element = {
            id: '',
            name: '',
            email: '',
            brandwidth: '',
            transmission_support: '',
            telephone: '',
            router_id: '',
            radio_id: '',
            enterprise_type: ''
          }
          this.modalService.dismissAll()
          alert('Client modifié avec succès');
          this.ngOnInit();
        },
        error => {
          this.element = {
            id: '',
            name: '',
            email: '',
            brandwidth: '',
            transmission_support: '',
            telephone: '',
            router_id: '',
            radio_id: '',
            enterprise_type: ''
          };
          this.iserror = true;
          this.error = "Erreur lors de la modification, vérifiez les informations";
        }
      )
    }
  }

  delete_client() {
    this.http.post('http://localhost:8000/api/client/delete', this.element).subscribe(
      data => {
        this.ngOnInit()
        this.element = {
          id:'',
          name: '',
          email: '',
          brandwidth: '',
          transmission_support: '',
          telephone: '',
          router_id: '',
          radio_id: '',
          enterprise_type: ''
        }
        this.modalService.dismissAll()
      },
      error => {
        alert('Erreur lors de la suppression');
        this.element = {
          id: '',
          name: '',
          email: '',
          brandwidth: '',
          transmission_support: '',
          telephone: '',
          router_id: '',
          radio_id: '',
          enterprise_type: ''
        };
      }
    );
  }

}
