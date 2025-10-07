# 🧪 SauceDemo Playwright E2E Automation Framework

An end-to-end test automation framework built using **Playwright** and **TypeScript** to validate the complete user purchase flow on [SauceDemo](https://www.saucedemo.com/).  
This project demonstrates a structured, scalable, and CI-ready testing solution covering authentication, product browsing, cart operations, checkout, and order completion.

---

## 🧱 Framework Overview

| Category | Details |
|-----------|----------|
| **Language** | TypeScript |
| **Framework** | Playwright |
| **Test Runner** | Playwright Test |
| **CI/CD** | GitHub Actions |
| **Reporting** | Playwright HTML Report |
| **Browser Support** | Chromium (can extend to Firefox, WebKit) |

---

## 📂 Folder Structure

```
tests/
│
├── login/
│   └── login.spec.ts              # Valid & invalid login scenarios
│
├── products/
│   ├── productListing.spec.ts     # Product listing, add/remove tests
│   └── visualValidation.spec.ts   # Light visual/UI verification
│
├── checkout/
│   ├── cart.spec.ts               # Cart addition/removal tests
│   ├── checkoutValidation.spec.ts # Required field validations
│   └── payment.spec.ts            # Totals & order confirmation
│
└── e2e/
    └── purchaseFlow.spec.ts       # Full end-to-end purchase flow

.github/
└── workflows/
    └── ci.yml                     # GitHub Actions CI pipeline

playwright.config.ts               # Playwright configuration
package.json                       # NPM dependencies & scripts
tsconfig.json                      # TypeScript configuration
```

---

## 🎯 Test Scenario Coverage

### 🧍‍♂️ **Login Tests**
- Valid login redirects to the inventory page.  
- Invalid credentials show the correct error message.  
- Verifies that login form elements are visible and functional.

### 🛍️ **Product Listing Tests**
- All product cards load with **name, image, price, and Add to Cart button**.  
- Add/Remove actions correctly toggle the button text.  
- Cart badge updates dynamically.  

### 👁️ **Visual/UI Validation (Light Checks)**
- Verifies header, product grid, and image presence.  
- Ensures key UI components are visible and interactive (no pixel-level diff).

### 🛒 **Cart & Checkout Validation**
- Add multiple products → verify cart count and contents.  
- Remove items → confirm badge and item list update.  
- Form validation for missing fields.

### 💳 **Payment & Order Summary**
- Confirms product name, price, and totals in checkout overview.  
- Completes checkout and verifies success message.

### 🔁 **End-to-End Purchase Flow**
- Logs in, adds a product, checks out, and completes an order successfully.  

---

## ⚙️ Setup & Installation

```bash
npm install
npx playwright install
# or
npx playwright install --with-deps
```

---

## 🚀 Running Tests

```bash
npx playwright test                 # Run all tests
npx playwright test --headed        # Run with visible browser
npx playwright test tests/login     # Run specific folder
npx playwright show-report          # Open report
```

---

## 🔄 CI/CD Integration

GitHub Actions workflow (`.github/workflows/ci.yml`) automatically:
1. Installs dependencies and browsers  
2. Runs Playwright tests in headless mode  
3. Uploads the HTML report as an artifact  

---

## 🧭 Future Enhancements

- Add visual regression testing  
- Data-driven test support  
- Environment config parameterization  
- JUnit/Allure reporting  
- Multi-browser matrix testing  

---

## 🏁 Summary

This Playwright framework demonstrates clean structure, modular organization, and robust CI integration — a professional-grade, production-ready automation setup.
