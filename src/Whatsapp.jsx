import React from 'react';
import styles from "./styles/Whatsapp.module.css";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppButton = () => {
  return (
    <a href="https://wa.me/xxxxxxxxxxx" className={styles.whatsappButton}>
      <WhatsAppIcon />
    </a>
  );
};

export default WhatsAppButton;
