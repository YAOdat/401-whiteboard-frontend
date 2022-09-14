import React from 'react';

export default function Posts(props) {

return (
    <div>
        {
             props.posts.map((post, idx) => {
                return (
                  <div key={idx}>
                    <p>{post.postTitle}</p>
                    <p>{post.postBody}</p>
                  </div>
                )
              })
        }

    </div>

)

}