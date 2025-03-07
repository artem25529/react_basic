import '../styles/Skeleton.css';

function Skeleton({
  children,
  disableLine,
  disablePulser,
  style,
  contentStyle,
}) {
  return (
    <div className="skeleton" style={style}>
      {!disablePulser && <div className="skeleton-pulser"></div>}
      {!disableLine && <div className="skeleton-line"></div>}
      <div className="skeleton-content" style={contentStyle}>
        {children}
      </div>
    </div>
  );
}

function ImagePlaceholder({ size }) {
  return (
    <span
      style={{ fontSize: size }}
      className="image-placeholder material-symbols-outlined"
    >
      image
    </span>
  );
}

function PostSkeleton({ style }) {
  return (
    <div className="block post" style={style}>
      <div className="title"></div>

      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  );
}

export default Skeleton;
export { ImagePlaceholder, PostSkeleton };
