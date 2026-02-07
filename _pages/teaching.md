---
layout: default
title: Teaching
active_page: teaching
permalink: /teaching/
description: Teaching philosophy and experience in data analytics, operations management, and AI.
---

<section id="statement" markdown="1">

# Teaching Philosophy

<p class="lead">Bridging theory and practice through active learning.</p>

My journey into academia was not traditional. After five years as a Management Consultant and four years as the Head of Advanced Analytics, I returned to the university environment inspired by the mentors who shaped my own career.

These professors did more than transfer knowledge; they facilitated my personal growth and helped me navigate the complexities of the real world. As a future educator, I am driven by that same purpose: to find joy in interactions with students and to help them see the impact of their decisions on their companies, their peers, and society.

Because of my background, I view the classroom as a bridge between abstract theory and professional practice. I intend to do more than teach concepts. I will use my corporate experience to make those concepts tangible. I believe in ''learning by doing’’. I plan to design assignments that require students to engage actively with the material rather than passively consume it. For instance, during my time in the industry, I fostered collaborations with universities. I hosted a project for the MIT Analytics Lab where students solved live business problems using our data. I am committed to bringing these types of real-world challenges into my future curriculum.

In fields like Operations and Data Analytics, technical skills are only half the equation. My teaching will emphasize critical thinking and ethical decision-making. I will challenge students to consider the broader consequences of their work. They must understand not just the ''how’’, but the ''why’’. I also advocate for the thoughtful integration of technology. We cannot ignore tools like Generative AI. Instead, I will encourage students to use them to understand both their capabilities and their limitations.

<p class="callout-box">
<strong>Looking Forward:</strong> I am particularly interested in teaching <strong>Data Analytics</strong> and <strong>Artificial Intelligence</strong> courses. These subjects are the perfect venue to demonstrate the power of advanced analytics while tackling the ethical issues that arise with new technologies.
</p>

</section>

## Teaching Experience

<section id="history" class="section-spacing">
    {% for inst in site.data.teaching %}
        {% for course in inst.courses %}
            <div class="cv-entry">
                <div class="course-header">
                    <span class="cv-title">{{ course.title }}</span>
                    <span class="cv-date">{{ course.year }}</span>
                </div>
                
                <div class="course-role">{{ inst.role }} • {{ inst.institution }}</div>
                
                <div class="course-details">
                    {{ course.program }}
                    {% if course.students %} • {{ course.students }} Students{% endif %}
                </div>
            </div>
        {% endfor %}
    {% endfor %}
</section>
