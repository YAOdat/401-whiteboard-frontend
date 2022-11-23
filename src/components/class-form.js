import React from "react";
import axios from 'axios';

export default class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }
    
    getPosts = async () => {
        let response = await axios.get('https://odat-posts-database.herokuapp.com/post')
        console.log(response.data.post)
        return this.setState({posts: response})
       
    }

    render() {
        return (
            <div> 
                   <h1> Posts </h1>
                  
                   <button onClick={this.getPosts}> Get All Posts </button>

                    {this.state.posts.map((item, idx) => {

                        <p> {item} </p>

                    })}

                
            </div>
            ) 
    }
}