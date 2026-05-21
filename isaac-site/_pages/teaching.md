---
layout: default
title: Teaching
active_page: teaching
permalink: /teaching/
description: Teaching experience at UCLA Anderson School of Management.
---

<section id="statement" markdown="1">

# Teaching

<p class="lead scroll-reveal">Bringing more than a decade of industry experience into the classroom.</p>

<p class="scroll-reveal">Before returning to academia, I spent twelve years at BlackLine — most recently as Chief Product Officer. That background shapes how I teach: I try to make abstract concepts in strategy and entrepreneurship concrete by grounding them in the decisions managers actually make, the trade-offs they actually face, and the data they actually have.</p>

<p class="scroll-reveal">I am currently the instructor for <strong>Entrepreneurship and New Venture Initiation</strong> at UCLA Anderson, and have served as a teaching assistant for courses across strategy, general management, market entry, and private equity / venture capital.</p>

</section>

## Teaching Experience

<section id="history" class="section-spacing">
    {% for inst in site.data.cv.teaching %}
        {% for course in inst.courses %}
            <div class="cv-entry scroll-reveal">
                <div class="course-header">
                    <span class="cv-title">{{ course.title }}</span>
                    <span class="cv-date">{{ course.year }}</span>
                </div>

                <div class="course-role">{{ course.role }} • {{ inst.institution }}</div>

                <div class="course-details">
                    {{ course.program }}
                    {% if course.students %} • {{ course.students }} Students{% endif %}
                </div>
            </div>
        {% endfor %}
    {% endfor %}
</section>
