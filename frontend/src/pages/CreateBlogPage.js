import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
//import validator from "validator";
import Footer from '../components/Footer';

const CreateBlogPage = () => {
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    //const [author, setAuthor] = useState("");


    const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null ;
    //const fName = userInfo.firstName + " " + userInfo.lastName;


    const submitHandler = async(e) => {
        e.preventDefault();
        if(!title || !content || !image){
            setError("Please fill out all fields!!");
            return;
        }

        if(content.length > 1000){
            setError("Content must not contain more than 1000 characters");
            return;
        }
        let author = userInfo._id; //rewrite if userinfo is undefined, do not create post
        

        const {data} = await axios.post("http://localhost:5000/api/posts", {author, title, content, image});
        if(data.success){
            Swal.fire("Posted", data.success, "success");
        }

    }

    return (
        <>
            <div className="section-heading " >
                <div className="container-fluid">
                    <div className="section-heading-2">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-heading-2-title">
                                    <h1>Create blog</h1>
                                    <p className="links"><a href="/">Home <i className="las la-angle-right"></i></a> Create Blog</p>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>

            <section className="contact">
                <div className="container-fluid">
                    <div className="contact-area">
                        <div className="d-flex justify-content-center">
                            {/* <div className="col-lg-3"/> */}
                            <div className="col-lg-8">
                                <form action="" className="form contact_form " id="main_contact_form" onSubmit={submitHandler}>
                                  {error && <div className="alert alert-danger">{error}</div>}
                                    {/* <div className="form-group" >
                                        <label htmlFor="name">Author*</label>
                                        <input type="text" id="name" className="form-control" disabled value={userInfo.id} placeholder="Author" />
                                    </div> */}
                                    <div className="form-group">
                                        <label htmlFor="title">Title*</label>
                                        <input type="text" id="title" className="form-control" placeholder="Blog Title" onChange={(e) => setTitle(e.target.value)}/>
                                    </div>
                            
                                    <div className="form-group">
                                        <label htmlFor="content">Content* ({content ? content.length : 0} of 1000)
                                        </label>
                                        
                                        <textarea name="message" id="content" cols="30" rows="5" className="form-control" placeholder="Blog Content" onChange={(e) => setContent(e.target.value)}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="image">Image*</label>
                                        <input type="text" id="image" className="form-control" placeholder="Blog Image" onChange={(e) => setImage(e.target.value)}/>
                                    </div>
                                    <button type="submit" className="btn-custom">Create Blog</button>{" "}
                                    <button className="btn-custom" type="button">Go Back</button>
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

export default CreateBlogPage;