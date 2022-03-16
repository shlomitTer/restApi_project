export const toysReq_ar = [
  {
    type: "GET",
    color_req:"#03b1b4", 
    heading:"General request for the products in the system *",
    link: "/toys",
    body:" ",
    token:" ",
    
},
{
  type: "GET",
  color_req:"#03b1b4",
  heading:"Search for products by name or info <br>use query s *",
  link: "/toys/search/?s=bricks",
  body:" ",
  token:" "
},
{
  type: "GET",
  color_req:"#03b1b4",
  heading:"Search by category * ",
  link: "/toys/cat/puzzles",
  body:" ",
  token:" "
},
{
  type: "GET",
  color_req:"#03b1b4",
  heading:"products in a certain price range <br>use query min & max * ",
  link: "/toys/prices/?min=70&max=150",
  body:" ",
  token:" "
},
{
  type: "GET",
  color_req:"#03b1b4",
  heading:"User's products list (possible for registered users only) *",
  link: "/toys/myToys",
  body:" ",
  token:"Token required"
},
{
  type: "POST",
  color_req:"#5b8bea",
  heading:"Add product (possible for registered users only)",
  link: "/toys",
  body:`name (required),<br>
        info (required),<br>
        category (required),<br>
        img_url (required),<br>
        price (required)`,
  
  token:"Token required"
},
{
  type: "PUT",
  color_req:"#8e60f1",
  heading:"Edit product (possible for registered users only),<br> use params- id of the product (:editId) ",
  link: "/toys/:editId",
  body:`name (required),<br>
        info (required),<br>
        category (required),<br>
        img_url (required),<br>
        price(required)`,
  token:"Token required"
},
{ 
  type: "DELETE",
  color_req:"#db1dfb",
  heading:"Delete product (possible for registered users only),<br>use params- id of the product (:delId)",
  link: "/toys/:delId",
  body:"",
  token:"Token required"
}
];