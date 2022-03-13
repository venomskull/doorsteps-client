import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';

const Questionnaire = ({ questionsByCategory, category }) => {
    const [answers, setAnswers] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const router = useRouter();
    // console.log(questionsByCategory);

    // useEffect(() => {
    //     setAnswers({
    //         userid: localStorage.getItem('userid')
    //     });
    // }, [answers]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(answers).length === 0) {
            setShowMessage(true);
            return;
        }

        await fetch('http://localhost:8800/api/surveyanswers/', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                userId: localStorage.getItem('userid'),
                category: category,
                answers: answers
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                router.push('/thankyou');
            })
            .catch(err => console.log(err.message));
    }

    const handleInputChange = (e) => {
        // console.log(e);
        setShowMessage(false);
        setAnswers({
            ...answers,
            [e.target.id]: e.target.value
        });
    }

    // <SelectOption value={qns.variousOptions} />
    // const SelectOption = (ques) => {
    //     console.log(ques);
    //     // console.log(ques.variousOptions && ques.variousOptions.split(',').trim());
    //     return (
    //         <select>
    //             { Object.values(ques)[0].split(',').map((opt, idx) => (
    //                 <option key={idx}>{opt.trim()}</option>
    //             )) }
    //         </select>
    //     )
    // }

    const SelectOption = (props) => {
        // console.log(props);
        return (
            <select id={props.id} onChange={props.change}
                className={styles.questionInput}
            >
                {Object.values(props)[0].split(',').map((opt, idx) => (
                    <option key={idx}>{opt.trim()}</option>
                ))}
            </select>
        )
    }

    const handleCategoryClick = (e) => {
        router.push('/categories');
    }

    // console.log(answers, category, 'answers');

    return (

        <>
            <div className={styles.navbar}>
                <div className={styles.navContainer}>
                    <div className={styles.menuContainer}>
                        <ul className={styles.menuList}>
                            <li className={styles.menuListItem}>
                                <input type='submit' value='Categories' onClick={e => handleCategoryClick(e)}
                                    className={styles.navButton}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>



            <div className={styles.questionnaireContainer}>
                <h1 className={styles.categoryTitle}></h1>
                <div className={styles.questinnaires}>
                    {questionsByCategory.map(qns => (
                        <div key={qns._id} className={styles.question}>
                            <span className={styles.questionLabel}>{qns.question}</span>
                            {qns.answerType === 'text'
                                ? <input type="text" onChange={e => handleInputChange(e)} id={`input#${qns._id}`}
                                    className={styles.questionInput}
                                />
                                : (qns.answerType === 'multi'
                                    ? <textarea rows="5" onChange={e => handleInputChange(e)} id={`text#${qns._id}`}
                                        className={styles.questionInput}></textarea>
                                    : <SelectOption options={qns.variousOptions} id={`options#${qns._id}`}
                                        change={e => handleInputChange(e)}
                                    />)}
                        </div>
                    ))}
                </div>
                <button type='submit' onClick={e => handleSubmit(e)}
                    className={styles.formContainerButton}>
                    Submit
                </button>
                {showMessage ? <div className={styles.messageTakeSurvey}>Kindly attend atleast one question!!</div> : ''}
                
            </div>

        </>


    )
}

export default Questionnaire;

export const getStaticPaths = async () => {
    const data = await fetch('http://localhost:8800/api/questions/distinctcategory').then(res => res.json());

    const paths = data.map(dat => ({
        params: {
            cat: dat.toString() // very very important. the property name should be same as the endpoint name 
        }
    }));

    // console.log(paths);
    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async (context) => {
    // console.log(context);
    const category = context.params.cat;
    const questionsByCategory = await fetch(`http://localhost:8800/api/questions/find/${category}`).then(res => res.json());

    return {
        props: {
            questionsByCategory,
            category
        }
    }
}