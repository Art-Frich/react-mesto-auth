export default function ImagePopup(){
  return(
    <div className="popup popup_type_full-img-place">
      <div className="popup__container popup__container_type_figure">
        <figure className="popup__figure">
          <img src="#" alt="Изображение" className="popup__img" />
          <figcaption className="popup__figcaption" />
        </figure>
        <button 
          className="popup__btn-close button-zeroing transition-opacity" 
          type="button" 
          name="Закрыть окно c изображением"
        />
      </div>
    </div>
  )
}