---
layout: about
title: About
permalink: /
subtitle: >
  Legal: Pierre Lardet (he/him)

profile:
  align: right
  image: swiss_snow.jpg
  image_circular: true # crops the image to make it circular
  more_info: In the Swiss Snow 🏔️ :)

news: true # includes a list of news items
selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page
---

A 🇬🇧/🇫🇷 from 🏴󠁧󠁢󠁳󠁣󠁴󠁿 living in 🇨🇦 doing an MSc in Computer Science at UBC in Vancouver supervised by [Kevin Leyton-Brown](https://www.cs.ubc.ca/~kevinlb/index.html) and [Serena Wang](https://serenalwang.com/). I completed by BSc in Computer Science and Mathematics from The University of Edinburgh, during which I went on exchange to EPFL for a year.

I'm interested in various parts of machine learning and modern AI. Some questions I find interesting are:

- How should we evaluate frontier models?
- How can we ensure that large, private companies produce AI for the public good?
- How can we make neural networks understandable?
- Why do neural networks learn functions that generalise?
- How can we train neural networks that exploit properties of the natural world for scientific advancement?

I am an advocate for broad machine learning education. I served on the committee of [EdinburghAI](https://edinburghai.org) where I created and delivered a series of [ML workshops](https://github.com/EdinburghAI/workshops). I have completed internships at [Jane Street](https://www.janestreet.com/) and [Optiver](https://optiver.com/), and before that at an AI start-up, [Adarga](https://adarga.ai/).

I currently live at [Green College](https://greencollege.ubc.ca/), where I run some sports events. I have also competed internationally at orienteering, played tennis, badminton, handball and am happiest when hiking, skiing and scrambling. I also play the piano and guitar and you'll regularly find me composing, arranging or playing with other people.

Feel free to reach out at <a href="mailto:lardet.pierre@gmail.com" id="email-link">`lardet[dot]pierre[at]gmail.com`</a> :)

<div id="copy-notification" class="notification">📋 Copied to clipboard!</div>

<!-- To see an older and less serious version of this site, [click here](/old_folio/). -->

<style>
  /* Style for the notification */
  .notification {
    position: fixed;
    bottom: -50px; /* Start off-screen */
    right: 20px;
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 14px;
    opacity: 0;
    transform: translateY(50px); /* Move down by 50px when off-screen */
    transition: opacity 0.3s ease, transform 0.3s ease;
    z-index: 1000;
  }

  /* Show the notification (animate in) */
  .notification.show {
    opacity: 1;
    transform: translateY(0); /* Bring it to its natural position */
    bottom: 20px; /* Visible area */
  }

  /* Hide the notification (animate out) */
  .notification.hide {
    opacity: 0;
    transform: translateY(50px); /* Slide down */
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const emailLink = document.getElementById('email-link');
    const email = "lardet.pierre@gmail.com";
    const copyNotification = document.getElementById('copy-notification');

    emailLink.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent the default mailto action
      navigator.clipboard.writeText(email).then(() => {
        // Show notification
        copyNotification.classList.add('show');
        
        // After 2 seconds, start hiding it
        setTimeout(() => {
          copyNotification.classList.add('hide');
          
          // Remove classes after the animation finishes
          setTimeout(() => {
            copyNotification.classList.remove('show', 'hide');
          }, 300); // Match the duration of the CSS transition
        }, 1000); // Show for 1 second before hiding
      });
    });
  });
</script>
