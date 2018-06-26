import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios';
import Post from "./Post/Post"

const baseURL = 'https://practiceapi.devmountain.com/api'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }

  componentDidMount() {
    console.log('Did mount')
    axios.get(`${baseURL}/posts`).then(res => {
      console.log(res)
      this.setState({
        posts: res.data
      })
    })

  }

  updatePost(id, text) {
    axios.put(`${baseURL}/posts?id=${id}`, {text}).then(res => {
      this.setState({
        posts: res.data
      })
    }).catch(err => console.log(err))
  }

  deletePost(id) {
    axios.delete(`${baseURL}/posts?id=${id}`).then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  createPost(text) {
    axios.post(`${baseURL}/posts`, {text}).then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  filterPost = (filtered) => {
    this.setState({
      posts: filtered
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header filteredFn={this.filterPost}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {
            posts.map(posts => (
              <Post key={posts.id}
                    text={posts.text}
                    date={posts.date}
                    id={posts.id}
                    updatePostFn={this.updatePost}
                    deletePostFn={this.deletePost}
                    />
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
