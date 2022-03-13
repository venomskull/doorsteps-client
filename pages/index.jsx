import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styles from '../styles/Home.module.css'
// import '../styles/styles.css';

const Home = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const router = useRouter();

  const submitForm = async (data) => {
    // console.log(data);
    await fetch('http://localhost:8800/api/surveyuser/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        localStorage.setItem('userid', JSON.stringify(res._id));
        router.push('/categories');
      })
      .catch(res => {
        console.log(res);
      })
  }

  const handleAdminClick = (e) => {
    router.push('/createquestions');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Survey</title>
      </Head>

      <div className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.menuContainer}>
            <ul className={styles.menuList}>
              <li className={styles.menuListItem}>
                <input type='submit' value='Admin' onClick={e => handleAdminClick(e)}
                  className={styles.navButton}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Survey!
        </h1>


        <form onSubmit={handleSubmit(submitForm)} className={styles.formContainer}>
          <div className={styles.formContainerItem}>
            <label className={styles.formContainerLabel}>Name</label>
            <input type="text" className={styles.formContainerInput}
              {...register('name', { required: true })}
            />
          </div>
          <div className={styles.formContainerItem}>
            <label className={styles.formContainerLabel}>Email</label>
            <input type="email" className={styles.formContainerInput}
              {...register('email', { required: true })}
            />
          </div>
          <div className={styles.formContainerItem}>
            <label className={styles.formContainerLabel}>Phone</label>
            <input type="number" className={styles.formContainerInput}
              {...register('phone', { required: true })}
            />
          </div>
          <div className={styles.formContainerItem}>
            <input type="submit" className={styles.formContainerButton}
              value='Take survey'
            />
          </div>
          {/* <div className={styles.formContainerItem}>
            <div className={styles.messageHome}>
              {errors.name && <span> The Name Field is required</span>}
              {errors.email && <span> The Email Field is required</span>}
              {errors.phone && <span> The Comment Field is required</span>}
            </div>
          </div> */}

        </form>

      </main>


    </div>
  )
}

export default Home;
