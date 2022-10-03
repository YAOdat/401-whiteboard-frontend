import React from "react";
import axios from 'axios';
import { useState } from 'react'; 
import './posts.css'
import cookies from 'react-cookies'
import Swal from 'sweetalert2';

export default function AddPost() {
    const [posts, setPosts] = useState([])
    const [showPosts, setShowPosts] = useState(false)
    const [renderComments, setRenderComments] = useState([])
    const [postCommentID, setPostCommentID] = useState(0)
    const [postsCounter, setPostsCounter] = useState(0)
    const [adminDetector, setAdminDetector] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)



    // https://odat-posts-database.herokuapp.com
    // http://localhost:3001

    const userData = cookies.load('userData')
    console.log(userData.role)


    const getPosts = async (e) => {
        if (e) {
            e.preventDefault(e)
        }
        let response = [await axios.get('http://localhost:3001/post')]
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
        await axios.post('http://localhost:3001/post', postData);
        getPosts();
    }


    const updatePost = async (e) => {
        e.preventDefault();
        if(e.target.value === cookies.load('username')){

        let id = e.target.postID.value;
        const postData = {
            postTitle: e.target.postTitle.value,
            postBody: e.target.postBody.value,
            userName: cookies.load('username'),
            userID: cookies.load('userID')
        }
        await axios.put(`http://localhost:3001/post/${id}`, postData);
        setShowEditForm(false)
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Nope!',
            text: 'You cannot edit posts of other users!',
            color: '#CC4949',
            background: 'rgb(30,30,40)',
            confirmButtonText: 'OK, I will not do that again',
            confirmButtonColor: '#28a1a5'

            
          })


    }

    }
    const editButton = async (e) => {
        e.preventDefault();
        if(e.target.value === cookies.load('username')){
           console.log(e.target.value === cookies.load('username'))
            setShowEditForm(true)
        } else {

            Swal.fire({
                icon: 'error',
                title: 'Nope!',
                text: 'You cannot edit posts of other users!',
                color: '#CC4949',
                background: 'rgb(30,30,40)',
                confirmButtonText: 'OK, I will not do that again',
                confirmButtonColor: '#28a1a5'
                
              })

        }

    }




    async function deletePost(id) {
        const token = cookies.load('token')
        const role = cookies.load('userData')


        await axios.delete(`http://localhost:3001/post/${id}`, {
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
        console.log(newCommentPostID)

        let commentData = { commentBody: e.target[0].value, postID: newCommentPostID }
        await axios.post(`http://localhost:3001/comment/${newCommentPostID}`, commentData)
        showPostComments(newCommentPostID)

    }

    const showPostComments = async (id) => {

        let response = [await axios.get(`http://localhost:3001/post/${id}`)];
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


            <form onSubmit={getPosts}>
                <input type="submit" value="Show All Posts" />

            </form>

            {
                posts.map((post, idx) => {
                    return (
                        <div key={idx} className='post-box'>
                            <h2>{post.postTitle}</h2>
                            <p>{post.postBody}</p>
                            <p>{`Posted by ${post.userName}`}</p>

                            <div className="buttons-carrier">

                                {!showEditForm &&
                                    <>  
                                        <button onClick={editButton} className='secondary-buttons' value={post.userName} name='author'> Edit Post </button>
                                    </>}
                                {showEditForm &&
                                    <form onSubmit={updatePost}>
                                        <input value={post.id} hidden name='postID' />
                                        <input type="text" name='postTitle' className="post-title" placeholder="New Post Title" />
                                        <textarea type="text" name='postBody' className="post-title" placeholder="Type something..." />
                                        <button> Update! </button>
                                    </form>
                                }

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


