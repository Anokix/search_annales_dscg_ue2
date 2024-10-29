'use client';

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

// Type pour les données
type Question = {
  annee: string;
  num: string;
  question: string;
};

// Les données
const data: Question[] = [
  { annee: "2023", num: "1.1", question: "Définir les hypothèses sous-jacentes au modèle proposé en annexe 1 et en expliquer l'utilité pour les projets d'investissements." },
  { annee: "2023", num: "1.2", question: "Définir les termes suivants : option réelle et option d'expansion." },
  // Ajoutez le reste de vos données ici
];

export default function SearchAnnales() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredQuestions = useMemo(() => {
    if (!searchTerm.trim()) return data;
    
    const searchTermLower = searchTerm.toLowerCase();
    return data.filter(item => 
      item.question.toLowerCase().includes(searchTermLower) ||
      item.annee.includes(searchTermLower) ||
      item.num.includes(searchTermLower)
    );
  }, [searchTerm]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Recherche d&apos;Annales</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par mot-clé, année ou numéro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="space-y-4">
          {filteredQuestions.map((item, index) => (
            <div 
              key={index} 
              className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-blue-600">Année {item.annee}</span>
                <span className="text-gray-500">|</span>
                <span className="font-medium">Question {item.num}</span>
              </div>
              <p className="text-gray-700">{item.question}</p>
            </div>
          ))}
          
          {filteredQuestions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun résultat trouvé pour "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
