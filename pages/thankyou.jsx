import Head from 'next/head'
import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const Thankyou = () => {
  const router = useRouter();

  const handleCategoryClick = (e) => {
    router.push('/categories');
  }

  const handleHomeClick = (e) => {
    router.push('/');
  }

  return (
    <>
      <Head>
        <title>Survey</title>
      </Head>
      <div className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.menuContainer}>
            <ul className={styles.menuList}>
              <li className={styles.menuListItem}>
                <input type='submit' value='Home' onClick={e => handleHomeClick(e)}
                  className={styles.navButton}
                />
              </li>
              <li className={styles.menuListItem}>
                <input type='submit' value='Categories' onClick={e => handleCategoryClick(e)}
                  className={styles.navButton}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.thankyouContainer}><h1 className={styles.title}>
        Thank you!
      </h1></div>
    </>
  )
}

export default Thankyou