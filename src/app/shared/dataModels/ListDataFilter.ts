import { SortList } from './SortList';
export class ListDataFilter {
    pageSize: number = 10;
    pageNumber: number = 0;
    searchText: string = '';
    sort: SortList = SortList.asc;
    filter = {} as {
        category: number,
    };
}
