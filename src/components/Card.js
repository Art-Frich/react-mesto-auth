export default function Card( props, i ){
  return(
    <li className="cards__grid-item" key={i}>
      <div className="card">
        <img src={ props.link } alt={`Изображение ${ props.name }`} className="card__photo" />
        <div className="card__figcaption">
          <h2 className="card__title text-overflow">{ props.name }</h2>
          <div className="card__like-container">
            <button
              className="card__like button-zeroing transition-opacity transition-background"
              type="button"
              name="Поставить лайк"
            ></button>
            <span className="card__like-count">{props.likes.length}</span>
          </div>
        </div>
        <button
          className="card__del-card-btn button-zeroing transition-opacity"
          type="button"
          name="удалить место"
        ></button>
      </div>
    </li>
  )
}