import React, { Component } from 'react'
import Post from './Post/Post'
import axios from 'axios'
import PostComplet from './PostComplet/PostComplet'
import NvPost from './NvPost/NvPost'
import './Blog.css'

class Blog extends Component {

    state = {
        posts : [],
        selectedPostId: null
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
             .then(response => {
                 const posts = response.data.slice(0,4);
                 const updatedPosts = posts.map(post => {
                     return {
                         ...post,
                         auteur: 'Hugo'
                     }
                 })
                this.setState({posts: updatedPosts});
                //console.log(response);
             })
             .catch(error => {
                 console.log(error);
             });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
        console.log(id)
    }


    render () {

        const posts = this.state.posts.map(post => {
            return <Post 
            key={post.id}
            title={post.title}
            auteur={post.auteur}
            clicked={() => this.postSelectedHandler(post.id)}
            />
        });

        return (
            <div>
                <section>
                    <NvPost />
                </section>
                <section>
                    <PostComplet id={this.state.selectedPostId}/>
                </section>

                <h2 className="text-center my-5">Tous les Articles ...</h2>
                <section className="Posts">
                {posts}
                </section>

            </div>
        );
    }
}

export default Blog;