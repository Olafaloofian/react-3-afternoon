<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

In this project, we'll complete the functionality of a social media platform by using `axios` in a `react` project. Majority of the application has already been built out for you. Take some time before starting to familarize yourself with the component structure. The platform we'll be building out is a scaled down version of twitter and we'll focus on the functionality for fetching all the DevMountain posts, creating new posts, editing existing posts, and deleting existing posts.

This is a live API, please be respectful and mindful of what you post.

# Live Example

<a href="https://devmountain.github.io/react-3-afternoon/">Click Me!</a>

<img src="https://github.com/DevMountain/react-3-afternoon/blob/solution/assets/1.png" />

## Setup

* `Fork` this repository.
* `Clone` your fork.
* `cd` into the project directory.
* Run `npm install`.
* Run `npm start`.

## API Documentation

Before continuing to step 1, take a minute to browse the API documentation.

https://swaggerhub.com/apis/DevMountain/social_mountain/1.0.0

## Step 1

### Summary

In this step, we'll import axios into the project and fetch all the DevMountain posts. Using the return posts array, we'll assign it to state and pass it down into the components that need it. Remember to use the API documentation to help you complete the steps.

### Instructions

* Run `npm install --save axios`.
* Open `./src/components/App.js`.
* Import `axios` at the top.
* Create a `componentDidMount` method that fetches all the posts using `axios`.
* Use the result of the `axios` call to set a `posts` array on state.
* Pass the posts array down as a `prop` called `posts` into the `Feed` component.
* Pass the posts array length down as a `prop` called `count` into the `Summary` component.

<details>

<summary> Detailed Instructions </summary>

<br />

Let's begin by importing `axios` into our project. In your command line, make sure you are in the root project directory, run `npm install --save axios`. Then open `./src/components/App.js` and at the top with the other imports, import axios.

```js
import axios from 'axios';
```

We are using this component to fetch the `posts` because it is the parent component to the `Summary` and `Feed` component. Both those components rely on the `posts` array. Let's create a `componentDidMount` method that uses `axios` to fetch our `posts`. Remember, when fetching data from a server always use a `GET` request. Using the API documentation we can see that the base API url is: `practiceapi.devmountain.com/api` and uses a `https` scheme. We can also see that all our post endpoints are under the `/posts` route.

```js
componentDidMount() {
  axios.get('https://practiceapi.devmountain.com/api/posts').then( results => {

  });
}
```

When inspecting the value of `results` we can see that the API puts the `posts` array on the `data` property. Let's assign that to `posts` on state.

```js
componentDidMount() {
  axios.get('https://practiceapi.devmountain.com/api/posts').then( results => {
    this.setState({ posts: results.data });
  });
}
```

To avoid any rendering errors before `posts` has a value on `state`, let's create a `constructor` method and default `posts` to be an empty array.

```js
constructor() {
  super();

  this.state = {
    posts: []
  }
}
```

Lastly, we'll just need to pass down the value of `posts` on state down into the children components that are depending on it. The `Summary` component depends on the length of `posts` to display it and the `Feed` component depends on `posts` to `map` over them and `render` them. Since I'll be referring to `this.state.posts` multiple times in my render method, I'll use `es6 destructuring` on `state`.

```js
render() {
  const { posts } = this.state;

  return (
    <div className="App__parent">
      <Header />

      <section className="App__content">
        <Summary count={ posts.length } />
        <Feed posts={ posts } />
      </section>
    </div>
  );
}
```

</details>

### Solution

<details>

<summary> <code> ./src/components/App.js </code> </summary>

```js
import React, { Component } from 'react';
import axios from 'axios';


import './App.css';

import Header from './Header/Header';
import Summary from './Summary/Summary';
import Feed from './Feed/Feed';

class App extends Component {
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then( results => {
      this.setState({ posts: results.data });
    });
  }

  constructor() {
    super();

    this.state = {
      posts: []
    }
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Summary count={ posts.length } />
          <Feed posts={ posts } />
        </section>
      </div>
    );
  }
}

export default App;
```

</details>

## Step 2

### Summary

In this step, we'll use the `props` passed into the `Summary` and `Feed` component and render them onto the `DOM`.

### Instructions

* Open `./src/components/Summary/Summary.js`.
* Locate the `span` with the value of `###`.
* Replace `###` with the value of `count` off of props.
* Open `./src/components/Feed/Feed.js`.
* Map over the `posts` array off of props and render a `Post` component for each post.
  * Add a `text`, `id`, and `date` prop on each `Post` component and set them equal to values for each post.
  * Remember to use a `key` prop when mapping in React to avoid errors. The post ID will always be unique.

<details>

<summary> Detailed Instructions </summary>

<br />

Let's begin by opening `./src/components/Summary/Summary.js`. This is the component that sits on the left side of the posts feed ( `Feed` component ). It displays DevMountain's name, handle, and profile picture. Underneath those it is also displaying a post count which is currently equal to `###`. All we need to do is update that value to use the value we are passing down through props. 

```js
<span className="Summary__posts-value">{ this.props.count }</span>
```

We're done with that component now. Let's move on to the `Feed` component. This component sits on the right side of the `Summary` component. It displays a feed of `posts`. Let's map over the `posts` array that we are passing down through props and render a `Post` component for each `post`. The `Post` component is a child component for the `Feed` component that handles displaying posts and also offering a way to edit and delete a `post`. When mapping, we need to pass props down into the `Post` component in order for the `Post` component to display the data. We'll need a `text`, `date`, `id`, and `key` prop.

