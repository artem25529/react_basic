import Skeleton from '../components/Skeleton.jsx';

function LoginSkeleton() {
  const labelAndInput = (
    <>
      <div className="line" style={{ width: '30%' }}></div>
      <div
        className="line"
        style={{ marginTop: '0.8em', marginBottom: '1.4em' }}
      ></div>
    </>
  );
  return (
    <Skeleton>
      <div
        className="block"
        style={{
          width: 'max(60%, 300px)',
          marginInline: 'auto',
          marginTop: '8em',
          padding: '1.5em 1.8em',
        }}
      >
        <div className="title" style={{ marginBottom: '2em' }}></div>

        {labelAndInput}
        {labelAndInput}

        <div
          className="line"
          style={{ marginTop: '2em', height: '1.3lh' }}
        ></div>
        <div
          className="line"
          style={{
            width: '25%',
            marginLeft: 'auto',
            marginTop: '1em',
            height: '1.2lh',
          }}
        ></div>
      </div>
    </Skeleton>
  );
}

export default LoginSkeleton;
