import { useEffect, useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { addCharacters } from "../utils/gotAPI";
import { Button } from "./ui/button";
import type { RootState } from "../utils/store";

export interface Character {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  family: string;
  image: string;
  imageUrl: string; // "https://thronesapi.com/assets/images/jon.jpg"
}

export type CharactersResponse = Character[];

const Home = () => {
  const [data, setData] = useState<CharactersResponse>([]);
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch();
  const showCharacter = useSelector(
    (store: RootState) => store.characters.characters
  );

  const fetchData = async () => {
    try {
      const res = await fetch(`https://thronesapi.com/api/v2/Characters`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setData(data);
      dispatch(addCharacters(data));
    } catch {
      console.log("Error loading data..");
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") {
      setData(showCharacter);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredCharacters = showCharacter.filter((char: any) =>
      char.fullName.toLowerCase().includes(name.toLowerCase())
    );
    setData(filteredCharacters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
  <div className="px-4 py-16">
    {/* Clean header */}
    <div className="text-center mb-16">
      <h1 className="text-6xl font-light text-gray-900 tracking-tight">Characters</h1>
      <div className="w-24 h-0.5 bg-gray-900 mx-auto mt-6"></div>
    </div>

    {/* No results */}
    {data.length === 0 && (
      <div className="text-center mb-12">
        <p className="text-gray-500 text-lg">No characters found.</p>
      </div>
    )}

    {/* Search Form */}
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mb-20"
    >
      <div className="space-y-4">
        <input
          className="w-full border-b-2 border-gray-300 pb-3 text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors duration-300 bg-transparent"
          placeholder="Search characters"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <Button 
          className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 transition-colors duration-300"
          type="submit"
        >
          Search
        </Button>
      </div>
    </form>

    {/* Characters Grid */}
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {data.map((character: Character) => (
          <div
            key={character.id}
            className="group cursor-pointer"
          >
            <div className="space-y-4">
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  src={`https://thronesapi.com/assets/images/${character.image}`}
                  alt={character.fullName}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/300x400/f3f4f6/9ca3af?text=No+Image';
                  }}
                />
              </div>
              
              {/* Text */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  {character.title || 'Unknown'}
                </p>
                <h3 className="text-lg text-gray-900 font-medium">
                  {character.fullName}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
  );
};

export default Home;
