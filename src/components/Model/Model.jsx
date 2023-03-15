import style from './Modal.module.css';
import { useEffect } from 'react';

export const Model = ({ image: { src, alt }, closeModal }) => {
  useEffect(() => {
    const closeByEsc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeByEsc);

    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [closeModal]);

  const closeByBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  // componentDidMount() {
  //   window.addEventListener('keydown', this.closeByEsc);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.closeByEsc);
  // }

  return (
    <div className={style.backdrop} onClick={closeByBackdropClick}>
      <div className={style.modal}>
        <img src={`https://image.tmdb.org/t/p/w500${src}`} alt={alt} />
        <button onClick={closeModal} className={style.closeBtn} type="button">
          Close
        </button>
      </div>
    </div>
  );
};
