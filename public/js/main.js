document.addEventListener('DOMContentLoaded', () => {
  const likeBtns = document.querySelectorAll('.like-btn');
  likeBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const postId = btn.dataset.postId;
      
      try {
        const response = await fetch(`/post/${postId}/like`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          const likeIcon = btn.querySelector('.like-icon');
          const likeCount = btn.querySelector('.like-count');
          
          likeIcon.textContent = data.liked ? '❤️' : '🤍';
          likeCount.textContent = data.likesCount;
        }
      } catch (error) {
        console.error('Error liking post:', error);
      }
    });
  });

  const followBtns = document.querySelectorAll('.follow-btn');
  followBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const userId = btn.dataset.userId;
      
      try {
        const response = await fetch(`/user/${userId}/follow`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          btn.textContent = data.isFollowing ? 'Unfollow' : 'Follow';
          
          const followersCount = document.querySelector('.profile-stats span:nth-child(2) strong');
          if (followersCount) {
            followersCount.textContent = data.followersCount;
          }
        }
      } catch (error) {
        console.error('Error following user:', error);
      }
    });
  });

  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    setTimeout(() => {
      alert.style.opacity = '0';
      setTimeout(() => alert.remove(), 300);
    }, 5000);
  });
});
