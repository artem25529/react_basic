import Skeleton, { PostSkeleton } from '../components/Skeleton.jsx';

function BlogSkeleton({ disableLine, disablePulser, style, contentStyle }) {
  const posts = [];

  for (let i = 0; i < 5; i++) {
    posts.push(<PostSkeleton />);
  }

  return (
    <Skeleton
      disableLine={disableLine}
      disablePulser={disablePulser}
      style={style}
      contentStyle={contentStyle}
    >
      <div className="block">
        <div
          className="line"
          style={{
            width: '15%',
            marginLeft: 'auto',
            marginBottom: '0.85em',
            height: '1.3lh',
          }}
        ></div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '0.8em',
            alignItems: 'center',
          }}
        >
          <div className="line" style={{ width: '20%', height: '1.3lh' }}></div>
          <div
            style={{
              display: 'flex',
              gap: '0.8em',
            }}
          >
            <div className="circle" style={{ marginRight: 'auto' }}></div>
            <div className="circle" style={{ marginRight: 'auto' }}></div>
          </div>
          <div className="circle" style={{ marginLeft: 'auto' }}></div>
          <div className="line" style={{ width: '25%', height: '1.3lh' }}></div>
        </div>
      </div>
      {posts}
    </Skeleton>
  );
}

export default BlogSkeleton;
