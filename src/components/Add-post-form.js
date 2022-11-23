import React from "react";
import axios from 'axios';
import { useState } from 'react';
import './posts.css'
import cookies from 'react-cookies'
import { useDispatch } from 'react-redux';
import { getPosts } from '../features/postsSlicer';

export default function AddPost() {
    const [posts, setPosts] = useState([])
    const [showPosts, setShowPosts] = useState(false)
    const [renderComments, setRenderComments] = useState([])
    const [postCommentID, setPostCommentID] = useState(0)
    const [postsCounter, setPostsCounter] = useState(0)
    const [adminDetector, setAdminDetector] = useState(false)

    // https://odat-posts-database.herokuapp.com
    // http://localhost:3001

    const dispatch = useDispatch();


    const userData = cookies.load('userData')
    console.log(userData.role)


    const getPosts = async (e) => {
        if (e) {
            e.preventDefault(e)
        }
        let response = [await axios.get('https://odat-posts-database.herokuapp.com/post')]
        setPosts(response[0].data.post)
        const userData = cookies.load('userData')
        if (userData.role == 'admin') {
            setAdminDetector(true)
        }
        setShowPosts(true)


    }

    const addPost = async (e) => {
        e.preventDefault();
        const postData = {
            postTitle: e.target.postTitle.value,
            postBody: e.target.postBody.value,
            userName: cookies.load('username'),
            userID: cookies.load('userID')
        }
        setPostsCounter(postsCounter + 1)
        await axios.post('https://odat-posts-database.herokuapp.com/post', postData);
        getPosts();
    }

    async function deletePost(id) {
        const token = cookies.load('token')
        const role = cookies.load('userData')


        await axios.delete(`https://odat-posts-database.herokuapp.com/post/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        getPosts();
        setPostsCounter(postsCounter - 1)

    }
    const createComment = async (e) => {
        e.preventDefault();
        let newCommentPostID = e.target.postID.value;

        let commentData = { commentBody: e.target[0].value, postID: newCommentPostID }
        await axios.post(`https://odat-posts-database.herokuapp.com/comment/${newCommentPostID}`, commentData)
        showPostComments(newCommentPostID)

    }

    const showPostComments = async (id) => {

        let response = [await axios.get(`https://odat-posts-database.herokuapp.com/post/${id}`)];
        let comments = response[0].data.CommentsTables;
        let array = [];
        setPostCommentID(comments[0].postID)
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].postID == id) {
                array.push(comments[i].commentBody)
            }
        }
        setRenderComments(array)

    }

    cookies.load('username');



    return (
        <div className="App">
            <form onSubmit={addPost}>
                <input type="text" name='postTitle' className="post-title" placeholder="Post Title" />
                <textarea type="text" name='postBody' className="post-title" placeholder="Type something..." />

                <input type="submit" value="Add Post" />
            </form>


            <form onSubmit={() => {
                dispatch(getPosts)
            }}>
                <input type="submit" value="Show All Posts" />

            </form>

            {
                posts.map((post, idx) => {
                    return (
                        <div key={idx} className='post-box'>
                            <h2>{post.postTitle}</h2>
                            <p>{post.postBody}</p>
                            <p>{`Posted by ${post.userName}`}</p>

                            {/* <p>{console.log(post, 'posttt')}</p> */}
                            <div className="buttons-carrier">
                                {adminDetector &&
                                    <button onClick={() => deletePost(post.id)} className='secondary-buttons'> Delete Post </button>}
                                <button onClick={() => showPostComments(post.id)} className='secondary-buttons'> Show Comments </button>
                            </div>
                            {post.id == postCommentID &&
                                renderComments.map((comment, idx) => {
                                    return (
                                        <div key={idx} className='post-box'>

                                            <p>{comment}</p>

                                        </div>

                                    )
                                })
                            }

                            <form onSubmit={createComment} >
                                <textarea type='text' name="comment" />
                                <input value={post.id} hidden name='postID' />
                                <button type="submit" className="comment-button"> Add a comment</button>
                            </form>
                        </div>

                    )
                })
            }

        </div>
    );

}


