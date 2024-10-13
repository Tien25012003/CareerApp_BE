import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "doank3442@gmail.com",
    pass: "draboltgigrurfsk",
  },
});
export const sendVerifyEmail = async (
  emails: string[],
  id: string,
  name?: string
) => {
  const actionLink = `http://192.168.0.102/accounts/verify?id=${id}`;
  const info = await transporter.sendMail({
    from: `"My Daily" <doank3442@gmail.com>`,
    to: emails.length > 1 ? emails.join(", ") : emails[0],
    subject: "Xác thực tài khoản",
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Template</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .email-container {
        background-color: #ffffff;
        padding: 20px;
        margin: 0 auto;
        max-width: 600px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #4caf50;
        color: white;
        padding: 10px;
        text-align: center;
        border-radius: 8px;
      }
      .content {
        padding: 20px;
        color: #333;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        background-color: #4caf50;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
      .footer {
        text-align: center;
        padding: 10px;
        font-size: 12px;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Xác thực tài khoản</h1>
      </div>

      <div class="content">
        <p>Xin chào ${name},</p>
        <p>
          Cảm ơn bạn đã đăng ký tài khoản! Vui lòng nhấp vào nút dưới đây để xác
          minh địa chỉ email của bạn.
        </p>

        <!-- Action Button -->
        <a href="${actionLink}" class="button">Xác thực</a>

        <!-- Optional details -->
        <p>Nếu nút xác thực ở trên không hoạt động vui lòng liên hệ:</p>
        <p><a href="doank3442@gmail.com">doank3442@gmail.com</a></p>
      </div>

      <div class="footer">
        <p>Cảm ơn bạn đã sử dụng dịch vụ</p>
        <p>
          Nếu bạn có bất kì câu hỏi nào, vui lòng liên hệ
          <a href="mailto:doank3442@gmail.com">doank3442@gmail.com</a>.
        </p>
      </div>
    </div>
  </body>
</html>
`,
  });
  return info;
};
