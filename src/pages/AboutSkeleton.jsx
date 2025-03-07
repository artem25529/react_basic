import Skeleton, { PostSkeleton } from '../components/Skeleton.jsx';

function AboutSkeleton() {
  return (
    <Skeleton>
      <div className="post">
        <div className="title" style={{ marginBottom: '2em' }}></div>

        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <div className="title" style={{ marginBlock: '3em' }}></div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
        <div className="circle"></div>
        <PostSkeleton style={{ flexGrow: 1 }} />
        <div className="circle"></div>
      </div>
    </Skeleton>
  );
}

export default AboutSkeleton;
