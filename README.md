# Frontend Mentor - Mortgage repayment calculator solution

This is a solution to the [Mortgage repayment calculator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/mortgage-repayment-calculator-Galx1LXK73). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Input mortgage information and see monthly repayment and total repayment amounts after submitting the form
- See form validation messages if any field is incomplete
- Complete the form only using their keyboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshots

#### Desktop design (completed)

![Desktop design (completed)](design/desktop-design-completed.jpg)

#### Mobile design (completed)

![Mobile design (completed)](design/mobile-design-completed.jpg)

#### Error states

![Error states](design/error-states.jpg)

### Links

- Solution URL: [GitHub Repo](https://github.com/batgev/mortgage-repayment-calculator) _(replace with actual repo URL)_
- Live Site URL: [Live Demo](https://batgev.github.io/mortgage-repayment-calculator) _(replace with actual live URL)_

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties (variables)
- Flexbox & CSS Grid
- Mobile-first responsive workflow
- Vanilla JavaScript (ES6+)
- [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) font
- Intl.NumberFormat for currency formatting

### What I learned

- Form validation with real-time error clearing on input and custom radio group error states.
- Accurate mortgage repayment formula for repayment mortgages using the PMT calculation.
- Responsive layout using CSS Grid for desktop side-by-side calculator/results panels.
- Accessibility features like ARIA-describedby for error messages and focus-visible outlines.

```js
function calculateRepayment(amount, termYears, ratePercent) {
  const monthlyRate = ratePercent / 100 / 12;
  const months = termYears * 12;
  const numerator = monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  return denominator === 0
    ? amount / months
    : amount * (numerator / denominator);
}
```

### Useful resources

- [Frontend Mentor Style Guide](style-guide.md) - Provided colors, typography, and layout specs.
- [Mortgage Repayment Formula](https://www.investopedia.com/mortgage-calculator-5104678) - Reference for accurate PMT calculation.
- [MDN Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) - For GBP currency formatting.
- [The Markdown Guide](https://www.markdownguide.org/) - Markdown syntax reference.

## Author

- GitHub - [@batgev](https://github.com/batgev)
- Frontend Mentor - [@batgev](https://www.frontendmentor.io/profile/batgev)
