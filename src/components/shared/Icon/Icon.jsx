import sprite from '../../../assets/icons (1).svg'

export default function Icon({ className, width, height, id, onClick }) {
    return (
      <svg onClick={onClick} className={className} width={width} height={height}>
        <use href={`${sprite}#${id}`} />
      </svg>
    );
  }