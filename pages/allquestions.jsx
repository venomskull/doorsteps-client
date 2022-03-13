import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';


const AllQuestions = ({ questions }) => {
    const [isActive, setIsActive] = useState();
    const [checkboxValues, setCheckboxValues] = useState(questions);
    const router = useRouter();

    // useEffect(() => {
    //     setIsActive();
    // },[]);

    const handleIsActive = async (e) => {
        // console.log(e);
        // console.log(e.target.checked);

        // if (e.target.defaultChecked === true)
        //     setIsActive(false);
        // else
        //     setIsActive(true);

        await fetch(`http://localhost:8800/api/questions/${e.target.id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: e.target.checked === false ? JSON.stringify({ 'isActive': false }) : JSON.stringify({ 'isActive': true })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setCheckboxValues([
                    ...checkboxValues.filter(val => val._id !== e.target.id),
                    { ...res }
                ])
            });
    }

    const handleAdminClick = () => {
        router.push('/createquestions');
    }

    const handleHomeClick = (e) => {
        router.push('/');
    }


    // console.log(checkboxValues, 'checkboxValues');
    // console.log(questions);
    return (
        <>
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
                                    <input type='submit' value='Create Questions' onClick={e => handleAdminClick(e)}
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
                        All Questions
                    </h1>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead className={styles.tableHeader}>
                                {/* <th hidden>ID</th> */}
                                <th className={styles.col1}>Category</th>
                                <th className={styles.col2}>Question</th>
                                <th className={styles.col3}>Is Active</th>
                            </thead>
                            <tbody>
                                {/* checked={qns.isActive} */}
                                {checkboxValues?.map(qns => (
                                    <tr key={qns._id} className={styles.tableRow}>
                                        {/* <td hidden>{qns._id}</td> */}
                                        <td className={styles.col1}>{qns.category}</td>
                                        <td className={styles.col2}>{qns.question}</td>
                                        <td className={styles.col3}>
                                            <input type="checkbox" id={qns._id} name="isActive"
                                                onChange={e => handleIsActive(e)} checked={qns.isActive}
                                                className={styles.tableCheckbox}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </>
    )
}

export default AllQuestions

export const getServerSideProps = async () => {
    const questions = await fetch('http://localhost:8800/api/questions/').then(res => res.json());
    return {
        props: {
            questions
        }
    }
}