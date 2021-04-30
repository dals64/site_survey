import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


interface Router {
  id: string;
  maker: string;
  model: string;
  serial_number: string;
}

@Component({
  selector: 'app-router',
  templateUrl: './router.component.html',
  styleUrls: ['./router.component.css']
})
export class RouterComponent implements OnInit {

  displayedColumns: string[] = ['maker', 'model','serial_number', 'actions'];
  dataSource: MatTableDataSource<Router>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private modalService: NgbModal, private http : HttpClient) {
    this.dataSource = new MatTableDataSource(this.radios);
  }

  iserror = false;

  error = '';

  formData = {
    maker: '',
    serial_number: '',
    model:''
  }

  public element = {
    id:'',
    maker:'',
    model:'',
    serial_number:''
  };

  public radios;

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/router').subscribe(
      data => {
        this.radios = data;
        this.dataSource = new MatTableDataSource(this.radios);
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

  openDeleteModal(del, element) {
    this.modalService.open(del, { centered: true, scrollable: true });
    this.element = {
      id: element.id,
      maker: element.maker,
      serial_number: element.serial_number,
      model: element.model
    };
  }

  openEditModal(update, element) {
    this.modalService.open(update, { centered: true, scrollable: true });
    this.element = {
      id: element.id,
      maker: element.maker,
      serial_number: element.serial_number,
      model: element.model
    };
  }

  store() {
    this.iserror = false;
    if (this.formData.serial_number === ''){
      this.error = 'Remplissez le numéro de série'
      this.iserror = true;
    } else {
      this.http.post('http://localhost:8000/api/router', this.formData).subscribe(
        data => {
          this.modalService.dismissAll()
          alert('Routeur ajouté avec succès');
          this.formData = {
            maker: '',
            serial_number: '',
            model: ''
          };
          this.ngOnInit();
        },
        error => {
          this.iserror = true;
          this.error = "Erreur lors de l'ajout, vérifiez le numéro de série";
        }
      )
    }
  }

  edit() {
    this.iserror = false;
    if (this.element.serial_number === '') {
      this.error = 'Remplissez le numéro de série'
      this.iserror = true;
    } else {
      this.http.put('http://localhost:8000/api/router', this.element).subscribe(
        data => {
          this.element = {
            id: '',
            maker: '',
            model: '',
            serial_number: ''
          };
          this.modalService.dismissAll()
          alert('Routeur modifié avec succès');
          this.ngOnInit();
        },
        error => {
          this.element = {
            id: '',
            maker: '',
            model: '',
            serial_number: ''
          };
          this.iserror = true;
          this.error = "Erreur lors de la modification, vérifiez le numéro de série";
        }
      )
    }
  }

  delete_router() {
    this.http.post('http://localhost:8000/api/router/delete', this.element).subscribe(
      data => {
        this.ngOnInit()
        this.element = {
          id: '',
          maker: '',
          model: '',
          serial_number: ''
        };
        this.modalService.dismissAll()
      },
      error => {
        alert('Erreur lors de la suppression');
        this.element = {
          id: '',
          maker: '',
          model: '',
          serial_number: ''
        };
      }
    );
  }

}
