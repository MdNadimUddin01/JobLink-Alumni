import nodemailer from "nodemailer";

const mailer = function (email, callback) {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: '<email>',
            pass: "<password>"
        }
    });

    const mailOption = {
        from: "<email_id>",
        to: email,
        subject : "Hello Alumni Its a Verification Mail",
        html: `Hello ${email} , this is verification mail of Alumni Tracker System. Please Click on the below link to verify Yourself.
        <br>
        <form action='' method="post">
            <input type="hidden" name="email" id="email" value='${email}'>
            <button>Click Here to Verify</button> 
        </form>
        `
    }

    transport.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log("Error while sending mail from mailer : ", error)
            callback(false)
        } else {
            console.log("Mail from mailer send successfully");
            callback(true)
        }
    })
}

export {mailer}