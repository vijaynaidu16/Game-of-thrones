import { useEffect, useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { addCharacters } from "../utils/gotAPI";
import RootState from "../utils/store";
import { Button } from "./ui/button";

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
        // setData([]);
        // setError(404);
        return;
      }
      const data = await res.json();
      setData(data);
      dispatch(addCharacters(data));
      //   setError(200);
      console.log(data);
    } catch {
      // setData([]);
      //   setError(404);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") {
      setData([]);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredCharacters = showCharacter.filter((char: any) =>
      char.fullName.toLowerCase().includes(name.toLowerCase())
    );
    setData(filteredCharacters);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center mb-10"
      >
        <input
          className="border w-1/4 shadow-2xl rounded-sm p-2"
          placeholder="Search here"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button className="mt-4 w-1/4" type="submit">
          Search
        </Button>
      </form>
      <div className="flex gap-10 flex-wrap  ">
        {data.map((data: Character) => (
          <div
            key={data.id}
            className="w-1/4 border border-white text-center flex flex-col justify-center items-center mx-auto"
          >
            <h1 className="text-xl font-bold Bricolage-Grotesque">
              {data.title}
            </h1>
            <img
              className="rounded-lg w-50 h-50"
              src={`https://thronesapi.com/assets/images/${data.image}`}
              alt={data.image}
            />
            <h1 className="poppins">{data.fullName}</h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
