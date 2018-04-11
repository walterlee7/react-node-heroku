import React, { Component } from 'react';
import BlogForm from './blogForm';
import * as blogService from '../services/blogs';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blog: {
                title: '',
                content: '',
                id: 1
            }
        };
    }

    componentDidMount() {
        this.getBlog();
    }

    getBlog() {
        blogService.one(this.props.match.params.id)
            .then((blog) => {
                this.setState({
                    blog
                });
            }).catch((err) => {
                console.log(err);
            });
    }

    updateBlog(blog) {
        blogService.update(this.props.match.params.id, blog)
            .then(() => {
                this.props.history.push('/');
            }).catch((err) => {
                console.log(err);
            });
    }

    deleteBlog() {
        blogService.destroy(this.props.match.params.id)
            .then(() => {
                this.props.history.push('/');
            }).catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="post-preview">
                        <a href="post.html">
                            <h2 className="post-title">
                                {this.state.blog.title}
                            </h2>
                            <h3 className="post-subtitle">
                                {this.state.blog.content}
                            </h3>
                        </a>
                        <p className="post-meta">Posted by on {this.state.blog._created}</p>
                    </div>
                    <BlogForm postBlog={(blog) => { this.updateBlog(blog); }} />
                    <div>
                        <button className="delete"
                            onClick={() => { this.deleteBlog(); }}>Delete Blog
                        </button>
                    </div>
                </div>
            </ React.Fragment>
        );
    }
}

export default Edit;