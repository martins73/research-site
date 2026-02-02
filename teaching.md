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

These professors did more than transfer knowledge; they facilitated my personal growth and helped me navigate the complexities of the real world. As an educator, I am driven by that same purpose: to find joy in the interactions with my students and to help them see the impact of their decisions on their companies, their peers, and society.

Because of my background, I view the classroom as a bridge between abstract theory and professional practice. I do not simply teach concepts; I leverage my corporate experience to make those concepts tangible. I am a firm believer in "learning by doing". I design assignments that require students to actively engage with the material rather than passively consume it. For instance, during my time in the industry, I fostered collaborations with universities, including hosting a project for the MIT Analytics Lab where students solved live business problems using our data. I am committed to bringing these types of real-world challenges into my curriculum.

In fields like Operations and Data Analytics, technical skills are only half the equation. My teaching places a heavy emphasis on critical thinking and ethical decision-making. I challenge my students to consider the broader consequences of their work—not just the "how", but the "why". I also advocate for the thoughtful integration of technology. We cannot ignore tools like Generative AI; instead, I encourage students to use them in their assignments to understand both their capabilities and their limitations.

<p class="callout-box">
<strong>Looking Forward:</strong> I am particularly interested in teaching <strong>Data Analytics</strong> and <strong>Artificial Intelligence</strong> courses. These subjects are the perfect venue to demonstrate the power of advanced analytics while tackling the ethical issues that arise with new technologies.
</p>

</section>

## Teaching Experience

<section id="history" class="section-spacing">
{% for course in site.data.teaching.courses %}
<div class="cv-entry">
    <div class="course-header">
        <span class="cv-title">{{ course.title }}</span>
        <span class="cv-date">{{ course.year }}</span>
    </div>
    <div class="course-role">{{ course.role }} • {{ course.institution }}</div>
    <div class="course-details">{{ course.level }} • {{ course.students }} Students</div>
</div>
{% endfor %}

</section>
