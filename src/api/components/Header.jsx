export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">My Portfolio</h1>
      <nav>
        <a href="#about" className="mx-2">About</a>
        <a href="#projects" className="mx-2">Projects</a>
        <a href="#contact" className="mx-2">Contact</a>
      </nav>
    </header>
  );
}
