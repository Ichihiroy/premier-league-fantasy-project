import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-primary">
      <NavBar />
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
}
