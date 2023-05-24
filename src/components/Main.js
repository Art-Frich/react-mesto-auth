export default function Main(){
  function handleEditAvatarClick(){
    const popup = document.querySelector('.popup_type_edit-avatar');
    popup.classList.add('to-visible');
  }

  function handleEditProfileClick(){
    const popup = document.querySelector('.popup_type_edit-profile');
    popup.classList.add('to-visible');
  }

  function handleAddPlaceClick(){
    const popup = document.querySelector('.popup_type_add-place');
    popup.classList.add('to-visible');
  }

  return(
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container ">
          <div className="profile__avatar-cover">
            <button 
              className="profile__avatar-edit button-zeroing" 
              onClick={handleEditAvatarClick}
            />
          </div>
          <img src="#" alt="Ваше изображение" className="profile__avatar" />
        </div>
        <div className="profile__text-about">
          <div className="profile__title-container">
            <h1 className="profile__title-name text-overflow" name="curNameUser">Имя пока не получено</h1>
            <button 
              className="profile__btn-edit button-zeroing transition-opacity" 
              type="button" 
              name="Изменить описание профиля" 
              onClick={handleEditProfileClick}
            />
          </div>
          <p 
            className="profile__subtitle text-overflow" 
            name="curAboutUser"
          >Информации о вас пока нет</p>
        </div>
        <button 
          className="profile__btn-add button-zeroing transition-opacity" 
          type="button" 
          name="Добавить место" 
          onClick={handleAddPlaceClick}
        />
      </section>
      <section className="cards">
        <ul className="cards__grid" />
      </section>
    </main>
  )
}