---
layout: default
title: Teaching
active_page: teaching
permalink: /teaching/
description: Martin Gonzalez Cabello's teaching philosophy and experience in operations management, business analytics, statistics, and AI in organizations.
---

<section id="statement" markdown="1">

# Teaching Philosophy

<p class="lead scroll-reveal">I want the classroom to be a bridge between academia and the real world.</p>

<p class="scroll-reveal">My route into academia was not a traditional one, and it is why I see teaching as one of the most attractive parts of being a professor. I spent eight years applying what I learned at university to the real world, and I bring what that taught me about its complexities into the classroom.</p>

<p class="scroll-reveal">The people I helped grow are what I value most from those years. At ACHS I hired and mentored MBA graduates as my direct reports, and mentored the younger analysts who worked with them. I managed more than two hundred people, and every three months I had a fifteen-minute conversation with at least eighty of them to get to know them and advise them on how to grow. Many are managers now, and I am still close to a number of them.</p>

<p class="scroll-reveal">Roberto Rigobon, one of my professors at MIT, showed me what that kind of relationship means from the other side. His mentorship gave me the courage to leave industry for a PhD, and eleven years after I graduated we are still close. Building relationships like that is what I like most about teaching: mentoring students and helping them with the questions they have outside class, long after they graduate.</p>

<p class="scroll-reveal">I want my courses to be rigorous about the material but built on real problems with no obvious answers, so that students have to think each problem through, reflect on the best solution and justify their opinion. I would combine core concepts and tools with case studies and with projects in which students work with a real company on a question that needs an answer. At ACHS I sponsored one such project, hosting a team from the MIT Analytics Lab and giving them data, guidance and computing resources to tackle a real problem we had.</p>

<p class="scroll-reveal">My view of generative AI in teaching is still evolving, but one part of it is settled: the classroom should be analog. No AI, no laptops and no phones; just old-school classes and discussion. Class time is where students learn to think a problem through and defend a view in their own words, and screens get in the way. Labs are the exception, because that is where students learn the tools themselves. Outside class I think students should be able to use AI and learn how to do so responsibly: they have to be able to explain anything they hand in, check that the output is correct, and take responsibility for their decisions and how they justify them.</p>

<p class="scroll-reveal">Students should learn the latest theories and tools, but I want them to understand how to use what they learn to create real impact on their teams, their organizations and society: not only how, but why. I want them to leave curious and wanting to learn more, which will serve them wherever they go.</p>

<p class="callout-box scroll-reveal">
<strong>What I teach:</strong> operations management, business analytics, statistics and decision analysis, and optimization and prescriptive modeling, at undergraduate, master's and executive level, in English or in Spanish. I would like to build an elective on how AI can be used inside real organizations: where it creates value, how processes need to be reimagined around it, what its limitations are, and what ethical questions it raises.
</p>

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
                
                <div class="course-role">{{ course.role }} • <span{% if inst.institution_lang %} lang="{{ inst.institution_lang }}"{% endif %}>{{ inst.institution }}</span></div>
                
                <div class="course-details">
                    {{ course.program }}
                    {% if course.students %} • {{ course.students }} Students{% endif %}
                </div>
            </div>
        {% endfor %}
    {% endfor %}
</section>
