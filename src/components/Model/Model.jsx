import { Component } from 'react';
import style from './Modal.module.css';

export class Model extends Component {
  closeByEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  closeByBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
  }

  render() {
    const {
      image: { src, alt },
      closeModal,
    } = this.props;
    return (
      <div className={style.backdrop} onClick={this.closeByBackdropClick}>
        <div className={style.modal}>
          <img src={`https://image.tmdb.org/t/p/w500${src}`} alt={alt} />
          <button onClick={closeModal} className={style.closeBtn} type="button">
            Close
          </button>
        </div>
      </div>
    );
  }
}
