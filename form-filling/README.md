# 📄 Form Filling Project

This project is a simple and accessible form interface built using **semantic HTML5 elements**. The goal is to improve user experience, ensure accessibility, and follow modern web standards.

---

## 🧠 What Is Semantic HTML?

**Semantic HTML** refers to the use of HTML tags that convey the meaning and structure of content. Instead of using generic containers like `<div>`, semantic elements make the purpose of each section clear.

> Examples include: `<section>`, `<article>`, `<header>`, `<footer>`, `<form>`, `<label>`, `<fieldset>`, `<legend>`, `<main>`, `<nav>`, etc.

---

## 📋 Semantic Elements Used in This Project

### 1. `<form>`
- Defines the form area used to collect user input.
- Attributes like `action` and `method` specify where and how the data is submitted.

### 2. `<label>`
- Associates text labels with form fields, improving accessibility for screen readers.
- Example:
  ```html
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
