export default function Main( { onEditProfile, onAddPlace, onEditAvatar } ){
  return(
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container ">
          <div className="profile__avatar-cover">
            <button 
              className="profile__avatar-edit button-zeroing" 
              onClick={ onEditAvatar }
            />
          </div>
          <img src="#" alt="Ваше изображение" className="profile__avatar" />
        </div>
        <div className="profile__text-about">
          <div className="profile__title-container">
            <h1 
              className="profile__title-name text-overflow" 
              name="curNameUser">
              Имя пока не получено
            </h1>
            <button 
              className="profile__btn-edit button-zeroing transition-opacity" 
              type="button" 
              name="Изменить описание профиля" 
              onClick={ onEditProfile }
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
          onClick={ onAddPlace }
        />
      </section>
      <section className="cards">
        <ul className="cards__grid" />
      </section>
    </main>
  )
}