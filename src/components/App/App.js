import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {


  return (
    <div className="page">

      <Routes>

        <Route exact path="/" element={
          <>
            <Header loggedIn={false} 
              //loggedIn={true}
              headerClass={'header__main'}
              navigationClass={'navigation__main-account-icon'}/>
            <Main />
            <Footer />
          </>
        }
        />
        <Route exact path="/sign-up" element={
          <Register />
        }
        />
        <Route exact path="/sign-in" element={
          <Login />
        }
        />
        <Route exact path="/profile" element={
          <>
            <Header loggedIn={true} 
              headerClass={'header__auth'}
              navigationClass={'navigation__account-icon'}/>
            <Profile />
          </>
        }
        />
        <Route exact path="/movies" element={
          <>
            <Header loggedIn={true} 
              headerClass={'header__auth'}
              navigationClass={'navigation__account-icon'}/>
            <Movies />
            <Footer />
          </>
        }
        />
        <Route exact path="/saved-movies" element={
          <>
            <Header loggedIn={true} 
              headerClass={'header__auth'}
              navigationClass={'navigation__account-icon'}/>
            <SavedMovies />
            <Footer />
          </>
        }
        />
        <Route path="/*" element={
          <PageNotFound />
        }
        />
      </Routes>
    </div>
  );
}

export default App;
