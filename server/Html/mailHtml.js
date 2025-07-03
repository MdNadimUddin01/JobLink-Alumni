export function getHtml(email, verificationLink = "https:localhost:5173") {
    
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alumni Tracker - Email Verification</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f4f4f4;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
            letter-spacing: -0.5px;
        }
        
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 18px;
            color: #2d3748;
            margin-bottom: 20px;
        }
        
        .message {
            font-size: 16px;
            color: #4a5568;
            margin-bottom: 30px;
            line-height: 1.8;
        }
        
        .verify-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white !important;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
            margin: 20px 0;
        }

        
        
        .verify-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        
        .alternative-section {
            background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
            border-left: 6px solid #667eea;
            padding: 30px;
            margin: 40px 0;
            border-radius: 0 15px 15px 0;
            position: relative;
        }

        .alternative-section::before {
            content: '🔗';
            position: absolute;
            top: -10px;
            left: -15px;
            background: #667eea;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
        }

        .alternative-section h3 {
            color: #2d3748;
            margin-bottom: 15px;
            font-size: 18px;
            font-weight: 600;
        }

        .alternative-section p {
            margin: 10px 0;
            font-size: 15px;
            color: #4a5568;
        }

        .alternative-section .copy-link {
            background-color: #e2e8f0;
            padding: 15px;
            border-radius: 10px;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 13px;
            word-break: break-all;
            margin: 15px 0;
            position: relative;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .alternative-section .copy-link:hover {
            background-color: #cbd5e0;
        }

        .copy-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #667eea;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            cursor: pointer;
            transition: background 0.3s;
        }

        .copy-button:hover {
            background: #5a67d8;
        }
        
        .footer {
            background-color: #f7fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer p {
            margin: 0;
            font-size: 14px;
            color: #718096;
        }
        
        .footer .contact-info {
            margin-top: 15px;
        }
        
        .security-note {
            background-color: #fef5e7;
            border: 1px solid #f6e05e;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
        }
        
        .security-note h3 {
            color: #744210;
            margin: 0 0 10px 0;
            font-size: 16px;
            font-weight: 600;
        }
        
        .security-note p {
            color: #975a16;
            margin: 0;
            font-size: 14px;
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            
            .header, .content, .footer {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .verify-button {
                display: block;
                text-align: center;
                margin: 20px auto;
                max-width: 250px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Alumni Tracker System</h1>
            <p>Connecting Alumni Communities</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hello <strong>${email}</strong>,
            </div>
            
            <div class="message">
                Welcome to the Alumni Tracker System! We're excited to have you join our community of alumni.
                <br><br>
                To complete your registration and secure your account, please verify your email address by clicking the button below:
            </div>
            
            <div class="button-container">
                <a href="${verificationLink}" class="verify-button">Verify My Email Address</a>
            </div>
            
            <div class="alternative-section">
                <h3>🔗 Having trouble with the button?</h3>
                <p>You can also click this verification link :</p>
                <div class="copy-link" onclick="copyLink()">
                    <span id="verificationLink">${verificationLink}</span>
                </div>
            </div>
            
            <div class="security-note">
                <h3>🔒 Security Notice</h3>
                <p>This verification link will expire in 24 hours for your security. If you didn't create an account with Alumni Tracker System, please ignore this email.</p>
            </div>
        </div>
        
        <div class="footer">
            <p>
                <strong>Alumni Tracker System</strong><br>
                Connecting graduates, building networks, creating opportunities
            </p>
            <div class="contact-info">
                <p>Need help? Contact us at <strong>support@alumnitracker.com</strong></p>
                <p>© 2025 Alumni Tracker System. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>

</html>`;
}

export const subjectVerify = "Hello Alumni Its a Verification Mail";

export function adminVerifyEmail(email){
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verified Successfully - Alumni Tracker System</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
            text-align: center;
            overflow: hidden;
            position: relative;
        }

        .success-animation {
            padding: 60px 40px 40px;
            position: relative;
        }

        .checkmark-container {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            animation: scaleIn 0.6s ease-out;
        }

        .checkmark {
            width: 35px;
            height: 35px;
            position: relative;
        }

        .checkmark::after {
            content: '';
            position: absolute;
            left: 8px;
            top: 16px;
            width: 8px;
            height: 16px;
            border: solid white;
            border-width: 0 3px 3px 0;
            transform: rotate(45deg);
            animation: checkmarkDraw 0.4s ease-out 0.3s both;
        }

        @keyframes scaleIn {
            0% {
                transform: scale(0);
                opacity: 0;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }

        @keyframes checkmarkDraw {
            0% {
                height: 0;
            }
            100% {
                height: 16px;
            }
        }

        .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background: #fbbf24;
            animation: confetti-fall 3s ease-out infinite;
        }

        .confetti:nth-child(1) {
            left: 10%;
            animation-delay: 0s;
            background: #f59e0b;
        }

        .confetti:nth-child(2) {
            left: 20%;
            animation-delay: 0.5s;
            background: #ef4444;
        }

        .confetti:nth-child(3) {
            left: 30%;
            animation-delay: 1s;
            background: #8b5cf6;
        }

        .confetti:nth-child(4) {
            left: 40%;
            animation-delay: 1.5s;
            background: #06b6d4;
        }

        .confetti:nth-child(5) {
            left: 50%;
            animation-delay: 0.3s;
            background: #10b981;
        }

        .confetti:nth-child(6) {
            left: 60%;
            animation-delay: 0.8s;
            background: #f59e0b;
        }

        .confetti:nth-child(7) {
            left: 70%;
            animation-delay: 1.3s;
            background: #ef4444;
        }

        .confetti:nth-child(8) {
            left: 80%;
            animation-delay: 0.2s;
            background: #8b5cf6;
        }

        .confetti:nth-child(9) {
            left: 90%;
            animation-delay: 0.7s;
            background: #06b6d4;
        }

        @keyframes confetti-fall {
            0% {
                transform: translateY(-100px) rotateZ(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100px) rotateZ(720deg);
                opacity: 0;
            }
        }

        h1 {
            color: #1f2937;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 15px;
            letter-spacing: -1px;
        }

        .subtitle {
            color: #6b7280;
            font-size: 18px;
            margin-bottom: 30px;
            line-height: 1.6;
        }

        .email-info {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 1px solid #bae6fd;
            border-radius: 12px;
            padding: 20px;
            margin: 30px 0;
        }

        .email-info p {
            color: #0c4a6e;
            font-size: 16px;
            margin: 0;
        }

        .email-info strong {
            color: #075985;
        }

        .action-buttons {
            padding: 30px 40px 40px;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .btn {
            padding: 16px 32px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            text-decoration: none;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            display: inline-block;
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .btn-secondary {
            background: white;
            color: #667eea;
            border: 2px solid #667eea;
        }

        .btn-secondary:hover {
            background: #667eea;
            color: white;
            transform: translateY(-2px);
        }

        .footer-info {
            background: #f9fafb;
            padding: 25px 40px;
            border-top: 1px solid #e5e7eb;
        }

        .footer-info p {
            color: #6b7280;
            font-size: 14px;
            line-height: 1.6;
            margin: 0;
        }

        .security-tips {
            text-align: left;
            margin-top: 15px;
        }

        .security-tips h4 {
            color: #374151;
            font-size: 15px;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .security-tips ul {
            list-style: none;
            padding: 0;
        }

        .security-tips li {
            color: #6b7280;
            font-size: 13px;
            margin-bottom: 5px;
            padding-left: 20px;
            position: relative;
        }

        .security-tips li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
        }

        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 15px;
            }

            .success-animation,
            .action-buttons,
            .footer-info {
                padding-left: 25px;
                padding-right: 25px;
            }

            h1 {
                font-size: 28px;
            }

            .subtitle {
                font-size: 16px;
            }

            .action-buttons {
                flex-direction: column;
            }
        }

        .pulse {
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(102, 126, 234, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        

        <div class="success-animation">
            <div class="checkmark-container pulse">
                <div class="checkmark"></div>
            </div>

            <h1>Email Verified Successfully!</h1>
            <p class="subtitle">Welcome to the Alumni Tracker System community. Your account is now active and ready to use.</p>

            <div class="email-info">
                <p><strong>Verified Email:</strong> <span id="userEmail">${email}</span></p>
            </div>
        </div>

        <div class="action-buttons">
            <a href="/login" class="btn btn-primary">Sign In to Your Account</a>
            <a href="/dashboard" class="btn btn-secondary">Explore Dashboard</a>
        </div>

        <div class="footer-info">
            <p><strong>What's Next?</strong></p>
            <p>You can now access all features of the Alumni Tracker System, including connecting with fellow alumni, updating your profile, and exploring networking opportunities.</p>
            
            <div class="security-tips">
                <h4>🔒 Account Security Tips:</h4>
                <ul>
                    <li>Keep your login credentials secure</li>
                    <li>Update your profile information</li>
                    <li>Enable two-factor authentication</li>
                    <li>Report any suspicious activity</li>
                </ul>
            </div>
        </div>
    </div>

    <script>
        // Add some interactive elements
        document.addEventListener('DOMContentLoaded', function() {
            // Auto-redirect after 10 seconds (optional)
            let countdown = 10;
            const redirectTimer = setInterval(() => {
                countdown--;
                if (countdown === 0) {
                    clearInterval(redirectTimer);
                    // Uncomment the line below to enable auto-redirect
                    // window.location.href = '/login';
                }
            }, 1000);

            // Add click tracking for buttons
            document.querySelectorAll('.btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    // Add analytics tracking here if needed
                    console.log('Button clicked:', this.textContent);
                });
            });

            // Replace email placeholder if passed in URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            const email = urlParams.get('email');
            if (email) {
                document.getElementById('userEmail').textContent = email;
            }
        });
    </script>
</body>
</html>`
}