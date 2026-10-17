import React from 'react';

interface GenreItem {
  genre: string;
  structure: string[];
  imageSrc?: string;
  imageAlt?: string;
}

const genresData: GenreItem[] = [
   {
    genre: 'Argumenterande text',
    structure: [
      'rubrik',
      'inledning',
      'argument',
      'avslutning',
    ],
    imageSrc: '/images/argumenterandetext.png',
    imageAlt: 'Argumenterande text illustration',
  },
  {
    genre: 'Berättande texter',
    structure: [
      'rubrik',
      'inledning',
      'händelse',
      'upplösning och avslutning',
    ],
  },
  {
    genre: 'Återberättande texter',
    structure: [
      'rubrik',
      'inledning',
      'kronologisk ordning',
      'sammanfattande avslutning',
    ],
  },
  {
    genre: 'Instruerande text',
    structure: [
      'rubrik',
      'lista med material/ingredienser',
      'stegvisa instruktioner',
      'kronologisk ordning',
    ],
  },
  {
    genre: 'Beskrivande text',
    structure: [
      'rubrik',
      'inledning',
      'beskrivning indelad i olika stycken',
    ],
  },
  {
    genre: 'Förklarande text',
    structure: [
      'rubrik',
      'inledning',
      'förklaringar',
      'bilder och diagram',
    ],
  },
];

export const TextGenresTable: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-6 overflow-hidden border border-gray-300 rounded-lg shadow-sm bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-300 bg-gray-50">
            <th className="py-4 px-6 text-xl font-bold text-gray-900 w-1/2 border-r border-gray-300">
              Genre
            </th>
            <th className="py-4 px-6 text-xl font-bold text-gray-900 w-1/2">
              Struktur
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {genresData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50/50">
              <td className="py-4 px-6 font-medium text-gray-800 border-r border-gray-300 align-top">
                <div>{item.genre}</div>
                {item.imageSrc && (
                  <div className="mt-3">
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt ?? item.genre}
                      className="max-w-full h-auto rounded border border-gray-200 shadow-sm"
                    />
                  </div>
                )}
              </td>
              <td className="py-4 px-6 text-gray-700 align-top">
                <ul className="space-y-1">
                  {item.structure.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TextGenresTable;