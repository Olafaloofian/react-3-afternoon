import React, { Component } from 'react';
import CompanyIcon from 'react-icons/lib/md/filter-hdr';
import ProfileIcon from 'react-icons/lib/md/person-outline';
import axios from 'axios'
import './Header.css';

import Search from './Search/Search';

const baseURL = "https://practiceapi.devmountain.com/api"
//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *APP* COMPONENT

export default class Header extends Component {
  constructor(){
    super();

    this.state = {
      input: ""
    }
  }

  filterPosts = () =>{
    axios.get(`${baseURL}/posts/filter/?text=${this.state.input}`).then(res => {
     console.log(res)
     this.props.filteredFn(res.data)
      })
    }
  

  makeChange = (input) => {
    this.filterPosts(input)
    this.setState ({
      input: input
    })
  }

  render() {
    return (
      <section className="Header__parent">
        <section className="Header__content">

          {/* Displays the mountain icon in the header */}
          <div className="Header__company-info">
            <CompanyIcon id="Header__company-icon" />
            <span>Social Mountain</span>
          </div>

          {/* Displays the search bar */}
          <div className="Header__right">
            <Search filterFn={this.filterPosts} change={this.makeChange}/>

            {/* Displays the profile icon */}
            <div className="Header__profile">
              <ProfileIcon />
            </div>
          </div>

        </section>
      </section>
    )
  }
}