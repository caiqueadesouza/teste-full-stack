import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BasePagination<T> {
    current_page: number = 0
    itens: T[] = []
    first_page_url: string = ""
    from: string = ""
    last_page: number = 0
    laste_page_url: string = ""
    links: any
    next_page_url: string = ""
    path: string = ""
    per_page: number = 0
    prev_page_url: string = ""
    to: string = ""
    total: number = 0
}
