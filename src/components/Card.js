export default function Card( dataCard, onCardClick ){
  function handleClick(){
    onCardClick( dataCard )
  }

  return(
    <li className="cards__grid-item" key={ dataCard._id }>
      <div className="card">
        <img 
          src={ dataCard.link } 
          alt={`Изображение ${ dataCard.name }`} 
          className="card__photo"
          onClick={handleClick}
        />
        <div className="card__figcaption">
          <h2 className="card__title text-overflow">{ dataCard.name }</h2>
          <div className="card__like-container">
            <button
              className="card__like button-zeroing transition-opacity transition-background"
              type="button"
              name="Поставить лайк"
              aria-label="set like"
            ></button>
            <span className="card__like-count">{dataCard.likes.length}</span>
          </div>
        </div>
        <button
          className="card__del-card-btn button-zeroing transition-opacity"
          type="button"
          name="удалить место"
          aria-label="delete card"
        ></button>
      </div>
    </li>
  )
}