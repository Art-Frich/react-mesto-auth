import logo from "../src/images/logo.svg";

function App() {
  return (
    <>
      <header className="header">
        <img src={logo} alt="Логотип Mesto Russia" className="header__logo" />
      </header>

      <main className="main">
        <section className="profile">
          <div className="profile__avatar-container ">
            <div className="profile__avatar-cover">
              <button className="profile__avatar-edit button-zeroing" />
            </div>
            <img src="#" alt="Ваше изображение" className="profile__avatar" />
          </div>
          <div className="profile__text-about">
            <div className="profile__title-container">
              <h1 className="profile__title-name text-overflow" name="curNameUser">Имя пока не получено</h1>
              <button className="profile__btn-edit button-zeroing transition-opacity" type="button" name="Изменить описание профиля" />
            </div>
            <p className="profile__subtitle text-overflow" name="curAboutUser">Информации о вас пока нет</p>
          </div>
          <button className="profile__btn-add button-zeroing transition-opacity" type="button" name="Добавить место" />
        </section>
        <section className="cards">
          <ul className="cards__grid" />
        </section>
      </main>

      <footer className="footer">
        <p className="footer__author">© 2023 Art Frich</p>
      </footer>

      <div className="popup popup_type_edit-profile">
        <div className="popup__container popup__container_type_form">
          <form className="popup__form" name="editProfileText" noValidate>
            <h2 className="popup__title">Редактировать профиль</h2>
            <label className="popup__field">
              <input className="popup__input popup__input_type_name-user" name="nameUser" placeholder="Имя или то, что вам его заменит" type="text" minLength={2} maxLength={40} required />
              <span className="popup__error" />
            </label>
            <label className="popup__field">
              <input className="popup__input popup__input_type_about" name="aboutUser" placeholder="Кто вы? Можете оставить это место пустым =)" type="text" minLength={2} maxLength={200} required />
              <span className="popup__error" />
            </label>
            <button className="popup__btn-submit button-zeroing transition-opacity" type="submit" name="Сохранить внесенные изменения" disabled>
              Сохранить
            </button>
          </form>
          <button className="popup__btn-close button-zeroing transition-opacity" type="button" name="Закрыть окно формы" />
        </div>
      </div>

      <div className="popup popup_type_add-place">
        <div className="popup__container popup__container_type_form">
          <form className="popup__form" name="addNewPlace" noValidate>
            <h2 className="popup__title">Новое место</h2>
            <label className="popup__field">
              <input className="popup__input popup__input_type_name-place" name="namePlace" placeholder="Как называется это место?" type="text" minLength={2} maxLength={30} required />
              <span className="popup__error" />
            </label>
            <label className="popup__field">
              <input className="popup__input popup__input_type_url" name="urlImage" placeholder="Укажите ссылку на изображение" type="url" required />
              <span className="popup__error" />
            </label>
            <button className="popup__btn-submit button-zeroing transition-opacity" type="submit" name="Добавить новое место" disabled>
              Создать
            </button>
          </form>
          <button className="popup__btn-close button-zeroing transition-opacity" type="button" name="Закрыть окно формы" />
        </div>
      </div>

      <div className="popup popup_type_full-img-place">
        <div className="popup__container popup__container_type_figure">
          <figure className="popup__figure">
            <img src="#" alt="Изображение" className="popup__img" />
            <figcaption className="popup__figcaption" />
          </figure>
          <button className="popup__btn-close button-zeroing transition-opacity" type="button" name="Закрыть окно c изображением" />
        </div>
      </div>

      <div className="popup popup_type_confirmDelete">
        <div className="popup__container popup__container_type_form ">
          <form className="popup__form" name="confirmCardDelete" noValidate>
            <h2 className="popup__title popup__title_type_confirm-delete">Вы уверены?</h2>
            <button className="popup__btn-submit button-zeroing transition-opacity" type="submit" name="удалить карточку">
              Да
            </button>
          </form>
          <button className="popup__btn-close button-zeroing transition-opacity" type="button" name="Закрыть окно" />
        </div>
      </div>

      <div className="popup popup_type_editAvatar">
        <div className="popup__container popup__container_type_form ">
          <form className="popup__form" name="avatarUpdate" noValidate>
            <h2 className="popup__title">Обновить аватар</h2>
            <label className="popup__field">
              <input className="popup__input popup__input_type_url" name="urlImage" placeholder="Укажите ссылку на новое изображение" type="url" required />
              <span className="popup__error" />
            </label>
            <button className="popup__btn-submit button-zeroing transition-opacity" type="submit" name="удалить карточку" disabled>
              Сохранить
            </button>
          </form>
          <button className="popup__btn-close button-zeroing transition-opacity" type="button" name="Закрыть окно" />
        </div>
      </div>

      <section className>
        <div className="overlay">
          <h2 className="title" />
          <button />
        </div>
        <button />
      </section>
    </>
  );
}

export default App;
