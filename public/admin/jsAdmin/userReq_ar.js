export const userReq_ar = [
  {
    heading: "Register as a user in the system",
    body: `name (required),<br>
            email (required, unique),<br>
            password (required)`,
    type: "POST",
    color_req: "#5b8bea",
    token: " ",
    link: "/users"
  },
  {
    heading: "Login",
    body: `email (required),<br>
            password (required)`,
    type: "POST",
    color_req: "#5b8bea",
    token: " ",
    link: "/users/login"
  },
  {
    heading: "User's info (possible for registered users only)",
    body: " ",
    type: "GET",
    color_req: "#03b1b4",
    token: "Token required ",
    link: "/users/userInfo "
  }
]