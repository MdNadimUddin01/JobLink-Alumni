import nodemailer from "nodemailer";

const mailer = function (email, subjectMail , htmlCode ,callback) {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mdnadimuddin5656@gmail.com",
        pass: "bvdr sldr mfnz toxz",
      },
    });

    const mailOption = {
      from: "<email_id>",
      to: email,
      subject: subjectMail,
      html: htmlCode,
    };

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