const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const GOOGLE_AUTH_URI = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${
  process.env.GOOGLE_CALLBACK_URI
}&prompt=consent&response_type=code&client_id=${
  process.env.GOOGLE_CLIENT_ID
}&scope=${scopes.join(" ")}&access_type=offline`;

router.get("/", (req, res) => {
  res.redirect(GOOGLE_AUTH_URI);
});

router.get("/login", async (req, res, next) => {
  try {
    res.send(`
      <html>
        <head>
        </head>
        <body>
          <script>
            window.localStorage.setItem('token', '${await User.loginViaGoogle(
              req.query.code
            )}');
            window.location = '/';
          </script>
        </body>
      </html>
    `);
  } catch (e) {
    next(e);
  }
});
