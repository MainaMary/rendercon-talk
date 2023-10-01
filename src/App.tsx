import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Feed from "./pages/feed/Feed";
import SignIn from "./pages/auth/signin/page";
import SingleFeed from "./pages/feed";
import NotFound from "./pages/error/NotFound";
// import TestComponent from "./components/TestComponent";

const appRoutes = [
  {
    component: <Home />,
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
    path: "/profile",
  },

  {
    component: <NotFound />,
    path: "*",
  },
  // {
  //   component: <TestComponent />,
  //   path: "/feed/:commentId",
  // },
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
