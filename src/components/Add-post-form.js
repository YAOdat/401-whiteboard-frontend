import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Posts from './Post'
import './posts.css'
export default function AddPost() {
    const [posts, setPosts] = useState([])
    const [showPosts, setShowPosts] = useState(false)
    const [renderComments, setRenderComments] = useState([])
    const [postCommentID, setPostCommentID] = useState(0)


    const getPosts = async (e) => {
        if (e) {
            e.preventDefault(e)
        }
        let response = [await axios.get('http://localhost:3001/post')]
        console.log(response[0].data.post)
        setPosts(response[0].data.post)
        setShowPosts(true)
    }


    const addPost = async (e) => {
        e.preventDefault();
        const postData = {
            postTitle: e.target.postTitle.value,
            postBody: e.target.postBody.value
        }
        await axios.post('http://localhost:3001/post', postData);
        getPosts();
    }

    async function deletePost(id) {
        await axios.delete(`http://localhost:3001/post/${id}`);
        getPosts();

    }

    const createComment = async (e) => {
        e.preventDefault();
        let newCommentPostID= e.target.postID.value;
        console.log(newCommentPostID)

        let commentData = { commentBody: e.target[0].value, postID: newCommentPostID }
        await axios.post(`http://localhost:3001/comment/${newCommentPostID}`, commentData)
        showPostComments(newCommentPostID)



    }



    const showPostComments = async (id) => {

        let response = [await axios.get(`http://localhost:3001/post/${id}`)];
        let comments = response[0].data.CommentTables;
        let array = [];
        console.log(comments)

        console.log(comments[0].postID, 'line 54')
        setPostCommentID(comments[0].postID)
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].postID == id) {
                array.push(comments[i].commentBody)
            }
        }

        setRenderComments(array)



    }


    return (
        <div className="App">
            <form onSubmit={addPost}>
                <label htmlFor="">Post Title: </label>
                <input type="text" name='postTitle' />

                <label htmlFor="">Post Body: </label>
                <textarea type="text" name='postBody' />

                <input type="submit" value="Add Post" />
            </form>


            <form onSubmit={getPosts}>
                <input type="submit" value="Get Posts" />

            </form>

            {
                posts.map((post, idx) => {
                    return (
                        <div key={idx} className='post-box'>
                            <h2>{post.postTitle}</h2>
                            <p>{post.postBody}</p>
                            <p>{post.id}</p>


                            {/* <p>{console.log(post, 'posttt')}</p> */}
                            <button onClick={() => deletePost(post.id)}> Delete Post </button>
                            <button onClick={() => showPostComments(post.id)}> Show Comments </button>

                            { post.id == postCommentID &&
                                renderComments.map((comment, idx) => {
                                    return (
                                        <div key={idx} className='post-box'>
                                            <h3>Comments:</h3>
                                            <p>{comment}</p>

                                        </div>

                                    )
                                })
                            }

                            <form onSubmit={createComment} >
                                <textarea type='text' name="comment" />
                                <input value={post.id} hidden name= 'postID' />
                                <button type="submit"> Add a comment</button>
                            </form>
                        </div>

                    )
                })
            }

        </div>
    );

}



// {renderComments.map((comment, idx)
//     return( <p>{comment.commentBody}</p>) )}