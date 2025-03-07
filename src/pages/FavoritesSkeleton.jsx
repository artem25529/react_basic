import Skeleton, { PostSkeleton } from '../components/Skeleton.jsx';

function FavoritesSkeleton() {
  const posts = [];

  for (let i = 0; i < 2; i++) {
    posts.push(<PostSkeleton />);
  }

  return (
    <Skeleton>
      {posts}
      <div style={{ display: 'flex', gap: '1.2em', justifyContent: 'end' }}>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </Skeleton>
  );
}

export default FavoritesSkeleton;
