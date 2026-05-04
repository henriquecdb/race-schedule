import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setDados] = useState([]);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const res = await fetch('/api/races');
        const data = await res.json();
        setDados(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    buscarDados();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Indy Schedule | 2026</h2>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '10px',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
            <th style={estiloCelula}>Corrida</th>
            <th style={estiloCelula}>Data</th>
            <th style={estiloCelula}>Horário</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={estiloCelula}>{item.name}</td>
              <td style={estiloCelula}>{item.date}</td>
              <td style={estiloCelula}>{item.time || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const estiloCelula = {
  padding: '12px',
  border: '1px solid #ddd',
};

export default App;
