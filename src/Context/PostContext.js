import axios from "axios";
import { createContext, useState } from "react";
import cookies from 'react-cookies';
import Swal from 'sweetalert2';

export const postContext = createContext();

const PostContextProvider = (props) => {

    const [posts, setPosts] = useState([])
    const [showPosts, setShowPosts] = useState(false)
    const [renderComments, setRenderComments] = useState([])
    const [postCommentID, setPostCommentID] = useState(0)
    const [postsCounter, setPostsCounter] = useState(0)
    const [adminDetector, setAdminDetector] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)

    
    const userData = cookies.load('userData')


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


    const updatePost = async (e) => {
        e.preventDefault();
        console.log(e.target[3].value)
        if(e.target[3].value === cookies.load('username')){

        let id = e.target.postID.value;
        const postData = {
            postTitle: e.target.postTitle.value,
            postBody: e.target.postBody.value,
            userName: cookies.load('username'),
            userID: cookies.load('userID')
        }
        await axios.put(`https://odat-posts-database.herokuapp.com/post/${id}`, postData);
        setShowEditForm(false)
        getPosts();

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


    let username = cookies.load('username');

    function canDo (username)   {
       let userAbilities = cookies.load('userData')
       console.log(userAbilities.capabilities)
    }



    const stuff = { getPosts, addPost, updatePost, deletePost, editButton, createComment, showPostComments, posts, setPosts, showPosts, setShowPosts, renderComments, setRenderComments, postCommentID, setPostCommentID, postsCounter, setPostsCounter, adminDetector, setAdminDetector, showEditForm, setShowEditForm, canDo }


    return (

        <postContext.Provider value={stuff}>
        {props.children}
        </postContext.Provider>

    )

}



export default PostContextProvider