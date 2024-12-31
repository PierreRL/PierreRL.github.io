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
  more_info: Swiss Snow 🏔️ :)

news: true # includes a list of news items
selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page
---

A 🇬🇧/🇫🇷 from 🏴󠁧󠁢󠁳󠁣󠁴󠁿 in the 4th year of my BSc in Maths and Computer Science at [The University of Edinburgh ↗](https://www.ed.ac.uk/). I also went on exchange last year to [EPFL ↗](https://www.epfl.ch/en/).

I'm interested in foundational machine learning research that is mathematically interesting and useful. This spans topics like uncertainty quantification, geometric learning, Bayesian optimisation, interpretability and learning from imbalanced data. I'm applying to Master's programs next year where I hope to continue learning about how to do good research.

I serve on the committee of [EdinburghAI ↗](https://edinburghai.org) where I create and run [ML workshops ↗](https://github.com/EdinburghAI/workshops). I shall be recording videos of these workshops next semester! I'm a beginner's coach for [Ro Sham Bo ↗](https://ultimaf.eusu.ed.ac.uk/), Edinburgh University's Ultimate Frisbee Club. I have also competed internationally at orienteering, played tennis, badminton, handball and am happiest when hiking, skiing and scrambling. I also play the piano and guitar and you'll regularly find me composing.

Feel free to reach out at <a href="mailto:lardet.pierre@gmail.com" id="email-link">`lardet[dot]pierre[at]gmail.com`</a> :)

<div id="copy-notification" class="notification">📋 Copied to clipboard!</div>

To see an older and much less serious verison of this site, [click here ↗](/old_folio/).

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
