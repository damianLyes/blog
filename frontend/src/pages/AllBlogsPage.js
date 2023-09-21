import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Footer from '../components/Footer';

function AllBlogsPage (){
    const [posts, setPosts] = useState([]);

    const getPosts = async() => {
      const {data} = await axios.get("http://localhost:5000/api/posts");
      setPosts(data);
    }

    const deleteHandler = async(id) => {
        const {data} = await axios.delete(`http://localhost:5000/api/posts/${id}`);
        if(data.success){
            Swal.fire("DONE", data.success, "success")
            .then(getPosts())
        }
    }
  
    useEffect(() => {
      getPosts();
    }, []);

    return (
        <>
           <div className="section-heading " >
                <div className="container-fluid">
                    <div className="section-heading-2">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-heading-2-title">
                                    <h1>all blogs</h1>
                                    <p className="links"><a href="/">Home <i className="las la-angle-right"></i></a> Blogs</p>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
            <div className="blog-layout-1">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            {posts.length > 0 ? posts.map((post) => {
                                
                            return (
                                <div className="post-list post-list-style1 pt-4">
                                    <div className="post-list-image">
                                        <a href={`/post/${post._id}`}>
                                            <img src={post.image} alt="Loading..."/>
                                        </a>
                                    </div>
                                    <div className="post-list-title">
                                        <div className="entry-title">
                                            <h4>
                                                <a href={`/post/${post._id}`}>{post.title} </a>
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="post-list-category">
                                        <div className="entry-cat">
                                            <a href={`/post/${post._id}`} className="category-style-1">{post.updatedAt}</a>
                                           
                                                <a className="dropdown-toggle" href="." data-toggle="dropdown"> </a>
                                                <ul className="dropdown-menu fade-up">
                                                    <li>
                                                        <a className="dropdown-item text-info" href={`/edit-post/${post._id}`}>Edit</a>
                                                    </li>
                                                    <li>
                                                        <button className="dropdown-item text-danger" onClick={() => deleteHandler(post._id)}>Delete</button>
                                                    </li>
                                                   
                                                </ul>
                                         
                                        </div>
                                    </div>
                                </div>      
                            );
                        })
                        :<h3>Loading...</h3>
                        }
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
        
        
    );
}

export default AllBlogsPage;