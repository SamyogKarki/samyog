# Contact Form Setup Guide

Your contact form is now configured with **EmailJS**, which allows you to receive emails directly without needing a backend server.

## Setup Steps

### 1. Create an EmailJS Account
- Go to [emailjs.com](https://www.emailjs.com/)
- Sign up for a free account
- Verify your email

### 2. Create a Service
- In the EmailJS dashboard, go to "Email Services"
- Click "Add Service"
- Choose your email provider (Gmail, Outlook, etc.) or use EmailJS's free service
- Complete the setup and note your **Service ID**

### 3. Create an Email Template
- Go to "Email Templates"
- Click "Create New Template"
- Use these field names in your template:
  - `{{user_name}}` - Visitor's name
  - `{{user_email}}` - Visitor's email
  - `{{subject}}` - Message subject
  - `{{message}}` - Message content

- Example template:
```
Name: {{user_name}}
Email: {{user_email}}
Subject: {{subject}}
Message: {{message}}
```

- Note your **Template ID**

### 4. Get Your Public Key
- Go to "Account" settings
- Copy your **Public Key**

### 5. Update Your Code
In `index.html`, find these lines and replace with your credentials:

```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
```

In `js/main.js`, find these lines and replace:

```javascript
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
```

Replace:
- `YOUR_SERVICE_ID` with your Service ID
- `YOUR_TEMPLATE_ID` with your Template ID

### 6. Test the Form
- Open your portfolio in a browser
- Fill out the contact form and click "Send Message"
- Check your email to confirm it works!

## Features Included

✅ Form validation (all fields required, email format checked)
✅ Submit button feedback (disables during sending)
✅ Success/error messages
✅ Automatic form reset on success
✅ Mobile responsive

## Troubleshooting

- **Form not submitting**: Check browser console (F12) for errors
- **"Invalid credentials"**: Verify your Public Key, Service ID, and Template ID are correct
- **Emails not arriving**: Check your email spam folder or verify the template is correct in EmailJS dashboard

## Free Tier Limits

EmailJS free tier allows:
- 200 emails per month
- Unlimited email addresses for receiving
- Perfect for a portfolio website

