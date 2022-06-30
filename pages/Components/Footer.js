import React from 'react'
import styles from '../../styles/Home.module.css'
import Image from 'next/image'

export default function Footer({}) {
    return (<footer className={styles.footer}>
       <Image
            src="/logo_institucion.jpg"
            alt="Institucion"
            width={80}
            height={80}
          />
      <a href="https://www.instagram.com/estnomore" target="_blank" rel="noopener noreferrer">
        Desarrollado por Barbatos{' '}
        <span className={styles.logo}>
          <Image src="/logo.png" alt="Barbatos Logo" width={20} height={20} />
        </span>
      </a>
    </footer>);
  }
