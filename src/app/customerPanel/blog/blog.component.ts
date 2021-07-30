import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  @Input() blogimg:string ="https://source.unsplash.com/940x650"
  @Input() blogdate:string =  "Date:12/06/2003"
  @Input() blogtitle:string =  "Creativity is nothing but creativity yeah that's it."
  @Input() blogcontent:string =`<span> Blog for Hello santa<br>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi,
  vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate
  enim. Fusce ut euismod ligula, id laoreet ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
  cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque
  nec dui mattis, fringilla magna in, vulputate enim.
  <br>
  Fusce ut euismod ligula, id laoreet ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus
  tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui
  mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. Lorem ipsum dolor sit amet,
  consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta
  vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod
  ligula, id laoreet ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <br>
  Curabitur cursus tincidunt commodo. Nunc justo nisi, vestibulum facilisis porta vestibulum, ultrices volutpat
  arcu. Quisque nec dui mattis, fringilla magna in, vulputate enim. Fusce ut euismod ligula, id laoreet ex. Lorem
  ipsum dolor sit amet, consectetur adipiscing elit. Curabitur cursus tincidunt commodo. Nunc justo nisi,
  vestibulum facilisis porta vestibulum, ultrices volutpat arcu. Quisque nec dui mattis, fringilla magna in, vulputate
  enim. Fusce ut euismod ligula, id laoreet ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
<br><br>
Disclaimers for Hello santa<br>
All the information on this website - hellosanta.in - is published in good faith and for general information purpose only. hellosanta does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website (hellosanta), is strictly at your own risk. Hello Santa will not be liable for any losses and/or damages in connection with the use of our website.
<br><br>
From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone 'bad'.
<br><br>
Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their "Terms of Service" before engaging in any business or uploading any information. Our Privacy Policy was created by the Privacy Policy Generator.
<br><br>
<img src="assets/Promo.png">
Consent<br>
By using our website, you hereby consent to our disclaimer and agree to its terms.
<br><br>
Update<br>
Should we update, amend or make any changes to this document, those changes will be prominently posted here.
  </span>`

  constructor() { }

  ngOnInit() {}

}
