import axios from 'axios';

    export default getPosts = async (e) => {
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