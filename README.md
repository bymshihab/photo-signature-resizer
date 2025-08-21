# 🇧🇩 BD Govt Exam Photo & Signature Resizer

A **single-page Angular 18 application** built for candidates applying to Bangladeshi Government exams.  
It resizes and optimizes your **photo** and **signature** according to official requirements without any hassle.  

---

## 📏 Official Requirements (Bangladesh Govt Exams)

- **Photo**
  - Size: `300 x 300` pixels (Width x Height)
  - File Size: ≤ **100 KB**
  - Must be **color** photo
  - ❌ Black & White, Monochrome, Grayscale, or any non-photo image will be **rejected**

- **Signature**
  - Size: `300 x 80` pixels (Width x Height)
  - File Size: ≤ **60 KB**

- This application can detect image with **Facial Recognition**  
  👉 Please avoid uploading unacceptable photos.

---

## 🚀 Features
- Upload **Photo & Signature**
- Automatically resized to required pixel dimensions
- Compresses to required file size (≤100KB for photo, ≤60KB for signature)
- Instant preview before download
- Download resized JPG image
- Works completely **offline** (no backend needed)

---

## 🛠️ Tech Stack
- Angular 18
- TypeScript
- HTML5 Canvas API
- CSS

---

## 📦 Installation

1. Create project with Angular 18:
   ```bash
   npx @angular/cli@18 new bd-exam-photo-signature-resizer
