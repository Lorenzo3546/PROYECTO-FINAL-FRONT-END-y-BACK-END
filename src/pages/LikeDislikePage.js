import React from 'react';
import LikeDislikeButton  from '../components/LikeDislikeButton.js';


function LikeDislikePage() {
  return (
    <div className="likedislike">
    <div>
      <h3> Article Example 1</h3>    
      <LikeDislikeButton likeNumber={0} disLikeNumber={0}/>
    </div>
    </div>
  );
}

export default LikeDislikePage;