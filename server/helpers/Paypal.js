const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AXkM7rBzgWAYIVp9svqYUrX9EoVN8Q9K2cwFZSLeJaYQJH0rr8KnQlrTWr-UKgNXwg8yoTpe5Qf-fQ_c",
  client_secret:
    "EFogggpBhbs2oUGsdzDyowqjYt_WuddewnQPQ08B8CtDJ4ZGjKEwNJqHV5X4lEpsA7sfj4unt9S8tPtN",
});

module.exports = paypal;
