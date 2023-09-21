import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Footer from "../components/Footer";

export default function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // useEffect(() => {}, [])  --- default function
  //if a user is logged in, go to homepage

 const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null ;
  useEffect(() => {
    userInfo && props.history.push("/");
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError("Please fill out all fields");
      return;
    }

    const {data} = await axios.post("http://localhost:5000/api/users/login", {username, password});
    if(data.error){
        setError(data.error);
      }
      if(data.success){
        console.log(data.user)
        localStorage.setItem("userInfo", JSON.stringify(data.user));    //session start
        Swal.fire("Login Successful", `${data.user.firstName}, Welcome to D' Blog`, "success")
        .then(() => {
            props.history.push("/");
            window.location.reload();
        });
      }

  };

  return (
    <>
    <section className="login">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 col-md-8 m-auto">
                    <div className="login-content">
                        <h4>Login</h4>
                        <p></p>
                        <form  action="" className="sign-form widget-form " onSubmit={submitHandler}>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Username*" name="username" onChange={e => setUsername(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password*" name="password" onChange={e => setPassword(e.target.value)}/>
                            </div>
                            <div className="sign-controls form-group">
                                <a href="/forgot-password" className="btn-link ">Forgot Password?</a>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn-custom">Login</button>
                            </div>
                            <p className="form-group text-center">Don't have an account? <a href="/register" className="btn-link">Sign Up</a> </p>
                        </form>
                    </div> 
                </div>
            </div>
        </div>
    </section>  
    <Footer/>
    </>
  );
}
