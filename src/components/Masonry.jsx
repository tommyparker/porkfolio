import { useEffect } from 'preact/hooks';
import Masonry from 'masonry-layout';

const MasonryGrid = ({ children }) => {
  useEffect(() => {
    const grid = document.querySelector('.thumbnail-container');
    new Masonry(grid, {
      itemSelector: '.thumbnail',
      columnWidth: '.masonry-sizer',
      percentPosition: true,
      gutter: '.gutter-sizer',
      transitionDuration: '0.1s'
    });
  }, []);

  return (
    <div className="thumbnail-container">
      <div className="masonry-sizer"></div>
      <div class="gutter-sizer"></div>
      {children}
    </div>
  );
};

export default MasonryGrid;
