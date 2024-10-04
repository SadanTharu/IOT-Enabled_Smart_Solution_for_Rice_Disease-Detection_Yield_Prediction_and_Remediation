import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import './RemediesPieChart.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF49C2', '#C200FF', '#FF0000'];

const RemediesPieChart = ({ dailyRemedies }) => {
  return (
    <div className="chart-section">
      <h2>Remedies Added Last Week (Daily Distribution)</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%"> {/* Responsive container scales with its parent */}
          <PieChart>
            <Pie
              data={dailyRemedies}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
            
              fill="#4CAF50"
              label={({ name, value, percent }) =>
                `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {dailyRemedies.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const { name, value, diseases } = payload[0].payload;
                  return (
                    <div className="custom-tooltip">
                      <p className="tooltip-title">{`${name}: ${value} remedies`}</p>
                      <div className="tooltip-disease-list-wrapper">
                        <ul className="tooltip-disease-list">
                          {diseases.map((disease, index) => (
                            <li key={index} className="disease-item">
                              <span className="disease-icon">🌾</span>
                              {disease}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
              wrapperStyle={{ outline: 'none', zIndex: 1000 }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RemediesPieChart;
