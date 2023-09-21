import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function HomePage() {
  const [posts, setPosts] = useState([]);

  const getPosts = async() => {
    const {data} = await axios.get("http://localhost:5000/api/posts");
    setPosts(data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="blog-creative blog-creative-1">
        <div className="container-wrap">
          <div className="left-side">
           <img src="assets/img/blog/42.jpg" alt="" className="" />
          </div>

          <div className="right-side">
            <h3>Recent Blogs</h3>
            <div className="posts-lists">
             
             {posts.length > 0 ? 
                posts.map((post, i) => {
                  // if(i > 6){
                  return (
                    <div className="post-list post-list-style1 pt-4" key={i}>
                      <div className="post-list-image">
                        <a href={`/post/${post._id}`}>
                          <img src={post.image} alt="loading.." />
                        </a>
                      </div>
                      <div className="post-list-title">
                        <div className="entry-title wdth">
                          <h5>
                            <a href={`/post/${post._id}`}>
                              {post.title}
                            </a>
                          </h5>
                        </div>
                      </div>
                      <div className="post-list-category">
                        <div className="entry-cat">
                          <a href="/" className="category-style-1">
                            no category
                          </a>
                        </div>
                      </div>                    
                    </div>
                  );
                  // }
                  // return null;
                })
                :<h3>Loading...</h3> 
                 
              }
              

            </div>

          
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;