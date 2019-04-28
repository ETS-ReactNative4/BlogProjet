import React, { Component } from 'react'
import axios from 'axios'

import './PostComplet.css'

class PostComplet extends Component {

    state = {
        loadedPost: null
    }

    componentDidUpdate() {
        if(this.props.id) {
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {

                axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                     .then(response => {
                         console.log(response);
                         this.setState({
                             loadedPost: response.data
                         })
                     })
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
    }

    render () {
        let post = <p>Choisis un poste !</p>;
        if(this.props.id){
            let post = <p>Chargement ...</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="PostComplet">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button 
                        onClick={this.deletePostHandler}
                        className="btn btn-danger my-3">Supprimer</button>
                    </div>
                </div>
    
            );
        }
     
        return post;
    }
}

export default PostComplet;