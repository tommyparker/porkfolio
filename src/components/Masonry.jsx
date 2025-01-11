import { useEffect } from 'preact/hooks';
import Isotope from 'isotope-layout';

const IsotopeGrid = ({ children }) => {
  useEffect(() => {
    const grid = document.querySelector('.thumbnail-container');
    new Isotope(grid, {
      itemSelector: '.thumbnail',
      layoutMode: 'masonry',
      masonry: {
        columnWidth: '.masonry-sizer',
        gutter: '.gutter-sizer',
      },
      percentPosition: true,
      transitionDuration: '0.1s',
    });
  }, []);

  return (
    <div className="thumbnail-container">
      <div className="masonry-sizer"></div>
      <div className="gutter-sizer"></div>
      {children}
    </div>
  );
};

export default IsotopeGrid;
