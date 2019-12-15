import Link from 'next/link';

import './styles/carousel.scss';

const Carousel = (props)=> {
  return (<div className={`${props.className} carousel`}>
    {props.carousel.map((media)=> {
      const type = media.mime_type.split('/')[0];

      return ( <Link href={media.caption} key={media.id}>
        <a className="carousel__link is-current-slide">
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