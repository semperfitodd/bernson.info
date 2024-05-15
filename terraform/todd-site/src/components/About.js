import React, {useEffect} from 'react';
import './styles.css';

const About = () => {
    useEffect(() => {
        const name = document.getElementById('name');
        const fullName = 'Todd.';
        let i = 0;

        function typeWriter() {
            if (i < fullName.length) {
                name.textContent += fullName.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            }
        }

        typeWriter();
    }, []);

    return (
        <section id="about" className="section about">
            <div className="content-block">
                <p><span>Hi, I'm </span><span id="name"></span></p>
                <p>I serve as Chief Technical Officer with over 30 certifications across major cloud platforms
                    (AWS, Azure, and Google Cloud). I lead our technical resources and ensure top-tier deliverables on
                    every
                    engagement.</p>
                <p>My passion for technology began in 9th grade and has driven my career ever since. After earning my
                    degree, I joined the Marines, where I became even more goal-oriented. My experiences in the service
                    and as an
                    entrepreneur—starting, running, and selling my own business—taught me invaluable lessons about
                    speed,
                    ownership, and continuous learning.</p>
                <p>I am tenacious and obsessed with solving complex issues. My hands-on leadership style and personal
                    accountability ensure that the work my teams and I produce is impactful and exceeds expectations. I
                    am
                    dedicated to building strong, high-performing teams and fostering a culture of continuous
                    improvement
                    and innovation.</p>
                <p>Outside of work, I love to work out, be outdoors, and spend time at my kids' sports events. Living in
                    a
                    small peninsula lake community outside North Carolina, I enjoy supporting my children's dreams and
                    making the most of our beautiful surroundings.</p>
            </div>
        </section>
    );
};

export default About;
