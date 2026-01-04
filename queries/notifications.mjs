import nodemailer from 'nodemailer';

const sendEmailMiddleware = async (req, res, next) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ error: 'Missing required email fields' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service provider
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS, // Your email password or app password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
};

export default sendEmailMiddleware;
