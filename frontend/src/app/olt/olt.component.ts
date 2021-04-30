import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


interface Olt {
  id: string;
  mac_address: string;
  serial_number: string;
}

@Component({
  selector: 'app-olt',
  templateUrl: './olt.component.html',
  styleUrls: ['./olt.component.css']
})
export class OltComponent implements OnInit {

  displayedColumns: string[] = ['mac_address', 'serial_number', 'actions'];
  dataSource: MatTableDataSource<Olt>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private modalService: NgbModal, private http : HttpClient) {
    this.dataSource = new MatTableDataSource(this.olts);
  }

  formData = {
    mac_address: '',
    serial_number: '',
  }

  element = {
    id: '',
    mac_address: '',
    serial_number: '',
  }

  iserror=false;

  error = '';

  public olts;

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/olt').subscribe(
      data => {
        this.olts = data;
        this.dataSource = new MatTableDataSource(this.olts);
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
      mac_address: element.mac_address,
      serial_number: element.serial_number
    }
  }

  openEditModal(edit, element) {
    this.modalService.open(edit, { centered: true, scrollable: true });
    this.element = {
      id: element.id,
      mac_address: element.mac_address,
      serial_number: element.serial_number
    }
  }

  store() {
    this.iserror = false;
    if (this.formData.serial_number === '' || this.formData.mac_address === '') {
      this.error = 'Remplissez tous les champs du formulaire'
      this.iserror = true;
    } else {
      this.http.post('http://localhost:8000/api/olt', this.formData).subscribe(
        data => {
          this.modalService.dismissAll()
          alert('OLT ajoutée avec succès');
          this.formData = {
            mac_address: '',
            serial_number: ''
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
    if (this.element.serial_number === '') {
      this.error = 'Remplissez tous les champs'
      this.iserror = true;
    } else {
      this.http.put('http://localhost:8000/api/olt', this.element).subscribe(
        data => {
          this.element = {
            id: '',
            mac_address: '',
            serial_number: ''
          };
          this.modalService.dismissAll()
          alert('OLT modifiée avec succès');
          this.ngOnInit();
        },
        error => {
          this.element = {
            id: '',
            mac_address: '',
            serial_number: ''
          };
          this.iserror = true;
          this.error = "Erreur lors de la modification, vérifiez les informations";
        }
      )
    }
  }

  delete_olt() {
    this.http.post('http://localhost:8000/api/olt/delete', this.element).subscribe(
      data => {
        this.ngOnInit()
        this.element = {
          id: '',
          mac_address: '',
          serial_number: ''
        };
        this.modalService.dismissAll()
      },
      error => {
        alert('Erreur lors de la suppression');
        this.element = {
          id: '',
          mac_address: '',
          serial_number: ''
        };
      }
    );
  }


}
