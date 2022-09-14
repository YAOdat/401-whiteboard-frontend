import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Posts from './Post'
import './posts.css'
export default function AddPost() {
    const [posts, setPosts] = useState([])
    const [showPosts, setShowPosts] = useState(false)
    const [renderComments, setRenderComments] = useState([])



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

    const createComment = async (id, e) => {
        e.preventDefault();
        let commentData = { commentBody: e.target[0].value, postID: id }
        await axios.post(`http://localhost:3001/comment/${id}`, commentData)
        console.log(commentData)
        // showComments()


    }


    // const showComments = async (id) => {

    //     let response = await axios.get(`http://localhost:3001/comment/`);
    //     let comments = response.data.comment;

    //     console.log(comments[1].postID, 'line 54')

    //     for (let i = 0; i < comments.length; i++) {
    //         if (comments[i].postID == id) {
    //             // console.log(comments[i].commentBody)
    //         }
    //     }

    //     setRenderComments(comments)

    // }

    const showPostComments = async (id) => {

        let response = [await axios.get(`http://localhost:3001/post/${id}`)];
        console.log(response[0].data.CommentTables, 'new problem')
        let comments = response[0].data.CommentTables;


        console.log(comments[0].postID, 'line 54')

        for (let i = 0; i < comments.length; i++) {
            if (comments[i].postID == id) {
                console.log(comments[i].commentBody, 'from for loop')
                setRenderComments(response)
                console.log(renderComments, 'render')
            }
        }


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
                            { post.id == renderComments.postID &&
                                renderComments.map((comment, idx) => {
                                    return (
                                        <div key={idx} className='post-box'>
                                            <h3>Comments:</h3>
                                            <p>{comment.commentBody}</p>

                                        </div>

                                    )
                                })
                            }

                            <form onSubmit={() => createComment(post.id)}>
                                <textarea type='text' name="comment" />
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