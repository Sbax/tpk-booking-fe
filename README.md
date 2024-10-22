# TPK Booking Frontend

## About

This is a frontend app to handle bookings for the TPK! TotalPartyKon, a ttrpg convention, but it can be reused for any kind of event in need of reservations.

It's built using **Next.js** and **React**. It incorporates several modern libraries to enhance development and user experience.

For styling, **Tailwind CSS** and **DaisyUI** are used, while **ESLint** and **Husky** are configured for code quality and Git hooks.

The project also integrates Google Sheets for managing sessions and booking data and includes a rich email system powered by the **Resend** service for handling notifications. This combination of tools ensures a responsive, reliable, and maintainable frontend experience.

The core tools and libraries can be explored further by visiting their official documentation:

- [Next.js](https://nextjs.org/docs)
- [React](https://reactjs.org/docs/getting-started.html)
- [React Hook Form](https://react-hook-form.com/get-started)
- [React Email](https://react.email/docs)
- [Resend](https://resend.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [DaisyUI](https://daisyui.com/docs)
- [ESLint](https://eslint.org/docs/latest)
- [Husky](https://typicode.github.io/husky/#/)

## Getting Started

### Prerequisites

- Node.js (version 16.x or higher)
- Yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sbax/tpk-booking-fe.git
   ```

2. Navigate to the project directory:

   ```bash
   cd tpk-booking-fe
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

4. Set up environment variables (see `.env` documentation below).

5. Run the development server:

   ```bash
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Environment Variables

The project uses the following environment variables. You should create a `.env.local` file in the root directory of your project and populate it with the necessary values.

### Required Environment Variables

- **BASE_URL**: The base URL that will host the application.

  Example:

  ```bash
  BASE_URL=https://example.com
  ```

### Google Sheets Integration

The following environment variables are used to connect to the Google Sheets API:

- **GOOGLE_PROJECT_ID**: Your Google Cloud project ID.
- **GOOGLE_PRIVATE_KEY_ID**: The ID of the private key used for Google authentication.
- **GOOGLE_PRIVATE_KEY**: Your Google private key. Note: Ensure that the key is correctly formatted with line breaks (`\n`).
- **GOOGLE_CLIENT_EMAIL**: The client email associated with your Google service account.
- **GOOGLE_CLIENT_ID**: The client ID associated with your Google service account.
- **GOOGLE_AUTH_URI**: The URL for Google OAuth2 authentication.
- **GOOGLE_TOKEN_URI**: The URL for Google OAuth2 token retrieval.
- **GOOGLE_AUTH_PROVIDER_X509_CERT_URL**: The URL for Google's X.509 certificate.
- **GOOGLE_CLIENT_X509_CERT_URL**: The URL for the client’s X.509 certificate.

  Example:

  ```bash
  GOOGLE_PROJECT_ID=your-google-project-id
  GOOGLE_PRIVATE_KEY_ID=your-private-key-id
  GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
  GOOGLE_CLIENT_EMAIL=your-client-email@google.com
  GOOGLE_CLIENT_ID=your-google-client-id
  GOOGLE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
  GOOGLE_TOKEN_URI=https://oauth2.googleapis.com/token
  GOOGLE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
  GOOGLE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-client-email%40google.com
  ```

### Google Sheets Ranges

- **SHEET_ID**: The ID of the Google Sheet used for all the data.
- **SHEET_ADVENTURE_RANGE**: The range in the sheet where adventure-related data is stored.
- **SHEET_BOOKINGS_RANGE**: The range in the sheet where booking data is stored.

  Example:

  ```bash
  SHEET_ID=your-google-sheet-id
  SHEET_ADVENTURE_RANGE='Adventure!A1:Z100'
  SHEET_BOOKINGS_RANGE='Bookings!A1:Z100'
  ```

### Resend Email Service

For email services, configure the following:

- **RESEND_ENABLED**: Enable/disable email resending service (set to `true` or `false`).
- **RESEND_API_KEY**: API key for Resend email service.
- **MAIL_SENDER**: The sender email address used in the application.

  Example:

  ```bash
  RESEND_ENABLED=true
  RESEND_API_KEY=your-resend-api-key
  MAIL_SENDER=sender@example.com
  ```

### Contact Email

- **MAIL_CONTACT**: The contact email address for receiving inquiries.

  Example:

  ```bash
  MAIL_CONTACT=contact@example.com
  ```
