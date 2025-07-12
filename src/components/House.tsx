import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHouseData } from "../utils/houseAPI";
import type { RootState } from "../utils/store";
// import type { RootState } from "@reduxjs/toolkit/query";

export interface House {
  url: string;
  name: string;
  region: string;
  coatOfArms: string;
  words: string;
  titles: string[];
  seats: string[];
  currentLord: string; // URL to character
  heir: string; // URL to character
  overlord: string; // URL to another house
  founded: string;
  founder: string; // URL to character
  diedOut: string;
  ancestralWeapons: string[];
  cadetBranches: string[]; // Array of URLs to houses
  swornMembers: string[]; // Array of URLs to characters
}

const House = () => {
  const dispatch = useDispatch();
  const showHouseData: House[] = useSelector(
    (store: RootState) => store.houses.housedata
  );

  useEffect(() => {
    fetchData();
    console.log(showHouseData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const api = await fetch(`https://anapioficeandfire.com/api/houses`);
      if (!api.ok) {
        console.error("API Error:", api.statusText);
        return;
      }
      const res: House[] = await api.json();
      dispatch(addHouseData(res));
    } catch (error) {
      console.log(error);
    }
  };

  return (
   <div className="flex flex-wrap gap-8 m-10">
  {showHouseData &&
    showHouseData.map((data, index) => (
      <div
        key={index}
        className="relative w-[360px] group"
      >
        {/* Shadow layer */}
        <div className="absolute inset-0 bg-gray-200 rounded-2xl transform translate-y-2 group-hover:translate-y-3 transition-transform duration-300"></div>
        
        {/* Card */}
        <div className="relative bg-white rounded-2xl p-8 transform group-hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-medium text-gray-900">{data.name}</h2>
              <p className="text-gray-500 text-sm mt-1">{data.region}</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-full group-hover:bg-gray-900 transition-colors duration-300"></div>
          </div>
          
          {data.coatOfArms && (
            <div className="mb-6">
              <p className="text-gray-600 text-sm leading-relaxed">{data.coatOfArms}</p>
            </div>
          )}
          
          {(data?.titles || data?.ancestralWeapons) && (
            <div className="space-y-3 pt-4 border-t border-gray-100">
              {data?.titles && (
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-gray-300"></div>
                  <p className="text-sm text-gray-600">{data.titles}</p>
                </div>
              )}
              {data?.ancestralWeapons && (
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-gray-300"></div>
                  <p className="text-sm text-gray-600">{data.ancestralWeapons}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    ))}
</div>
  );
};

export default House;