```js
{
  this.props.posts.map( post => (
    <Post key={ post.id }
          text={ post.text }
          date={ post.date }
          id={ post.id } />
  ))
}
```

Now the `Post` component will be able to reference each individual post's data by using `this.props.text`, `this.props.date`, and `this.props.id`.

</details>

### Solution

<details>

<summary> <code> ./src/components/Summary/Summary.js </code> </summary>

```js
import React, { Component } from 'react';
import ProfileIcon from 'react-icons/lib/md/person-outline';

import './Summary.css';

export default class Summary extends Component {
  render() {
    return (
      <section className="Summary__parent">
        <div className="Summary__image" />

        <div className="Summary__meta-data">
          <div className="Summary__profile-picture">
            <ProfileIcon />
          </div>

          <div className="Summary__text">
            <span className="Summary__name">DevMountain</span>
            <span className="Summary__handle">@DevMountain</span>
          </div>
        </div>

        <div className="Summary__statistics">
          <div className="Summary__posts">
            <span className="Summary__posts-label">Posts</span>
            <span className="Summary__posts-value">{ this.props.count }</span>
          </div>
        </div>
      </section>
    )
  }
}
```

</details>

<details>

<summary> <code> ./src/components/Feed/Feed.js </code> </summary>

```js
import React, { Component } from 'react';
import Post from './Post/Post';
import Compose from './Compose/Compose';

import './Feed.css';

export default class Feed extends Component {
  render() {
    return (
      <section className="Feed__parent">

        <Compose />
        
        {
          this.props.posts.map( post => (
            <Post key={ post.id }
                  text={ post.text }
                  date={ post.date }
                  id={ post.id } />
          ))
        }

      </section>
    )
  }
}
```

</details>

<img src="https://github.com/DevMountain/react-3-afternoon/blob/solution/assets/2.png" />

## Step 3

### Summary

In this step, we'll go into the `Post` component and access props to render in the data for each `post`.

### Instructions

* Open `./src/components/Feed/Post/Post.js`.
* Replace `DATE GOES HERE` with the value of `date` on props.
* Replace `POST TEXT GOES HERE` with the value of `text` on props.

### Solution

<details>

<summary> <code> ./src/components/Feed/Post/Post.js ( render method ) </code> </summary>

```js
render() {
  const { editing, showMasterMenu } = this.state;

  return (
    <section className="Post__parent" onClick={ this.hideMasterMenu }>

      <div className="Post__master-controls">
        <MasterControlIcon onClick={ this.toggleMasterMenu } />

        <div className="Post__master-menu" style={ { display: showMasterMenu ? 'flex' : 'none' } }>
          <span onClick={ this.showEdit }>Edit</span>
          <span>Delete</span>
        </div>
      </div>

      <div className="Post__meta-data">
        <div className="Post__profile-picture">
          <ProfileIcon />
        </div>

        <span className="Post__name">DevMountain</span>
        <span className="Post__handle">@DevMountain</span>

        <span className="Post__date">- { this.props.date }</span>
      </div>

      <div className="Post__content">
        {
          editing
          ?
            <Edit text=""
                  cancelFn={ this.cancelEdit } />
          :
            <span className="Post__text">{ this.props.text }</span>
        }
      </div>

      <div className="Post__user-controls">
        <ReplyIcon className="Post__control-icon" />
        <FavoriteIcon className="Post__control-icon" />
        <MessageIcon className="Post__control-icon" />
      </div>

    </section>
  )
}
```

</details>

<img src="https://github.com/DevMountain/react-3-afternoon/blob/solution/assets/3.png" />

## Step 4

### Summary

In this step, we'll get the `Edit` button to work for existing `posts`. The edit button is under the hidden menu on the top-right of a `post`. Since the `App.js` maintains the `posts` array, we'll need to create a method in this component that uses `axios` to update `post` and then uses the results to update the `posts` array on state.

### Instructions

* Open `./src/components/App.js`.
* Create a new method called `updatePost` that has an `id` and `text` parameter.
* Open `./src/components/Feed/Post/Post.js`.
* Locate where the `Edit` component is being rendered.
* Update the `text` prop to be the `post`'s text.
* Create a new method called `updatePost` that has a single parameter called `value`.
* Open `./src/components/Feed/Post/Edit/Edit.js`.
* Import `axios` into the component.
* Locate the `onUpdate` method. This method gets called when a user presses the `Update` button.
* Use `axios` to send a `PUT` request to the API to update the `post`'s text.

<details>

<summary> Detailed Instructions </summary>

<br />



</details>

### Solution

<details>

<summary> <code> ./src/components/Feed/Post/Post.js ( Edit render ) </code> </summary>

```js
<div className="Post__content">
  {
    editing
    ?
      <Edit text={ this.props.text }
            cancelFn={ this.cancelEdit } />
    :
      <span className="Post__text">{ this.props.text }</span>
  }
</div>
```

</details>







## Step 2

### Summary

In this step, we'll get the `Compose` button to create new DevMountain posts.

## Step 3

### Summary

In this step, we'll get the `Edit` button to edit existing DevMountain posts.

## Step 4

### Summary

In this step, we'll get the `Delete` button to delete existing DevMountain posts.

## Black Diamond

Search functionality..

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
</p>