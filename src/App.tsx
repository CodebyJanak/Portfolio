import BackgroundVideo from './components/BackgroundVideo';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundVideo />
      <Navbar />
      <main className="relative">
        <Hero />
      </main>
    </div>
  );
}

export default App;
