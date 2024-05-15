import React from 'react';
import './styles.css';

const Achievements = () => {
    return (
        <section id="achievements" className="section achievements">
            <ul className="achievements-list">
                <li>
                    <strong>
                        <a href="https://aws.amazon.com/blogs/apn/congrats-to-our-2023-aws-ambassador-award-winners-and-meet-the-newest-aws-ambassadors/"
                           target="_blank" rel="noopener noreferrer">
                            Top Global Ambassador Award Winner 2023</a></strong>
                    <span>Recognized for exceptional leadership and influence on a global scale.</span>
                </li>
                <li>
                    <strong><a
                        href="https://aws.amazon.com/blogs/apn/congrats-to-our-2022-aws-ambassador-award-winners-and-meet-the-newest-ambassadors/"
                        target="_blank" rel="noopener noreferrer">#1
                        North America Ambassador of the Year 2022</a></strong>
                    <span>Awarded for outstanding contributions and leadership across North America.</span>
                </li>
                <li>
                    <strong>MBA and BS</strong>
                    <span>Completed advanced degrees that form the foundation of business and technological expertise.</span>
                </li>
                <li>
                    <strong>US Marine</strong>
                    <span>Meritoriously promoted twice for exemplary performance and leadership.</span>
                </li>
                <li>
                    <strong>Red Cross Hero Award</strong>
                    <span>Honored for significant contributions to community safety and welfare.</span>
                </li>
                <li>
                    <strong>Successful Small Business Owner</strong>
                    <span>Established and led a profitable enterprise, which was subsequently sold for a significant profit.</span>
                </li>
            </ul>
        </section>
    );
};

export default Achievements;
