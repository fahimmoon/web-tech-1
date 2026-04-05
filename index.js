import express from "express"; //import express form node modules

const app = express(); //create an instance of express
const PORT = 3000;      //define the port number
//MIDDLEWARE
const logger= (req, res, next) => {  
   //define a middleware function called logger
   req.message = "STUDENT_HUB.COM"; //add a property called msg to the request object with the value "Hello, World!"
  console.log(`${req.method} ${req.url}`); //call the next middleware function in the stack
  next();
}
//another middleware for Auth
const auth = (req, res, next) => {
    if(req.query.username === "Fahim"){
      next();
    }
    else{
      res.send("Unauthorized");
    }
 };





app.use(logger); //use the logger middleware for all routes

//ROUTES
app.get("/", (req, res) => {    //define a route for the root URL
  res.send(`Welcome to ${req.message}`);  //send a response to the client with the message "Hello, World!"
});

app.get("/login", auth, (req, res) => {    //define a route for the login page with auth middleware
  res.send(`welcome, ${req.query.username}`);  //send a response to the client with the message "Hello, World!"
});

app.get("/about", (req, res) => {    //define a route for the about page
  res.send(`about us ${req.message}`);  //send a response to the client with the message "Hello, World!"
});


//start the server and listen on the defined port

app.listen(PORT, () => {  //start the server and listen on the defined port
  console.log(`Server is running on http://localhost:${PORT}`); //log a message to the console indicating that the server is running and on which URL
});