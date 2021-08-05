import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  constructor() { }
  ngOnInit() {
    const searchbar = document.querySelector('ion-searchbar');
    const der = document.getElementById('list') as HTMLInputElement
    const items = Array.from<any>(der.children);
    searchbar.addEventListener('ionInput', handleInput);
    function handleInput(event) {
      const query = event.target.value.toLowerCase();
      requestAnimationFrame(() => {
        items.forEach(item => {
          const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
          item.style.display = shouldShow ? 'block' : 'none';
        });
      });
    }
  }
}
