import axios from "axios";
import { useEffect, useState } from "react";

const PostPage = (props) => {
  const [post, setPost] = useState(null);
  const id = props.match.params.id;

  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/post/${id}`);
      setPost(data);
    };

    getPost().catch((err) => {
      console.log("post data error: ", err.message);
    });
  }, [id]);

  return (
    <>
      <section className="post-single">
        <div className="container-fluid ">
          <div className="row ">
            <div className="col-lg-12">
              <div className="post-single-image">
                <img src={post && post.image} alt="none" />
              </div>

              <div className="post-single-body">
                <div className="post-single-title">
                  <h2> {post && post.title}</h2>
                  <ul className="entry-meta">
                    <li className="post-author-img">
                      <img src="/assets/img/author/1.jpg" alt="" />
                    </li>
                    <li className="post-author">
                      {" "}
                      <a href="/">{post.author && post.author.username}</a>
                    </li>
                    <li className="entry-cat">
                      {" "}
                      <a href="/" className="category-style-1 ">
                        {" "}
                        <span className="line"></span> Livestyle
                      </a>
                    </li>
                    <li className="post-date">
                      {" "}
                      <span className="line"></span> September 11 ,2022
                    </li>
                  </ul>
                </div>

                <div className="post-single-content">
                  <p>{post && post.content}</p>
                </div>

                <div className="post-single-bottom">
                  <div className="tags">
                    <p>Tags:</p>
                    <ul className="list-inline">
                      <li>
                        <a href="/">test</a>
                      </li>
                    </ul>
                  </div>
                  <div className="social-media">
                    <p>Share on :</p>
                    <ul className="list-inline">
                      <li>
                        <a href="/">
                          <i className="fab fa-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fab fa-youtube"></i>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fab fa-pinterest"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="post-single-ads ">
                  <div className="ads">
                    <img src="/assets/img/ads/ads.jpg" alt="" />
                  </div>
                </div>

                <div className="post-single-comments">
                  <h4>Comments</h4>
                  <ul className="comments">
                    <li className="comment-item pt-0">
                      <img src="/assets/img/other/user1.jpg" alt="" />
                      <div className="content">
                        <div className="meta">
                          <ul className="list-inline">
                            <li>
                              <a href="/">Nirmaine Nicole</a>{" "}
                            </li>
                            <li className="slash"></li>
                            <li>10 hours ago</li>
                          </ul>
                        </div>
                        <p>
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Repellendus at doloremque adipisci eum placeat
                          quod non fugiat aliquid sit similique!
                        </p>
                        <a href="/" className="btn-reply">
                          <i className="las la-reply"></i> Reply
                        </a>
                      </div>
                    </li>
                  </ul>
                  <div className="comments-form">
                    <h4>Leave a Reply</h4>
                    <form
                      className="form "
                      action="#"
                      method="POST"
                      id="main_contact_form"
                    >
                      <p>
                        Your email adress will not be published ,Requied fileds
                        are marked*.
                      </p>
                      <div
                        className="alert alert-success contact_msg"
                        style={{ display: "none" }}
                        role="alert"
                      >
                        Your message was sent successfully.
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="form-control"
                              placeholder="Name*"
                              required="required"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="form-control"
                              placeholder="Email*"
                              required="required"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <textarea
                              name="message"
                              id="message"
                              cols="30"
                              rows="5"
                              className="form-control"
                              placeholder="Message*"
                              required="required"
                            ></textarea>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <button
                            type="submit"
                            name="submit"
                            className="btn-custom"
                          >
                            Send Comment
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostPage;
