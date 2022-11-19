import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image'
import img1 from '../../public/cart_8.jpg'
import img2 from '../../public/store_9.jpg'
import classes from './Slider.module.css'
function UncontrolledExample() {
  return (
    <div>
    <Carousel >
      <Carousel.Item className={classes.main}>
        <Image
          src={img1}
          alt="First slide"  layout="fill" 
        />
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item >
      <Carousel.Item className={classes.main}>
        <Image
          src={img2}
          alt="Second slide"  layout="fill" 
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className={classes.main}>
        <Image
          src={img1}
          alt="Third slide"    layout="fill" 
        />

        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default UncontrolledExample;