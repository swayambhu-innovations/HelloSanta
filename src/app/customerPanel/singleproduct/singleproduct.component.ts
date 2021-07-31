import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.scss'],
})
export class SingleproductComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const product_filters = document.getElementById('product-filters') as HTMLElement;
    const product_types_container = document.getElementById('product-types-container') as HTMLElement;
    const product_types_title = document.getElementById('product-types-title') as HTMLElement;
    const product_types = document.getElementById('product-types') as HTMLElement;

    product_filters?.addEventListener('click', (event) => {
        const targ = event.target as HTMLElement;
        if (targ.classList.contains('product-filter')) {
            const filter_id = targ.id;
            const filter_type = filter_id.substring(0, filter_id.indexOf('-'));

            var n = 0, type_image_links : string[] = [], type_names : string[] = [];

            switch (filter_type) {
                case 'size':
                    n = 4;
                    type_image_links = [
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    ];
                    type_names = [
                        'type Option 1',
                        'type Option 2',
                        'type Option 3',
                        'type Option 4',
                    ];
                    break;

                case 'frame':
                    n = 4;
                    type_image_links = [
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    ];
                    type_names = [
                        'Frame Option 1',
                        'Frame Option 2',
                        'Frame Option 3',
                        'Frame Option 4',
                    ];
                    break;

                case 'color':
                    n = 4;
                    type_image_links = [
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    ];
                    type_names = [
                        'Color Option 1',
                        'Color Option 2',
                        'Color Option 3',
                        'Color Option 4',
                    ];
                    break;
                    type_image_links = [
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    ];
                    type_names = [
                        'Color Option 1',
                        'Color Option 2',
                        'Color Option 3',
                        'Color Option 4',
                    ];
                    break;

                case 'quantity':
                    n = 4;
                    n = 4;
                    type_image_links = [
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                        'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                    ];
                    type_names = [
                        'Frame Option 1',
                        'Frame Option 2',
                        'Frame Option 3',
                        'Frame Option 4',
                    ];
                    break;
            }

            product_types.innerHTML = '';

            for (var i = 0; i < n; i++) {
                product_types.innerHTML += `
                    <div class="product-type" style="width: 140px;
                    margin: 0 .5em;">
                        <img src="` + type_image_links[i] + `" class="product-type-image">
                        <p class="product-type-name" style="text-align: center;
                        margin-top: .5em;
                        font-size: 1.1rem;
                        font-family: 'Poppins';">` + type_names[i] + `</p>
                    </div>
                `;
            }

            product_types_title.innerHTML = filter_type.charAt(0).toUpperCase() + filter_type.substring(1) + ' Types';

            product_types_container.style.display = 'block';
        }
    }, false);

}
  products=[
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
    {
      "img":"https://source.unsplash.com/940x650",
      "name":"ArtWork Product",
      "description":"Lorem ipsum dolor sit amet, consecteturadipiscing elit. Curabitur cursus tinciduntcommodo. Nunc justo nisi, vestibulum.",
      "price":"2300",
    },
  ]
}
