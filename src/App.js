import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);
  console.log(posts, 'posts')

  useEffect(() => {
    fetch('https://www.reddit.com/r/reactjs.json')
      .then(response => response.json())
      .then(data => {
        const fetchedPosts = data.data.children.map(child => ({
          title: child.data.title,
          selfTextHTML: child.data.selftext_html,
          url: child.data.url,
          score: child.data.score
        }));
        setPosts(fetchedPosts);
      })
      .catch(error => {
        console.error('Error fetching Reddit posts:', error);
      });
  }, []);

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index} className="card">
          <h2 className="card-title">{post.title}</h2>
          {/* <div className="card-content">{post.selfTextHTML}</div> */}
          {post.selfTextHTML !== null ? (<div className="card-content" dangerouslySetInnerHTML={{ __html: post.selfTextHTML }} />):(
            <div className='page_found'>No selfTextHTML Data Found</div>
          )}
          <a style={{marginLeft:'20px'}} href={post.url} className="read-more" target="_blank" rel="noopener noreferrer">URL-Read more</a>
          <div className="card-score">Score: {post.score}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
