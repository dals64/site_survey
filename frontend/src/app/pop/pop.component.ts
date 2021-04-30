import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Pop {
  id: string;
  localisation: string;
  bst: string;
  client: string;
  olt: string;
}

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.css']
})
export class PopComponent implements OnInit {

  displayedColumns: string[] = ['localisation', 'client', 'bst', 'olt', 'actions'];
  dataSource: MatTableDataSource<Pop>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private modalService: NgbModal, private http: HttpClient) {
    this.dataSource = new MatTableDataSource(this.pops);
  }

  formData = {
    localisation: '',
    client_id: '',
    olt_id: '',
    bst_id:''
  }

  element = {
    id: '',
    localisation: '',
    client_id: '',
    olt_id: '',
    bst_id: ''
  }

  public pops = [];

  public clients;

  public bsts;

  public olts;

  iserror = false;

  error = '';

  ngOnInit(): void {

    this.pops = [];

    this.http.get('http://localhost:8000/api/client').subscribe(
      data => {
        this.clients = data;
      },
      error => console.log(error)
    )

    this.http.get('http://localhost:8000/api/bst').subscribe(
      data => {
        this.bsts = data;
      },
      error => console.log(error)
    )

    this.http.get('http://localhost:8000/api/olt').subscribe(
      data => {
        this.olts = data;
      },
      error => console.log(error)
    )

    this.http.get('http://localhost:8000/api/pop').subscribe(
      data => {
        this.handleData(data);
        this.dataSource = new MatTableDataSource(this.pops);
      },
      error => console.log(error)
    )
  }

  handleData(data) {
    let name;
    let olt;
    let bst;
    data.forEach(elt => {
      this.clients.forEach(client => {
        if (client.id === elt.client_id) {
          name = client.name
        }
      });
      this.olts.forEach(element => {
        if (element.id === elt.olt_id) {
          olt = element.serial_number
        }
      });
      this.bsts.forEach(element => {
        if (element.id === elt.bst_id) {
          bst = element.serial_number
        }
      });
      this.pops.push(
        {
          id: elt.id,
          localisation: elt.localisation,
          client_id: elt.client_id,
          olt_id: elt.olt_id,
          bst_id: elt.bst_id,
          client: name,
          bst: bst,
          olt: olt
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
    if (this.formData.localisation === '') {
      this.error = 'Remplissez le champ localisation'
      this.iserror = true;
    } else {
      this.http.post('http://localhost:8000/api/pop', this.formData).subscribe(
        data => {
          this.modalService.dismissAll()
          alert('POP ajoutée avec succès');
          this.formData = {
            localisation: '',
            client_id: '',
            olt_id: '',
            bst_id: ''
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
    if (this.element.localisation === '') {
      this.error = 'Remplissez le champ localisation'
      this.iserror = true;
    } else {
      this.http.put('http://localhost:8000/api/pop', this.element).subscribe(
        data => {
          this.element = {
            id: '',
            localisation: '',
            client_id: '',
            olt_id: '',
            bst_id: ''
          };
          this.modalService.dismissAll()
          alert('POP modifié avec succès');
          this.ngOnInit();
        },
        error => {
          this.element = {
            id: '',
            localisation: '',
            client_id: '',
            olt_id: '',
            bst_id: ''
          };
          this.iserror = true;
          this.error = "Erreur lors de la modification, vérifiez les informations";
        }
      )
    }
  }

  deletePop() {
    this.http.post('http://localhost:8000/api/pop/delete', this.element).subscribe(
      data => {
        this.ngOnInit()
        this.element = {
          id: '',
          localisation: '',
          client_id: '',
          olt_id: '',
          bst_id: ''
        }
        this.modalService.dismissAll()
      },
      error => {
        alert('Erreur lors de la suppression');
        this.element = {
          id: '',
          localisation: '',
          client_id: '',
          olt_id: '',
          bst_id: ''
        }
      }
    );
  }

}
