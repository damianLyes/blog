import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

const EditPostPage = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    
    const id = props.match.params.id;
    const getPost = async() => {
        const {data} = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setTitle(data.title);
        setContent(data.content);
        setImage(data.image );
    }

    const submitHandler = async(event) => {
        event.preventDefault();
        const {data} = await axios.put(`http://localhost:5000/api/posts/${id}`, {title, content, image});
        if(data.success){
            Swal.fire("DONE", data.success, "success")
            .then(() => {
                props.history.push("/all-blogs");
                window.location.reload();
            })
        }
    }

    useEffect(() => {
        getPost();
    },[])

    return (
        <>
        <div className="section-heading " >
            <div className="container-fluid">
                <div className="section-heading-2">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-heading-2-title">
                                <h1>Edit blog</h1>
                                <p className="links"><a href="/">Home <i className="las la-angle-right"></i></a> Edit Blog</p>
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
                                    <div className="form-group">
                                        <label htmlFor="title">Title*</label>
                                        <input type="text" id="title" className="form-control" placeholder="Blog Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                                    </div>
                            
                                    <div className="form-group">
                                        <label htmlFor="content">Content* ({content ? content.length : 0} of 1000)
                                        </label>
                                        
                                        <textarea name="message" id="content" cols="30" rows="5" className="form-control" placeholder="Blog Content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="image">Image*</label>
                                        <input type="text" id="image" className="form-control" placeholder="Blog Image" value={image} onChange={(e) => setImage(e.target.value)}/>
                                    </div>
                                    <button type="submit" className="btn-custom">Edit Blog</button>{" "}
                                    <button className="btn-custom" type="button">Go Back</button>
                                </form>
                            </div>
                        </div> 
                    </div>
                </div>
            </section> 
        </>
    );
}
export default EditPostPage;