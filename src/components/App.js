import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

export default function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
      <PopupWithForm />
      <ImagePopup />

      <section className="">
        <div className="overlay">
          <h2 className="title" />
          <button />
        </div>
        <button />
      </section>
    </>
  );
}