const express = require("express");
const router = express.Router();
const { check, validationResult, matchedData } = require("express-validator");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    data: {},
    errors: {}
  });
});

router.post(
  "/contact",
  [
    check("message")
      .isLength({ min: 1 })
      .withMessage("Message is required")
      .trim(),
    check("email")
      .isEmail()
      .withMessage("That email doesn‘t look right")
      .bail()
      .trim()
      .normalizeEmail()
  ],
  (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("contact", {
        data: req.body,
        errors: errors.mapped()
      });
    }

    const data = matchedData(req);
    console.log("Sanitized: ", data);
    // Homework: send sanitized data in an email or persist in a db

    req.flash("success", "Thanks for the message! I‘ll be in touch :)");
    res.redirect("/");
  }
);

module.exports = router;
