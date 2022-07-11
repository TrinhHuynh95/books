import {Subject} from "rxjs";

interface FilterPaginationModel {
  field: string
  value: string
  title: string
}

export class PaginationModel <M>{
  subjectParams = new Subject()
  "limit": number;
  "order": string;
  "page": number;
  "total": number;
  "data": M[]
  "filter": FilterPaginationModel
  limitOptions = [5, 10, 15, 25]

  get params() {
    const params: any = {
      order: this.order || '',
      limit: this.limit || 10,
      page: this.page || 1,
    }
    if (this.filter?.field) {
      params[this.filter.field] = this.filter.value
    }
    return params
  }

  setParams (params: any) {
    if (params.page) {
      this.page = params.page
    }
    if (params.order) {
      this.order = params.order
      this.page = 1
    }
    if (params.limit) {
      this.limit = params.limit
      this.page = 1
    }
    if (params.filter) {
      this.filter = params.filter
      this.page = 1
    }
    this.subjectParams.next(this.params)
  }

  subscribeParams(cb: (value: any) => void) {
    return this.subjectParams.subscribe(cb)
  }
}
