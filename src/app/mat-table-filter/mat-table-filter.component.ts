import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../model/employee';
import { EmpFilter, filterOption } from '../model/empfilter';
import { MatSelectChange } from '@angular/material/select';
import {HttpClient} from "@angular/common/http";
import {Observable, startWith, take, tap} from "rxjs";
import {FormControl, FormGroup } from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
  selector: 'app-mat-table-filter',
  templateUrl: './mat-table-filter.component.html',
  styleUrls: ['./mat-table-filter.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatTableFilterComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email','gender'];
 
  empData: Employee[] | undefined;
  
  genders: string[]=['all','male','female'];

  empFilters: EmpFilter[]=[];
  
  defaultValue = "all";

  filterDictionary: object = new Map<string,string>();
  dataSource = new MatTableDataSource<Employee>([]);
  dataSourceFilters = new MatTableDataSource<Employee>([]);
  
  reactiveForm = new FormGroup({
    email: new FormControl(''),
    gender: new FormControl('all'),
  })
  
  observableOutput$ = new Observable();
  
  searchText='';
  

  constructor( private http: HttpClient ) {
    this.http
      .get('https://gorest.co.in/public/v2/users')
      .subscribe((Response) => {
        this.empData = Response as Employee[];
        console.log(this.empData);
        this.dataSource = new MatTableDataSource(this.empData);
        this.dataSourceFilters = new MatTableDataSource(this.empData);
      });
    
    this.observableOutput$ = this.reactiveForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(value => this.applyEmpFilter(value)),
    );
  }


  ngOnInit(): void {

    this.empFilters.push({name:'gender',options:this.genders,defaultValue:this.defaultValue});
    

    this.dataSourceFilters.filterPredicate = function (record,filter) {
      debugger;
      let map = new Map(JSON.parse(filter));
      let isMatch = false;
      for(let [key,value] of map){
        isMatch = (value=="All") || (record[key as keyof Employee] == value); 
        if(!isMatch) return false;
      }
      return isMatch;
    }
    
    this.reactiveForm.valueChanges.subscribe(selectedValue  => {
      
      console.log('some changed')
      console.log(selectedValue, 'selectedValue')
      this.applyEmpFilter(selectedValue);
      // this.changeDetectorRef.markForCheck()
    })
    
  }

  applyEmpFilter(values: any) {
    
    this.filterDictionary = values;
    
    console.log(values, 'values1');
    
    let str = '';
    Object.keys(this.reactiveForm.controls).forEach(key => {
      str += `${key}=${values[key]}&`;
    });
    
    this.http
      .get(`https://gorest.co.in/public/v2/users?${str}`)
      .subscribe((Response) => {
        this.empData = Response as Employee[];
        this.dataSource = new MatTableDataSource(this.empData);
        this.dataSourceFilters = new MatTableDataSource(this.empData);
      });

  }

}
