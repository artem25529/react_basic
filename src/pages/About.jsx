import { useEffect, useState } from 'react';
import postService from '../services/postService.js';
import PostList from '../components/PostList.jsx';

import '../styles/About.css';

function About() {
  const [response, setResponse] = useState({
    pages: null,
    data: null,
    error: null,
    isDone: false,
  });

  useEffect(() => {
    const searchParams = {
      sort: 'statistics.views',
      order: 'desc',
    };

    postService.getPosts(searchParams, 1, 3, setResponse);
  }, []);

  function handleButtonClick(e) {
    const btn = e.target;
    const isNextBtn = btn.classList.contains('next');

    const postList = document.querySelector('.post-list');
    const activeItem = postList.firstElementChild;
    const postWidth = activeItem.getBoundingClientRect().width;
    const postListWidth = postWidth * postList.childElementCount;

    const targetItem = isNextBtn
      ? activeItem.nextElementSibling
      : postList.lastElementChild;

    if (!isNextBtn) {
      targetItem.style.translate = `-${postListWidth}px`;

      setTimeout(() => {
        targetItem.classList.add('animated');
        targetItem.style.translate = `-${postListWidth - postWidth}px`;
      }, 1);
    } else {
      targetItem.classList.add('animated');
      targetItem.style.translate = `-${postWidth}px`;
    }

    activeItem.classList.add('animated');
    activeItem.style.translate = `${isNextBtn ? '-' : ''}${postWidth}px`;

    targetItem.ontransitionend = handletransitionEnd;

    function handletransitionEnd() {
      activeItem.classList.remove('animated');
      targetItem.classList.remove('animated');
      targetItem.style.translate = '';
      activeItem.style.translate = '';

      postList.prepend(targetItem);

      if (isNextBtn) {
        postList.append(activeItem);
      }
    }
  }

  const dataLength = response.data ? response.data.length : 0;

  return (
    <div className="about">
      <div className="info">
        <div className="title">About Me</div>
        <div className="text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          possimus expedita suscipit illum at consectetur facilis facere
          doloremque similique id? Vero, vel iste provident impedit quod
          doloribus sunt commodi? Similique dolorem quasi vitae odit autem vel
          earum consequuntur repellendus tempore ipsum sapiente cumque obcaecati
          laborum voluptatibus culpa, eveniet, voluptatem provident debitis
          blanditiis fugit nobis illum? Perspiciatis, at dignissimos voluptas
          earum delectus numquam eum et ex iusto nulla expedita natus ipsa
          necessitatibus iure fugiat veritatis sapiente beatae rem voluptate
          deserunt adipisci facere assumenda? Odio nobis, minima optio eligendi
          vero dignissimos eos deleniti nesciunt earum a perspiciatis ducimus
          recusandae, id quo beatae?
        </div>
      </div>
      {!response.isDone && <div>Loading...</div>}

      {dataLength > 0 && (
        <div className="top-posts">
          <div className="title">
            {dataLength === 1
              ? 'Most populat post'
              : `Top ${dataLength} popular posts`}
          </div>
          <div className={`content${dataLength > 1 ? ' slider' : ''}`}>
            <div className="btn prev" onClick={handleButtonClick}>
              prev
            </div>
            <PostList posts={Object.values(response.data)} />
            <div className="btn next" onClick={handleButtonClick}>
              next
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;
