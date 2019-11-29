import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  // tech = lista de tecnologias / setTech = função para atualizar as informações do estado
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
    setNewTech('');
  }, [newTech, tech]);

  // ComponentDidMount (Executa somente uma vez): passar um array vazio no segundo parâmetro
  useEffect(() => {
    const storageTech = localStorage.getItem('tech');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }
  }, []);

  // Techsize só executará a função quando a variável tech estiver diferente
  const techSize = useMemo(() => tech.length, [tech]);

  // ComponentDidUpdate = Monitorar alterações na variável 'tech' e salvá-la no Local Storage
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias.</strong>
      <br />
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
