import React from 'react';
import './styles.css';

const ACHIEVEMENTS = [
    {
        title: 'Top Global Ambassador Award Winner 2023',
        description: 'Recognized for exceptional leadership and influence in the cloud community on a global scale.',
        link: 'https://aws.amazon.com/blogs/apn/congrats-to-our-2023-aws-ambassador-award-winners-and-meet-the-newest-aws-ambassadors/'
    },
    {
        title: '#1 North America Ambassador of the Year 2022/2024',
        description: 'Awarded for outstanding contributions and leadership in the cloud community.',
        link: 'https://aws.amazon.com/blogs/apn/congrats-to-our-2022-aws-ambassador-award-winners-and-meet-the-newest-ambassadors/'
    },
    {
        title: 'MBA and BS',
        description: 'Completed advanced degrees that form the foundation of business and technological expertise.'
    },
    {
        title: 'US Marine',
        description: 'Meritoriously promoted twice for exemplary performance and leadership.'
    },
    {
        title: 'Red Cross Hero Award',
        description: 'Honored for a significant life-saving contribution.'
    },
    {
        title: 'Successful Small Business Owner',
        description: 'Established and led a profitable enterprise, which was subsequently sold.'
    }
];

const Achievements = () => {
    return (
        <section id="achievements" className="section achievements" aria-labelledby="achievements-heading">
            <ul className="achievements-list">
                {ACHIEVEMENTS.map((achievement, index) => (
                    <li key={index}>
                        <strong>
                            {achievement.link ? (
                                <a 
                                    href={achievement.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    aria-label={`Learn more about: ${achievement.title}`}
                                >
                                    {achievement.title}
                                </a>
                            ) : (
                                achievement.title
                            )}
                        </strong>
                        <span>{achievement.description}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Achievements;
