import React from "react";

export default function PageWithForm({
  textTitle, textBtnSbt, onSubmit, name, children
}){
  const [ isValidForm, setIsValidForm ] = React.useState( true );

  return (
    <div 
      className="page-auth"
    >
      <form 
        className="page-auth__form" 
        name={`${ name }`} 
        noValidate
        onSubmit={ onSubmit }
      >

        <h2 className="page-auth__title">{ textTitle }</h2>

        <label className="page-auth__field">
          <input 
            className={`page-auth__input page-auth__input_type_email`}
            name="user email" 
            placeholder="Email" 
            type="email"
            required
          />
          <span className="page-auth__error"></span>
        </label>

        <label className="page-auth__field">
          <input 
            className={`page-auth__input page-auth__input_type_password`}
            name="user password" 
            placeholder="Пароль" 
            type="password" 
            required
          />
          <span className="page-auth__error"></span>
        </label>

        <button 
          className="page-auth__btn-submit button-zeroing" 
          type="submit" 
          name={`submit-btn-${ name }`}
          disabled={ isValidForm ? null : 'disabled' }
        >
          { textBtnSbt }
        </button>

        {children}

      </form>
    </div>
  )
}