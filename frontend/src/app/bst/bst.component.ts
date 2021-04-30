import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


interface Bst {
  id: string;
  mac_address: string;
  serial_number: string;
  radio: string;
}

@Component({
  selector: 'app-bst',
  templateUrl: './bst.component.html',
  styleUrls: ['./bst.component.css']
})
export class BstComponent implements OnInit {

  displayedColumns: string[] = ['mac_address', 'serial_number', 'radio', 'actions'];
  dataSource: MatTableDataSource<Bst>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private modalService: NgbModal, private http: HttpClient) {
    this.dataSource = new MatTableDataSource(this.bsts);
  }

  formData = {
    mac_address: '',
    serial_number: '',
    radio_id:''
  }

  public element = {
    id: '',
    mac_address: '',
    serial_number: '',
    radio_id: ''
  }

  public radios;

  public bsts;

  iserror = false;

  error = '';

  ngOnInit(): void {

    this.http.get('http://localhost:8000/api/bst').subscribe(
      data => {
        this.bsts = data;
        this.dataSource = new MatTableDataSource(this.bsts);
      },
      error => console.log(error)
    )

    this.http.get('http://localhost:8000/api/radio').subscribe(
      data => {
        this.radios = data;
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
      serial_number: element.serial_number,
      radio_id: element.radio_id
    }
  }

  openEditModal(update, element) {
    this.modalService.open(update, { centered: true, scrollable: true });
    this.element = {
      id: element.id,
      mac_address: element.mac_address,
      serial_number: element.serial_number,
      radio_id: element.radio_id
    }
  }

  

  store() {
    this.iserror = false;
    console.log(this.formData)
    if (this.formData.serial_number === '' || this.formData.mac_address === '') {
      this.error = 'Remplissez tous les champs obligatoires (*)'
      this.iserror = true;
    } else {
      this.http.post('http://localhost:8000/api/bst', this.formData).subscribe(
        data => {
          this.modalService.dismissAll()
          alert('BST ajoutée avec succès');
          this.formData = {
            mac_address: '',
            serial_number: '',
            radio_id: ''
          }
          this.ngOnInit();
        },
        error => {
          console.log(error);
          this.iserror = true;
          this.error = "Erreur lors de l'ajout, vérifiez les informations";
        }
      )
    }
  }

  edit() {
    this.iserror = false;
    if (this.element.serial_number === '' || this.formData.mac_address === '') {
      this.error = 'Remplissez les champs obligatoires'
      this.iserror = true;
    } else {
      this.http.put('http://localhost:8000/api/bst', this.element).subscribe(
        data => {
          this.element = {
            id: '',
            mac_address: '',
            serial_number: '',
            radio_id: ''
          }
          this.modalService.dismissAll()
          alert('BST modifiée avec succès');
          this.ngOnInit();
        },
        error => {
          this.element = {
            id: '',
            mac_address: '',
            serial_number: '',
            radio_id: ''
          }
          this.iserror = true;
          this.error = "Erreur lors de la modification, vérifiez les informations";
        }
      )
    }
  }

  delete_bst() {
    this.http.post('http://localhost:8000/api/bst/delete', this.element).subscribe(
      data => {
        this.ngOnInit()
        this.element = {
          id: '',
          mac_address: '',
          serial_number: '',
          radio_id: ''
        }
        this.modalService.dismissAll()
      },
      error => {
        alert('Erreur lors de la suppression');
        this.element = {
          id: '',
          mac_address: '',
          serial_number: '',
          radio_id: ''
        }
      }
    );
  }
}
