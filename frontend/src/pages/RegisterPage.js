import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import validator from "validator";
import axios from "axios";
import Footer from '../components/Footer';

//export default function RegisterPage(){
const RegisterPage = (props) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  
  // const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null ;
  // useEffect(() => {
  //   userInfo && props.history.push("/");
  // }, [])

  const submitHandler = async (e) => {
    e.preventDefault();
    //checking if any fields is empty
    if (!username || !firstName || !lastName || !email  || !password) {
      setError("Please fill all fields");
      return;
    }

    //check for alphaumeric username
    if (!validator.isAlphanumeric(username)) {
      setError("Username can only contain alphabets and numbers");
      return;
    }

    if(!validator.isAlpha(firstName)){
      setError("First Name can only contain alphabets");
      return;
    }
    if(!validator.isAlpha(lastName)){
      setError("Last Name can only contain alphabets");
      return;
    }

    //check if email is valid
    if (!validator.isEmail(email)) {
      setError("Email is invalid");
      return;
    }
    

    //check if password is of length greater (>=) than 4
    if (password.length < 4) {
      setError("Password must be atleast 4 characters long");
      return;
    }

    //validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // alert("Successful");

    const {data} = await axios.post("http://localhost:5000/api/users/register", {username, firstName, lastName, email, password});
    if(data.error){
      setError(data.error);
    }
    if(data.success){
      Swal.fire("Done", data.success, "success")
      .then(() => { 
          props.history.push("/login");
          window.location.reload();  
        });
      // Swal.fire("Registeration Successful", `${data.user.username}, welcome to D' Blog`, "success")
      // .then(() => {
      //   props.history.push("/login");
      //   window.location.reload();  
      // });   //push to login page after account creation
    }

  };

  return (
    <>
      <section className="login">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 col-md-8 m-auto">
                    <div className="login-content">
                        <h4>Sign up</h4>
                        {error && <div className="alert alert-danger p-2">{error}</div>}
                        <form  className="sign-form widget-form contact_form " onSubmit={submitHandler}>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Username*" name="" onChange={e => setUsername(e.target.value)}/>
                            </div>
                            <div className="form-group">
                              <input type="text" className="form-control" placeholder="First Name*" onChange={e => setFirstName(e.target.value)} />
                            </div>
                            <div className="form-group">
                            <input type="text" className="form-control" placeholder="Last Name*" onChange={e => setLastName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email Address*" onChange={e => setEmail(e.target.value)}/>
                            </div>

                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password*" name="" onChange={e => setPassword(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Confirm Password*" name="" onChange={e => setConfirmPassword(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn-custom">Sign Up</button>
                            </div>
                            <p className="form-group text-center">Already have an account? <a href="/login" className="btn-link">Login</a> </p>
                        </form>
                    </div> 
                </div>
             </div>
        </div>
    </section>
    <Footer/> 
    </>
  );
};
export default RegisterPage;
//}
