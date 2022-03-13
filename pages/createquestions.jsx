import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styles from '../styles/Home.module.css'

const CreateQuestions = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    // const [saved, setSaved] = useState(false);
    const router = useRouter();

    const submitForm = async (data) => {
        console.log(data);
        await fetch('http://localhost:8800/api/questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                // setSaved(true);
                router.push('/allquestions');
            })
            .catch(res => {
                console.log(res);
            })
    }

    const handleAdminClick = () => {
        router.push('/allquestions');
    }

    const handleHomeClick = (e) => {
        router.push('/');
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
                                <input type='submit' value='Home' onClick={e => handleHomeClick(e)}
                                    className={styles.navButton}
                                />
                            </li>
                            <li className={styles.menuListItem}>
                                <input type='submit' value='show All Questions' onClick={e => handleAdminClick(e)}
                                    className={styles.navButton}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <main className={styles.main}>
                {/* <input type="button" value='New Question' onClick={handleNewQuestion} /> */}
                <h1 className={styles.title}>
                    Create Questions!
                </h1>

                {/* <p className={styles.description}>
            Get started by editing{' '}
            <code className={styles.code}>pages/index.js</code>
          </p> */}

                <form onSubmit={handleSubmit(submitForm)} className={styles.formContainer}>
                    <div className={styles.formContainerItem}>
                        <label className={styles.formContainerLabel}>Category</label>
                        <input type="text" className={styles.formContainerInput}
                            {...register('category', { required: true })}
                        />
                    </div>
                    <div className={styles.formContainerItem}>
                        <label className={styles.formContainerLabel}>Question</label>
                        <textarea name="question" id="" cols="30" rows="3"
                            className={styles.formContainerInput}
                            {...register('question', { required: true })}
                        ></textarea>
                    </div>
                    <div className={styles.formContainerItem}>
                        <label className={styles.formContainerLabel}>Answer Type</label>
                        <select className={styles.formContainerInput}
                            {...register('answerType', { required: true })}
                        >
                            <option value="text">Text</option>
                            <option value="multi">Multi</option>
                            <option value="options">Options</option>
                        </select>
                    </div>
                    <div className={styles.formContainerItem}>
                        <label className={styles.formContainerLabel}>Available Options</label>
                        <input type="text" className={styles.formContainerInput}
                            {...register('variousOptions')}
                        />
                    </div>
                    <div className={styles.formContainerItem}>
                        <label className={styles.formContainerLabel}>Is Active</label>
                        <div className={styles.formContainerCheckbox}>
                            <input type="checkbox" id="isActive" name="isActive" checked
                                className={styles.formCheckbox}
                                {...register('isActive')}
                            />
                        </div>

                    </div>
                    <div className={styles.formContainerItem}>
                        <input type="submit" value='Create Question'
                            className={styles.formContainerButton}
                        />
                    </div>

                </form>

            </main>


        </div>
    )
}

export default CreateQuestions