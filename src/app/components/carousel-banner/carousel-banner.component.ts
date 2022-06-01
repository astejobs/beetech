import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'carousel-banner',
  templateUrl: './carousel-banner.component.html',
  styleUrls: ['./carousel-banner.component.scss']
})
export class CarouselBannerComponent implements OnInit {
  
  slidesStore = [
    /* {
      id:1,
      src:'assets/images/carouselImg1.jpg',
      alt:'Image_1',
      title:'Natural Honey',
      desc: 'Honey',
      desc1: '100% Organic',
      desc2: 'free pickup and delivery available CA'
    }, */
    {
      id:3,
      src:'assets/images/121121.jpg',
      alt:'Image_1',
      title:'Natural Honey',
      desc: 'Honey',
      desc1: '100% Organic',
      desc2: 'free pickup and delivery available CA'
    },
    // {
    //   id:4,
    //   src:'assets/images/3234700.jpg',
    //   alt:'Image_1',
    //   title:'Natural Honey',
    //   desc: 'Honey',
    //   desc1: '100% Organic',
    //   desc2: 'free pickup and delivery available CA'
    // },
    // {
    //   id:5,
    //   src:'assets/images/1604298.jpg',
    //   alt:'Image_1',
    //   title:'Natural Honey',
    //   desc: 'Honey',
    //   desc1: '100% Organic',
    //   desc2: 'free pickup and delivery available CA'
    // },
    /* {
      id:2,
      src:'assets/images/carouselImg33.jpg',
      alt:'Image_1',
      title:'Natural Honey',
      desc: 'Honey',
      desc1: '100% Organic',
      desc2: 'free pickup and delivery available CA'
    } */
  ]

  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoWidth: true,
    autoHeight: true,
    autoplaySpeed:1300,
    //animateIn: 'animate-caption',
    //smartSpeed: 100,
    //responsiveRefreshRate: 100,
    //slideBy: 1,
    lazyLoad: true,
    dots: false,
    navSpeed: 1500,
    navText: [ '<i class="fas fa-chevron-circle-left"></i>', '<i class="fas fa-chevron-circle-right"></i>' ],
    responsive: {
       0: {
        items: 1
      }/* ,
      1920: {
        items: 2
      } */
    },
    nav: true
  }

  constructor() { }

  ngOnInit(): void {
  }

}
