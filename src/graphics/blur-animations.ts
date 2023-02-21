const blurElements = document.querySelectorAll('.blur')
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('blur-in')
        else entry.target.classList.remove('blur-in')
    })
})
blurElements.forEach((el) => observer.observe(el))





