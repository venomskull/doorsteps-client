import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styles from '../styles/Home.module.css';

const Categories = ({ data }) => {
  const router = useRouter();
  // console.log(data);

  useEffect(() => {
    if (!localStorage.getItem('userid') || localStorage.getItem('userid') === 'undefined') {
      router.push('/');
    }
  });

  return (
    <>
      <Head>
        <title>Survey</title>
      </Head>
      <div className={styles.navbar}>
        {/* <div className={styles.navContainer}>
          <div className={styles.menuContainer}>
            <ul className={styles.menuList}>
              <li className={styles.menuListItem}>
                <input type='submit' value='Admin' onClick={e => handleAdminClick(e)}
                  className={styles.navButton}
                />
              </li>
            </ul>
          </div>
        </div> */}
      </div>

      <div className={styles.categoryContainer}>

        <h1 className={styles.categoryTitle}>
          Select one Category!
        </h1>
        <div className={styles.categoryItems}>
          {data.map((dat, idx) => (
            <Link key={idx} href={`/questionnaire/${dat}`}>
              <a className={styles.categoryItem}> {dat}</a>
            </Link>
          ))}
        </div>

      </div>
    </>
  )
}

export default Categories;

export const getServerSideProps = async () => {
  const data = await fetch('http://localhost:8800/api/questions/distinctcategory').then(res => res.json());

  return {
    props: {
      data
    }
  }
}