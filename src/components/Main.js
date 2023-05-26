import React, { useState } from 'react';
import Card from './Card';
import { api } from '../utils/Api';

export default function Main( { onEditProfile, onAddPlace, onEditAvatar, onCardClick } ){
  const [ userName, setUserName ] = React.useState( 'Имя пока не получено' );
  const [ userDescription, setUserDescription ] = React.useState( 'Информации о вас пока нет' );
  const [ userAvatar, setUserAvatar ] = React.useState( '' );
  const [ cards, setCards ] = React.useState( [] );

  React.useEffect(() => {
    Promise.all([ 
      api.getUserDataFromServer(), 
      api.getInitialCards()
    ])
      .then( ([ userData, dataInitialCards ]) => {
        setUserName( userData.name );
        setUserDescription( userData.about );
        setUserAvatar( userData.avatar );
        setCards( dataInitialCards );
      })
      .catch( ([ errOne, errTwo ]) => alert( errOne, errTwo ) )
  }, [])

  return(
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container ">
          <div className="profile__avatar-cover">
            <button 
              className="profile__avatar-edit button-zeroing" 
              onClick={ onEditAvatar }
              aria-label="edit profile"
            />
          </div>
          <img src={userAvatar} alt="Ваше изображение" className="profile__avatar" />
        </div>
        <div className="profile__text-about">
          <div className="profile__title-container">
            <h1 
              className="profile__title-name text-overflow" 
              name="curNameUser">
              {userName}
            </h1>
            <button 
              className="profile__btn-edit button-zeroing transition-opacity" 
              type="button" 
              name="Изменить описание профиля" 
              onClick={ onEditProfile }
              aria-label="edit data of profile"
            />
          </div>
          <p 
            className="profile__subtitle text-overflow" 
            name="curAboutUser"
          >
            {userDescription}
          </p>
        </div>
        <button 
          className="profile__btn-add button-zeroing transition-opacity" 
          type="button" 
          name="Добавить место" 
          onClick={ onAddPlace }
          aria-label="add new card-place"
        />
      </section>
      <section className="cards">
        <ul className="cards__grid">
          { cards.map( item => Card( item, onCardClick) ) }
        </ul>
      </section>
    </main>
  )
}