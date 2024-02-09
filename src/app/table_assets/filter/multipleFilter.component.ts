import { Component, ViewChild } from '@angular/core';
import { AgFilterComponent } from 'ag-grid-angular';
import { IDoesFilterPassParams, IFilterParams, RowNode, } from 'ag-grid-community';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'filter-component',
  template: `
  <div style="margin: none;padding: 4px;">
    <input
      style="margin: 4px 0 4px 0;  width: 215px;"
      type="text" 
      [(ngModel)]="filterText"
      (ngModelChange)="onInputChanged()"
      placeholder="Search..."
    />
  </div>
`,
})
export class MultipleFilter implements AgFilterComponent {
    params: IFilterParams;
    valueGetter: (rowNode: RowNode) => any;
    filterText: string = '';
  
    agInit(params: IFilterParams): void {
      this.params = params;
      this.valueGetter = params.valueGetter;
    }
  
    doesFilterPass(params: IDoesFilterPassParams) {
      // make sure each word passes separately, ie search for firstname, lastname
      let passed: boolean;
      this.filterText.split(' ').forEach((filterString) => {
        const value = this.valueGetter(params.node);
        if (!value || (value.toString().toLowerCase().indexOf(filterString.toString().toLowerCase()) >= 0)) {
          passed = true;
        }
      });
      return passed;
    }
  
    isFilterActive(): boolean {
      return this.filterText != null && this.filterText !== '';
    }
  
    getModel() {
      console.log('getModel()')
      return { value: this.filterText };
    }
  
    setModel(model: any) {
      console.log('setModel()')
      console.log(model);
      this.filterText = model.value;
    }
  
    onInputChanged() {
      this.params.filterChangedCallback();
    }
  }