import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Feed from "./pages/feed/Feed";
import SignIn from "./pages/auth/signin/page";
import Register from "./pages/auth/register/page";
import SingleFeed from "./pages/feed";

const appRoutes = [
  {
    component: <Register />,
    path: "/",
  },
  {
    component: <SignIn />,
    path: "/signIn",
  },
  {
    component: <Home />,
    path: "/home",
  },
  {
    component: <Feed />,
    path: "/feed",
  },
  {
    component: <SingleFeed />,
    path: "/feed/:id",
  },
];
function App() {
  return (
    <div className="mx-auto mx-w-screen-2xl px-8 md:px-12">
      <Routes>
        {appRoutes.map((label) => (
          <Route key={label.path} path={label.path} element={label.component} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
