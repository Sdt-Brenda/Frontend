import React from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

import styles from "./styles/Carrusel.module.css";

export default function CarouselFadeExample() {
  return (
    <MDBCarousel showControls fade>
      <MDBCarouselItem
        className={styles.w100dblock}
        itemId={1}
        src='https://img.freepik.com/foto-gratis/blur-hospital_1203-7972.jpg?w=740&t=st=1698126441~exp=1698127041~hmac=4db9272d2458ef6750a608a479ee5bb05f25ecb6b78d65d4cab1a6e6245b2f3f'
        alt='...'
      >

        {/* <--- */}

      </MDBCarouselItem>

      <MDBCarouselItem
        className={styles.w100dblock}
        itemId={2}
        src='https://img.freepik.com/fotos-premium/desenfoque-abstracto-desenfoque-hospital-fondo_1339-72443.jpg?w=740'
        alt='...'
      >

        {/* <--- */}

      </MDBCarouselItem>

      <MDBCarouselItem
        className={styles.w100dblock}
        itemId={3}
        src='https://img.freepik.com/foto-gratis/blur-hospital_1203-7956.jpg?w=740&t=st=1698126766~exp=1698127366~hmac=2f0ef95e0133b0393615f275f03bbd753eba6a5cc737087c46a04d052dac9d36'
        alt='...'
      >

        {/* <--- */}

      </MDBCarouselItem>
    </MDBCarousel>
  );
}
