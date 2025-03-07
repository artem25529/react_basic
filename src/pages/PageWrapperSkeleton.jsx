import Skeleton, { ImagePlaceholder } from '../components/Skeleton.jsx';

import BlogSkeleton from './BlogSkeleton.jsx';

function PageWrapperSkeleton() {
  const icons = [];

  for (let i = 0; i < 4; i++) {
    icons.push(<ImagePlaceholder size="3.5em" />);
  }
  return (
    <Skeleton disableLine={true} style={{ position: 'fixed' }}>
      <div
        className="block"
        style={{ display: 'flex', alignItems: 'center', gap: '5em' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
          <ImagePlaceholder size="3.3em" />
          <div className="title" style={{ width: '14em' }}></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
          <div className="line" style={{ width: '8em' }}></div>
          <div className="line" style={{ width: '8em' }}></div>
          <div className="line" style={{ width: '8em' }}></div>
          <div className="line" style={{ width: '8em' }}></div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
            gap: '1em',
          }}
        >
          <div className="title" style={{ width: '10em' }}></div>
          <div className="title" style={{ width: '10em' }}></div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          position: 'relative',
          height: '100vh',
          gap: '1.5em',
        }}
      >
        <div
          className="block"
          style={{
            width: '20%',
            margin: '0',
            position: 'relative',
            zIndex: '-1',
            paddingInline: '2.5em',
          }}
        >
          <div className="line" style={{ marginTop: '10em' }}></div>
          <div className="line" style={{ marginBlock: '0.7em' }}></div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {icons}
          </div>
          <div className="line" style={{ marginBlock: '0.7em' }}></div>
          <div className="line"></div>
        </div>

        <BlogSkeleton
          disableLine={true}
          disablePulser={true}
          style={{
            width: '60%',
            position: 'relative',
            inset: 'unset',
            zIndex: '-1',
            top: '-1.5em',
          }}
          contentStyle={{ margin: 0 }}
        />

        <div
          className="block"
          style={{
            width: '20%',
            margin: '0',
            position: 'relative',
            zIndex: '-1',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '8em',
          }}
        >
          <ImagePlaceholder size="18em" />
        </div>
      </div>
    </Skeleton>
  );
}

export default PageWrapperSkeleton;
