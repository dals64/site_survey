import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


interface Onu {
  id: string;
  mac_address: string;
  ip_address: string;
  client: string;
}

@Component({
  selector: 'app-onu',
  templateUrl: './onu.component.html',
  styleUrls: ['./onu.component.css']
})
export class OnuComponent implements OnInit {

  displayedColumns: string[] = ['mac_address', 'ip_address', 'client', 'actions'];
  dataSource: MatTableDataSource<Onu>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private modalService: NgbModal, private http: HttpClient) {
    this.dataSource = new MatTableDataSource(this.onus);
  }

  formData = {
    mac_address: '',
    ip_address: '',
    client_id: ''
  }

  element = {
    id: '',
    mac_address: '',
    ip_address: '',
    client_id: ''
  }

  public onus = [];

  public clients;

  iserror = false;

  error = '';

  ngOnInit(): void {
    this.onus = [];
    this.http.get('http://localhost:8000/api/client').subscribe(
      data => {
        this.clients = data;
      },
      error => console.log(error)
    )

    this.http.get('http://localhost:8000/api/onu').subscribe(
      data => {
        this.handleData(data);
        this.dataSource = new MatTableDataSource(this.onus);
      },
      error => console.log(error)
    )
  }

  handleData(data){
    let name;
    data.forEach(elt => {
      this.clients.forEach(client => {
        if (client.id === elt.client_id) {
          name = client.name
        }
      });
      this.onus.push(
        {
          id: elt.id,
          ip_address : elt.ip_address,
          mac_address: elt.mac_address,
          client_id: elt.client_id,
          client: name
        }
      )
    });
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

  openDeleteModal(del, element) {
    this.modalService.open(del, { centered: true, scrollable: true });
    this.element = element;
  }

  openEditModal(edit, element) {
    this.modalService.open(edit, { centered: true, scrollable: true });
    this.element = element;
  }

  store() {
    this.iserror = false;
    if (this.formData.ip_address === '' || this.formData.mac_address === '') {
      this.error = 'Remplissez les adresses MAC et IP'
      this.iserror = true;
    } else {
      this.http.post('http://localhost:8000/api/onu', this.formData).subscribe(
        data => {
          this.modalService.dismissAll()
          alert('OLT ajoutée avec succès');
          this.formData = {
            mac_address: '',
            ip_address: '',
            client_id: ''
          };
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
    if (this.element.ip_address === '' || this.element.mac_address === '') {
      this.error = 'Remplissez les adresses MAC et IP'
      this.iserror = true;
    } else {
      this.http.put('http://localhost:8000/api/onu', this.element).subscribe(
        data => {
          this.element = {
            id: '',
            mac_address: '',
            ip_address: '',
            client_id: ''
          };
          this.modalService.dismissAll()
          alert('ONU modifiée avec succès');
          this.ngOnInit();
        },
        error => {
          this.element = {
            id: '',
            mac_address: '',
            ip_address: '',
            client_id: ''
          };
          this.iserror = true;
          this.error = "Erreur lors de la modification, vérifiez les informations";
        }
      )
    }
  }

  deleteOnu() {
    this.http.post('http://localhost:8000/api/onu/delete', this.element).subscribe(
      data => {
        this.ngOnInit()
        this.element = {
          id: '',
          mac_address: '',
          ip_address: '',
          client_id: ''
        }
        this.modalService.dismissAll()
      },
      error => {
        alert('Erreur lors de la suppression');
        this.element = {
          id: '',
          mac_address: '',
          ip_address: '',
          client_id: ''
        }
      }
    );
  }

}
