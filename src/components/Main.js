import React, { useState } from 'react';
import Card from './Card';
import { api } from '../utils/Api';

export default function Main( { onEditProfile, onAddPlace, onEditAvatar } ){
  const [ userName, setUserName ] = React.useState( 'Имя пока не получено' );
  const [ userDescription, setUserDescription ] = React.useState( 'Информации о вас пока нет' );
  const [ userAvatar, setUserAvatar ] = React.useState( '' );
  const [ cards, setCards ] = React.useState( [] );
  let myId;

  React.useEffect(() => {
    Promise.all([ 
      api.getUserDataFromServer(), 
      api.getInitialCards()
    ])
      .then( ([ dataOne, dataTwo ]) => {
        myId = dataOne._id;
        setUserName( dataOne.name );
        setUserDescription( dataOne.about );
        setUserAvatar( dataOne.avatar );
        setCards( dataTwo.map( ( item, i ) => Card( item, i ) ) );
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
        />
      </section>
      <section className="cards">
        <ul className="cards__grid">
          {cards}
        </ul>
      </section>
    </main>
  )
}