import React from 'react'
import './header.css'
export const About = () => {
    return (
        <>
            <h2 style={{ textAlign: "center" }}><strong>About us</strong></h2>
            <div className='welcome-container'>
            <h4> Interview Insights, the premier platform to share and learn from real interview experiences.</h4>
            <p>At Interview Insights, we understand the challenges and uncertainties. That's why we've created a vibrant community where candidates can come together to exchange valuable insights, tips, and strategies for acing interviews.</p>
            </div>
            <div style={{marginLeft:"50px"}}>
            <h4><strong>What We Offer</strong></h4>
            <ul>
                <li><p><strong>Knowledge Sharing:</strong> Explore a treasure trove of real interview experiences shared by candidates from a wide range of industries and companies</p></li>
                <li><p><strong>Learning Opportunities:</strong> Gain valuable insights into different interview formats, questions, and strategies to enhance your interview performance</p></li>
                <li><p><strong>Transparency and Fairness:</strong>Promote transparency in the interview process by sharing your experiences and contributing to a more equitable hiring environment.
                </p></li>
            </ul>
            </div>
            <br></br>
        </>
    )
}
