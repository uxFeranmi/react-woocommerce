import Link from 'next/link';
import { useEffect } from 'react';

import './styles/carousel.scss';

const Carousel = (props)=> {
  let slides = [],
    slideshow,
    prevSlide,
    carousel,
    playing = true,
    nextSlide = 0;

  const switchSlides = ()=> {
    console.log('Slideshow interval');
    if (slides[nextSlide])
      slides[nextSlide].classList.add('is-current-slide');
    console.log(slides[nextSlide]);

    if (slides[prevSlide])
      slides[prevSlide].classList.remove('is-current-slide');
    console.log(slides[prevSlide]);

    if (slides.length > 1) {
      prevSlide = nextSlide;
      if (nextSlide + 1 === slides.length)
        nextSlide = 0;
      else
        nextSlide = nextSlide + 1;
      console.log(nextSlide);
    }
  };

  useEffect(()=> {
    clearInterval(slideshow);
    switchSlides(); //Dont't wait 5 secs before displaying the first slide.
    slideshow = setInterval(switchSlides, 5000);

    window.onscroll = ()=> {
      console.log('onScroll event');
      // If the carousel is almost scrolled out of view... (only bottom 10px visible)
      if (carousel && carousel.getBoundingClientRect().bottom < 10)
        if (slideshow) {
          clearInterval(slideshow);
          slideshow = null;
        }
      else
        if (!slideshow) {
          slideshow = setInterval(switchSlides, 5000);
        }
    };
  });

  return (<div className={`${props.className} carousel`} ref={(elem)=> carousel = elem}>
    {props.mediaItems.map((media, index)=> {
      const type = media.mime_type.split('/')[0];

      return ( <Link href={media.caption} key={media.id}>
        <a className="carousel__link"
          ref={(elem)=> slides.push(elem)}
        >
          <span className="carousel__content-mask"></span>
          {
            type === 'image' ? (
              <img className="carousel__content"
                alt={media.alt_text}
                src={media.source_url}
              /> 
            ) : type === 'video' ? (
              <video className="carousel__content"
                preload="metadata" autoPlay="autoplay"
                loop="loop"
              >
                <source type={media.mime_type} 
                  src={media.source_url}
                />
              </video>
            ) : 'Something went wrong'
          }
        </a>
      </Link> );
    })}
  </div>);
};

export default Carousel;