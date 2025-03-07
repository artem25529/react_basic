import Skeleton from '../components/Skeleton.jsx';

function NewPostSkeleton() {
  return (
    <Skeleton>
      <div className="block" style={{ padding: '2em 5.6em' }}>
        <div
          className="title"
          style={{ marginBottom: '2em', width: '40%', height: '1.75lh' }}
        ></div>

        <div className="title"></div>

        <div className="line" style={{ height: '7lh', marginTop: '1em' }}></div>
        <div
          className="line"
          style={{
            width: '20%',
            marginLeft: 'auto',
            marginTop: '1.6em',
            height: '1.3lh',
          }}
        ></div>
      </div>
    </Skeleton>
  );
}

export default NewPostSkeleton;
