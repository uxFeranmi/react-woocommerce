import Link from 'next/link';
import { useState, useEffect } from 'react';

import './styles/carousel.scss';

const Carousel = (props)=> {
  let [playing, setPlaying] = useState(true);

  let slides = [],
    slideshow,
    prevSlide,
    carousel,
    nextSlide = 0;

  useEffect(()=> {
    console.log('Scroll effect');
    window.onscroll = ()=> {
      console.log('onScroll event');
      // If the carousel is almost scrolled out of view... (only bottom 10px visible)
      if (carousel && carousel.getBoundingClientRect().bottom < 10)
        if (playing) setPlaying(false);
      else
        if (!playing) setPlaying(true);
    }
  }, []);

  useEffect(()=> {
    console.log('Slideshow effect');
    if (!playing)
      return clearInterval(slideshow);

    slideshow = setInterval(()=> {
      console.log('Slideshow interval');
      slides[nextSlide].classList.add('is-current-slide');
      console.log(slides[nextSlide]);

      if (prevSlide)
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
    }, 5000);
  }, [playing]);

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